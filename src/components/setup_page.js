import React, { Component } from 'react';
import { database } from './firebase'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

export class setup_page extends Component {


    state = {
        //sets state of unit switching
        imp_Units: false,
        met_Units: true,
        Gender: '',
        Goal: '',
        Weight: '',
        Height: '',
        Age: '',
        weightUnits: ''
    };


    //handles switch funtion of unit switching
    metericClickHandler = () => {
        this.setState({ imp_Units: false });
        this.setState({ met_Units: true });
        console.log('Met Clicked')
        this.setState({ weightUnits: 'Kg' });
    };

    //checks what units are picked and renders out different items depeding on state
    imperialClickHandler = () => {
        this.setState({ imp_Units: true });
        this.setState({ met_Units: false });
        console.log('Imp Clicked')
        this.setState({ weightUnits: 'lbs' });
    };

    imperialHeightChangeHandler = (event) => {
        this.setState({ Height: event.target.value });
        console.log(this.state.Height)
    };

    //writes users information to database if all input fields are filled and if not alerts user
    calculate_bmi = () => {
        if (this.state.weightUnits === 'lbs') {
            this.setState(
                { Weight: this.state.Weight / 2.2 },
                () => this.saveData()
            );
        } else {
            this.saveData();
        }
    }
    saveData = () => {

        if (this.state.Gender !== '' && this.state.Age !== '' && this.state.Height !== '' && this.state.Weight !== '' && this.state.Goal !== '') {
            database.collection('Health_data').doc(localStorage.getItem('user')).set({
                gender: this.state.Gender,
                age: this.state.Age,
                height: this.state.Height,
                weight: this.state.Weight,
                goal: this.state.Goal,
                units: this.state.weightUnits
            }).catch((error) => {
                alert(error.message)
                console.log('failed to write', error);
            });
        } else {
            alert('Please fill in all fields so we can get you started on your fitness journey!')
        }



    }


    //gets input from fiels
    handleChangeGender(event) {

        this.setState({ Gender: event.target.value })
    };

    handleChangeGoal(event) {

        this.setState({ Goal: event.target.value })
    };

    handleChangeWeight(event) {

        this.setState({ Weight: event.target.value })
    };

    handleChangeHeight(event) {
        this.setState({ Height: event.target.value })
        console.log(this.state.Height)
    };

    handleChangeAge(event) {

        this.setState({ Age: event.target.value })

    };

