<?php
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    header("HTTP/1.0 404 Not Found");
    die();
}

require_once __DIR__ . '/../database.php';
require_once __DIR__ . '/../auth/auth.php';

$user = User::findByEmail($_SESSION['email']);
if (!$user) {
    http_response_code(401);
    echo json_encode(['error' => 'Authentication required']);
    die();
}

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
if (strpos($contentType, 'application/json') !== false) {
    $jsonData = json_decode(file_get_contents('php://input'), true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON format: ' . json_last_error_msg()]);
        die();
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Content-Type must be application/json']);
    die();
}

$data = [];
foreach ($jsonData as $key => $value) {
    if ($key === 'imageBase64' || $key === 'imageName' || $key === 'imageType') {
        $data[$key] = $value;
    } else {
        $data[$key] = is_string($value) ? htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8') : $value;
    }
}

$requiredFields = ['title', 'type', 'price', 'location', 'description'];
$missingFields = [];

foreach ($requiredFields as $field) {
    if (!isset($data[$field]) || (is_string($data[$field]) && trim($data[$field]) === '')) {
        $missingFields[] = $field;
    }
}

if (!empty($missingFields)) {
    http_response_code(400);
    echo json_encode([
        'error' => count($missingFields) > 1 ? 
            "Missing required fields: " . implode(', ', $missingFields) : 
            "Missing required field: " . $missingFields[0]
    ]);
    die();
}

$imagePath = null;
if (!empty($data['imageBase64']) && !empty($data['imageName'])) {
    $targetDir = __DIR__ . '/../../uploads/listings/';
    
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    }
    
    $imageFileType = '';
    if (!empty($data['imageType'])) {
        $mimeTypeParts = explode('/', $data['imageType']);
        $imageFileType = !empty($mimeTypeParts[1]) ? $mimeTypeParts[1] : '';
    }
    
    if (empty($imageFileType)) {
        $imageFileType = strtolower(pathinfo($data['imageName'], PATHINFO_EXTENSION));
    }
    
    $allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    if (!in_array($imageFileType, $allowedTypes)) {
        http_response_code(400);
        echo json_encode(['error' => 'Only JPG, JPEG, PNG, GIF & WEBP files are allowed']);
        die();
    }
    
    $uniqueName = uniqid('listing_') . '.' . $imageFileType;
    $targetFile = $targetDir . $uniqueName;
    
    $base64Image = $data['imageBase64'];
    $base64Image = preg_replace('/^data:image\/\w+;base64,/', '', $base64Image);
    $decodedImage = base64_decode($base64Image);
    
    if ($decodedImage === false) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid base64 image data']);
        die();
    }
    
    $imageSize = strlen($decodedImage);
    if ($imageSize > 5 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(['error' => 'File size should not exceed 5MB']);
        die();
    }
    
    if (file_put_contents($targetFile, $decodedImage) !== false) {
        $imagePath = '/uploads/listings/' . $uniqueName;
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save image file']);
        die();
    }
} else {
    $imagePath = '/uploads/listings/placeholder.jpg';
}

$pdo = Database::connect();

try {
    $pdo->beginTransaction();
    
    $stmt = $pdo->prepare("
        INSERT INTO listings (
            user_id, title, description, price, location, category, 
            image_url, features
        ) VALUES (
            :user_id, :title, :description, :price, :location, :type, 
            :image_url, :features
        )
    ");
    
    $features = [];
    
    switch ($data['type']) {
        case 'Makina':
            $features = [
                'brand' => $data['brand'] ?? null,
                'model' => $data['model'] ?? null,
                'year' => $data['year'] ?? null,
                'kilometers' => $data['kilometers'] ?? null,
                'fuel' => $data['fuel'] ?? null,
                'transmission' => $data['transmission'] ?? null,
                'engineSize' => $data['engineSize'] ?? null,
                'power' => $data['power'] ?? null,
                'color' => $data['color'] ?? null,
                'contactPhone' => $data['contactPhone'] ?? null
            ];
            break;
        case 'Shtepi':
            $features = [
                'zone' => $data['zone'] ?? null,
                'type' => $data['type'] ?? null,
                'area' => $data['area'] ?? null,
                'rooms' => $data['rooms'] ?? null,
                'floor' => $data['floor'] ?? null,
                'parking' => $data['parking'] ?? null,
                'construction_year' => $data['construction_year'] ?? null,
                'furnished' => $data['furnished'] ?? null,
                'contactPhone' => $data['contactPhone'] ?? null
            ];
            break;
        case 'Pune':
            $features = [
                'company' => $data['company'] ?? null,
                'salary' => $data['salary'] ?? null,
                'position' => $data['position'] ?? null,
                'schedule' => $data['schedule'] ?? null,
                'experience' => $data['experience'] ?? null,
                'education' => $data['education'] ?? null,
                'contactEmail' => $data['contactEmail'] ?? null
            ];
            break;
        case 'Qira':
            $features = [
                'rentalType' => $data['rentalType'] ?? null,
                'availableFrom' => $data['availableFrom'] ?? null,
                'duration' => $data['duration'] ?? null,
                'deposit' => $data['deposit'] ?? null,
                'contactPhone' => $data['contactPhone'] ?? null
            ];
            break;
    }
    
    $features = array_filter($features, function($value) {
        return $value !== null;
    });
    
    $stmt->bindParam(':user_id', $user['id']);
    $stmt->bindParam(':title', $data['title']);
    $stmt->bindParam(':description', $data['description']);
    $stmt->bindParam(':price', $data['price']);
    $stmt->bindParam(':location', $data['location']);
    $stmt->bindParam(':type', $data['type']);
    $stmt->bindParam(':image_url', $imagePath);
    $stmt->bindParam(':features', json_encode($features));
    
    $stmt->execute();
    $listingId = $pdo->lastInsertId();
    
    $pdo->commit();
    
    http_response_code(201); 
    echo json_encode([
        'success' => true,
        'message' => 'Listing created successfully',
        'id' => $listingId
    ]);
} catch (PDOException $e) {
    $pdo->rollBack();
    error_log('Database error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to create listing: ' . $e->getMessage()]);
}

die();
?>
