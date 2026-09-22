<?php
session_start();
require_once "conexion.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    if (!isset($_SESSION['id_usuario'])) {
        header("Location: ../indexbienvenida.html");
        exit;
    }

    $id_usuario = $_SESSION['id_usuario'] = $usuario['Id_usuario'];
    $nombres    = trim($_POST["nombres"] ?? '');
    $apellidos  = trim($_POST["apellidos"] ?? '');
    $telefono   = trim($_POST["telefono"] ?? '');
    $correo     = trim($_POST["correo"] ?? '');

    try {
        // MUY IMPORTANTE: Asegúrate de que cada campo termine con una coma (,) excepto el último
        $sql = "UPDATE Usuarios 
                SET Nombres = :Nombres, 
                    Apellidos = :Apellidos, 
                    Telefono = :Telefono, 
                    Email = :Email 
                WHERE Id_usuario = :id_usuario";
        
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(":Nombres", $nombres);
        $stmt->bindParam(":Apellidos", $apellidos);
        $stmt->bindParam(":Telefono", $telefono);
        $stmt->bindParam(":Email", $correo);
        $stmt->bindParam(":id_usuario", $id_usuario, PDO::PARAM_INT);   

        $stmt->execute();

        header("Location: ../views/perfil.php?actualizado=1");
        exit;

    } catch (PDOException $e) {
        echo "Error al actualizar el perfil: " . $e->getMessage();
    }

} else {
    header("Location: ../views/editar_perfil.php");
    exit;
}
?>