<?php

if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    header("HTTP/1.0 404 Not Found");
    die();
}

require __DIR__ . '/../entities/Users.php';

if (!isset($_SESSION['email'])) {
    http_response_code(403);
    echo json_encode(['error' => 'Problem with authentication']);
    die();
}

$currentUser = User::findByEmail($_SESSION['email']);
error_log(print_r($currentUser, true));

echo json_encode(
    [
        'id' => $currentUser->id,
        'username' => $currentUser->full_name,
        'email' => $currentUser->email,
        'createdAt' => $currentUser->created_at,
        'isAdmin' => $currentUser->isAdmin,
    ]
);
