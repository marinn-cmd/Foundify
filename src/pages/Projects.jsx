import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProyectosCard from "../Componentes/ProyectosCard";
import { API_URL } from '../Config';

export default function ListaProyectos() {
  const navigate = useNavigate();

  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  function cargarProyectos() {
    setCargando(true);
    setError(null);

    fetch(`${API_URL}/Proyectos.php`, {
      credentials: 'include' // envía la cookie de sesión
    })
      .then((res) => {
        // Sin sesión iniciada: mandar al login
        if (res.status === 401) {
          navigate('/login');
          return null;
        }
        if (!res.ok) {
          throw new Error('Error al cargar los proyectos');
        }
        return res.json();
      })
      .then((data) => {
        if (data === null) return; // ya se redirigió al login
        setProyectos(Array.isArray(data) ? data : []);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }

  useEffect(() => {
    cargarProyectos();
  }, []);

  if (cargando) {
    return <div style={{ padding: '20px', color: '#fff', backgroundColor: '#121212', minHeight: '100vh' }}>Cargando proyectos...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '40px 20px', color: '#fff', backgroundColor: '#121212', minHeight: '100vh', textAlign: 'center' }}>
        <h3 style={{ color: '#ff4d4d', marginBottom: '10px' }}>No se pudo conectar con el servidor ({error})</h3>
        <p style={{ color: '#aaa', maxWidth: '550px', margin: '0 auto 20px', lineHeight: '1.5' }}>
          Verifica que Apache esté iniciado en el panel de XAMPP y que la base de datos esté accesible en <code>{API_URL}/Proyectos.php</code>.
        </p>
        <button
          onClick={cargarProyectos}
          style={{ padding: '10px 20px', backgroundColor: '#00d26a', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          🔄 Reintentar conexión
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#121212', color: '#fff', minHeight: '100vh' }}>
      <section className="hero" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Descubre proyectos increíbles</h2>
        <p style={{ color: '#aaa' }}>Explora cientos de ideas innovadoras listas para cambiar el mundo.</p>
      </section>

      <section className="mosaico" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {proyectos.length === 0 ? (
          <p style={{ color: '#aaa', gridColumn: '1 / -1', textAlign: 'center' }}>
            No hay proyectos registrados todavía.
          </p>
        ) : (
          proyectos.map((proyecto) => (
            <ProyectosCard key={proyecto.id_proyecto || proyecto.id} proyecto={proyecto} />
          ))
        )}
      </section>
    </div>
  );
}