    render() {
        //stores html segments
        let imperial;
        let meteric;
        let heightUnits
        let weightUnit = this.state.weightUnits
        if (this.state.imp_Units) {
            imperial = (<FormControl className='material_input'>
                <InputLabel htmlFor="age-native-simple">Height(ft)</InputLabel>
                <Select native name='Height' value={this.state.Height} onChange={this.handleChangeHeight.bind(this)}>
                    <option disabled selected hidden aria-label="None" value="" />
                    <option value="152.4">5'0</option>
                    <option value="154.95">5'1</option>
                    <option value="157.48">5'2</option>
                    <option value="160.02">5'3</option>
                    <option value="162.56">5'4</option>
                    <option value="165.1">5'5</option>
                    <option value="167.74">5'6</option>
                    <option value="170.18">5'7</option>
                    <option value="172.72">5'8</option>
                    <option value="175.26">5'9</option>
                    <option value="177.8">5'10</option>
                    <option value="180.34">5'11</option>
                    <option value="182.88">6'0</option>
                    <option value="185.45">6'1</option>
                    <option value="187.96">6'2</option>
                    <option value="190.5">6'3</option>
                    <option value="193.04">6'4</option>
                    <option value="195.58">6'5</option>
                </Select>
            </FormControl>)
            heightUnits = 'ft';
        };

        if (this.state.met_Units) {
            meteric = (<FormControl className='material_input'>
                <InputLabel htmlFor="age-native-simple">Height(Cm)</InputLabel>
                <Select native name='Height' value={this.state.Height} onChange={this.handleChangeHeight.bind(this)}>
                    <option disabled selected hidden aria-label="None" value="" />
                    <option value="150">150</option>
                    <option value="151">151</option>
                    <option value="152">152</option>
                    <option value="153">154</option>
                    <option value="154">154</option>
                    <option value="155">155</option>
                    <option value="156">156</option>
                    <option value="157">158</option>
                    <option value="158">159</option>
                    <option value="159">159</option>
                    <option value="160">160</option>
                    <option value="161">161</option>
                    <option value="162">162</option>
                    <option value="163">163</option>
                    <option value="164">164</option>
                    <option value="165">165</option>
                    <option value="166">166</option>
                    <option value="167">167</option>
                    <option value="168">168</option>
                    <option value="169">169</option>
                    <option value="170">170</option>
                    <option value="171">171</option>
                    <option value="172">172</option>
                    <option value="173">173</option>
                    <option value="174">174</option>
                    <option value="175">175</option>
                    <option value="176">176</option>
                    <option value="177">177</option>
                    <option value="178">178</option>
                    <option value="179">179</option>
                    <option value="180">180</option>
                    <option value="181">181</option>
                    <option value="182">182</option>
                    <option value="183">183</option>
                    <option value="184">184</option>
                    <option value="185">185</option>
                    <option value="186">186</option>
                    <option value="187">187</option>
                    <option value="188">188</option>
                    <option value="189">189</option>
                    <option value="190">190</option>
                    <option value="191">191</option>
                    <option value="192">192</option>
                    <option value="193">193</option>
                    <option value="194">194</option>
                    <option value="195">195</option>
                </Select>
            </FormControl>)
            heightUnits = 'Cm';
        };

        return (
            <div className='setup_main'>
                <div className='App_margin' />
                <h1>Please fill in the fields below to start your fitness journey</h1>

                <div className='material_input_spacing'>
                    <FormControl component="fieldset" className='material_input'>
                        <FormLabel component="legend">Input the units for Height/Weight:</FormLabel>
                        <RadioGroup aria-label="units">
                            <FormControlLabel value='Meteric(Kg/Cm)' onClick={this.metericClickHandler} control={<Radio />} label='Meteric(Kg/Cm)' />
                            <FormControlLabel value='Imperial(lbs/ft)' onClick={this.imperialClickHandler} control={<Radio />} label='Imperial(lbs/ft)' />
                        </RadioGroup>
                    </FormControl>
                </div>

                <div className='material_input_spacing'>
                    <FormControl className='material_input'>
                        <InputLabel htmlFor="age-native-simple">Gender</InputLabel>
                        <Select native name='Gender' value={this.state.Gender} onChange={this.handleChangeGender.bind(this)}>
                            <option disabled selected hidden aria-label="None" value="" />
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Select>
                    </FormControl>
                </div >

                <div className='material_input_spacing'>
                    <FormControl className='material_input'>
                        <InputLabel htmlFor="age-native-simple">Goal</InputLabel>
                        <Select native name='Gender' value={this.state.Goal} onChange={this.handleChangeGoal.bind(this)}>
                            <option disabled selected hidden aria-label="None" value="" />
                            <option value="Recomp">Recomp</option>
                            <option value="Lose">Lose fat</option>
                            <option value="Gain">Gain muscle</option>
                        </Select>
                    </FormControl>
                </div>

                <div className='material_input_spacing'>
                    <TextField className='material_input' value={this.state.Weight} onChange={this.handleChangeWeight.bind(this)} type='number' label={'Weight(' + weightUnit + ')'} id="standard-basic" />
                </div>

                <div className='material_input_spacing'>
                    {imperial}
                    {meteric}
                </div>

                <div className='material_input_spacing'>
                    <TextField className='material_input' value={this.state.Age} onChange={this.handleChangeAge.bind(this)} type='number' label='Age' id="standard-basic" />
                </div>

                <div className='setup_button'>
                    <Button onClick={this.calculate_bmi} size="large" color="primary" variant="contained">calculate</Button>
                </div>
            </div>
        );
    }

}