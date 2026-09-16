<?php
require_once "conexion.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $id_usuario  = trim($_POST["id_usuario"]);
    $nombre      = trim($_POST["nombre"]);
    $titulo      = trim($_POST["titulo"]);
    $descripcion = trim($_POST["descripcion"]);
    $correo      = trim($_POST["correo"]);

    try {
        $sql = "UPDATE usuarios 
                SET nombre = :nombre, titulo = :titulo, descripcion = :descripcion, correo = :correo 
                WHERE id_usuario = :id_usuario";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(":nombre", $nombre);
        $stmt->bindParam(":titulo", $titulo);
        $stmt->bindParam(":descripcion", $descripcion);
        $stmt->bindParam(":correo", $correo);
        $stmt->bindParam(":id_usuario", $id_usuario);

        $stmt->execute();

        header("Location: perfil.html?actualizado=1");
        exit;

    } catch (PDOException $e) {
        echo "Error al actualizar el perfil: " . $e->getMessage();
    }

} else {
    header("Location: editar_perfil.html");
    exit;
}
?>