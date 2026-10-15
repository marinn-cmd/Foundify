<?php
session_start();
require_once 'conexion.php';

// Solo se acepta POST y con sesión iniciada
if ($_SERVER["REQUEST_METHOD"] !== "POST" || !isset($_SESSION['id_usuario'])) {
    header("Location: ../indexbienvenida.html");
    exit();
}

try {
    $stmt = $conn->prepare("DELETE FROM Usuarios WHERE Id_usuario = ?");
    $stmt->execute([$_SESSION['id_usuario']]);

    // Cerramos la sesión porque la cuenta ya no existe
    session_unset();
    session_destroy();

    header("Location: ../indexbienvenida.html");
    exit();
} catch (PDOException $e) {
    echo "Error al eliminar la cuenta: " . $e->getMessage();
}
?>