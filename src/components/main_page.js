import React, { useState, useContext, useEffect, Redirect, Component } from 'react';
import PancakeImage from '../assets/Pancakes.jpg';
import OmeletteImage from '../assets/Omelette.jpg';
import WrapImage from '../assets/Wrap.jpg';
import SpagettiImage from '../assets/Spagetti.jpg';
import { Authentication } from './firebase';
import { database } from './firebase'

import CancelIcon from '@material-ui/icons/Cancel';
import Gainimg from '../assets/Gain.svg'
import Recompimg from '../assets/Recomp.svg'
import Loseimg from '../assets/Lose.svg'
import Underweight from '../assets/Underweight.svg'
import Normal from '../assets/Normal.svg'
import Overweight from '../assets/Overweight.svg'
import Obese from '../assets/Obese.svg'
import Extreamly from '../assets/ExtObese.svg'
import Scale from '../assets/scale.svg'
import Maintain from '../assets/Maintain.svg'
import Surplus from '../assets/Surplus.svg'
import Deficit from '../assets/Defecit.svg'

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

function Main_page(props) {

    const [loading, setLoading] = useState(true)
    const [healthData, healthDataSet] = useState(null)
    const [BMI, BMIset] = useState(null)
    const [BMR, BMRset] = useState(null)
    const [mealOneCals, mealOneCals_set] = useState(null)
    const [mealTwoCals, mealTwoCals_set] = useState(null)
    const [mealThreeCals, mealThreeCals_set] = useState(null)
    const [mealFourCals, mealFourCals_set] = useState(null)

    const [mealOne_box, mealOne_boxSet] = useState(false);
    const [mealTwo_box, mealTwo_boxSet] = useState(false);
    const [mealThree_box, mealThree_boxSet] = useState(false);
    const [mealFour_box, mealFour_boxSet] = useState(false);

    const [Goal_box, Goal_boxSet] = useState(false);
    const [BMI_box, BMI_boxSet] = useState(false);
    const [Cals_box, Cals_boxSet] = useState(false);
    const [Weight_box, Weight_boxSet] = useState(false);

    const [Goal, GoalSet] = useState(null)
    const [Weight, WeightSet] = useState(null)

    const [scroll, scrollSet] = useState(false);
    const [box_transition, setbox_transition] = useState(false);
    const [loading_animation, setloading_animation] = useState(false);

    // pulls user data from firebase
    useEffect(() => {

        const user = Authentication.auth().currentUser;
        {
            user !== null &&
                database.collection('Health_data').doc(user.uid)
                    .onSnapshot(function (doc) {
                        healthDataSet(doc.data())
                        setLoading(false)
                    })
        }
        return () => {
            document.body.style.overflow = 'unset';

        }


    }, []);

    //calculates calorie requirments
    useEffect(() => {
        if (!loading && healthData !== null) {

            if (healthData.units === 'kg') {
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
            } else {

                BMIset(Math.round(((healthData.weight / 2.2) / ((healthData.height / 100) * (healthData.height / 100))) * 10) / 10)

                if (healthData.goal === 'Lose') {

                    if (healthData.gender === 'female') {
                        BMRset(Math.round(((655.1 + (9.563 * (healthData.weight / 2.2)) + (1.850 * healthData.height) - (4.676 * healthData.age)) * 1.37) * 0.8))
                    } else {
                        BMRset(Math.round(((88.2 + (13.362 * (healthData.weight / 2.2)) + (4.799 * healthData.height) - (5.677 * healthData.age)) * 1.37) * 0.8))
                    }

                }

                if (healthData.goal === 'Gain') {

                    if (healthData.gender === 'female') {
                        BMRset(Math.round(((655.1 + (9.563 * (healthData.weight / 2.2)) + (1.850 * healthData.height) - (4.676 * healthData.age)) * 1.37) * 1.2))
                    } else {
                        BMRset(Math.round(((88.2 + (13.362 * (healthData.weight / 2.2)) + (4.799 * healthData.height) - (5.677 * healthData.age)) * 1.37) * 1.2))
                    }

                }

                if (healthData.goal === 'Recomp') {
                    if (healthData.gender === 'female') {
                        BMRset(Math.round((655.1 + (9.563 * (healthData.weight / 2.2)) + (1.850 * healthData.height) - (4.676 * healthData.age)) * 1.37))
                    } else {
                        BMRset(Math.round((88.2 + (13.362 * (healthData.weight / 2.2)) + (4.799 * healthData.height) - (5.677 * healthData.age)) * 1.37))
                    }

                }
            }

        }

        if(loading_animation === false){
        setTimeout(() => {
            setloading_animation(!loading_animation);
            console.log('play animation')
        }, 200);
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

const loading_trans = () =>{


}

    //updates goal
    const handleChangeGoal = (event) => {

        GoalSet(event.target.value)
    };

    const updateGoal = () => {
        if (Goal !== null) {
            database.collection('Health_data').doc(localStorage.getItem('user')).update({
                goal: Goal
            }).catch((error) => {
                alert(error.message)
                console.log('failed to write', error);
            });
            Goal_boxSet(!Goal_box);
            scrollSet(!scroll)
        } else {
            alert('A goal must be selected.')
        }
    }

    //updates weight
    const handleChangeWeight = (event) => {

        WeightSet(event.target.value)
    };

    const updateWeight = () => {
        if (Weight !== null) {
            database.collection('Health_data').doc(localStorage.getItem('user')).update({
                weight: Weight
            }).catch((error) => {
                alert(error.message)
                console.log('failed to write', error);
            });
            Weight_boxSet(!Weight_box);
            scrollSet(!scroll)
        } else {
            alert('A weight must be input.')
        }
    }




    //handles clicks for meal one
    const mealOneClickHandler = (event) => {
        if (mealOne_box === false) {
            mealOne_boxSet(!mealOne_box);
            scrollSet(!scroll)
            setTimeout(() => {
                setbox_transition(!box_transition);
            }, 0.1);
        } else {
            setbox_transition(!box_transition);
            scrollSet(!scroll)
            setTimeout(() => {
                mealOne_boxSet(!mealOne_box);
            }, 180);
        }
    }

    //handles clicks for meal two
    const mealTwoClickHandler = (event) => {
        if (mealTwo_box === false) {
            mealTwo_boxSet(!mealTwo_box);
            scrollSet(!scroll)
            setTimeout(() => {
                setbox_transition(!box_transition);
            }, 0.1);
        } else {
            setbox_transition(!box_transition);
            scrollSet(!scroll)
            setTimeout(() => {
                mealTwo_boxSet(!mealTwo_box);
            }, 180);
        }
    };

    //handles clicks for meal three
    const mealThreeClickHandler = (event) => {
        if (mealThree_box === false) {
            mealThree_boxSet(!mealThree_box);
            scrollSet(!scroll)
            setTimeout(() => {
                setbox_transition(!box_transition);
            }, 0.1);
        } else {
            setbox_transition(!box_transition);
            scrollSet(!scroll)
            setTimeout(() => {
                mealThree_boxSet(!mealThree_box);
            }, 180);
        }
    };

    //handles clicks for meal Four
    const mealFourClickHandler = (event) => {
        if (mealFour_box === false) {
            mealOne_boxSet(!mealFour_box);
            scrollSet(!scroll)
            setTimeout(() => {
                setbox_transition(!box_transition);
            }, 0.1);
        } else {
            setbox_transition(!box_transition);
            scrollSet(!scroll)
            setTimeout(() => {
                mealFour_boxSet(!mealFour_box);
            }, 180);
        }
    };

    //handles clicks for Goal box
    const GoalClickHandler = (event) => {
        if (Goal_box === false) {
            Goal_boxSet(!Goal_box);
            scrollSet(!scroll)
            setTimeout(() => {
                setbox_transition(!box_transition);
            }, 0.1);
        } else {
            setbox_transition(!box_transition);
            scrollSet(!scroll)
            setTimeout(() => {
                Goal_boxSet(!Goal_box);
            }, 180);
        };
    }


    //handles clicks for BMI box
    const BMIClickHandler = (event) => {
        if (BMI_box === false) {
            BMI_boxSet(!BMI_box);
            scrollSet(!scroll)
            setTimeout(() => {
                setbox_transition(!box_transition);
            }, 0.1);
        } else {
            setbox_transition(!box_transition);
            scrollSet(!scroll)
            setTimeout(() => {
                BMI_boxSet(!BMI_box);
            }, 180);
        }
    };


    //handles clicks for Cals box
    const CalsClickHandler = (event) => {
        if (Cals_box === false) {
            Cals_boxSet(!Cals_box);
            scrollSet(!scroll)
            setTimeout(() => {
                setbox_transition(!box_transition);
            }, 0.1);
        } else {
            setbox_transition(!box_transition);
            scrollSet(!scroll)
            setTimeout(() => {
                Cals_boxSet(!Cals_box);
            }, 180);
        }
    };


    //handles clicks for Weigth box
    const WeightClickHandler = (event) => {
        if (Weight_box === false) {
            Weight_boxSet(!Weight_box);
            scrollSet(!scroll)
            setTimeout(() => {
                setbox_transition(!box_transition);
            }, 0.1);
        } else {
            setbox_transition(!box_transition);
            scrollSet(!scroll)
            setTimeout(() => {
                Weight_boxSet(!Weight_box);
            }, 180);
        }
    };



    return loading === false && (
        <div className='main_Main'>
            <div className={loading_animation ? 'loading_transition fade' : 'loading_transition'}>
                <div className='App_margin' />

                {healthData.goal === '' && props.history.push('/setup_page')}

                <div className='statusbar'>
                    <div className='Goaldiv' onClick={GoalClickHandler}>
                        <p>Goal: {healthData.goal}</p>
                        {healthData.goal === 'Gain' && <img alt='' src={Gainimg} />}

                        {healthData.goal === 'Recomp' && <img alt='' src={Recompimg} />}

                        {healthData.goal === 'Lose' && <img alt='' src={Loseimg} />}

                    </div>

                    <div className='BMIDiv' onClick={BMIClickHandler}>
                        <p>BMI: {BMI}</p>

                        {BMI < 18.5 && [<p>Underweight</p>, <img alt='' src={Underweight} />]}

                        {BMI > 18.5 && BMI < 25 && [<p>Normal</p>, <img alt='' src={Normal} />]}

                        {BMI >= 25 && BMI < 30 && [<p>Over&shy;weight</p>, <img alt='' src={Overweight} />]}

                        {BMI >= 30 && BMI < 35 && [<p>Obese</p>, <img alt='' src={Obese} />]}

                        {BMI >= 35 && [<p>Morbidly Obese</p>, <img alt='' src={Extreamly} />]}
                    </div>

                    <div className='CalsDiv' onClick={CalsClickHandler}>
                        {healthData.goal === 'Gain' && [<p>Surplus: {Math.round(BMR - (BMR / 1.2))} Cals</p>, <img alt='' src={Surplus} />]}

                        {healthData.goal === 'Recomp' && [<p>Main&shy;tenance Cals</p>, <img alt='' src={Maintain} />]}

                        {healthData.goal === 'Lose' && [<p>Deficit: {Math.round((BMR / 0.8) - BMR)} Cals</p>, <img alt='' src={Deficit} />]}
                    </div>

                    <div className='WeightDiv' onClick={WeightClickHandler}>
                        <p>Weight: {healthData.weight}{healthData.units}</p>
                        <img alt='' src={Scale} />
                    </div>
                </div>

                <div className='main_divider' />

                {mealOne_box && (
                    <div className={box_transition ? 'meal_popup fade' : 'meal_popup'}>
                        <div className='meal_popupElement'>
                            <CancelIcon onClick={mealOneClickHandler} />
                            <img alt='' src={PancakeImage} />
                            <div className='text_scroll'>
                                <h2>Ingredients:</h2>
                                <p>{Math.round((mealOneCals * 0.45) / 3.64)}g of flour, 1.5 teaspoons of baking powder, {Math.round((mealOneCals * 0.2) / 3.68)}g of cocoa powder, water, calorie free sweetener,  {Math.round((mealOneCals * 0.05) / 0.67)}g of mixed berries  and {Math.round(((mealOneCals * 0.3) / 1.55) / 44)} medium eggs.</p>
                                <p>High protein and low calorie dense option: use  {Math.round((mealOneCals * 0.55) / 3.64)}g of flour and {Math.round((mealOneCals * 0.2) / 0.45)}ml of egg white instead(this is less calorie dense so you get more food for the same amount of calories along with it being much higher in protein).</p>
                                <h2>Method:</h2>
                                <p>Combine the flour, egg, baking powder, cocoa together in a bowl to make a thick batter(add sweetener to taste). Then add as much water as required to give the batter a pourable consistency. Pre heat a good non-stick pan on medium heat with no oil. Once up to heat pour in your batter and flip when ready then serve with fruit on-top.</p>
                            </div>
                        </div>
                        <div onClick={mealOneClickHandler} className='meal_popupBackground' />
                    </div>
                )}

                {mealTwo_box && (
                    <div className={box_transition ? 'meal_popup fade' : 'meal_popup'}>
                        <div className='meal_popupElement'>
                            <CancelIcon onClick={mealTwoClickHandler} />
                            <img alt='' src={OmeletteImage} />
                            <div className='text_scroll'>
                                <h2>Ingredients:</h2>
                                <p>{Math.round(((mealTwoCals * 0.4) / 1.55) / 44)} medium eggs, {Math.round((mealTwoCals * 0.2) / 1.45)}g of ham, {Math.round((mealTwoCals * 0.25) / 1.1)}g of vegetables/greens(peppers, mushrooms, onions and spinach etc...) and {Math.round((mealTwoCals * 0.15) / 2.61)}g of low fat mozzarella.</p>
                                <h2>Method:</h2>
                                <p>Beat the eggs together in a bowl with salt, pepper, cumin and garlic powder until all ingredients are combined. Then mix in the vegetables, ham and mozzarella, before pouring into a preheated non-stick pan with no oil on medium heat.</p>
                            </div>
                        </div>
                        <div onClick={mealTwoClickHandler} className='meal_popupBackground' />
                    </div>
                )}

                {mealThree_box && (
                    <div className={box_transition ? 'meal_popup fade' : 'meal_popup'}>
                        <div className='meal_popupElement'>
                            <CancelIcon onClick={mealThreeClickHandler} />
                            <img alt='' src={WrapImage} />
                            <div className='text_scroll'>
                                <h2>Ingredients:</h2>
                                <p>{Math.round(((mealThreeCals * 0.5) / 1.85) / 64)} wraps, {Math.round((mealThreeCals * 0.3) / 1.65)}g precooked chicken breast, {Math.round((mealThreeCals * 0.25) / 1.1)}g of vegetables and greens(peppers, mushrooms, onions, lettuce and spinach etc...) and Franks red hot sauce.</p>
                                <h2>Method:</h2>
                                <p>Fill the wraps with a base layer of lettuce and vegetables. Then place on the chicken breast and drizzle with Franks red hot sauce and pepper before assembling the wrap.</p>
                            </div>
                        </div>
                        <div onClick={mealThreeClickHandler} className='meal_popupBackground' />
                    </div>
                )}

                {mealFour_box && (
                    <div className={box_transition ? 'meal_popup fade' : 'meal_popup'}>
                        <div className='meal_popupElement'>
                            <CancelIcon onClick={mealFourClickHandler} />
                            <img alt='' src={SpagettiImage} />
                            <div className='text_scroll'>
                                <h2>Ingredients:</h2>
                                <p> {Math.round((mealFourCals * 0.45) / 3.55)}g of dry weight pasta, {Math.round((mealFourCals * 0.15) / 0.32)}ml of passata, 1 stock cube, mixed herbs, {Math.round((mealFourCals * 0.3) / 1.37)}g of 5% fat lean mince meat and {Math.round((mealFourCals * 0.2) / 1.1)}g of vegetables and greens(peppers, mushrooms, onions and spinach etc...).</p>
                                <h2>Method:</h2>
                                <p>Cook the pasta in pan full of boiling water till cooked through. Add mince meat to non stick pan with no oil on a high-medium heat, once the mince is almost cooked through add the vegetables of your choice (onion, garlic, peppers and mushrooms are recommended). Once the vegetable are cooked add the passata, stock cube, salt, pepper and mixed herbs. Add the pasta to the sauce and serve.</p>
                            </div>
                        </div>
                        <div onClick={mealFourClickHandler} className='meal_popupBackground' />
                    </div>
                )}


                {Goal_box && (
                    <div className={box_transition ? 'meal_popup fade' : 'meal_popup'}>
                        <div className='status_popupElement'>
                            <CancelIcon onClick={GoalClickHandler} />
                            <div className='Goal_colour'>
                                {healthData.goal === 'Gain' && <img alt='' src={Gainimg} />}
                                {healthData.goal === 'Recomp' && <img alt='' src={Recompimg} />}
                                {healthData.goal === 'Lose' && <img alt='' src={Loseimg} />}
                            </div>
                            <div className='text_scroll'>
                                <h2>Change current goal of {healthData.goal}?</h2>
                                <div className='material_main_spacing'>
                                    <FormControl className='material_input'>
                                        <InputLabel htmlFor="age-native-simple">Goals</InputLabel>
                                        <Select native name='Goal' value={Goal} onChange={handleChangeGoal.bind(this)}>
                                            <option disabled selected hidden aria-label="None" value="" />
                                            <option value="Recomp">Recomp</option>
                                            <option value="Lose">Lose fat</option>
                                            <option value="Gain">Gain muscle</option>
                                        </Select>
                                    </FormControl>
                                    <div className='mainButtons'>
                                        <Button onClick={updateGoal} size="small" color="primary" variant="contained">Update goal</Button>
                                    </div>
                                </div>
                                <h2>Gain:</h2>
                                <p>Gain as much muscle mass as possible, eating in a calorie surplus(likely to gain fat as well).</p>
                                <h2>Recomp:</h2>
                                <p>Staying at the same body weight while losing fat and gaining muscle mass.</p>
                                <h2>Lose:</h2>
                                <p>Losing body fat to get significantly leaner, while trying to maintain as much lean tissue as possible.</p>
                            </div>
                        </div>
                        <div onClick={GoalClickHandler} className='meal_popupBackground' />
                    </div>
                )}


                {BMI_box && (
                    <div className={box_transition ? 'meal_popup fade' : 'meal_popup'}>
                        <div className='status_popupElement'>
                            <CancelIcon onClick={BMIClickHandler} />
                            <div className='BMI_colour'>
                                {BMI < 18.5 && <img alt='' src={Underweight} />}

                                {BMI > 18.5 && BMI < 25 && <img alt='' src={Normal} />}

                                {BMI >= 25 && BMI < 30 && <img alt='' src={Overweight} />}

                                {BMI >= 30 && BMI < 35 && <img alt='' src={Obese} />}

                                {BMI >= 35 && <img alt='' src={Extreamly} />}
                            </div>
                            <div className='text_scroll'>
                                <h2>BMI: {BMI}</h2>

                                {BMI < 18.5 && <p>You are considered under weight, in the long term this may lead to health complications. You should aim to increase your lean body mass by increasing calories and utilising a weight training routine.</p>}

                                {BMI > 18.5 && BMI < 25 && <p>You are within the healthy range, this is a good sign as it decreases the risk of heart attacks, strokes, diabetes and cancers. People in the healthy range of BMI can still often have a body fat percentage higher than is considered healthy. It is recommended that you recomposition by eating at maintenance calories and exercise to decrease body-fat and increase lean muscle tissue.</p>}

                                {BMI >= 25 && BMI < 30 && <p>You are overweight. This is not a good sign for long term health your risk of heart attacks, strokes, diabetes and cancers is increased. High levels of muscle mass will cause BMI to be inaccurate, although if you cannot see your abs or any muscle definition for overall health it is recommended that you cut body-fat and drop to a normal BMI.</p>}

                                {BMI >= 30 && BMI < 35 && <p>You are obese, this is considered extremely unhealthy. The risk of getting diabetes, cancers, strokes and heart attacks is greatly increased. High levels of muscle mass will cause BMI to be inaccurate, although if you cannot see your abs or any muscle definition for overall health it is strongly recommended that you cut body-fat and drop to a normal BMI.</p>}

                                {BMI >= 35 && <p>You are morbidly obese, this is very unhealthy. The risk of getting diabetes, cancers, strokes and heart attacks is enormously increased. It is strongly recommended for overall health that you cut body-fat and drop to a normal BMI, using exercise and a calorie deficit.</p>}
                            </div>
                        </div>
                        <div onClick={BMIClickHandler} className='meal_popupBackground' />
                    </div>
                )}

                {Cals_box && (
                    <div className={box_transition ? 'meal_popup fade' : 'meal_popup'}>
                        <div className='status_popupElement'>
                            <CancelIcon onClick={CalsClickHandler} />
                            <div className='Cals_colour'>
                                {healthData.goal === 'Gain' && <img alt='' src={Surplus} />}
                                {healthData.goal === 'Recomp' && <img alt='' src={Maintain} />}
                                {healthData.goal === 'Lose' && <img alt='' src={Deficit} />}
                            </div>
                            <div className='text_scroll'>
                                <h2>Your Calories:</h2>

                                {healthData.goal === 'Gain' && [<p>You are currently eating at a {Math.round(BMR - (BMR / 1.2))} calorie surplus. This means you are consuming more calories than your body requires within a day and will put on weight.</p>,
                                <h2>Why?</h2>,
                                <p> Using a weight training program prioritising progressive overload along with doing regular steady state cardio means a majority of the weight put on is lean muscle tissue although some fat will be gained. Your strength however should significantly increase.</p>]}

                                {healthData.goal === 'Recomp' && [<p>You are eating at maintenance calories, that means you are eating the amount of calories to stay at your current body weight.</p>,
                                <h2>Why?</h2>,
                                <p> When combined with a weight training program prioritising progressive overload and regular steady state cardio your body will recomposition. This means a larger percentage of the calories you consume will be used to build muscle instead of being stored as fat this is also known as "Maingaining". In the the long term you'll have a lower body fat percentage and more muscle mass at the same body weight.</p>]}

                                {healthData.goal === 'Lose' && [<p>You are eating at a {Math.round((BMR / 0.8) - BMR)} calorie deficit, this means you are eating less calories than your body uses in a day.</p>,
                                <h2>Why?</h2>,
                                <p>Your body will then start to use its stored fat as an energy reserve, meaning you'll burn body fat. Combined with weight training focused on progressive overload and regular cardio your body fat percentage will drop while maintaining or even gaining muscle mass if you are new to weight training. A relatively small deficit is used to avoid your body using lean tissue for energy. Large calorie deficits that are used in "crash diets" cause your body to cannibalise lean tissue. This lowers the amount of calories your body uses at rest(BMR) making it even harder to maintain a lean body fat percentage.</p>]}
                            </div>
                        </div>
                        <div onClick={CalsClickHandler} className='meal_popupBackground' />
                    </div>
                )}


                {Weight_box && (
                    <div className={box_transition ? 'meal_popup fade' : 'meal_popup'}>
                        <div className='status_popupElement'>
                            <CancelIcon onClick={WeightClickHandler} />
                            <div className='Weight_colour'>
                                <img alt='' src={Scale} />
                            </div>
                            <div className='text_scroll'>
                                <h2>Your current recorded weight is {healthData.weight}{healthData.units} Would you like to change this?</h2>
                                <div className='material_main_spacing'>
                                    <TextField className='material_input' value={Weight} onChange={handleChangeWeight.bind(this)} type='number' label={'Weight(' + healthData.units + ')'} id="standard-basic" />
                                    <div className='mainButtons'>
                                        <Button onClick={updateWeight} size="small" color="primary" variant="contained">Update weight</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div onClick={WeightClickHandler} className='meal_popupBackground' />
                    </div>
                )}

                <div onClick={mealOneClickHandler} className='meal_container'>
                    <img alt='' src={PancakeImage} />
                    <p>Meal one: Protein Pancakes</p>
                </div>

                <div onClick={mealTwoClickHandler} className='meal_container'>
                    <img alt='' src={OmeletteImage} />
                    <p>Meal two: Ham and cheese Omelette</p>
                </div>

                <div onClick={mealThreeClickHandler} className='meal_container'>
                    <img alt='' src={WrapImage} />
                    <p>Meal three: Spicy chicken wrap</p>
                </div>

                <div onClick={mealFourClickHandler} className='meal_container'>
                    <img alt='' src={SpagettiImage} />
                    <p>Meal Four: Spaghetti Bolognese</p>
                </div>
            </div>
        </div>
    );
}

export default Main_page