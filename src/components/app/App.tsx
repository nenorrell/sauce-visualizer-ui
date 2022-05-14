import React from 'react';
import { ThemeName, ThemeProvider } from '../../modules/ThemeContext';
import { RouteList } from '../route-list/RouteList';
import './App.scss';

export const App = () => {
  let theme :ThemeName = localStorage.getItem('theme') as ThemeName || 'dark';
  const [currentTheme, changeTheme] = React.useState<ThemeName | null>(theme);

  return (
    <ThemeProvider theme={currentTheme || theme}>
      <RouteList routes={[]}></RouteList>
    </ThemeProvider>
  )
}