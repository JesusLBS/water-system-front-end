import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../../shared/layouts/DashboardLayout';
import SocioPage from '../socio/pages/SocioPage';
import UserPage from '../user/pages/UserPage';

interface PrivateRoutesProps {
    toggleTheme: () => void;
    darkMode: boolean;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ toggleTheme, darkMode }) => {
    return (
        <DashboardLayout toggleTheme={toggleTheme} darkMode={darkMode}>
            <Routes>
                <Route path="users" element={<UserPage />} />
                <Route path="socios" element={<SocioPage />} />
                <Route path="*" element={<Navigate to="/private/users" />} />
            </Routes>
        </DashboardLayout>
    );
};

export default PrivateRoutes;
