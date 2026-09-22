<?php
require_once "credenciales.php";

try {
    $conn = new PDO("mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}

?>