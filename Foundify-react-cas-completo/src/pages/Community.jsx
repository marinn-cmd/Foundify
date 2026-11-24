import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Datos estáticos para simular las publicaciones de la comunidad
const INICIALES_PUBLICACIONES = [
  {
    id: 1,
    titulo: 'Eco Energia',
    subtitulo: 'Reciclaje energético',
    autor: 'Ana Morales',
    tiempo: 'Hace 3 horas',
    avatar: 'https://i.pravatar.cc/100?img=32',
    likes: 156,
    comentarios: 23,
    tag: 'Tecnología',
    tagClass: 'tecnologia',
    imagen: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&q=80'
  },
  {
    id: 2,
    titulo: 'EcoLadrillo',
    subtitulo: 'Reciclaje urbano',
    autor: 'Luis Vega',
    tiempo: 'Hace 5 horas',
    avatar: 'https://i.pravatar.cc/100?img=15',
    likes: 98,
    comentarios: 12,
    tag: 'Sostenibilidad',
    tagClass: 'sostenibilidad',
    imagen: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&q=80'
  },
  {
    id: 3,
    titulo: 'Aprende Conmigo',
    subtitulo: 'Educación para todos',
    autor: 'Sofía Ramírez',
    tiempo: 'Hace 1 día',
    avatar: 'https://i.pravatar.cc/100?img=47',
    likes: 171,
    comentarios: 36,
    tag: 'Educación',
    tagClass: 'educacion',
    imagen: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80'
  },
  {
    id: 4,
    titulo: 'Huertos Comunitarios',
    subtitulo: 'Alimentación sostenible',
    autor: 'María López',
    tiempo: 'Hace 2 días',
    avatar: 'https://i.pravatar.cc/100?img=12',
    likes: 64,
    comentarios: 8,
    tag: 'Sostenibilidad',
    tagClass: 'sostenibilidad',
    imagen: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500&q=80'
  },
  {
    id: 5,
    titulo: 'Música Para Todos',
    subtitulo: 'Clases abiertas y talleres',
    autor: 'Diego Fernández',
    tiempo: 'Hace 6 horas',
    avatar: 'https://i.pravatar.cc/100?img=5',
    likes: 42,
    comentarios: 4,
    tag: 'Cultura',
    tagClass: 'cultura',
    imagen: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80'
  }
];

