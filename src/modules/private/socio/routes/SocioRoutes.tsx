import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../../../shared/layouts/DashboardLayout';
import SocioPage from '../pages/SocioPage';

interface SocioRoutesProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

const UserRoutes: React.FC<SocioRoutesProps> = ({ toggleTheme, darkMode }) => {
  return (
    <DashboardLayout toggleTheme={toggleTheme} darkMode={darkMode}>
      <Routes>
        <Route path="socios" element={<SocioPage />} />
        <Route path="*" element={<Navigate to="/private/socios" />} />
      </Routes>
    </DashboardLayout>
  );
};

export default UserRoutes;
