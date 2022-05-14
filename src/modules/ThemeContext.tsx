import React from 'react';

export type ThemeName = 'light' | 'dark';

interface IThemeProvider {
    theme :ThemeName
}

const ThemeContext = React.createContext<IThemeProvider | null>(null);

const ThemeProvider = (props :React.PropsWithChildren<IThemeProvider>) => {
    return (
        <ThemeContext.Provider value={props}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export { ThemeContext, ThemeProvider };