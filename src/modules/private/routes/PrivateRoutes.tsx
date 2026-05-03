import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../../shared/layouts/DashboardLayout';
import UserRoutes from '../user/routes/UserRoutes';
import SocioRoutes from '../socio/routes/SocioRoutes';
import WaterLineRoutes from '../water-line/routes/WaterLineRoutes';


interface PrivateRoutesProps {
    toggleTheme: () => void;
    darkMode: boolean;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ toggleTheme, darkMode }) => {
    return (
        <DashboardLayout toggleTheme={toggleTheme} darkMode={darkMode}>
            <Routes>
                <Route path="users/*" element={<UserRoutes />} />
                <Route path="water-lines/*" element={<WaterLineRoutes />} />
                <Route path="socios/*" element={<SocioRoutes />} />
                <Route path="*" element={<Navigate to="users" />} />
            </Routes>
        </DashboardLayout>
    );
};

export default PrivateRoutes;