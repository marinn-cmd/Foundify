<?php
session_start();
require_once "../php/conexion.php";

if (!isset($_SESSION['id_usuario'])) {
    header("Location: ../iniciosesion.php");
    exit;
}

$stmt = $conn->prepare("SELECT Nombres, Apellidos, Telefono, Email FROM Usuarios WHERE Id_usuario = :id_usuario");
$stmt->bindParam(":id_usuario", $_SESSION['id_usuario']);
$stmt->execute();
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Perfil - Foundify</title>
    <link rel="stylesheet" href="../css/estilo.css">
    <link rel="stylesheet" href="../css/perfil.css">
    <style>
        .edit-profile-card {
            max-width: 480px;
            margin: 40px auto;
            padding: 30px;
            border-radius: 12px;
            background-color: #121824;
            border: 1px solid #2a3447;
            color: #ffffff;
        }

        .edit-profile-card h2 {
            margin-top: 0;
            margin-bottom: 6px;
            text-align: center;
        }

        .edit-profile-card .subtitle {
            text-align: center;
            color: #9aa5b8;
            margin-top: 0;
            margin-bottom: 24px;
            font-size: 0.9rem;
        }

        .edit-profile-card .avatar-edit {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 24px;
        }

        .edit-profile-card .avatar-edit img {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 10px;
            border: 2px solid #2a3447;
        }

        .edit-profile-card .avatar-edit label {
            font-size: 0.85rem;
            color: #7ea8d8;
            cursor: pointer;
        }

        .form-group {
            margin-bottom: 18px;
        }

        .form-group label {
            display: block;
            margin-bottom: 6px;
            font-weight: 500;
        }

        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 10px;
            border-radius: 6px;
            border: 1px solid #2a3447;
            background-color: #1e293b;
            color: #ffffff;
            box-sizing: border-box;
            font-family: inherit;
        }

        .form-group textarea {
            resize: vertical;
            min-height: 80px;
        }

        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #4f8ef7;
        }

        .form-actions {
            display: flex;
            gap: 10px;
            margin-top: 25px;
        }

        .form-actions .btn-primary,
        .form-actions .btn-tertiary {
            flex: 1;
            padding: 10px;
            text-align: center;
            box-sizing: border-box;
            text-decoration: none;
        }
    </style>
</head>

<body>
    <nav>
        <a href="../indexbienvenida.html">Cerrar sesión</a>
    </nav>

    <nav class="navbar">
        <div class="logo">Found<span>ify</span></div>
        <ul class="menu">
            <li><a href="../inicio.php">Inicio</a></li>
            <li><a href="proyectos.php">Proyectos</a></li>
            <li><a href="comunidad.html">Comunidad</a></li>
        </ul>
        <div class="icons">
            <details class="profile-menu">
                <summary>
                    <img src="https://i.pravatar.cc/100?img=32" alt="Perfil">
                </summary>
                <div class="dropdown-menu">
                    <a href="perfil.php">👤 Mi perfil</a>
                    <a href="configuracion.html">⚙️ Configuración</a>
                    <a href="../indexbienvenida.html" target="_self">🚪 Cerrar sesión</a>
                </div>
            </details>
        </div>
    </nav>

    <div class="container">
        <section class="edit-profile-card">
            <h2>Editar Perfil</h2>
            <p class="subtitle">Actualiza tu información pública en Foundify</p>

            <form action="../php/actualizar_perfil.php" method="POST" enctype="multipart/form-data">

                <div class="avatar-edit">
                    <img src="https://i.pravatar.cc/150?img=32" alt="Foto de perfil actual">
                    <label for="foto_perfil">Cambiar foto de perfil</label>
                    <input type="file" id="foto_perfil" name="foto_perfil" accept="image/*" style="display:none;">
                </div>

                <div class="form-group">
                    <label for="nombres">Nombres</label>
                    <input type="text" id="nombres" name="nombres" value="<?= htmlspecialchars($usuario['Nombres']) ?>" required>
                </div>

                <div class="form-group">
                    <label for="apellidos">Apellidos</label>
                    <input type="text" id="apellidos" name="apellidos" value="<?= htmlspecialchars($usuario['Apellidos']) ?>" required>
                </div>
                <div class="form-group">
                    <label for="telefono">Telefono</label>
                    <input type="number" id="telefono" name="telefono" value="<?= htmlspecialchars($usuario['Telefono']) ?>" required>
                </div>

                <div class="form-group">
                    <label for="correo">Correo Electrónico</label>
                    <input type="email" id="correo" name="correo" value="<?= htmlspecialchars($usuario['Email']) ?>" required>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn-primary">Guardar Cambios</button>
                    <a href="perfil.php" class="btn-tertiary">Cancelar</a>
                </div>
            </form>
        </section>
    </div>

    <section class="footer">
        <div class="footer-contenido">
            <div class="footer-info">
                <h3>Foundify</h3>
                <p>Foundify es una plataforma dedicada a conectar a creadores de proyectos con personas interesadas en
                    apoyarlos. Nuestra misión es fomentar la innovación y el emprendimiento, brindando un espacio seguro
                    y confiable para que las ideas se conviertan en realidad.</p>
            </div>
            <div class="footer-links">
                <h3>Enlaces</h3>
                <a href="../inicio.php">Inicio</a>
                <a href="proyectos.php">Proyectos</a>
                <a href="comunidad.html">Comunidad</a>
                <a href="acerca_de.html">Acerca de</a>
                <a href="contactanos.html">Contacto</a>
            </div>
        </div>
        <div class="footer-copy">
            <p>&copy; 2026 Foundify. Todos los derechos reservados.</p>
        </div>
    </section>
</body>

</html>