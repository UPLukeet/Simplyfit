import React, { createContext, useReducer } from "react";
import AppReducer from './AppReducer';

// initial state
const healthData = JSON.parse(localStorage.getItem('user_data'))



export const GlobalContext = createContext(healthData);

// provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, healthData);


    return (<GlobalContext.Provider value={{
        healthData
    }}>
        {children}
    </GlobalContext.Provider>);
}