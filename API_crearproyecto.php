<?php
session_start();
header('Content-Type: application/json');

// CORS (igual que tu otra API, permite GET y POST)
$origen = $_SERVER['HTTP_ORIGIN'] ?? '';
if (preg_match('#^http://(localhost|127\.0\.0\.1)(:\d+)?$#', $origen)) {
    header("Access-Control-Allow-Origin: $origen");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (!in_array($_SERVER['REQUEST_METHOD'], ['GET', 'POST'], true)) {
    http_response_code(405);
    echo json_encode(['message' => 'Método no permitido.']);
    exit;
}

// El usuario debe tener la sesión iniciada (misma clave que guarda el login)
if (!isset($_SESSION['user_Id_usuario'])) {
    http_response_code(401);
    echo json_encode(['message' => 'Debes iniciar sesión para publicar un proyecto.']);
    exit;
}

$idUsuario = $_SESSION['user_Id_usuario'];

// GET: devuelve el usuario de la sesión para mostrarlo en el formulario
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        'ok' => true,
        'Id_usuario' => $idUsuario,
        'nombre' => $_SESSION['nombre'] ?? ''
    ]);
    exit;
}

// POST: crear el proyecto
$input = json_decode(file_get_contents('php://input'), true);
$titulo = trim($input['Titulo_Proyecto'] ?? '');
$descripcion = trim($input['Descripcion'] ?? '');
$idCategoria = (int)($input['Id_Categoria'] ?? 0);
$meta = trim((string)($input['Meta_Financiamiento'] ?? ''));
$estado = trim($input['Estado'] ?? '');
$fechaLimite = trim($input['Fecha_Limite'] ?? '');

try {
    // Validaciones
    if ($titulo === '' || $descripcion === '') {
        http_response_code(400);
        echo json_encode(['message' => 'El título y la descripción son obligatorios.']);
        exit;
    }

    if ($idCategoria < 1 || $idCategoria > 14) {
        http_response_code(400);
        echo json_encode(['message' => 'Categoría inválida.']);
        exit;
    }

    if (!is_numeric($meta) || (float)$meta <= 0) {
        http_response_code(400);
        echo json_encode(['message' => 'La meta de financiamiento debe ser un número mayor a 0.']);
        exit;
    }

    $estadosValidos = ['abierta', 'cerrada', 'en financiamiento', 'sin financiar', 'financiada', 'no cumplio meta'];
    if (!in_array($estado, $estadosValidos, true)) {
        http_response_code(400);
        echo json_encode(['message' => 'Estado inválido.']);
        exit;
    }

    $fecha = DateTime::createFromFormat('Y-m-d', $fechaLimite);
    if (!$fecha || $fecha->format('Y-m-d') !== $fechaLimite) {
        http_response_code(400);
        echo json_encode(['message' => 'Fecha límite inválida.']);
        exit;
    }

    require __DIR__ . '/Conexion.php'; // carga $host, $port, $user, $password, $db

    $conexion = new PDO(
        "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4",
        $user,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false
        ]
    );  

    // Guardar proyecto (el Id_Usuario sale de la sesión y el Id_Proyecto lo genera MySQL con AUTO_INCREMENT)
    $stmt = $conexion->prepare(
        'INSERT INTO Proyectos (Id_usuario, Titulo, Descripcion, Id_Categoria, Meta_Financiamiento, Estado, Fecha_Limite)
         VALUES (:id_usuario, :titulo, :descripcion, :id_categoria, :meta, :estado, :fecha_limite)'
    );
    $stmt->execute([
        ':id_usuario' => $idUsuario,
        ':titulo' => $titulo,   
        ':descripcion' => $descripcion,
        ':id_categoria' => $idCategoria,
        ':meta' => (float)$meta,
        ':estado' => $estado,
        ':fecha_limite' => $fechaLimite
    ]);

    http_response_code(201);
    echo json_encode([
        'ok' => true,
        'Id_Proyecto' => (int)$conexion->lastInsertId()
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Error del servidor: ' . $e->getMessage()]);
}