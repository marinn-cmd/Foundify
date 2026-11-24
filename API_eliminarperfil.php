<?php

session_start();

header('Content-Type: application/json; charset=utf-8');

$origen = $_SERVER['HTTP_ORIGIN'] ?? '';
if (preg_match('#^http://(localhost|127\.0\.0\.1)(:\d+)?$#', $origen)) {
    header("Access-Control-Allow-Origin: $origen");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: DELETE, OPTIONS');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    header('Allow: DELETE, OPTIONS');
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
    error_log('Error al conectar para eliminar el perfil: ' . $e->getMessage());
    echo json_encode([
        'success' => false,
        'mensaje' => 'Error al conectar con la base de datos.'
    ]);
    exit;
}


/* =====================================================
   DELETE → ELIMINAR CUENTA DEL USUARIO
   ===================================================== */

try {

    $sql = 'DELETE FROM Usuarios
            WHERE Id_usuario = :id_usuario';

    $stmt = $conn->prepare($sql);

    $stmt->execute([
        ':id_usuario' => $id_usuario
    ]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'mensaje' => 'Usuario no encontrado.'
        ]);
        exit;
    }

    // Cerrar y destruir la sesión activa
    $_SESSION = [];

    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params['path'],
            $params['domain'],
            $params['secure'],
            $params['httponly']
        );
    }

    session_destroy();

    echo json_encode([
        'success' => true,
        'mensaje' => 'Cuenta eliminada correctamente.'
    ]);

    exit;

} catch (PDOException $e) {

    http_response_code(500);

    error_log('Error al eliminar el perfil: ' . $e->getMessage());

    // Código 23000 indica restricción de llave foránea (proyectos o donaciones asociadas)
    if ($e->getCode() === '23000') {
        echo json_encode([
            'success' => false,
            'mensaje' => 'No se puede eliminar la cuenta porque tiene proyectos o registros asociados.'
        ]);
        exit;
    }

    echo json_encode([
        'success' => false,
        'mensaje' => 'Error al eliminar la cuenta.'
    ]);

    exit;
}

?>