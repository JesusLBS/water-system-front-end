import React from 'react';
import LoginForm from '../components/LoginForm';
import AuthLayout from '../../../shared/layouts/AuthLayout';
import FirebaseService from '../../../shared/services/firebase/firebaseService';
import AuthService from '../services/authService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../../../utils/toastNotifications';
import { setAuth } from '../../../redux/auth/authSlice';

interface LoginPageProps {
    toggleTheme: () => void;
    darkMode: boolean;
}

const firebaseService = new FirebaseService();
const authService = new AuthService();

const LoginPage: React.FC<LoginPageProps> = ({ toggleTheme, darkMode }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (credentials: { email: string; password: string }) => {
        try {
            const user = await firebaseService.signIn(credentials);
            const uid: string = user?.uid || '';
            if (!uid) {
                showErrorToast('No se pudo autenticar el usuario.');
                return;
            }
            const response = await authService.login(uid);

            if (!response.ok) {
                showErrorToast('Error al iniciar sesión. Verifica tus credenciales.');
                return;
            }

            const token = response.data.token;
            localStorage.setItem('x-token', token);

            // Dispatch Redux action to update the global auth state
            dispatch(setAuth({ isAuthenticated: true, token, userId: uid }));

            showSuccessToast('¡Inicio de sesión exitoso!');
            navigate("/dashboard/home");
        } catch (error) {
            showErrorToast('Hubo un error en el servidor. Inténtalo de nuevo.');
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
