import React, { useState, useEffect } from 'react';

function Workout_page(props) {


    const [loading_animation, setloading_animation] = useState(false);


    useEffect(() => {
        if (loading_animation === false) {
            setTimeout(() => {
                setloading_animation(!loading_animation);
                console.log('play animation')
            }, 100);
        }
        return () => {
            document.body.style.overflow = 'unset';
        }

    }, []);


    return (
        <div className={loading_animation ? 'loading_transition fade' : 'loading_transition'}>
            <div className='main_workout'>
                <div className='App_margin' />
                <h1>Workout(in development)</h1>
                <table>

                    <tr>
                        <th>Days</th>
                        <th>Workout(Detailed workouts will be added in future release).</th>
                    </tr>

                    <tr>
                        <td>Monday</td>
                        <td>Cardio</td>
                    </tr>

                    <tr>
                        <td>Tuesday</td>
                        <td>Chest/Shoulders</td>
                    </tr>

                    <tr>
                        <td>Tuesday</td>
                        <td>Rest</td>
                    </tr>

                    <tr>
                        <td>Wednesday</td>
                        <td>Legs</td>
                    </tr>

                    <tr>
                        <td>Thursday</td>
                        <td>Rest</td>
                    </tr>

                    <tr>
                        <td>Friday</td>
                        <td>Back</td>
                    </tr>

                    <tr>
                        <td>Saturday</td>
                        <td>Cardio</td>
                    </tr>

                    <tr>
                        <td>Sunday</td>
                        <td>Rest</td>
                    </tr>
                </table>
            </div>
        </div>
    );

}

export default Workout_page