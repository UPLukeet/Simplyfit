import React, { Component } from 'react';
import TestImage from '../assets/Pancakes.jpg';
import CancelIcon from '@material-ui/icons/Cancel';
import Gainimg from '../assets/Gain.svg'
import Recompimg from '../assets/Recomp.svg'
import Loseimg from '../assets/Lose.svg'

export class Main_page extends Component {



    /*pullData() {

        //divides calories for meals
        let meal_One;
        let meal_Two;
        let meal_Three;
        let snack;

        //gets html elements
        let Meal_one_print = document.getElementById('meal_one_print');
        let Meal_two_print = document.getElementById('meal_two_print');
        let Meal_three_print = document.getElementById('meal_three_print');
        let Snack_one_print = document.getElementById('snack_one_print');
        let Snack_two_print = document.getElementById('snack_two_print');
        let Goal_print = document.getElementById('goal_print');
        let Bmi_print = document.getElementById('bmi_print');
        let Health_print = document.getElementById('health_print');


        //connects to database and puts data into set variables
        database.collection('Health_data')
            .doc('User_data')
            .get()
            .then(doc => {
                const data = doc.data();
                bmi = data.BMI;
                bmr = data.BMR;
                goal = data.Goal;
                health = data.BMI_Health;
            })
            .then(function () {
                meal_One = bmr * 0.3;
                meal_Two = bmr * 0.25;
                meal_Three = bmr * 0.3;
                snack = bmr * 0.15;
                //meal one ingredients
                let flour = (meal_One * 0.4) / 3.64;
                let mixed_berries = (meal_One * 0.1) / 0.67;
                let milk = (meal_One * 0.2) / 0.47;
                let eggs = ((meal_One * 0.4) / 1.55) / 44;
                //meal two ingredients
                let eggs_two = ((meal_Two * 0.5) / 1.55) / 44;
                let ham = (meal_Two * 0.2) / 1.1;
                let mushrooms = (meal_Two * 0.1) / 0.22;
                let peppers = (meal_Two * 0.1) / 0.28;
                let peas = (meal_Two * 0.2) / 0.81;

                //meal three ingredients
                let pasta = (meal_Three * 0.35) / 3.55;
                let passata = (meal_Three * 0.15) / 0.32;
                let mushrooms_two = (meal_Three * 0.1) / 0.22;
                let peppers_two = (meal_Three * 0.1) / 0.28;
                let mince_meat = (meal_Three * 0.3) / 1.37;
                //snack
                let popcorn = (snack * 0.9) / 3.75;
                let jelly = (snack * 0.1) / 0.06;


                Meal_one_print.innerHTML = document.write = 'Pan cakes recipe:  ' + ' flour:' + Math.floor(flour) + 'g  ' + ' Mixed berries:' + Math.floor(mixed_berries) + 'g  ' + ' Milk:' + Math.floor(milk) + 'ml  ' + 'Medium Eggs:' + Math.floor(eggs);
                Meal_two_print.innerHTML = document.write = 'Omelet:  ' + ' Medium Eggs:' + Math.floor(eggs_two) + ' Ham:' + Math.floor(ham) + 'g  ' + ' Mushroom:' + Math.floor(mushrooms) + 'g  ' + ' Peppers:' + Math.floor(peppers) + 'g ' + ' Peas' + Math.floor(peas) + 'g';
                Meal_three_print.innerHTML = document.write = 'Bolognase:  ' + ' Pasta:' + Math.floor(pasta) + 'g' + ' Passata:' + Math.floor(passata) + 'g  ' + ' Mushroom:' + Math.floor(mushrooms_two) + 'g  ' + ' Peppers:' + Math.floor(peppers_two) + 'g ' + ' 5% fat beef mince' + Math.floor(mince_meat) + 'g';
                Snack_one_print.innerHTML = document.write = 'Popcorn kernals popped in microwave: ' + Math.floor(popcorn) + 'g';
                Snack_two_print.innerHTML = document.write = 'Sugar free jelly: ' + Math.floor(jelly) + 'g';
                Goal_print.innerHTML = document.write = goal;
                Bmi_print.innerHTML = document.write = Math.floor(bmi);
                Health_print.innerHTML = document.write = health;
                console.log("Successfully pulled");
            })

    };*/
    constructor(props) {
        super(props);
        this.state = {
            healthData: null
        }
    }

    state = {
        mealOne_box: false,
        mealTwo_box: false,
        mealThree_box: false,
        mealFour_box: false
    }

    componentDidMount() {
        this.setState({ healthData: JSON.parse(localStorage.getItem('user_data')) })
    }

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
                        <img src={TestImage} />
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
                        <img src={TestImage} />
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
                        <img src={TestImage} />
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
                        <img src={TestImage} />
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
        console.log(healthData);
        return healthData == null ? "" : (
            <div className='main_Main'>
                <div className='App_margin' />

                
                <div className='statusbar'>
                <div className='Goaldiv'><img src={Gainimg}/></div>
                </div>

                {mealOne}
                {mealTwo}
                {mealThree}
                {mealFour}

                <div onClick={this.mealOneClickHandler} className='meal_container'>
                    <img src={TestImage} />
                    <p>Test1</p>
                </div>

                <div onClick={this.mealTwoClickHandler} className='meal_container'>
                    <img src={TestImage} />
                    <p>Test2</p>
                </div>

                <div onClick={this.mealThreeClickHandler} className='meal_container'>
                    <img src={TestImage} />
                    <p>Test3</p>
                </div>

                <div onClick={this.mealFourClickHandler} className='meal_container'>
                    <img src={TestImage} />
                    <p>Test4</p>
                </div>

            </div>
        );
    }
}

