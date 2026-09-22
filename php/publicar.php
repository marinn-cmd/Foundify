<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once "conexion.php";

$idProyecto = $_POST['Id_Proyecto'];
$idusuario = $_POST['Id_Usuario'];
$titulo = $_POST['Titulo_Proyecto'];
$descripcion = $_POST['Descripcion'];
$idcategoria = $_POST['Id_Categoria'];
$metafinanciamiento = $_POST['Meta_Financiamiento'];
$estado = $_POST['Estado'];
$fechalimite = $_POST['Fecha_Limite'];

// Generamos un Id_Reporte automático (Ejemplo: si el proyecto es 1021, el reporte será RP1021)

try {
    // Consulta SQL con marcadores de posición (?)
    $sql = "INSERT INTO Proyectos (Id_proyecto, Titulo, Descripcion, Meta_financiamiento, Fecha_limite, Estado, Id_usuario, Id_categoria) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    
    // Ejecutamos pasando los valores en un arreglo en el mismo orden que los '?'
    $stmt->execute([
        $idProyecto, 
        $titulo, 
        $descripcion, 
        $metafinanciamiento, 
        $fechalimite, 
        $estado, 
        $idusuario, 
        $idcategoria
    ]);
    
    header("refresh:2;url=../views/comunidad.html");
    exit;

} catch (PDOException $e) {
    echo 'Error al guardar en la base de datos: ' . $e->getMessage();
}
?>