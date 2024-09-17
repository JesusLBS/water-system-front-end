import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthRoutes from './modules/auth/routes/AuthRoutes';
import DashboardRoutes from './modules/dashboard/routes/DashboardRoutes';
import UserRoutes from './modules/user/routes/UserRoutes';

interface AppProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

const App: React.FC<AppProps> = ({ toggleTheme, darkMode }) => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes toggleTheme={toggleTheme} darkMode={darkMode} />} />
        <Route path="/dashboard/*" element={<DashboardRoutes toggleTheme={toggleTheme} darkMode={darkMode} />} />
        <Route path="/private/*" element={<UserRoutes toggleTheme={toggleTheme} darkMode={darkMode} />} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
