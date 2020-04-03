import React, { useState, useContext, useEffect, Redirect } from 'react';
import PancakeImage from '../assets/Pancakes.jpg';
import OmeletteImage from '../assets/Omelette.jpg';
import WrapImage from '../assets/Wrap.jpg';
import SpagettiImage from '../assets/Spagetti.jpg';
import { Authentication } from './firebase';

import CancelIcon from '@material-ui/icons/Cancel';
import Gainimg from '../assets/Gain.svg'
import Recompimg from '../assets/Recomp.svg'
import Loseimg from '../assets/Lose.svg'



function Main_page(props) {

    const [loading, setLoading] = useState(true)
    const [healthData, healthDataSet] = useState(null)
    const [BMI, BMIset] = useState(null)
    const [BMR, BMRset] = useState(null)

    const [mealOne_box, mealOne_boxSet] = useState(false);
    const [mealTwo_box, mealTwo_boxSet] = useState(false);
    const [mealThree_box, mealThree_boxSet] = useState(false);
    const [mealFour_box, mealFour_boxSet] = useState(false);





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

    }, []);





    // console.log(healthData)

    //handles clicks for meal one
    const mealOneClickHandler = (event) => {
        mealOne_boxSet(!mealOne_box);
    };

    const mealOne_boxClickHandler = (event) => {
        mealOne_boxSet(!mealOne_box);
    };

    //handles clicks for meal two
    const mealTwoClickHandler = (event) => {
        mealTwo_boxSet(!mealTwo_box);
    };

    const mealTwo_boxClickHandler = (event) => {
        mealTwo_boxSet(!mealTwo_box);
    };

    //handles clicks for meal three
    const mealThreeClickHandler = (event) => {
        mealThree_boxSet(!mealThree_box);
    };

    const mealThree_boxClickHandler = (event) => {
        mealThree_boxSet(!mealThree_box);
    };

    //handles clicks for meal Four
    const mealFourClickHandler = (event) => {
        mealFour_boxSet(!mealFour_box);
    };

    const mealFour_boxClickHandler = (event) => {
        mealFour_boxSet(!mealFour_box);
    };



    /*<p className='food_text'>age: {healthData.age}</p>
    <p className='food_text'>gender: {healthData.gender}</p>
    <p className='food_text'>goal: {healthData.goal}</p>
    <p className='food_text'>height: {healthData.height}</p>
    <p className='food_text'>weight: {healthData.weight}</p>*/

    //gets users data and renders it to <p> items


    return healthData !== null && (
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

                <div className='testDiv'><p>Age: {healthData.age}</p></div>

                <div className='testDiv1'><p>BMI: {BMR}</p></div>

                <div className='testDiv2'><p>weight: {healthData.units === 'lbs' ? Math.round(healthData.weight / 2.2) : healthData.weight}Kg</p></div>
            </div>

            <div className='main_divider' />

            {mealOne_box && (
                <div className='meal_popup'>
                    <div className='meal_popupElement'>
                        <CancelIcon onClick={mealOne_boxClickHandler} />
                        <img alt='' src={PancakeImage} />
                        <div className='text_scroll'>
                            <p>Put 100g plain flour, 2 large eggs, 300ml milk, 1 tbsp sunflower or vegetable oil and a pinch of salt into a bowl or large jug, then whisk to a smooth batter.

                            Set aside for 30 mins to rest if you have time, or start cooking straight away.

                            Set a medium frying pan or crêpe pan over a medium heat and carefully wipe it with some oiled kitchen paper.

                            When hot, cook your pancakes for 1 min on each side until golden, keeping them warm in a low oven as you go.

Serve with lemon wedges and caster sugar, or your favourite filling. Once cold, you can layer the pancakes between baking parchment, then wrap in cling film and freeze for up to 2 months.</p>
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
                            <p>Season the beaten eggs well with salt and pepper. Heat the oil and butter in a non-stick frying pan over a medium-low heat until the butter has melted and is foaming.

                            Pour the eggs into the pan, tilt the pan ever so slightly from one side to another to allow the eggs to swirl and cover the surface of the pan completely. Let the mixture cook for about 20 seconds then scrape a line through the middle with a spatula.

                            Tilt the pan again to allow it to fill back up with the runny egg. Repeat once or twice more until the egg has just set.

At this point you can fill the omelette with whatever you like – some grated cheese, sliced ham, fresh herbs, sautéed mushrooms or smoked salmon all work well. Scatter the filling over the top of the omelette and fold gently in half with the spatula. Slide onto a plate to serve.</p>
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
                            <p>Heat the oil in a large frying pan over a medium heat. Add the chicken, brown on all sides, then remove. Add the onion, garlic, ginger and a pinch of salt. Cook for 5 mins or until softened.

                            Increase the heat to high. Return the chicken to the pan with the spices, tomato purée, chilli and lemon juice. Season well and cook for 10 mins or until the chicken is tender.

Divide the chicken, red onion, chutney, herbs and yogurt between the four warm rotis. Roll up and serve with plenty of napkins</p>
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
                            <p>Put a large saucepan on a medium heat and add 1 tbsp olive oil.

                            Add 4 finely chopped bacon rashers and fry for 10 mins until golden and crisp.

                            Reduce the heat and add the 2 onions, 2 carrots, 2 celery sticks, 2 garlic cloves and the leaves from 2-3 sprigs rosemary, all finely chopped, then fry for 10 mins. Stir the veg often until it softens.

                            Increase the heat to medium-high, add 500g beef mince and cook stirring for 3-4 mins until the meat is browned all over.

Add 2 tins plum tomatoes, the finely chopped leaves from ¾ small pack basil, 1 tsp dried oregano, 2 bay leaves, 2 tbsp tomato purée, 1 beef stock cube, 1 deseeded and finely chopped red chilli (if using), 125ml red wine and 6 halved cherry tomatoes. Stir with a wooden spoon, breaking up the plum tomatoes.</p>
                        </div>
                    </div>
                    <div onClick={mealFour_boxClickHandler} className='meal_popupBackground' />
                </div>
            )}


            <div onClick={mealOneClickHandler} className='meal_container'>
                <img alt='' src={PancakeImage} />
                <p>Meal one: Pancakes</p>
            </div>

            <div onClick={mealTwoClickHandler} className='meal_container'>
                <img alt='' src={OmeletteImage} />
                <p>Meal two: Omelet</p>
            </div>

            <div onClick={mealThreeClickHandler} className='meal_container'>
                <img alt='' src={WrapImage} />
                <p>Meal three: chicken wrap</p>
            </div>

            <div onClick={mealFourClickHandler} className='meal_container'>
                <img alt='' src={SpagettiImage} />
                <p>Meal Four: Spagetti Bolognase</p>
            </div>

        </div>
    );
}

export default Main_page