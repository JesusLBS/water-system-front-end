import React from 'react';
import AuthLayout from '../../../shared/layouts/AuthLayout';
import RegisterForm from '../components/RegisterForm';

interface RegisterPageProps {
    toggleTheme: () => void;
    darkMode: boolean;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ toggleTheme, darkMode }) => {
    const handleRegister = async () => {
        try {
            //Register
        } catch (error) {
            console.error('Error al registrar', error);
        }
    };

    return (
        <AuthLayout title="Sign Up" toggleTheme={toggleTheme} darkMode={darkMode}>
            <RegisterForm onSubmit={handleRegister} />
        </AuthLayout>
    );
};

export default RegisterPage;
