<?php
session_start();

header('Content-Type: application/json');

// CORS: permite cualquier puerto de localhost o 127.0.0.1 (solo para desarrollo)
$origen = $_SERVER['HTTP_ORIGIN'] ?? '';
if (preg_match('#^http://(localhost|127\.0\.0\.1)(:\d+)?$#', $origen)) {
    header("Access-Control-Allow-Origin: $origen");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
}

// Respuesta a la petición previa (preflight) del navegador
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Solo se permite GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['message' => 'Método no permitido.']);
    exit;
}

// Si no hay sesión iniciada, no se entrega nada
if (!isset($_SESSION['user_Id_usuario'])) {
    http_response_code(401);
    echo json_encode(['message' => 'Debes iniciar sesión.']);
    exit;
}

try {
    // Carga $host, $port, $user, $password y $db
    require __DIR__ . '/Conexion.php';

    $conexion = new PDO(
        "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4",
        $user,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            // Aiven exige conexión cifrada (SSL).
            PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false
        ]
    );

    // AJUSTA el nombre de la tabla a la tuya
    $stmt = $conexion->query('SELECT * FROM Proyectos');
    $proyectos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($proyectos);

} catch (Throwable $e) {
    http_response_code(500);
    // DEPURACIÓN: quita el detalle cuando ya funcione.
    echo json_encode(['message' => 'Error del servidor: ' . $e->getMessage()]);
}