import { Routes, Route, Navigate } from 'react-router-dom';
import WaterLinePage from '../pages/WaterLinePage';

const WaterLineRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={<WaterLinePage />} />
            <Route path="*" element={<Navigate to="." />} />
        </Routes>
    );
};

export default WaterLineRoutes;
