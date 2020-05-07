import React, { useState, useContext, useEffect, Redirect, Component } from 'react';
import PancakeImage from '../assets/Pancakes.jpg';
import OmeletteImage from '../assets/Omelette.jpg';
import WrapImage from '../assets/Wrap.jpg';
import SpagettiImage from '../assets/Spagetti.jpg';
import { Authentication } from './firebase';

import CancelIcon from '@material-ui/icons/Cancel';
import Gainimg from '../assets/Gain.svg'
import Recompimg from '../assets/Recomp.svg'
import Loseimg from '../assets/Lose.svg'
import Underweight from '../assets/Underweight.svg'
import Normal from '../assets/Normal.svg'
import Overweight from '../assets/Overweight.svg'
import Obese from '../assets/Obese.svg'
import Extreamly from '../assets/ExtObese.svg'

function Main_page(props) {

    const [loading, setLoading] = useState(true)
    const [healthData, healthDataSet] = useState(null)
    const [BMI, BMIset] = useState(null)
    const [BMR, BMRset] = useState(null)
    const [Cals, Cals_set] = useState(null)
    const [mealOneCals, mealOneCals_set] = useState(null)
    const [mealTwoCals, mealTwoCals_set] = useState(null)
    const [mealThreeCals, mealThreeCals_set] = useState(null)
    const [mealFourCals, mealFourCals_set] = useState(null)

    const [mealOne_box, mealOne_boxSet] = useState(false);
    const [mealTwo_box, mealTwo_boxSet] = useState(false);
    const [mealThree_box, mealThree_boxSet] = useState(false);
    const [mealFour_box, mealFour_boxSet] = useState(false);

    const [scroll, scrollSet] = useState(false);


    //ingredients


    // pulls user data from firebase
    useEffect(() => {

        const user = Authentication.auth().currentUser;
        {
            user !== null &&
                Authentication.firestore().collection('Health_data')
                    .doc(user.uid)
                    .get()
                    .then(doc => {
                        healthDataSet(doc.data())
                        setLoading(false)
                    }).catch(function (error) {
                        console.error("Error reading health", error);
                    });
        }
        return () => {
            document.body.style.overflow = 'unset';
        }

    }, []);

    //calculates calorie requirments
    useEffect(() => {
        if (!loading && healthData !== null) {


            if (healthData.units === 'Kg') {
                BMIset(Math.round((healthData.weight / ((healthData.height / 100) * (healthData.height / 100))) * 10) / 10)

                if (healthData.goal === 'Lose') {

                    if (healthData.gender === 'female') {
                        BMRset(Math.round(((655.1 + (9.563 * healthData.weight) + (1.850 * healthData.height) - (4.676 * healthData.age)) * 1.37) * 0.8))
                    } else {
                        BMRset(Math.round(((88.2 + (13.362 * healthData.weight) + (4.799 * healthData.height) - (5.677 * healthData.age)) * 1.37) * 0.8))
                    }

                }

                if (healthData.goal === 'Gain') {

                    if (healthData.gender === 'female') {
                        BMRset(Math.round(((655.1 + (9.563 * healthData.weight) + (1.850 * healthData.height) - (4.676 * healthData.age)) * 1.37) * 1.2))
                    } else {
                        BMRset(Math.round(((88.2 + (13.362 * healthData.weight) + (4.799 * healthData.height) - (5.677 * healthData.age)) * 1.37) * 1.2))
                    }

                }

                if (healthData.goal === 'Recomp') {
                    if (healthData.gender === 'female') {
                        BMRset(Math.round((655.1 + (9.563 * healthData.weight) + (1.850 * healthData.height) - (4.676 * healthData.age)) * 1.37))
                    } else {
                        BMRset(Math.round((88.2 + (13.362 * healthData.weight) + (4.799 * healthData.height) - (5.677 * healthData.age)) * 1.37))
                    }

                }
            } else{

                BMIset(Math.round(((healthData.weight/2.2) / ((healthData.height / 100) * (healthData.height / 100))) * 10) / 10)

                if (healthData.goal === 'Lose') {
    
                    if (healthData.gender === 'female') {
                        BMRset(Math.round(((655.1 + (9.563 * (healthData.weight/2.2)) + (1.850 * healthData.height) - (4.676 * healthData.age)) * 1.37) * 0.8))
                    } else {
                        BMRset(Math.round(((88.2 + (13.362 * (healthData.weight/2.2)) + (4.799 * healthData.height) - (5.677 * healthData.age)) * 1.37) * 0.8))
                    }
    
                }
    
                if (healthData.goal === 'Gain') {
    
                    if (healthData.gender === 'female') {
                        BMRset(Math.round(((655.1 + (9.563 * (healthData.weight/2.2)) + (1.850 * healthData.height) - (4.676 * healthData.age)) * 1.37) * 1.2))
                    } else {
                        BMRset(Math.round(((88.2 + (13.362 * (healthData.weight/2.2)) + (4.799 * healthData.height) - (5.677 * healthData.age)) * 1.37) * 1.2))
                    }
    
                }
    
                if (healthData.goal === 'Recomp') {
                    if (healthData.gender === 'female') {
                        BMRset(Math.round((655.1 + (9.563 * (healthData.weight/2.2)) + (1.850 * healthData.height) - (4.676 * healthData.age)) * 1.37))
                    } else {
                        BMRset(Math.round((88.2 + (13.362 * (healthData.weight/2.2)) + (4.799 * healthData.height) - (5.677 * healthData.age)) * 1.37))
                    }
    
                }
            }

        }

    }, [loading, healthData]);

    //calculates cals for each meal
    useEffect(() => {
        if (BMR !== null) {
            mealOneCals_set(BMR * 0.25)
            mealTwoCals_set(BMR * 0.25)
            mealThreeCals_set(BMR * 0.25)
            mealFourCals_set(BMR * 0.25)
        }
    }, [BMR]);


    if (scroll) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }


    // console.log(healthData)

    //handles clicks for meal one
    const mealOneClickHandler = (event) => {
        mealOne_boxSet(!mealOne_box);
        scrollSet(!scroll)
    };

    const mealOne_boxClickHandler = (event) => {
        mealOne_boxSet(!mealOne_box);
        scrollSet(!scroll)
    };

    //handles clicks for meal two
    const mealTwoClickHandler = (event) => {
        mealTwo_boxSet(!mealTwo_box);
        scrollSet(!scroll)
    };

    const mealTwo_boxClickHandler = (event) => {
        mealTwo_boxSet(!mealTwo_box);
        scrollSet(!scroll)
    };

    //handles clicks for meal three
    const mealThreeClickHandler = (event) => {
        mealThree_boxSet(!mealThree_box);
        scrollSet(!scroll)
    };

    const mealThree_boxClickHandler = (event) => {
        mealThree_boxSet(!mealThree_box);
        scrollSet(!scroll)
    };

    //handles clicks for meal Four
    const mealFourClickHandler = (event) => {
        mealFour_boxSet(!mealFour_box);
        scrollSet(!scroll)
    };

    const mealFour_boxClickHandler = (event) => {
        mealFour_boxSet(!mealFour_box);
        scrollSet(!scroll)
    };



    /*<p className='food_text'>age: {healthData.age}</p>
    <p className='food_text'>gender: {healthData.gender}</p>
    <p className='food_text'>goal: {healthData.goal}</p>
    <p className='food_text'>height: {healthData.height}</p>
    <p className='food_text'>weight: {healthData.weight}</p>*/

    //gets users data and renders it to <p> items


    return loading === false && (
        <div className='main_Main'>
            <div className='App_margin' />

            {healthData.goal === '' && props.history.push('/setup_page')}

            <div className='statusbar'>
                <div className='Goaldiv'>
                    <p>Goal: {healthData.goal}</p>
                    {healthData.goal === 'Gain' && <img alt='' src={Gainimg} />}

                    {healthData.goal === 'Recomp' && <img alt='' src={Recompimg} />}

                    {healthData.goal === 'Lose' && <img alt='' src={Loseimg} />}

                </div>

                <div className='testDiv'>
                    <p>BMI: {BMI}</p>

                    {BMI < 18.5 && [<p>Underweight</p>, <img alt='' src={Underweight} />]}

                    {BMI > 18.5 && BMI < 25 && [<p>Normal</p>, <img alt='' src={Normal} />]}

                    {BMI > 25 && BMI < 30 && [<p>Overweight</p>, <img alt='' src={Overweight} />]}

                    {BMI > 30 && BMI < 35 && [<p>Obese</p>, <img alt='' src={Obese} />]}

                    {BMI > 35 && [<p>Extreamly Obese</p>, <img alt='' src={Extreamly} />]}
                </div>

                <div className='testDiv1'>

                </div>

                <div className='testDiv2'>
                    <p>weight: {healthData.weight}{healthData.units}</p>
                </div>
            </div>

            <div className='main_divider' />

            {mealOne_box && (
                <div className='meal_popup'>
                    <div className='meal_popupElement'>
                        <CancelIcon onClick={mealOne_boxClickHandler} />
                        <img alt='' src={PancakeImage} />
                        <div className='text_scroll'>
                            <h2>Ingredients:</h2>
                            <p>{Math.round((mealOneCals * 0.45) / 3.64)}g of flour, 1.5 teaspoons of baking powder, {Math.round((mealOneCals * 0.2) / 3.68)}g of cocoa powder, water, calorie free sweetener,  {Math.round((mealOneCals * 0.05) / 0.67)}g of mixed berries  and {Math.round(((mealOneCals * 0.3) / 1.55) / 44)} medium eggs.</p>
                            <p>High protien and low calorie dense option: use  {Math.round((mealOneCals * 0.55) / 3.64)}g of flour and {Math.round((mealOneCals * 0.2) / 0.45)}ml of egg white instead(this is less calorie dense so you get more food for the same amount of calories along with it being much higher in protien).</p>
                            <h2>Method:</h2>
                            <p>Combine the flour, egg, baking powder, cocoa together in a bowl to make a thick batter(add sweetener to taste). Then add as much water required to give the batter a pourable consistency. Pre heat a good nonstick pan on medium heat with no oil, once up to heat pour in your batter and flip once ready. Once all pancakes are made serve with fruit ontop.</p>
                        </div>
                    </div>
                    <div onClick={mealOne_boxClickHandler} className='meal_popupBackground' />
                </div>
            )}

            {mealTwo_box && (
                <div className='meal_popup'>
                    <div className='meal_popupElement'>
                        <CancelIcon onClick={mealTwo_boxClickHandler} />
                        <img alt='' src={OmeletteImage} />
                        <div className='text_scroll'>
                            <h2>Ingredients:</h2>
                            <p>{Math.round(((mealTwoCals * 0.4) / 1.55) / 44)} medium eggs, {Math.round((mealTwoCals * 0.2) / 1.45)}g of ham, {Math.round((mealTwoCals * 0.25) / 1.1)}g of vegtables/greens(peppers, mushrooms, onions and spinache etc...) and {Math.round((mealTwoCals * 0.15) / 2.61)}g of low fat mozzarella.</p>
                            <h2>Method:</h2>
                            <p>Beat the eggs together in a bowl with salt, pepper, cumin and garlic powder untill all ingredients are combined. Then mix in the vegtables, ham and mozzarella. before pouring into a preheated nonstick pan with no oil on medium heat.</p>
                        </div>
                    </div>
                    <div onClick={mealTwo_boxClickHandler} className='meal_popupBackground' />
                </div>
            )}

            {mealThree_box && (
                <div className='meal_popup'>
                    <div className='meal_popupElement'>
                        <CancelIcon onClick={mealThree_boxClickHandler} />
                        <img alt='' src={WrapImage} />
                        <div className='text_scroll'>
                            <h2>Ingredients:</h2>
                            <p>{Math.round(((mealThreeCals * 0.5) / 1.85) / 64)} wraps, {Math.round((mealThreeCals * 0.3) / 1.65)}g precooked chicken breast, {Math.round((mealThreeCals * 0.25) / 1.1)}g of vegtables and greens(peppers, mushrooms, onions, lettuce and spinache etc...) and a drizzle of franks red hot sauce.</p>
                            <h2>Method:</h2>
                            <p>Fill the wraps with a base layer lettuce and vegtables. Then place the chicken breast ontop and drizzle with franks red hot sauce and pepper before assembling the wrap.</p>
                        </div>
                    </div>
                    <div onClick={mealThree_boxClickHandler} className='meal_popupBackground' />
                </div>
            )}

            {mealFour_box && (
                <div className='meal_popup'>
                    <div className='meal_popupElement'>
                        <CancelIcon onClick={mealFour_boxClickHandler} />
                        <img alt='' src={SpagettiImage} />
                        <div className='text_scroll'>
                            <h2>Ingredients:</h2>
                            <p> {Math.round((mealFourCals * 0.45) / 3.55)}g of dry weight pasta, {Math.round((mealFourCals * 0.15) / 0.32)}ml of passata, 1 stock cube, mixed herbs, {Math.round((mealFourCals * 0.3) / 1.37)}g of 5% fat lean mince meat and {Math.round((mealFourCals * 0.2) / 1.1)}g of vegtables and greens(peppers, mushrooms, onions and spinache etc...).</p>
                            <h2>Method:</h2>
                            <p>Cook the pasta in pan full of boiling water till cooked through. Add mince meat to non stick pan with no oil on a high-medium heat, once the mince is almost cooked through add the vegtables of your choice (onion, garlic, peppers and mushrooms are recomended). Once the vegtable are cooked add the passata, stock cube, salt, pepper and mixed herbs. Add the pasta to the sauce and serve.</p>
                        </div>
                    </div>
                    <div onClick={mealFour_boxClickHandler} className='meal_popupBackground' />
                </div>
            )}


            <div onClick={mealOneClickHandler} className='meal_container'>
                <img alt='' src={PancakeImage} />
                <p>Meal one: Protien Pancakes</p>
            </div>

            <div onClick={mealTwoClickHandler} className='meal_container'>
                <img alt='' src={OmeletteImage} />
                <p>Meal two: Ham and cheese Omelet</p>
            </div>

            <div onClick={mealThreeClickHandler} className='meal_container'>
                <img alt='' src={WrapImage} />
                <p>Meal three: Spicy chicken wrap</p>
            </div>

            <div onClick={mealFourClickHandler} className='meal_container'>
                <img alt='' src={SpagettiImage} />
                <p>Meal Four: Spagetti Bolognase</p>
            </div>

        </div>
    );
}

export default Main_page