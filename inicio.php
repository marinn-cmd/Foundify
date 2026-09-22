<?php
session_start();
require_once "php/conexion.php";

// Trae los proyectos del usuario logueado para el <select>
$proyectosUsuario = [];
if (isset($_SESSION['id_usuario'])) {
    $stmt = $conn->prepare("SELECT Id_proyecto, Titulo FROM Proyectos WHERE Id_usuario = :id_usuario");
    $stmt->bindParam(":id_usuario", $_SESSION['id_usuario']);
    $stmt->execute();
    $proyectosUsuario = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Trae las publicaciones del feed, con datos del usuario y del proyecto
$stmtFeed = $conn->prepare("
    SELECT pub.Id_publicacion, pub.Texto, pub.Imagen, pub.Fecha_publicacion,
           u.Nombres, u.Apellidos,
           pr.Titulo AS Titulo_proyecto
    FROM Publicaciones pub
    JOIN Usuarios u ON u.Id_usuario = pub.Id_usuario
    LEFT JOIN Proyectos pr ON pr.Id_proyecto = pub.Id_proyecto
    ORDER BY pub.Fecha_publicacion DESC
");
$stmtFeed->execute();
$publicaciones = $stmtFeed->fetchAll(PDO::FETCH_ASSOC);
?>
<!----cabecera del documento---->
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Foundify - inicio</title>
    <link rel="stylesheet" href="css/estilo.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<!--inicio del cuerpo del documento-->

<body>

    <!-- barra de navegacion superior -->
    <nav>
        <a href="indexbienvenida.html">cerrar sesión</a>
    </nav>
    <!--barra de navegacion principal-->
    <nav class="navbar">
        <div class="logo">Found<span>ify</span></div>

        <ul class="menu">
            <li><a class="active" href="inicio.php"><i class="fa-solid fa-house"></i> Inicio</a></li>
            <li><a href="views/proyectos.php">Proyectos</a></li>
            <li><a href="views/comunidad.html">Comunidad</a></li>
        </ul>

        <div class="icons">

            <i class="fa-solid fa-glass-martini"></i>

            <details class="profile-menu">
                <summary>
                    <img src="https://i.pravatar.cc/" alt="Perfil">
                </summary>

                <div class="dropdown-menu">
                    <a href="views/perfil.php">👤 Mi perfil</a>
                    <a href="views/configuracion.html">⚙️ Configuración</a>
                    <a href="indexbienvenida.html" target="_self">🚪 Cerrar sesión</a>
                </div>
            </details>

        </div>
    </nav>
    <!-- Contenedor principal -->
    <div class="container">

        <aside class="sidebar-panel">
            <section class="profile-card">

                <img class="profile-img" src="https://i.pravatar.cc/150?img=32" alt="Usuario">

                <h2>Usuario Demo</h2>
                <p class="email">usuario@gmail.com</p>

                <p class="description">
                    Apasionado por apoyar proyectos innovadores y causas importantes.
                </p>

                <div class="stats">
                    <div>
                        <span>Proyectos apoyados</span>
                        <h3>5000</h3>
                    </div>

                    <div>
                        <span>Seguidores</span>
                        <h3>500</h3>
                    </div>

                    <div>
                        <span>Siguiendo</span>
                        <h3>50</h3>
                    </div>
                </div>

                <a class="btn-primary" href="views/perfil.php">Ver Mi Perfil</a>

            </section>

            <section class="post-box">
                <form action="php/publicar_actualizacion.php" method="POST" enctype="multipart/form-data">

                    <div class="post-header">
                        <img src="https://i.pravatar.cc/100?img=32" alt="Usuario">
                        <textarea name="texto" placeholder="¿Qué hay de nuevo en tu proyecto?" required></textarea>
                    </div>

                    <div class="form-group" style="margin: 10px 0;">
                        <select name="id_proyecto" class="select-proyecto" required>
                            <option value="" disabled selected>Selecciona el proyecto</option>
                            <?php foreach ($proyectosUsuario as $proyecto): ?>
                                <option value="<?= htmlspecialchars($proyecto['Id_proyecto']) ?>">
                                    <?= htmlspecialchars($proyecto['Titulo']) ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>

                    <div class="post-actions">
                        <div class="icons-post">
                            <label for="imagen_post" style="cursor:pointer;">
                                <i class="fa-regular fa-image"></i>
                            </label>
                            <input type="file" id="imagen_post" name="imagen" accept="image/*" style="display:none;">
                            <i class="fa-solid fa-video"></i>
                            <i class="fa-regular fa-calendar"></i>
                            <i class="fa-regular fa-face-smile"></i>
                        </div>

                        <button type="submit">Publicar</button>
                    </div>
                </form>
            </section>
        </aside>

        <main class="feed-panel">

            <section class="titulo-feed">
                <div>
                    <h2>Publicaciones destacadas</h2>
                    <p>Conoce las últimas novedades de los proyectos publicados en Foundify.</p>
                </div>
            </section>

            <?php if (empty($publicaciones)): ?>
                <p style="text-align:center; color:#888;">Aún no hay publicaciones. ¡Sé el primero en publicar!</p>
            <?php else: ?>
                <?php foreach ($publicaciones as $pub): ?>
                    <section class="post-card">
                        <div class="post-user">
                            <img src="https://i.pravatar.cc/100?img=32" alt="">
                            <div class="user-info">
                                <h4><?= htmlspecialchars($pub['Nombres'] . ' ' . $pub['Apellidos']) ?></h4>
                                <?php if ($pub['Titulo_proyecto']): ?>
                                    <p><?= htmlspecialchars($pub['Titulo_proyecto']) ?></p>
                                <?php endif; ?>
                            </div>
                            <span class="post-time"><?= date("d/m/Y H:i", strtotime($pub['Fecha_publicacion'])) ?></span>
                        </div>

                        <p class="post-text"><?= nl2br(htmlspecialchars($pub['Texto'])) ?></p>

                        <?php if ($pub['Imagen']): ?>
                            <img class="post-image" src="<?= htmlspecialchars($pub['Imagen']) ?>" alt="Imagen de la publicación">
                        <?php endif; ?>

                        <div class="post-footer">
                            <button>❤️ 0</button>
                            <button>💬 0</button>
                            <button>🔗 Compartir</button>
                            <button>🔖 Guardar</button>
                        </div>
                    </section>
                <?php endforeach; ?>
            <?php endif; ?>

        </main>
    </div>

    <!-- Pie de página -->
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
                <a href="inicio.php">Inicio</a>
                <a href="views/proyectos.php">Proyectos</a>
                <a href="views/comunidad.html">Comunidad</a>
                <a href="views/acerca_de.html">Acerca de</a>
                <a href="views/contactanos.html">Contacto</a>
            </div>
        </div>
        <div class="footer-copy">
            <p>&copy; 2024 Foundify. Todos los derechos reservados.</p>
        </div>
    </section>

</body>

</html>