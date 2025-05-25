<?php
if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    header("HTTP/1.0 404 Not Found");
    die();
}

require_once __DIR__ . '/../database.php';

$pdo = Database::connect();
if (!$pdo) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    die();
}

try {
    $stmt = $pdo->prepare('SELECT id, name FROM categories ORDER BY name');
    $stmt->execute();
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // If subcategories are requested, include them
    if (isset($_GET['with_subcategories']) && $_GET['with_subcategories']) {
        foreach ($categories as &$category) {
            $stmt = $pdo->prepare('SELECT id, name FROM subcategories WHERE category_id = ? ORDER BY name');
            $stmt->execute([$category['id']]);
            $category['subcategories'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }
    
    echo json_encode($categories);
} catch (PDOException $e) {
    error_log('Database error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to retrieve categories']);
}

die();
?>
