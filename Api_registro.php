<?php
session_start();
header('Content-Type: application/json');

// CORS (igual que tu otra API, permite POST)
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
$tipoId = trim($input['Tipo_documento'] ?? '');
$idUsuario = trim($input['Identificacion'] ?? '');
$nombres = trim($input['Nombres'] ?? '');
$apellidos = trim($input['Apellidos'] ?? '');
$idRol = (int)($input['Rol'] ?? 0);
$correo = strtolower(trim($input['Email'] ?? ''));
$genero = trim($input['Genero'] ?? '');
$edad = trim((string)($input['Edad'] ?? ''));
$telefono = trim($input['Telefono'] ?? '');
$passwordIngresada = $input['Password'] ?? '';

try {
    // Validaciones
    if (!in_array($tipoId, ['CC', 'PPT'], true) || $idUsuario === '' || $nombres === '' || $apellidos === '') {
        http_response_code(400);
        echo json_encode(['message' => 'Datos de identificación y nombres incompletos.']);
        exit;
    }

    // Longitudes máximas según la tabla Usuarios
    if (mb_strlen($idUsuario) > 20 || mb_strlen($nombres) > 30 || mb_strlen($apellidos) > 30
        || mb_strlen($correo) > 40 || mb_strlen($telefono) > 15) {
        http_response_code(400);
        echo json_encode(['message' => 'Alguno de los campos supera la longitud permitida.']);
        exit;
    }

    if (!in_array($idRol, [1, 2, 3], true)) {
        http_response_code(400);
        echo json_encode(['message' => 'Rol inválido.']);
        exit;
    }

    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['message' => 'Correo electrónico inválido.']);
        exit;
    }

    if (strlen($passwordIngresada) < 8) {
        http_response_code(400);
        echo json_encode(['message' => 'La contraseña debe tener mínimo 8 caracteres.']);
        exit;
    }

    if ($genero !== '' && !in_array($genero, ['M', 'F'], true)) {
        http_response_code(400);
        echo json_encode(['message' => 'Género inválido.']);
        exit;
    }

    if ($edad !== '' && ((int)$edad < 1 || (int)$edad > 120)) {
        http_response_code(400);
        echo json_encode(['message' => 'Edad inválida.']);
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

    // Verificar que no exista el correo ni la identificación (Id_usuario)
    $stmt = $conexion->prepare('SELECT Id_usuario FROM Usuarios WHERE Email = :correo OR Id_usuario = :id_usuario');
    $stmt->execute([
        ':correo' => $correo,
        ':id_usuario' => $idUsuario
    ]);

    if ($stmt->fetch(PDO::FETCH_ASSOC)) {
        http_response_code(409);
        echo json_encode(['message' => 'Ya existe un usuario con ese correo o número de identificación.']);
        exit;
    }

    // Guardar usuario (la contraseña se guarda encriptada)
    $passwordHash = password_hash($passwordIngresada, PASSWORD_DEFAULT);

    $stmt = $conexion->prepare(
        'INSERT INTO Usuarios (Tipo_id, Id_usuario, Nombres, Apellidos, Genero, Edad, Email, Telefono, Password, Id_Roles)
         VALUES (:tipo_id, :id_usuario, :nombres, :apellidos, :genero, :edad, :correo, :telefono, :password, :id_roles)'
    );
    $stmt->execute([
        ':tipo_id' => $tipoId,
        ':id_usuario' => $idUsuario,
        ':nombres' => $nombres,
        ':apellidos' => $apellidos,
        ':genero' => $genero !== '' ? $genero : null,
        ':edad' => $edad !== '' ? (int)$edad : null,
        ':correo' => $correo,
        ':telefono' => $telefono !== '' ? $telefono : null,
        ':password' => $passwordHash,
        ':id_roles' => $idRol
    ]);

    http_response_code(201);
    echo json_encode(['ok' => true]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Error del servidor: ' . $e->getMessage()]);
}