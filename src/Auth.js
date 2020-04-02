import React, { useEffect, useState } from 'react';
import { Authentication } from './components/firebase';
import { getDefaultNormalizer } from '@testing-library/react';

export const AuthContext = React.createContext();


export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setpending] = useState(true);
    const [userData, setuserData] = useState(null);

    useEffect(() => {
        Authentication.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setpending(false)
            localStorage.setItem('user', user.uid);
            console.log(localStorage.getItem('user'));
        });

        getData()

    }, []);

    const getData = () => {
        Authentication.firestore().collection('Health_data')
            .doc(localStorage.getItem('user'))
            .get()
            .then(doc => {
                const data = doc.data();
                localStorage.setItem('user_data', JSON.stringify(data));
                setuserData(data)
                console.log(data)
            }).catch(function (error) {
                console.error("Error reading health", error);
            });
        
    }

    if(userData !== null) {
        console.log(userData)
    }

    if (pending) {
        return <></>
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};