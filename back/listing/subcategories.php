<?php
if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    header("HTTP/1.0 404 Not Found");
    die();
}

require_once __DIR__ . '/../database.php';

if (!isset($_GET['category_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Category ID is required']);
    die();
}

$categoryId = $_GET['category_id'];

$pdo = Database::connect();
if (!$pdo) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    die();
}

try {
    $stmt = $pdo->prepare('SELECT id, name FROM subcategories WHERE category_id = ? ORDER BY name');
    $stmt->execute([$categoryId]);
    $subcategories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($subcategories);
} catch (PDOException $e) {
    error_log('Database error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to retrieve subcategories']);
}

die();
?>
