<?php

session_start();

header('Content-Type: application/json; charset=utf-8');

$origen = $_SERVER['HTTP_ORIGIN'] ?? '';
if (preg_match('#^http://(localhost|127\.0\.0\.1)(:\d+)?$#', $origen)) {
    header("Access-Control-Allow-Origin: $origen");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: GET, PUT, OPTIONS');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (!in_array($_SERVER['REQUEST_METHOD'], ['GET', 'PUT'], true)) {
    header('Allow: GET, PUT, OPTIONS');
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'mensaje' => 'Método no permitido.'
    ]);
    exit;
}

// Api_iniciosesion.php establece esta clave al iniciar sesión.
if (!isset($_SESSION['user_Id_usuario'])) {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'mensaje' => 'Usuario no autenticado.'
    ]);
    exit;
}

$id_usuario = $_SESSION['user_Id_usuario'];

require_once __DIR__ . '/Conexion.php';

try {
    $conn = new PDO(
        "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4",
        $user,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    error_log('Error al conectar para actualizar el perfil: ' . $e->getMessage());
    echo json_encode([
        'success' => false,
        'mensaje' => 'Error al conectar con la base de datos.'
    ]);
    exit;
}


/* =====================================================
   GET → CONSULTAR DATOS DEL USUARIO
   ===================================================== */

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    try {

        $sql = 'SELECT 
                    Nombres,
                    Apellidos,
                    Telefono,
                    Email
                FROM Usuarios
                WHERE Id_usuario = :id_usuario';

        $stmt = $conn->prepare($sql);

        $stmt->execute([
            ':id_usuario' => $id_usuario
        ]);

        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$usuario) {

            http_response_code(404);

            echo json_encode([
                'success' => false,
                'mensaje' => 'Usuario no encontrado.'
            ]);

            exit;
        }

        echo json_encode([
            'success' => true,
            'usuario' => [
                'nombres' => $usuario['Nombres'],
                'apellidos' => $usuario['Apellidos'],
                'telefono' => $usuario['Telefono'],
                'correo' => $usuario['Email']
            ]
        ]);

        exit;

    } catch (PDOException $e) {

        http_response_code(500);

        error_log('Error al consultar el perfil: ' . $e->getMessage());

        echo json_encode([
            'success' => false,
            'mensaje' => 'Error al consultar el perfil.'
        ]);

        exit;
    }
}


/* =====================================================
   PUT → ACTUALIZAR DATOS DEL USUARIO
   ===================================================== */

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {

    // Recibir JSON enviado por React
    $datos = json_decode(file_get_contents('php://input'), true);

    // Verificar JSON
    if (json_last_error() !== JSON_ERROR_NONE || !is_array($datos)) {

        http_response_code(400);

        echo json_encode([
            'success' => false,
            'mensaje' => 'JSON inválido.'
        ]);

        exit;
    }

    // Obtener datos
    $nombres = trim($datos['nombres'] ?? '');
    $apellidos = trim($datos['apellidos'] ?? '');
    $telefono = trim($datos['telefono'] ?? '');
    $correo = trim($datos['correo'] ?? '');

    // Verificar campos
    if (
        $nombres === '' ||
        $apellidos === '' ||
        $telefono === '' ||
        $correo === ''
    ) {

        http_response_code(400);

        echo json_encode([
            'success' => false,
            'mensaje' => 'Todos los campos son obligatorios.'
        ]);

        exit;
    }

    try {

        $sql = 'UPDATE Usuarios
                SET Nombres = :nombres,
                    Apellidos = :apellidos,
                    Telefono = :telefono,
                    Email = :correo
                WHERE Id_usuario = :id_usuario';

        $stmt = $conn->prepare($sql);

        $stmt->execute([
            ':nombres' => $nombres,
            ':apellidos' => $apellidos,
            ':telefono' => $telefono,
            ':correo' => $correo,
            ':id_usuario' => $id_usuario
        ]);

        // Actualizar datos de la sesión
        $_SESSION['nombre'] = $nombres;
        $_SESSION['correo'] = $correo;

        echo json_encode([
            'success' => true,
            'mensaje' => 'Perfil actualizado correctamente.'
        ]);

        exit;

    } catch (PDOException $e) {

        http_response_code(500);

        error_log('Error al actualizar el perfil: ' . $e->getMessage());

        echo json_encode([
            'success' => false,
            'mensaje' => 'Error al actualizar el perfil.'
        ]);

        exit;
    }
}


?>