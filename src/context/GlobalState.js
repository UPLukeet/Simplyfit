import React, { createContext, useReducer } from "react";
import AppReducer from './AppReducer';

// initial state
const initialState = {
    healthData:
        { age: "38", gender: "male", goal: "Lose", height: "180.34", weight: 80 }

}

export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);


    return (<GlobalContext.Provider value={{
        healthData: state.healthData
    }}>
        {children}
    </GlobalContext.Provider>);
}