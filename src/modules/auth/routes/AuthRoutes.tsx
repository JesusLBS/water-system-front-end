import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

interface AuthRoutesProps {
    toggleTheme: () => void;
    darkMode: boolean;
}

const AuthRoutes: React.FC<AuthRoutesProps> = ({ toggleTheme, darkMode }) => {
    const authRoutesConfig = [
        { path: "login", element: <LoginPage toggleTheme={toggleTheme} darkMode={darkMode} /> },
        { path: "register", element: <RegisterPage toggleTheme={toggleTheme} darkMode={darkMode} /> },
        { path: "*", element: <Navigate to="/auth/login" /> }
    ];

    return (
        <Routes>
            {authRoutesConfig.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Routes>
    );
};

export default AuthRoutes;
