<?php
// 1. Conexión a la base de datos con PDO (subiendo un nivel desde la carpeta views)
require_once "../php/conexion.php";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Foundify | Proyectos</title>
    <link rel="stylesheet" href="../css/estiloP.css">
</head>
<body>

<nav>
    <a href="../indexbienvenida.html">cerrar sesión</a>
</nav>

<nav class="navbar">
    <div class="logo">Found<span>ify</span></div>

    <ul class="menu">
        <li><a href="../inicio.php"><i class="fa-solid fa-house"></i> Inicio</a></li>
        <li><a href="proyectos.php">Proyectos</a></li>
        <li><a href="comunidad.html">Comunidad</a></li>
    </ul>

    <div class="icons">
        <i class="fa-solid fa-glass-martini"></i>

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

<section class="hero">
    <h2>Descubre proyectos increíbles</h2>
    <p>Explora cientos de ideas innovadoras listas para cambiar el mundo.</p>
</section>

<!-- SECCIÓN DINÁMICA DE PROYECTOS DESDE SQL -->
<section class="mosaico">
    <?php
    try {
        // Consultamos todos los proyectos de la base de datos
        $sql = "SELECT * FROM Proyectos";
        $stmt = $conn->query($sql);
        $proyectos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Si existen proyectos, los recorremos y generamos una tarjeta por cada uno
        if (count($proyectos) > 0) {
            foreach ($proyectos as $row) {
                $titulo = htmlspecialchars($row['Titulo']);
                $descripcion = htmlspecialchars($row['Descripcion']);
                $meta = number_format($row['Meta_financiamiento'], 2);
                $idProyecto = $row['Id_proyecto'];
                
                // Lógica dinámica para la categoría, ícono e IMAGEN según el Id_categoria
                $catId = isset($row['Id_categoria']) ? $row['Id_categoria'] : 1;
                $catNombre = "Innovación";
                $catIcono = "🚀";
                // Imagen por defecto (Energía / Sostenibilidad)
                $imagen = "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200";

                if ($catId == 1) {
                    $catNombre = "Tecnología"; 
                    $catIcono = "💻";
                    $imagen = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200"; // Chips/Tech
                } elseif ($catId == 2) {
                    $catNombre = "Salud"; 
                    $catIcono = "❤️";
                    $imagen = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200"; // Médico/Salud
                } elseif ($catId == 3) {
                    $catNombre = "Agricultura / Medio Ambiente"; 
                    $catIcono = "🌾";
                    $imagen = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200"; // Campo/Naturaleza
                } elseif ($catId == 4) {
                    $catNombre = "Educación"; 
                    $catIcono = "📚";
                    $imagen = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200"; // Educación/Estudiantes
                }
    ?>
                <div class="card">
                    <img src="<?php echo $imagen; ?>" alt="Proyecto">
                    <div class="info">
                        <span><?php echo $catIcono . " " . $catNombre; ?></span>
                        <h3><?php echo $titulo; ?></h3>
                        <p><?php echo $descripcion; ?></p>
                        <div class="barra">
                            <div class="progreso" style="width: 75%;"></div>
                        </div>
                        <p>Meta: $<?php echo $meta; ?></p>
                        <a href="detalle_proyecto.php?id=<?php echo $idProyecto; ?>">Ver Proyecto</a>
                    </div>
                </div>
    <?php 
            }
        } else {
            echo "<p style='color: white; text-align: center; grid-column: 1/-1;'>No hay proyectos disponibles en este momento.</p>";
        }
    } catch (PDOException $e) {
        echo "<p style='color: red; text-align: center; grid-column: 1/-1;'>Error al cargar los proyectos: " . $e->getMessage() . "</p>";
    }
    ?>
</section>

<section class="footer">
    <div class="footer-contenido">
        <div class="footer-info">
            <h3>Foundify</h3>
            <p>Foundify es una plataforma dedicada a conectar a creadores de proyectos con personas interesadas en apoyarlos. Nuestra misión es fomentar la innovación y el emprendimiento, brindando un espacio seguro y confiable para que las ideas se conviertan en realidad.</p>
        </div>
        <div class="footer-links">
            <h3>Enlaces</h3>
            <a href="../inicio.html">Inicio</a>
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