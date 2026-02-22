import { Routes, Route, Navigate } from 'react-router-dom';
import UserPage from '../pages/UserPage';


const UserRoutes: React.FC = () => {
  return (

    <Routes>
      <Route path="users" element={<UserPage />} />
      <Route path="*" element={<Navigate to="/private/users" />} />
    </Routes>
  );
};

export default UserRoutes;
