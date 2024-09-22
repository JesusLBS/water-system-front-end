import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../../shared/layouts/DashboardLayout';
import UserPage from '../pages/UserPage';

interface UserRoutesProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

const UserRoutes: React.FC<UserRoutesProps> = ({ toggleTheme, darkMode }) => {
  return (
    <DashboardLayout toggleTheme={toggleTheme} darkMode={darkMode}>
      <Routes>
        <Route path="users" element={<UserPage />} />
        <Route path="*" element={<Navigate to="/private/users" />} />
      </Routes>
    </DashboardLayout>
  );
};

export default UserRoutes;
