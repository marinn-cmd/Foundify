import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import RestablecerPage from './pages/RestablecerPage';
import AcercaDePage from './pages/AcercaDePage';
import ContactanosPage from './pages/ContactanosPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/iniciar-sesion" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/restablecer" element={<RestablecerPage />} />
        <Route path="/acerca-de" element={<AcercaDePage />} />
        <Route path="/contactanos" element={<ContactanosPage />} />

        {/* Alias routes para compatibilidad */}

        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/iniciosesion.php" element={<Navigate to="/iniciar-sesion" replace />} />
        <Route path="/register.html" element={<Navigate to="/register" replace />} />
        <Route path="/restablecer.html" element={<Navigate to="/restablecer" replace />} />
        <Route path="/acerca_de.html" element={<Navigate to="/acerca-de" replace />} />
        <Route path="/contactanos.html" element={<Navigate to="/contactanos" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
