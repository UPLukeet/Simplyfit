import React from 'react';


    function calculate_bmi() {
        let Weight = document.getElementsByClassName('bmi_weight').value;
        let Height = document.getElementsByClassName('bmi_height').value;
        let Age = document.getElementsByClassName('bmi_age').value;
        let Test = document.getElementsByClassName('test_print');
        let bmi_calc = Weight / Height / Height * 10000;
        let bmr_calc = 88.2 + (13.362 + Weight) + (4.799 + Height) - (5.677 + Age);

        //if nothing entered show error
        if (Weight, Height, Age == ""){
            alert("Please enter your Height, Weight and Age so we can achieve your goals!")
            }
            else{
            //
            Test.innerHTML = document.write= bmi_calc + bmr_calc;
            }

    }

function setup_page () {
    return (
    <div className='setup_main'>
     <input className= 'setup_input' type='number' placeholder='Weight in kg:'/>
     <input className= 'setup_input' type='number' placeholder='Height in cm:'/>
     <input className= 'setup_input' type='number' placeholder='Age:'/>
     <button onClick={calculate_bmi} className='bmi_button'>calculate</button>
     <p className='test_print'></p>
     </div>
    );
    }

export default setup_page;