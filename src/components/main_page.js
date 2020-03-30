import React, { Component, useContext } from 'react';
import PancakeImage from '../assets/Pancakes.jpg';
import OmeletteImage from '../assets/Omelette.jpg';
import WrapImage from '../assets/Wrap.jpg';
import SpagettiImage from '../assets/Spagetti.jpg';
import { GlobalContext } from '../context/GlobalState';


import CancelIcon from '@material-ui/icons/Cancel';
import Gainimg from '../assets/Gain.svg'
import Recompimg from '../assets/Recomp.svg'
import Loseimg from '../assets/Lose.svg'

export class Main_page extends Component {


    constructor(props) {
        super(props);
        this.state = {
            healthData: (JSON.parse(localStorage.getItem('user_data')))
        }
    }

    state = {
        mealOne_box: false,
        mealTwo_box: false,
        mealThree_box: false,
        mealFour_box: false,
        gainImage: false,
        recompImage: false,
        loseImage: false
    }

    componentDidMount() {
        this.GoalChecker();
        console.log(this.state.healthData);
    }

    GoalChecker() {
        if (this.state.healthData !== null) {

            if (this.state.healthData.goal === 'Gain') {
                this.setState({ gainImage: true });
                this.setState({ recompImage: false });
                this.setState({ loseImage: false });
            }

            if (this.state.healthData.goal === 'Recomp') {
                this.setState({ gainImage: false });
                this.setState({ recompImage: true });
                this.setState({ loseImage: false });
            }

            if (this.state.healthData.goal === 'Lose') {
                this.setState({ gainImage: false });
                this.setState({ recompImage: false });
                this.setState({ loseImage: true });
            }
        }
    };

    //handles clicks for meal one
    mealOneClickHandler = (event) => {
        this.setState({ mealOne_box: true });
    };

    mealOne_boxClickHandler = (event) => {
        this.setState({ mealOne_box: false });
    };

    //handles clicks for meal two
    mealTwoClickHandler = (event) => {
        this.setState({ mealTwo_box: true });
    };

    mealTwo_boxClickHandler = (event) => {
        this.setState({ mealTwo_box: false });
    };

    //handles clicks for meal three
    mealThreeClickHandler = (event) => {
        this.setState({ mealThree_box: true });
    };

    mealThree_boxClickHandler = (event) => {
        this.setState({ mealThree_box: false });
    };

    //handles clicks for meal Four
    mealFourClickHandler = (event) => {
        this.setState({ mealFour_box: true });
    };

    mealFour_boxClickHandler = (event) => {
        this.setState({ mealFour_box: false });
    };

    render() {


        //setting meal more information on click
        let mealOne;
        let mealTwo;
        let mealThree;
        let mealFour;

        if (this.state.mealOne_box) {
            mealOne = (
                <div className='meal_popup'>
                    <div className='meal_popupElement'>
                        <CancelIcon onClick={this.mealOne_boxClickHandler} />
                        <img src={PancakeImage} />
                        <p>testing1</p>
                    </div>
                    <div onClick={this.mealOne_boxClickHandler} className='meal_popupBackground' />
                </div>
            )
        };

        if (this.state.mealTwo_box) {
            mealTwo = (
                <div className='meal_popup'>
                    <div className='meal_popupElement'>
                        <CancelIcon onClick={this.mealTwo_boxClickHandler} />
                        <img src={OmeletteImage} />
                        <p>testing2</p>
                    </div>
                    <div onClick={this.mealTwo_boxClickHandler} className='meal_popupBackground' />
                </div>
            )
        };

        if (this.state.mealThree_box) {
            mealThree = (
                <div className='meal_popup'>
                    <div className='meal_popupElement'>
                        <CancelIcon onClick={this.mealThree_boxClickHandler} />
                        <img src={WrapImage} />
                        <p>testing3</p>
                    </div>
                    <div onClick={this.mealThree_boxClickHandler} className='meal_popupBackground' />
                </div>
            )
        };

        if (this.state.mealFour_box) {
            mealFour = (
                <div className='meal_popup'>
                    <div className='meal_popupElement'>
                        <CancelIcon onClick={this.mealFour_boxClickHandler} />
                        <img src={SpagettiImage} />
                        <p>testing4</p>
                    </div>
                    <div onClick={this.mealFour_boxClickHandler} className='meal_popupBackground' />
                </div>
            )
        };


        /*<p className='food_text'>age: {healthData.age}</p>
        <p className='food_text'>gender: {healthData.gender}</p>
        <p className='food_text'>goal: {healthData.goal}</p>
        <p className='food_text'>height: {healthData.height}</p>
        <p className='food_text'>weight: {healthData.weight}</p>*/

        //gets users data and renders it to <p> items
        const healthData = this.state.healthData;
        let weight

        if (healthData !== null) {
            if (healthData.units === 'lbs') {
                weight = Math.floor(healthData.weight / 2.2)
            } else {
                weight = healthData.weight
            }
        }

        return healthData == null ? "" : (
            <div className='main_Main'>
                <div className='App_margin' />


                <div className='statusbar'>
                    <div className='Goaldiv'>
                        <p>Goal: {healthData.goal}</p>
                        {this.state.gainImage ? <img src={Gainimg} /> : null}

                        {this.state.recompImage ? <img src={Recompimg} /> : null}

                        {this.state.loseImage ? <img src={Loseimg} /> : null}

                    </div>

                    <div className='testDiv'><p>Age: {healthData.age}</p></div>

                    <div className='testDiv1'><p>Gender: {healthData.gender}</p></div>

                    <div className='testDiv2'><p>weight: {weight}Kg</p></div>
                </div>

                {mealOne}
                {mealTwo}
                {mealThree}
                {mealFour}

                <div onClick={this.mealOneClickHandler} className='meal_container'>
                    <img src={PancakeImage} />
                    <p>Meal one: Pancakes</p>
                </div>

                <div onClick={this.mealTwoClickHandler} className='meal_container'>
                    <img src={OmeletteImage} />
                    <p>Meal two: Omelet</p>
                </div>

                <div onClick={this.mealThreeClickHandler} className='meal_container'>
                    <img src={WrapImage} />
                    <p>Meal three: chicken wrap</p>
                </div>

                <div onClick={this.mealFourClickHandler} className='meal_container'>
                    <img src={SpagettiImage} />
                    <p>Meal Four: Spagetti Bolognase</p>
                </div>

            </div>
        );
    }
}

