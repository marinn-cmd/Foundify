<?php 
require_once 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $tipoID = $_POST['documento'];
    $documento = $_POST['identificacion'];
    $nombre = $_POST['nombres'];
    $apellido = $_POST['apellidos'];
    $rol = $_POST['rol'];
    $correo = $_POST['email'];
    $genero = $_POST['genero'];
    $edad = $_POST['edad'];
    $telefono = $_POST['telefono'];
    $clave = $_POST['contraseña'];

    // Encriptamos la contraseña por seguridad
    $password_encriptada = password_hash($clave, PASSWORD_DEFAULT);

    try {
        $sql = "INSERT INTO Usuarios (Tipo_id, Id_usuario, Nombres, Apellidos, Genero, Edad, Email, Telefono, Password, Estado, Rol) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $conn->prepare($sql);
        
        // Pasamos los 11 valores correspondientes a los 11 signos '?'
        $stmt->execute([
            $tipoID,             // 1. Tipo_id
            $documento,          // 2. Id_usuario
            $nombre,             // 3. Nombres
            $apellido,           // 4. Apellidos
            $genero,             // 5. Genero
            $edad,               // 6. Edad
            $correo,             // 7. Email
            $telefono,           // 8. Telefono
            $password_encriptada,// 9. Password
            '1',                 // 10. Estado
            $rol                 // 11. Rol
        ]);
        header("Location: ../views/feed.html");
        exit();
    } catch (PDOException $e) {
        echo "Error al registrar: " . $e->getMessage();
    }
}
?>