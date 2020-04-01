import React, { useEffect, useState } from 'react';
import { Authentication } from './components/firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children })  => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setpending] = useState(true);

    useEffect(() => {
        Authentication.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setpending(false)
        });
    }, []);

    if(pending){
        return <></>
    }

    return(
        <AuthContext.Provider
        value={{
            currentUser
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};