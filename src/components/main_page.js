import React, { useState, useEffect, useContext } from 'react';
import PancakeImage from '../assets/Pancakes.jpg';
import OmeletteImage from '../assets/Omelette.jpg';
import WrapImage from '../assets/Wrap.jpg';
import SpagettiImage from '../assets/Spagetti.jpg';
import { GlobalContext } from '../context/GlobalState';


import CancelIcon from '@material-ui/icons/Cancel';
import Gainimg from '../assets/Gain.svg'
import Recompimg from '../assets/Recomp.svg'
import Loseimg from '../assets/Lose.svg'

function Main_page(props) {

    const [healthData, healthDataSet] = useState((JSON.parse(localStorage.getItem('user_data'))))

    const [mealOne_box, mealOne_boxSet] = useState(false);
    const [mealTwo_box, mealTwo_boxSet] = useState(false);
    const [mealThree_box, mealThree_boxSet] = useState(false);
    const [mealFour_box, mealFour_boxSet] = useState(false);
    const [gainImage, gainImageSet] = useState(false);
    const [recompImage, recompImageSet] = useState(false);
    const [loseImage, loseImageSet] = useState(false);

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


            <div className='statusbar'>
                <div className='Goaldiv'>
                    <p>Goal: {healthData.goal}</p>
                    {healthData.goal === 'Gain' && <img src={Gainimg} />}

                    {healthData.goal === 'Recomp' && <img src={Recompimg} />}

                    {healthData.goal === 'Lose' && <img src={Loseimg} />}

                </div>

                <div className='testDiv'><p>Age: {healthData.age}</p></div>

                <div className='testDiv1'><p>Gender: {healthData.gender}</p></div>

                <div className='testDiv2'><p>weight: {healthData.units === 'lbs' ? Math.round(healthData.weight/2.2) : healthData.weight}Kg</p></div>
            </div>

            {mealOne_box && (
                <div className='meal_popup'>
                    <div className='meal_popupElement'>
                        <CancelIcon onClick={mealOne_boxClickHandler} />
                        <img src={PancakeImage} />
                        <p>testing1</p>
                    </div>
                    <div onClick={mealOne_boxClickHandler} className='meal_popupBackground' />
                </div>
            )}

            {mealTwo_box && (
                <div className='meal_popup'>
                    <div className='meal_popupElement'>
                        <CancelIcon onClick={mealTwo_boxClickHandler} />
                        <img src={OmeletteImage} />
                        <p>testing2</p>
                    </div>
                    <div onClick={mealTwo_boxClickHandler} className='meal_popupBackground' />
                </div>
            )}

            {mealThree_box && (
                <div className='meal_popup'>
                    <div className='meal_popupElement'>
                        <CancelIcon onClick={mealThree_boxClickHandler} />
                        <img src={WrapImage} />
                        <p>testing3</p>
                    </div>
                    <div onClick={mealThree_boxClickHandler} className='meal_popupBackground' />
                </div>
            )}

            {mealFour_box && (
                <div className='meal_popup'>
                    <div className='meal_popupElement'>
                        <CancelIcon onClick={mealFour_boxClickHandler} />
                        <img src={SpagettiImage} />
                        <p>testing4</p>
                    </div>
                    <div onClick={mealFour_boxClickHandler} className='meal_popupBackground' />
                </div>
            )}


            <div onClick={mealOneClickHandler} className='meal_container'>
                <img src={PancakeImage} />
                <p>Meal one: Pancakes</p>
            </div>

            <div onClick={mealTwoClickHandler} className='meal_container'>
                <img src={OmeletteImage} />
                <p>Meal two: Omelet</p>
            </div>

            <div onClick={mealThreeClickHandler} className='meal_container'>
                <img src={WrapImage} />
                <p>Meal three: chicken wrap</p>
            </div>

            <div onClick={mealFourClickHandler} className='meal_container'>
                <img src={SpagettiImage} />
                <p>Meal Four: Spagetti Bolognase</p>
            </div>

        </div>
    );
}

export default Main_page