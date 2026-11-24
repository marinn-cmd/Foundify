import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Componentes/Navbar';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RestablecerPage from './pages/RestablecerPage';
import AcercaDePage from './pages/AcercaDePage';
import ContactanosPage from './pages/ContactanosPage';
import Projects from './pages/Projects';
import { CreateProject } from './pages/CreateProject';
import { Community } from './pages/Community';
import { EditProfile } from './pages/EditProfile';
import { Settings } from './pages/Settings';

export function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Rutas de Bienvenida y Autenticación */}
        <Route path="/" element={<IndexPage />} />
        <Route path="/index" element={<IndexPage />} />
        <Route path="/iniciar-sesion" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/restablecer" element={<RestablecerPage />} />

        {/* Páginas informativas */}
        <Route path="/acerca-de" element={<AcercaDePage />} />
        <Route path="/contactanos" element={<ContactanosPage />} />

        {/* Plataforma principal */}
        <Route path="/proyectos" element={<Projects />} />
        <Route path="/publicar" element={<CreateProject />} />
        <Route path="/comunidad" element={<Community />} />
        <Route path="/editar-perfil" element={<EditProfile />} />
        <Route path="/configuracion" element={<Settings />} />

        {/* Ruta por defecto ante URLs no encontradas */}
        <Route path="*" element={<IndexPage />} />
      </Routes>
    </Router>
  );
}
