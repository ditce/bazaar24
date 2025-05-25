<?php
if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    header("HTTP/1.0 404 Not Found");
    die();
}

$userId = isset($_GET['id']) ? $_GET['id'] : null;

if (!$userId) {
    http_response_code(400);
    echo json_encode(['error' => 'User ID is required']);
    die();
}

require_once __DIR__ . '/../entities/Users.php';

try {
    $user = User::findById($userId);
    
    if (!$user) {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
        die();
    }

    echo json_encode([
        'id' => $user->id,
        'username' => $user->full_name,
        'email' => $user->email,
        'created_at' => $user->created_at
    ]);
    
} catch (Exception $e) {
    error_log('Error fetching user: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred while fetching user data']);
}

die();
?>
