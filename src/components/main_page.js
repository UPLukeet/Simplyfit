import React from 'react';
import { database } from './firebase'


var bmi;
var bmr;
var goal;
var health;
function main_page() {

    let print = document.getElementById('printer');


    database.collection('Health_data')
        .doc('User_data')
        .get()
        .then(doc => {
            const data = doc.data();
            bmi = data.BMI;
            bmr = data.BMR;
            goal = data.Goal;
            health = data.BMI_Health;
            console.log(data);
            console.log(bmi, bmr, goal, health);
        })
    return (
        <div>
            <p id='printer'></p>
        </div>
    );
}

export default main_page;