import React from 'react';


    function calculate_bmi() {
        let Weight = document.getElementById('bmi_weight').value;
        let Height = document.getElementById('bmi_height').value;
        let Age = document.getElementById('bmi_age').value;
        let Test = document.getElementById('test_print');
        let bmi_calc = Weight / Height^2 * 10000;
        let bmr_calc = 88.2 + (13.362* Weight) + (4.799 * Height) - (5.677 * Age);
  
        console.log (
            bmr_calc
        );
        //if nothing entered show error
        if (Weight == 0){
            alert("Please enter your Height, Weight and Age so we can achieve your goals!")
            }
            else{
            //
            Test.innerHTML = document.write= bmi_calc + ' ' + bmr_calc;
            }

    }

function setup_page () {
    return (
    <div className='setup_main'>
     <input id= 'bmi_weight' className= 'setup_input' type='number' placeholder='Weight in kg:'/>
     <input id= 'bmi_height' className= 'setup_input' type='number' placeholder='Height in cm:'/>
     <input id= 'bmi_age' className= 'setup_input' type='number' placeholder='Age:'/>
     <button onClick={calculate_bmi} className='bmi_button'>calculate</button>
     <p id='test_print'></p>
     </div>
    );
    }

export default setup_page;