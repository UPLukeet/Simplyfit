import React, { Component } from 'react';
import { database } from './firebase'


export class main_page extends Component {



    constructor(props) {
        super(props);
        this.bmr = null;
        this.bmi = null;
        this.health = null;
        this.User_goal = null;
    }


    // starts the pull database funtion upon the rendering of this page

    componentDidMount() {
        this.pulldata_Health();
        this.pulldata_Meals();
        this.pulldata_Ingredients();
    }



    //connects to database and puts data into set variables
    pulldata_Health() {
        database.collection('Health_data')
            .doc('User_data')
            .get()
            .then(doc => {
                const data = doc.data();
                console.log(data);
            })
            .then(function () {
                //console.log(this.bmi)
            })
            .catch(function (error) {
                console.error("Error reading health", error);
            });
    }

    pulldata_Meals() {
        database.collection('Meals')
            .doc()
            .get()
            .then(doc => {
                const data = doc.data();
                console.log(data);
            })
            .then(function () {
                //console.log('pulled meal data')
            })
            .catch(function (error) {
                console.error("Error reading meals", error);
            });
    }

    pulldata_Ingredients() {
        database.collection('Ingredients')
            .doc()
            .get()
            .then(doc => {
                const data = doc.data();
                console.log(data);
            })
            .then(function () {
                //console.log('pulled ingredient data')
            })
            .catch(function (error) {
                console.error("Error reading ingredients", error);
            });
    }
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

    render() {
        return (
            <div className='main_Main'>
                <div className='meal_divs'>
                    <p className='food_heading'>Status:</p>
                    <p className='food_text' id='goal_print'></p>
                    <p className='food_text' id='bmi_print'></p>
                    <p className='food_text' id='health_print'></p>
                </div>
                <div className='meal_divs'>
                    <p className='food_heading'>Meal one:</p>
                    <p className='food_text' id='meal_one_print'></p>
                </div>
                <div className='meal_divs'>
                    <p className='food_heading'>Meal two:</p>
                    <p className='food_text' id='meal_two_print'></p>
                </div>
                <div className='meal_divs'>
                    <p className='food_heading'>Meal three:</p>
                    <p className='food_text' id='meal_three_print'></p>
                </div>
                <div className='meal_divs'>
                    <p className='food_heading'>Snacks:</p>
                    <p className='food_text' id='snack_one_print'></p>
                    <p className='food_text' id='snack_two_print'></p>
                </div>
            </div>
        );
    }
}

