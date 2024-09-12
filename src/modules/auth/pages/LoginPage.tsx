import React from 'react';
import LoginForm from '../components/LoginForm';
import AuthLayout from '../../../shared/layouts/AuthLayout';

interface LoginPageProps {
    toggleTheme: () => void;
    darkMode: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ toggleTheme, darkMode }) => {
    const handleLogin = async (credentials: { email: string; password: string }) => {
        try {
            console.log(credentials)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthLayout title="Sign In" toggleTheme={toggleTheme} darkMode={darkMode}>
            <LoginForm onSubmit={handleLogin} />
        </AuthLayout>
    );
};

export default LoginPage;
