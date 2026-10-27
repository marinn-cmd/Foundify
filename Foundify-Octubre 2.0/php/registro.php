<?php
session_start();
require_once 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $tipoID    = $_POST['documento'];
    $documento = $_POST['identificacion'];
    $nombre    = $_POST['nombres'];
    $apellido  = $_POST['apellidos'];
    $rol       = $_POST['rol'];
    $correo    = $_POST['email'];
    $genero    = $_POST['genero'];
    $edad      = $_POST['edad'];
    $telefono  = $_POST['telefono'];
    $clave     = $_POST['contraseña'];

    if (strlen($clave) < 8) {
        echo "La contraseña debe tener mínimo 8 caracteres.";
        exit();
    }

    $password_encriptada = password_hash($clave, PASSWORD_DEFAULT);

    try {
        $sql = "INSERT INTO Usuarios (Tipo_id, Id_usuario, Nombres, Apellidos, Genero, Edad, Email, Telefono, Password, Estado, Id_Roles) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($sql);
        $stmt->execute([
            $tipoID,
            $documento,
            $nombre,
            $apellido,
            $genero,
            $edad,
            $correo,
            $telefono,
            $password_encriptada,
            '1',
            $rol
        ]);

        // Guardar la sesión (mismas claves que usa el login)
        $_SESSION['id_usuario'] = $documento;
        $_SESSION['correo']     = $correo;
        $_SESSION['nombre']     = $nombre;

        header("Location: ../inicio.php");
        exit();

    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            echo "Ese documento o correo ya está registrado.";
        } else {
            echo "Error al registrar. Intenta de nuevo.";
        }
    }
}
?>