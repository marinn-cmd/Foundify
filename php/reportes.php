<?php 
require_once 'conexion.php';

$idproyecto = $_POST['Id_proyecto'];
$idusuario = $_POST['Id_usuario'];
$nivelreporte = $_POST['Id_nivel_reporte'];
$descripcion = $_POST['Descripcion'];
$tiporeporte = $_POST['Tipo_reporte'];

// En PDO se recomiendan parámetros con nombre (:nombre) en lugar de signos de interrogación
$sql = "INSERT INTO Reportes (Tipo_reporte, Descripcion, Id_usuario, Id_proyecto, Id_nivel_reporte) 
        VALUES (:tiporeporte, :descripcion, :idusuario, :idproyecto, :nivelreporte)";

try {
    // 1. Preparamos la consulta
    $stmt = $miconexion->prepare($sql);
    
    // 2. Vinculamos las variables a los parámetros con nombre
    $stmt->bindParam(':tiporeporte', $tiporeporte);
    $stmt->bindParam(':descripcion', $descripcion);
    $stmt->bindParam(':idusuario', $idusuario);
    $stmt->bindParam(':idproyecto', $idproyecto);
    $stmt->bindParam(':nivelreporte', $nivelreporte);
    
    // 3. Ejecutamos la consulta
    $stmt->execute();
    
    // Redirigir de vuelta a la página donde está el botón
    echo "<script>
            window.location.href = 'reportes.html'; 
          </script>";
          
} catch (PDOException $e) {
    echo "Error al enviar el reporte: " . $e->getMessage();
}

// Para cerrar la conexión en PDO, basta con asignar null al objeto (opcional)
$miconexion = null;
?>  