export function Community() {
  // Estados para búsqueda, likes, modal y formulario
  const [busqueda, setBusqueda] = useState('');
  const [publicaciones, setPublicaciones] = useState(INICIALES_PUBLICACIONES);
  const [mostrarModal, setMostrarModal] = useState(false);

  const [formReporte, setFormReporte] = useState({
    idProyecto: '',
    idUsuario: '',
    tipoReporte: '',
    nivelReporte: '',
    descripcion: ''
  });

  // Mapeo de niveles y descripciones según el tipo de reporte
  const datosReporte = {
    'PELIGRO': { nivel: 1, desc: 'La probabilidad + impacto de que ocurra un daño' },
    'RIESGO': { nivel: 2, desc: 'La fuente o situación con potencial de causar daño' },
    'DAÑO': { nivel: 3, desc: 'La consecuencia real ocurrida' }
  };

  // Manejador del cambio de tipo de reporte
  const handleTipoChange = (e) => {
    const seleccion = e.target.value;
    if (datosReporte[seleccion]) {
      setFormReporte({
        ...formReporte,
        tipoReporte: seleccion,
        nivelReporte: datosReporte[seleccion].nivel,
        descripcion: datosReporte[seleccion].desc
      });
    } else {
      setFormReporte({
        ...formReporte,
        tipoReporte: '',
        nivelReporte: '',
        descripcion: ''
      });
    }
  };

  // Manejador de incremento de likes
  const handleLike = (id) => {
    setPublicaciones(prev =>
      prev.map(pub => pub.id === id ? { ...pub, likes: pub.likes + 1 } : pub)
    );
  };

  // Envío del formulario de reporte (Modo simulación React)
  const handleSubmitReporte = (e) => {
    e.preventDefault();
    if (!formReporte.idProyecto || !formReporte.idUsuario || !formReporte.tipoReporte) {
      alert('Por favor, llena todos los campos obligatorios del reporte.');
      return;
    }
    alert(`Reporte enviado con éxito para el proyecto ID: ${formReporte.idProyecto}`);
    setMostrarModal(false);
    setFormReporte({ idProyecto: '', idUsuario: '', tipoReporte: '', nivelReporte: '', descripcion: '' });
  };

  // Filtrado de publicaciones por título o subtítulo
  const publicacionesFiltradas = publicaciones.filter(pub =>
    pub.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    pub.subtitulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', backgroundColor: '#121212', color: '#fff', minHeight: '100vh' }}>
      
      {/* Topbar y acciones */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', gap: '15px' }}>
        <h2>Comunidad Foundify</h2>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>🔍</span>
          <input
            type="text"
            placeholder="Buscar proyectos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '5px', border: '1px solid #333', backgroundColor: '#1e1e1e', color: '#fff' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link 
            to="/publicar" 
            style={{ padding: '10px 15px', backgroundColor: '#00d26a', color: '#000', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}
          >
            + Publicar
          </Link>
          <button 
            onClick={() => setMostrarModal(true)}
            style={{ padding: '10px 15px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            ⚠ Reportar Proyecto
          </button>
        </div>
      </div>

      {/* Grid de publicaciones */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {publicacionesFiltradas.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', gridColumn: '1/-1' }}>No se encontraron publicaciones.</p>
        ) : (
          publicacionesFiltradas.map((pub) => (
            <article key={pub.id} style={{ border: '1px solid #333', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#1e1e1e', display: 'flex', flexDirection: 'column' }}>
              <img src={pub.imagen} alt={pub.titulo} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              
              <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3>{pub.titulo}</h3>
                <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '15px' }}>{pub.subtitulo}</p>
                
                {/* Info del autor */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                  <img src={pub.avatar} alt={pub.autor} style={{ width: '35px', height: '35px', borderRadius: '50%' }} />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{pub.autor}</div>
                    <div style={{ fontSize: '0.75rem', color: '#777' }}>{pub.tiempo}</div>
                  </div>
                </div>

                {/* Reacciones */}
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #333', paddingTop: '10px' }}>
                  <button 
                    onClick={() => handleLike(pub.id)}
                    style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    <span>🤍</span> <span>{pub.likes}</span>
                  </button>
                  <span style={{ fontSize: '0.9rem', color: '#aaa' }}>💬 {pub.comentarios}</span>
                  <span style={{ fontSize: '0.8rem', color: '#00d26a', padding: '3px 8px', borderRadius: '4px', backgroundColor: '#102a1d' }}>
                    {pub.tag}
                  </span>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Modal de Reporte */}
      {mostrarModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#1e1e1e', padding: '25px', borderRadius: '10px', width: '90%', maxWidth: '500px', border: '1px solid #333' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>Reportar Proyecto</h3>
              <button onClick={() => setMostrarModal(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
            </div>

            <form onSubmit={handleSubmitReporte} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>ID Proyecto</label>
                  <input 
                    type="number" 
                    placeholder="Ej: 1021"
                    value={formReporte.idProyecto}
                    onChange={(e) => setFormReporte({ ...formReporte, idProyecto: e.target.value })}
                    required 
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #333', backgroundColor: '#121212', color: '#fff' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>ID Usuario</label>
                  <input 
                    type="text" 
                    placeholder="Ej: 102345"
                    value={formReporte.idUsuario}
                    onChange={(e) => setFormReporte({ ...formReporte, idUsuario: e.target.value })}
                    required 
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #333', backgroundColor: '#121212', color: '#fff' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 2 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Tipo de Reporte</label>
                  <select 
                    value={formReporte.tipoReporte}
                    onChange={handleTipoChange}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #333', backgroundColor: '#121212', color: '#fff' }}
                  >
                    <option value="">Selecciona...</option>
                    <option value="PELIGRO">PELIGRO</option>
                    <option value="RIESGO">RIESGO</option>
                    <option value="DAÑO">DAÑO</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Nivel</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={formReporte.nivelReporte}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #333', backgroundColor: '#2a2a2a', color: '#00d26a', textAlign: 'center', fontWeight: 'bold' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Descripción</label>
                <textarea 
                  rows="3"
                  value={formReporte.descripcion}
                  onChange={(e) => setFormReporte({ ...formReporte, descripcion: e.target.value })}
                  required
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #333', backgroundColor: '#121212', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setMostrarModal(false)}
                  style={{ padding: '8px 15px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '8px 15px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Enviar Reporte
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}