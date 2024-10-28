import React, { useState } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

const AppWrapper: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App toggleTheme={toggleTheme} darkMode={darkMode} />
            </ThemeProvider>
        </Provider>
    );
};

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <StrictMode>
            <AppWrapper />
        </StrictMode>
    );
}
