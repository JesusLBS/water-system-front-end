import { Routes, Route, Navigate } from 'react-router-dom';
import SocioPage from '../pages/SocioPage';
import SocioDetailPage from '../pages/SocioDetailPage';

const SocioRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<SocioPage />} />
      <Route path="detail/:uid" element={<SocioDetailPage />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};

export default SocioRoutes;