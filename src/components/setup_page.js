import React, { useState, useEffect } from 'react';
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
import CancelIcon from '@material-ui/icons/Cancel';
import HelpIcon from '@material-ui/icons/Help';

function Setup_page(props) {


    const [imp_Units, imp_UnitsSet] = useState(false);
    const [met_Units, met_UnitsSet] = useState(true);
    const [Gender, GenderSet] = useState('')
    const [Goal, GoalSet] = useState('')
    const [Weight, WeightSet] = useState('')
    const [Height, HeightSet] = useState('')
    const [Age, AgeSet] = useState('')
    const [weightUnits, weightUnitsSet] = useState('')
    const [Goal_box, Goal_boxSet] = useState(false);
    const [scroll, scrollSet] = useState(false);


    useEffect(() => {

        return () => {
            document.body.style.overflow = 'unset';
        }

    }, []);

    //handles switch funtion of unit switching
    const metericClickHandler = () => {
        imp_UnitsSet(false);
        met_UnitsSet(true);
        console.log('Met Clicked')
        weightUnitsSet('Kg');
    };

    //checks what units are picked and renders out different items depeding on state
    const imperialClickHandler = () => {
        imp_UnitsSet(true);
        met_UnitsSet(false);
        console.log('Imp Clicked')
        weightUnitsSet('lbs');
    };

    if (scroll) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }

    //writes users information to database if all input fields are filled and if not alerts user
    const calculate_bmi = () => {

        if (Gender !== '' && Age !== '' && Height !== '' && Weight !== '' && Goal !== '' && weightUnits !== '') {
            database.collection('Health_data').doc(localStorage.getItem('user')).set({
                gender: Gender,
                age: Age,
                height: Height,
                weight: Weight,
                goal: Goal,
                units: weightUnits
            }).catch((error) => {
                alert(error.message)
                console.log('failed to write', error);
            });
            props.history.push('/')
        } else {
            alert('Please fill in all fields so we can get you started on your fitness journey!')
        }

    }


    const GoalClickHandler = (event) => {
        Goal_boxSet(!Goal_box);
        scrollSet(!scroll)
    };


    //gets input from fiels
    const handleChangeGender = (event) => {

        GenderSet(event.target.value)
    };

    const handleChangeGoal = (event) => {

        GoalSet(event.target.value)
    };

    const handleChangeWeight = (event) => {

        WeightSet(event.target.value)
    };

    const handleChangeHeight = (event) => {
        HeightSet(event.target.value)
    };

    const handleChangeAge = (event) => {

        AgeSet(event.target.value)

    };


    return (
        <div className='setup_main'>
            <div className='App_margin' />
            <h1>Please fill in the fields below to start your fitness journey</h1>

            <div className='material_input_spacing'>
                <FormControl component="fieldset" className='material_input'>
                    <FormLabel component="legend">Input the units for Height/Weight:</FormLabel>
                    <RadioGroup aria-label="units">
                        <FormControlLabel value='Metric(Kg/Cm)' onClick={metericClickHandler} control={<Radio />} label='Metric(Kg/Cm)' />
                        <FormControlLabel value='Imperial(lbs/ft)' onClick={imperialClickHandler} control={<Radio />} label='Imperial(lbs/ft)' />
                    </RadioGroup>
                </FormControl>
            </div>

            <div className='material_input_spacing'>
                <FormControl className='material_input'>
                    <InputLabel htmlFor="age-native-simple">Gender</InputLabel>
                    <Select native name='Gender' value={Gender} onChange={handleChangeGender.bind(this)}>
                        <option disabled selected hidden aria-label="None" value="" />
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Select>
                </FormControl>
            </div >

            <div className='material_goal_input_spacing'>
                <FormControl className='material_input'>
                    <InputLabel htmlFor="age-native-simple">Goal</InputLabel>
                    <Select native name='Gender' value={Goal} onChange={handleChangeGoal.bind(this)}>
                        <option disabled selected hidden aria-label="None" value="" />
                        <option value="Recomp">Recomp</option>
                        <option value="Lose">Lose fat</option>
                        <option value="Gain">Gain muscle</option>
                    </Select>
                </FormControl>
               <HelpIcon id='helpicon' onClick={GoalClickHandler}/>
            </div>

            <div className='material_input_spacing'>
                <TextField className='material_input' value={Weight} onChange={handleChangeWeight.bind(this)} type='number' label={'Weight(' + weightUnits + ')'} id="standard-basic" />
            </div>


                <div className={Goal_box ? 'meal_popup': 'meal_popup hidden'}>
                    <div className='status_popupElement'>
                        <CancelIcon onClick={GoalClickHandler} />
                        <div className='Goal_colour'>
                            <h1>Goals</h1>
                        </div>
                        <div className='text_scroll'>
                            <h2>Gain:</h2>
                            <p>Gain as much muscle mass as possible, eating in a calorie surplus and likely gaining fat as well.</p>
                            <h2>Recomp</h2>
                            <p>Staying at the same body weight while losing fast and gaining muscle mass.</p>
                            <h2>Lose</h2>
                            <p>losing body fat to get significantly leaner, while trying to maintain as much lean tissue as possible.</p>
                        </div>
                    </div>
                    <div onClick={GoalClickHandler} className='meal_popupBackground' />
                </div>



            <div className='material_input_spacing'>

                {imp_Units && (<FormControl className='material_input'>
                    <InputLabel htmlFor="age-native-simple">Height(ft)</InputLabel>
                    <Select native name='Height' value={Height} onChange={handleChangeHeight.bind(this)}>
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
                </FormControl>
                )}

                {met_Units && (<FormControl className='material_input'>
                    <InputLabel htmlFor="age-native-simple">Height(Cm)</InputLabel>
                    <Select native name='Height' value={Height} onChange={handleChangeHeight.bind(this)}>
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
                </FormControl>
                )}

            </div>

            <div className='material_input_spacing'>
                <TextField className='material_input' value={Age} onChange={handleChangeAge.bind(this)} type='number' label='Age' id="standard-basic" />
            </div>

            <div className='setup_button'>
                <Button onClick={calculate_bmi} size="large" color="primary" variant="contained">calculate</Button>
            </div>
        </div>
    );
}

export default Setup_page