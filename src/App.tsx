import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthRoutes from './modules/auth/routes/AuthRoutes';

interface AppProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

const App: React.FC<AppProps> = ({ toggleTheme, darkMode }) => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes toggleTheme={toggleTheme} darkMode={darkMode} />} />
      </Routes>
    </Router>
  );
};

export default App;
