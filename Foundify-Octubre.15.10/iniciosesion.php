<?php
// 1. Iniciamos sesión al principio de todo
session_start();

// 2. Incluimos tu conexión a la base de datos
require_once "php/conexion.php"; 

$error = ""; // Variable para guardar mensajes si hay error

// 3. Verificamos si el usuario le dio clic al botón de iniciar sesión
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST['email'];
    $password_ingresada = $_POST['password'];

    try {
        // Consulta segura respetando las mayúsculas de tus columnas
        $sql = "SELECT Id_usuario, Email, Password, Nombres FROM Usuarios WHERE Email = :correo";
        $stmt = $conn->prepare($sql); 
        $stmt->bindParam(":correo", $correo);
        $stmt->execute();

        // Verificamos si el correo existe en la tabla
        if ($stmt->rowCount() > 0) {
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Si tus contraseñas SÍ están cifradas con password_hash(), usa esta:
            if (password_verify($password_ingresada, $usuario['Password'])) {
                
                // ¡Credenciales correctas! Guardamos la sesión usando las mayúsculas exactas
                $_SESSION['id_usuario'] = $usuario['Id_usuario'];
                $_SESSION['correo'] = $usuario['Email'];
                $_SESSION['nombre'] = $usuario['Nombres'];
                
                // Redirigimos a la página de inicio
                header("Location: inicio.php");
                exit();
            } else {
                $error = "Contraseña incorrecta.";
            }
        } else {
            $error = "El correo no está registrado.";
        }

    } catch (PDOException $e) {
        $error = "Error en la base de datos: " . $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Foundify – Iniciar Sesión</title>
  <link rel="stylesheet" href="css/styles1.css" />
  <!-- Font Awesome para los íconos del ojo -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  
  <style>
  /* Estilo para posicionar el botón del ojo dentro del input de contraseña */
  .password-container {
    position: relative;
    display: flex;
    align-items: center;
  }
  .password-container input {
    width: 100%;
    padding-right: 40px; /* Espacio para que el texto no quede debajo del icono */
  }
  .toggle-password {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    color: #888;
  }
  .toggle-password:hover {
    color: #fff;
  }
</style>
</head>
<body>

  <div class="page">

    <header class="brand">
      <div class="logo-placeholder">
        <img src="assets/imagenes/FoundifyBlancoRecortada.png">
      </div>
      <p class="brand-tagline">Conoce más proyectos</p>
    </header>
    
    <div class="card">
      <h2 class="card__title">Iniciar Sesión</h2>
      <p class="card__subtitle">Ingresa tus credenciales para acceder a tu cuenta</p>

      <!-- Si el correo o contraseña fallan, aquí aparecerá el mensaje de error -->
      <?php if (!empty($error)): ?>
          <div style="background: #ffe6e6; color: #d9534f; padding: 10px; border-radius: 5px; margin-bottom: 15px; font-size: 14px; text-align: center;">
              <?php echo $error; ?>
          </div>
      <?php endif; ?>

      <!-- IMPORTANTE: method="POST" y action="" -->
      <form id="login-form" method="POST" action="">

        <div class="field"> 
          <label for="email">Correo electrónico</label>
          <input type="email" id="email" name="email" placeholder="tu@email.com" required>
        </div>

        <div class="field">
          <label for="password">Contraseña</label>
          <!-- Contenedor adaptado con el input y el ícono -->
          <div class="password-container">
              <input type="password" id="password" name="password" placeholder="••••••••" required>
              <i class="fa-solid fa-eye toggle-password" onclick="mostrarPassword('password', this)"></i>
          </div>
        </div>

        <div class="row-options">
          <label class="remember">
            <input type="checkbox" /> Recordarme
          </label>
          <a href="views/restablecer.html" class="forgot">¿Olvidaste tu contraseña?</a>
        </div>

        <button type="submit" class="btn-primary">Iniciar Sesión</button>
      </form>

      <p class="register-hint">
        ¿No tienes una cuenta? <a href="register.html">Regístrate aquí</a>
      </p>
    </div>

    <div class="divider">
      <span>O continúa con</span>
    </div>

    <div class="oauth-row">
      <!-- Botón Google -->
      <button class="btn-oauth" type="button" onclick="window.location.href='https://accounts.google.com/o/oauth2/v2/auth?YOUR_PARAMS_HERE'">
        <svg class="oauth-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20">
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/>
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19.1 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
          <path fill="#4CAF50" d="M24 44c5.3 0 10.1-2 13.7-5.2l-6.3-5.3C29.5 35.3 26.9 36 24 36c-5.2 0-9.6-3-11.3-7.4l-6.5 5C9.6 39.6 16.3 44 24 44z"/>
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.3 5.3C43.1 35.3 44 30 44 24c0-1.2-.1-2.4-.4-3.5z"/>
        </svg>
        Google
      </button>

      <!-- Botón GitHub -->
      <button class="btn-oauth" type="button" onclick="window.location.href='https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&scope=user:email'">
        <svg class="oauth-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/>
        </svg>
        GitHub
      </button>
    </div>

  </div>

  <!-- Script para alternar la visibilidad de la contraseña -->
  <script>
    function mostrarPassword(id, icono) {
        const input = document.getElementById(id);

        if (input.type === "password") {
            input.type = "text";
            icono.classList.remove("fa-eye");
            icono.classList.add("fa-eye-slash");
        } else {
            input.type = "password";
            icono.classList.remove("fa-eye-slash");
            icono.classList.add("fa-eye");
        }
    }
  </script>

</body>
</html>