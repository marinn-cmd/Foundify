<?php
session_start();
require_once "../php/conexion.php";

// Si no hay sesión activa, regresa al login
if (!isset($_SESSION['id_usuario'])) {
    header("Location: ../iniciosesion.php");
    exit;
}

$stmt = $conn->prepare("SELECT Nombres, Apellidos, Email FROM Usuarios WHERE Id_usuario = :id_usuario");
$stmt->bindParam(":id_usuario", $_SESSION['id_usuario']);
$stmt->execute();
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

// Proyectos apoyados: cuenta cuántas donaciones ha hecho este usuario
$stmtDon = $conn->prepare("SELECT COUNT(*) AS total FROM Donaciones WHERE Id_usuario = :id_usuario");
$stmtDon->bindParam(":id_usuario", $_SESSION['id_usuario']);
$stmtDon->execute();
$proyectosApoyados = $stmtDon->fetch(PDO::FETCH_ASSOC)['total'];
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil - Foundify</title>
    <link rel="stylesheet" href="../css/estilo.css">
    <link rel="stylesheet" href="../css/perfil.css">
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
        <section class="profile-overview">
            <div class="profile-card">
                <div class="profile-summary">
                    <img class="profile-img" src="https://i.pravatar.cc/150?img=32" alt="Foto de perfil">
                    <div class="profile-meta">
                        <h1><?= htmlspecialchars($usuario['Nombres'] . ' ' . $usuario['Apellidos']) ?></h1>
                        <!-- Titulo y Descripcion aún no existen como columnas en Usuarios -->
                        <p class="title">Miembro de Foundify</p>
                        <p class="description">Correo: <?= htmlspecialchars($usuario['Email']) ?></p>
                        <div class="profile-actions">
                            <button class="btn-primary" onclick="window.location.href='editar_perfil.php'">Editar perfil</button>
                        </div>
                    </div>
                </div>

                <div class="stats">
                    <div class="stat-card">
                        <span>Proyectos apoyados</span>
                        <h3><?= (int)$proyectosApoyados ?></h3>
                    </div>
                    <div class="stat-card">
                        <span>Conexiones</span>
                        <h3>0</h3>
                    </div>
                    <div class="stat-card">
                        <span>Mensajes</span>
                        <h3>0</h3>
                    </div>
                </div>
            </div>
        </section>

        <section class="activity-box">
            <div class="activity-header">
                <div>
                    <h2>Actualizaciones recientes</h2>
                    <p>Comparte novedades profesionales de tus proyectos y actividades.</p>
                </div>
                <button class="btn-tertiary">Nueva publicación</button>
            </div>

            <div class="post-box">
                <div class="post-header">
                    <img src="https://i.pravatar.cc/100?img=32" alt="Usuario">
                    <textarea placeholder="Comparte un avance profesional o una noticia del proyecto"></textarea>
                </div>
                <div class="post-actions">
                    <button class="btn-primary">Publicar</button>
                </div>
            </div>
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