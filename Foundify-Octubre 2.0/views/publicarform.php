<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Publicar Proyecto - Foundify</title>
  

  <link rel="stylesheet" href="../css/estilospublicar.css">
  

  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>


  <div class="modal-overlay" id="modalPublicar">
    <div class="modal-box">
      
      <div class="modal-header">
        <h2>Publicar Nuevo Proyecto</h2>
        <button class="btn-cerrar-modal" id="btnCerrarModal">&times;</button>
      </div>
      

      <form id="formProyecto" action="../php/publicar.php" method="POST">
        <!-- Fila 1: IDs de Sistema -->
        <div class="form-row">
          <div class="form-group">
            <label for="Id_Proyecto">ID Proyecto</label>
            <input type="number" id="Id_Proyecto" name="Id_Proyecto" placeholder="Ej: 1021" required>
          </div> 
          <div class="form-group">
            <label for="Id_Usuario">ID Usuario</label>
            <input type="number" id="Id_Usuario" name="Id_Usuario" placeholder="Ej: 1023456789" required>
          </div>
        </div>


        <div class="form-group">
          <label for="Titulo_Proyecto">Título del Proyecto</label>
          <input type="text" id="Titulo_Proyecto" name="Titulo_Proyecto" placeholder="Ej: Plataforma Solidaria" required>
        </div>


        <div class="form-group">
          <label for="Descripcion">Descripción</label>
          <textarea id="Descripcion" name="Descripcion" placeholder="Describe cómo esta iniciativa conectará a los emprendedores con los donantes..." required></textarea>
        </div>


        <div class="form-row">
          <div class="form-group" style="flex: 3;">
            <label for="Select_Categoria">Nombre de la Categoría</label>
            <select id="Select_Categoria" name="Select_Categoria" required>
              <option value="">Selecciona una categoría...</option>
              <option value="1">Salud - Servicios de cuidado y bienestar</option>
              <option value="2">Ambiental - Medio ambiente y reciclaje</option>
              <option value="3">Servicios - Atención y servicios digitales</option>
              <option value="4">Comercio - Compra, venta y comercio digital</option>
              <option value="5">Movilidad - Transporte y desplazamiento</option>
              <option value="6">Bienestar - Calidad de vida</option>
              <option value="7">Finanzas - Dinero y pagos digitales</option>
              <option value="8">Turismo - Viajes y turismo</option>
              <option value="9">Agricultura - Cultivos y producción agrícola</option>
              <option value="10">Educación - Aprendizaje y formación</option>
              <option value="11">Empleo - Oportunidades laborales</option>
              <option value="12">Productividad - Organización y tareas</option>
              <option value="13">Comunicación - Interacción social</option>
              <option value="14">Seguridad - Protección y seguridad</option>
            </select>
          </div>
          

          <div class="form-group" style="flex: 1;">
            <label for="Id_Categoria">ID Cat.</label>
            <input type="number" id="Id_Categoria" name="Id_Categoria" placeholder="#" readonly required style="background-color: var(--border); cursor: not-allowed; text-align: center; font-weight: bold;">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="Meta_Financiamiento">Meta de Financiamiento ($)</label>
            <input type="number" id="Meta_Financiamiento" name="Meta_Financiamiento" step="0.01" placeholder="Ej: 3500000.00" required>
          </div>
          <div class="form-group">
            <label for="Estado">Estado</label>
            <select id="Estado" name="Estado" required>
              <option value="">Selecciona el estado...</option>
              <option value="abierta">abierta</option>
              <option value="cerrada">cerrada</option>
              <option value="en financiamiento">en financiamiento</option>
              <option value="sin financiar">sin financiar</option>
              <option value="financiada">financiada</option>
              <option value="no cumplio meta">no cumplio meta</option>
            </select>
          </div>
        </div>


        <div class="form-row">
          <div class="form-group">
            <label for="Fecha_Limite">Fecha Límite</label>
            <input type="date" id="Fecha_Limite" name="Fecha_Limite" required>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-secundario" id="btnCancelarModal">Cancelar</button>
          <button type="submit" class="btn-publicar">Guardar Proyecto</button>
        </div>
      </form>

    </div>
  </div>

  <script>
  const modal = document.getElementById('modalPublicar');
  const btnCerrar = document.getElementById('btnCerrarModal');
  const btnCancelar = document.getElementById('btnCancelarModal');
  const formProyecto = document.getElementById('formProyecto');

  const selectCategoria = document.getElementById('Select_Categoria');
  const inputIdCategoria = document.getElementById('Id_Categoria');

  selectCategoria.addEventListener('change', function() {
    inputIdCategoria.value = this.value;
  });

  // Como esta página ya ES el formulario, mostramos el modal apenas carga
  modal.classList.add('activo');

  // Cerrar o cancelar ahora significa volver a comunidad.html
  const volverAComunidad = () => { window.location.href = "comunidad.html"; };

  btnCerrar.addEventListener('click', volverAComunidad);
  btnCancelar.addEventListener('click', volverAComunidad);

  formProyecto.addEventListener('submit', function(e) {
    e.preventDefault(); 

    if (!this.checkValidity()) {
      Swal.fire({
        icon: 'warning',
        title: '¡Faltan datos!',
        text: 'Por favor, llena todos los campos del formulario.',
        background: '#131a24',
        color: '#f1f5f9',
        confirmButtonColor: '#22c55e'
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: '¡Todo listo!',
        text: 'Guardando el proyecto...',
        background: '#131a24',
        color: '#f1f5f9',
        showConfirmButton: false, 
        timer: 1500
      }).then(() => {
        HTMLFormElement.prototype.submit.call(formProyecto); 
      });
    }
  });
</script>
</body>
</html>