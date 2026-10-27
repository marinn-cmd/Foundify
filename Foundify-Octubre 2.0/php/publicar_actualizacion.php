<?php
session_start();
require_once "conexion.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $id_usuario = $_SESSION['id_usuario'] ?? null;
    $id_proyecto = trim($_POST["id_proyecto"]);
    $texto = trim($_POST["texto"]);

    // Manejo de imagen (opcional)
    $rutaImagen = null;
    if (isset($_FILES["imagen"]) && $_FILES["imagen"]["error"] === UPLOAD_ERR_OK) {
        $carpetaDestino = "../assets/imagenes/publicaciones/";
        if (!is_dir($carpetaDestino)) {
            mkdir($carpetaDestino, 0755, true);
        }

        $extension = pathinfo($_FILES["imagen"]["name"], PATHINFO_EXTENSION);
        $nombreArchivo = "post_" . time() . "_" . uniqid() . "." . $extension;
        $rutaCompleta = $carpetaDestino . $nombreArchivo;

        if (move_uploaded_file($_FILES["imagen"]["tmp_name"], $rutaCompleta)) {
            $rutaImagen = "assets/imagenes/publicaciones/" . $nombreArchivo;
        }
    }

    try {
        $sql = "INSERT INTO Publicaciones (Id_usuario, Id_proyecto, Texto, Imagen) 
                VALUES (:id_usuario, :id_proyecto, :texto, :imagen)";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(":id_usuario", $id_usuario);
        $stmt->bindParam(":id_proyecto", $id_proyecto);
        $stmt->bindParam(":texto", $texto);
        $stmt->bindParam(":imagen", $rutaImagen);

        $stmt->execute();

        header("Location: ../inicio.php?publicado=1");
        exit;

    } catch (PDOException $e) {
        echo "Error al publicar: " . $e->getMessage();
    }

} else {
    header("Location: ../inicio.php");
    exit;
}
?>