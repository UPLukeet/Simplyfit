import React from 'react';
import { database } from './firebase'
var bmr;
var bmi;
var health;
var User_goal;

function calculate_bmi() {
    //gets values of inputs from html
    let Weight = document.getElementById('bmi_weight').value;
    let Height = document.getElementById('bmi_height').value;
    let Age = document.getElementById('bmi_age').value;

    let Goal = document.getElementById('goal');
    let Goal_result = Goal.options[Goal.selectedIndex].value;

    let Gender = document.getElementById('gender');
    let Gender_result = Gender.options[Gender.selectedIndex].value;

    let Units = document.getElementById('units');
    let Units_result = Units.options[Units.selectedIndex].value;

    let Height_lbs = document.getElementById('height_lbs');
    let Height_lbs_result = Height_lbs.options[Height_lbs.selectedIndex].value;

    let Test = document.getElementById('test_print');
    //calulates the bmi and bmr of users
    if (Units_result == 'imp') {
        Weight = Weight / 2.2;
        Height = Height = Height_lbs_result;
    }

    //calculates male and female bmr
    let bmr_calc = 88.2 + (13.362 * Weight) + (4.799 * Height) - (5.677 * Age);
    let bmr_calc_female = 655.1 + (9.563 * Weight) + (1.850 * Height) - (4.676 * Age);

    //calculates bmi
    let bmi_calc = Weight / (Height / 100 * Height / 100);
    bmi = bmi_calc;

    //writes value for user goal
    User_goal = Goal_result;

    if (bmi < 18.5) {
        health = "You are considered underweight."
    }
    if (bmi > 18.5 && bmi < 25) {
        health = "You are within the healthy range."
    }
    if (bmi > 25) {
        health = "You overweight, high volumes of muscle mass will throw off this result."
    }
    if (bmi > 30) {
        health = "You are obese even with high levels of muscle mass we recommend cutting bodyfat levels."
    }

    //checks if male or female changes bmr
    if (Gender_result == 'female') {
        bmr = bmr_calc_female;
    }
    else {
        bmr = bmr_calc;
    }

    //checks users goal and changes calories acordingly
    if (Goal_result == 'lose') bmr = bmr + 300;
    if (Goal_result == 'recomp') bmr = bmr + 600;
    if (Goal_result == 'gain') bmr = bmr + 800;

    //if nothing entered show error
    if (Weight, Height, Age == 0) {
        alert("Please enter your Height, Weight and Age so we can achieve your goals!")
    }
    else {
        //writes to firestore database
        database.collection('Health_data').doc('User_data').set({
            BMI: bmi,
            BMR: bmr,
            Goal: User_goal,
            BMI_Health: health
        })
            .then(function () {
                console.log("Successfully written");
            })
            .catch(function (error) {
                console.error("Error writing", error);
            });
    }
};

function Units_Switch() {
    let Units = document.getElementById('units');
    let Units_result = Units.options[Units.selectedIndex].value;
    let Height_lbs = document.getElementById('height_lbs');
    let Height = document.getElementById('bmi_height');

    if (Units_result == "imp") {
        Height_lbs.style.display = "block";
        Height.style.display = "none"
    }
    else {
        Height_lbs.style.display = "none";
        Height.style.display = "block"
    }

}

function setup_page() {
    return (
        <div className='setup_main'>
            <select id="gender" className='setup_dropdown'>
                <option value="" disabled selected hidden>Choose a gender:</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>



            <select id="goal" className='setup_dropdown'>
                <option value="" disabled selected hidden>Choose a goal:</option>
                <option value="recomp">Recomp</option>
                <option value="lose">Lose fat</option>
                <option value="gain">Gain muscle</option>
            </select>

            <select onClick={Units_Switch} id="units" className='setup_dropdown'>
                <option value="" disabled selected hidden>Choose Kg/cm or lbs/feet:</option>
                <option value="met">Metric(kg/cm)</option>
                <option value="imp">Imperial(lbs/feet)</option>
            </select>

            <input id='bmi_weight' className='setup_input' type='number' placeholder='Weight:' />

            <select id="height_lbs" className='setup_dropdown'>
                <option value="" disabled selected hidden>Height:</option>
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
            </select>

            <input id='bmi_height' className='setup_input' type='number' placeholder='Height:' />
            <input id='bmi_age' className='setup_input' type='number' placeholder='Age:' />
            <button onClick={calculate_bmi} className='bmi_button'>calculate</button>
            <p id='test_print'></p>
        </div>
    );
}

export default setup_page;