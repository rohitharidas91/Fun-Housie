import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');

    //When the app loads the default theme is set
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

  // Function to toggle between themes
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    //Create a var for the value of ThemeProvider
    const value = { theme, toggleTheme };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

//Honestly I copy pasted this part I dont understand this hook... maybe will research more.

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export default ThemeProvider;
