import { Routes, Route, Navigate } from 'react-router-dom';
import UserPage from '../pages/UserPage';


const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<UserPage />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};

export default UserRoutes;
