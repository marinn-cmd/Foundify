<?php
session_start();
header('Content-Type: application/json');

// CORS (igual que tu otra API, pero permite POST)
$origen = $_SERVER['HTTP_ORIGIN'] ?? '';
if (preg_match('#^http://(localhost|127\.0\.0\.1)(:\d+)?$#', $origen)) {
    header("Access-Control-Allow-Origin: $origen");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Método no permitido.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$correo = trim($input['Email'] ?? '');
$passwordIngresada = $input['Password'] ?? '';

try {
    require __DIR__ . '/Conexion.php'; 

    $conexion = new PDO(
        "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4",
        $user,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false
        ]
    );

    $stmt = $conexion->prepare('SELECT Id_usuario, Email, Password, Nombres FROM Usuarios WHERE Email = :correo');
    $stmt->execute([':correo' => $correo]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario || !password_verify($passwordIngresada, $usuario['Password'])) {
        http_response_code(401);
        echo json_encode(['message' => 'Correo o contraseña incorrectos.']);
        exit;
    }

    // Misma clave que revisa Api_iniciosesion.php
    $_SESSION['user_Id_usuario'] = $usuario['Id_usuario'];
    $_SESSION['correo'] = $usuario['Email'];
    $_SESSION['nombre'] = $usuario['Nombres'];

    echo json_encode(['ok' => true]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Error del servidor: ' . $e->getMessage()]);
}