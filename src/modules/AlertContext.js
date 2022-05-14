import React from 'react';

const AlertContext = React.createContext();
const initialState = {
    display: false,
    level: "",
    message: ""
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SHOW_ALERT":
            return{
                ...state,
                display: true,
                level: action.level,
                message: action.message
            };

        case "HIDE_ALERT":
            return initialState;

        default:
            return state;
    }
  };

const AlertProvider = (props) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
        <AlertContext.Provider value={{
            state,
            dispatch
        }}>
            {props.children}
        </AlertContext.Provider>
    );
}

export { AlertContext, AlertProvider };