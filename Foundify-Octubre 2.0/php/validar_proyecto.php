<?php
require_once('conexion.php'); 

if (isset($_POST['id_proyecto'])) {
    $id_proyecto = $_POST['id_proyecto'];

    $query = "SELECT Id_proyecto FROM Proyectos WHERE Id_proyecto = :id_proyecto";
    
    try {
        $stmt = $miconexion->prepare($query);
        $stmt->bindParam(':id_proyecto', $id_proyecto, PDO::PARAM_INT);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['existe' => true]);
        } else {
            echo json_encode(['existe' => false]);
        }
    } catch (PDOException $e) {
        echo json_encode(['existe' => false, 'error' => 'Error en la base de datos']);
    }
}

$miconexion = null;
?>