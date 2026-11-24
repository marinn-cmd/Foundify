import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function EditProfile() {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombres: '',
    apellidos: '',
    telefono: '',
    correo: '',
    fotoUrl: 'https://i.pravatar.cc/150?img=32'
  });


  // CARGAR USUARIO CUANDO SE ABRA LA PÁGINA
  useEffect(() => {

    fetch('http://localhost/api-foundify/actualizar_perfil.php', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {

        if (data.success) {

          setUsuario(prev => ({
            ...prev,
            nombres: data.usuario.nombres,
            apellidos: data.usuario.apellidos,
            telefono: data.usuario.telefono,
            correo: data.usuario.correo
          }));

        } else {

          alert(data.mensaje);

        }

      })
      .catch(error => {

        console.error(error);
        alert('No se pudieron cargar los datos.');

      });

  }, []);


  // CAMBIAR INPUTS
  const handleChange = (e) => {

    const { name, value } = e.target;

    setUsuario(prev => ({
      ...prev,
      [name]: value
    }));

  };

  const handleFotoChange = (e) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = () => {
      if (typeof lector.result === 'string') {
        setUsuario(prev => ({ ...prev, fotoUrl: lector.result }));
      }
    };
    lector.readAsDataURL(archivo);
  };


  // GUARDAR CAMBIOS
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        'http://localhost/api-foundify/actualizar_perfil.php',
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json'
          },

          credentials: 'include',

          body: JSON.stringify({
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            telefono: usuario.telefono,
            correo: usuario.correo
          })
        }
      );

      const data = await response.json();

      if (data.success) {

        alert(data.mensaje);

        navigate('/proyectos');

      } else {

        alert(data.mensaje);

      }

    } catch (error) {

      console.error(error);

      alert('Error al conectar con el servidor.');

    }

  };


  return (
    <div style={{ backgroundColor: '#0f172a', color: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Contenedor principal de la tarjeta */}
      <div style={{ flex: 1, padding: '20px' }}>
        <section className="edit-profile-card" style={{
          maxWidth: '480px',
          margin: '40px auto',
          padding: '30px',
          borderRadius: '12px',
          backgroundColor: '#121824',
          border: '1px solid #2a3447',
          color: '#ffffff'
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '6px', textAlign: 'center' }}>Editar Perfil</h2>
          <p className="subtitle" style={{ textAlign: 'center', color: '#9aa5b8', marginTop: 0, marginBottom: '24px', fontSize: '0.9rem' }}>
            Actualiza tu información pública en Foundify
          </p>

          <form onSubmit={handleSubmit}>
            
            {/* Foto de perfil con botón interactivo */}
            <div className="avatar-edit" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
              <img 
                src={usuario.fotoUrl} 
                alt="Foto de perfil actual" 
                style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px', border: '2px solid #2a3447' }}
              />
              <label htmlFor="foto_perfil" style={{ fontSize: '0.85rem', color: '#7ea8d8', cursor: 'pointer' }}>
                Cambiar foto de perfil
              </label>
              <input 
                type="file" 
                id="foto_perfil" 
                name="foto_perfil" 
                accept="image/*" 
                onChange={handleFotoChange}
                style={{ display: 'none' }}
              />
            </div>

            {/* Nombres */}
            <div className="form-group" style={{ marginBottom: '18px' }}>
              <label htmlFor="nombres" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Nombres</label>
              <input 
                type="text" 
                id="nombres" 
                name="nombres" 
                value={usuario.nombres} 
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #2a3447', backgroundColor: '#1e293b', color: '#ffffff', boxSizing: 'border-box' }}
              />
            </div>

            {/* Apellidos */}
            <div className="form-group" style={{ marginBottom: '18px' }}>
              <label htmlFor="apellidos" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Apellidos</label>
              <input 
                type="text" 
                id="apellidos" 
                name="apellidos" 
                value={usuario.apellidos} 
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #2a3447', backgroundColor: '#1e293b', color: '#ffffff', boxSizing: 'border-box' }}
              />
            </div>

            {/* Teléfono */}
            <div className="form-group" style={{ marginBottom: '18px' }}>
              <label htmlFor="telefono" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Teléfono</label>
              <input 
                type="number" 
                id="telefono" 
                name="telefono" 
                value={usuario.telefono} 
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #2a3447', backgroundColor: '#1e293b', color: '#ffffff', boxSizing: 'border-box' }}
              />
            </div>

            {/* Correo Electrónico */}
            <div className="form-group" style={{ marginBottom: '18px' }}>
              <label htmlFor="correo" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Correo Electrónico</label>
              <input 
                type="email" 
                id="correo" 
                name="correo" 
                value={usuario.correo} 
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #2a3447', backgroundColor: '#1e293b', color: '#ffffff', boxSizing: 'border-box' }}
              />
            </div>

            {/* Botones de acción */}
            <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
              <button 
                type="submit" 
                className="btn-primary"
                style={{ flex: 1, padding: '10px', backgroundColor: '#4f8ef7', border: 'none', borderRadius: '6px', color: '#ffffff', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Guardar Cambios
              </button>
              <Link 
                to="/proyectos" 
                className="btn-tertiary"
                style={{ flex: 1, padding: '10px', backgroundColor: '#2a3447', color: '#ffffff', textAlign: 'center', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold', boxSizing: 'border-box' }}
              >
                Cancelar
              </Link>
            </div>

          </form>
        </section>
      </div>

      {/* Footer */}
      <section className="footer" style={{ borderTop: '1px solid #1e293b', padding: '30px 20px', backgroundColor: '#0b0f19', color: '#9aa5b8' }}>
        <div className="footer-contenido" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
          <div className="footer-info" style={{ flex: 2, minWidth: '250px' }}>
            <h3 style={{ color: '#ffffff', marginTop: 0 }}>Foundify</h3>
            <p style={{ fontSize: '0.9rem' }}>
              Foundify es una plataforma dedicada a conectar a creadores de proyectos con personas interesadas en apoyarlos. Nuestra misión es fomentar la innovación y el emprendimiento, brindando un espacio seguro y confiable para que las ideas se conviertan en realidad.
            </p>
          </div>
          <div className="footer-links" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '150px' }}>
            <h3 style={{ color: '#ffffff', marginTop: 0 }}>Enlaces</h3>
            <Link to="/proyectos" style={{ color: '#4f8ef7', textDecoration: 'none' }}>Inicio</Link>
            <Link to="/proyectos" style={{ color: '#4f8ef7', textDecoration: 'none' }}>Proyectos</Link>
            <Link to="/comunidad" style={{ color: '#4f8ef7', textDecoration: 'none' }}>Comunidad</Link>
            <Link to="/configuracion" style={{ color: '#4f8ef7', textDecoration: 'none' }}>Configuración</Link>
          </div>
        </div>
        <div className="footer-copy" style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem' }}>
          <p>&copy; 2026 Foundify. Todos los derechos reservados.</p>
        </div>
      </section>

    </div>
  );

}