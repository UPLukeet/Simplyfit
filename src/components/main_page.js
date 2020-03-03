import React from 'react';
import { database } from './firebase'


var bmi;
var bmr;
var goal;
var health;

const nodes = [
    { id:"bmi_Group", content:bmi, bmr, goal, health},
  ]

  const getNode = id => nodes.find(n => n.id === id);

console.log(getNode('bmi_Group'));

// starts the pull database funtion upon page load
window.addEventListener('load', (event) => {pullData()});


function pullData() {

    //divides calories for meals
    let meal_One;
    let meal_Two;
    let meal_Three;
    let snack;

    //gets html elements
    let Meal_one_print = document.getElementById('meal_one_print');
    let Meal_two_print = document.getElementById('meal_two_print');
    let Meal_three_print = document.getElementById('meal_three_print');
    let Snack_print = document.getElementById('snack_print');
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
            meal_Two = bmr * 0.3;
            meal_Three = bmr * 0.3;
            snack = bmr * 0.1;
            Meal_one_print.innerHTML = document.write = meal_One;
            Meal_two_print.innerHTML = document.write = meal_Two;
            Meal_three_print.innerHTML = document.write = meal_Three;
            Snack_print.innerHTML = document.write = snack;
            Goal_print.innerHTML = document.write = goal;
            Bmi_print.innerHTML = document.write = bmi;
            Health_print.innerHTML = document.write = health;
            console.log("Successfully pulled");
        })

};

function main_page() {
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
                <p className='food_heading'>Snack:</p>
                <p className='food_text' id='snack_print'></p>
            </div>
        </div>
    );
}

export default main_page;