<?php

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    header("HTTP/1.0 404 Not Found");
    die();
}

require __DIR__ . '/../entities/Users.php';

$rawInput = file_get_contents("php://input");

$request = json_decode($rawInput, true);

$input_fields = ['email', 'username', 'password', 'full_name', 'phone_number'];

$hasEmptyFields = array_any($input_fields, fn($input) => empty($request[$input]));

if ($hasEmptyFields) {
    http_response_code(400);
    echo json_encode(['error' => 'Username and password required']);
    die();
}

if (User::findByEmail($request['email'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Cannot create user']);
    die();
}

$userData = [
    'email' => htmlspecialchars($request['email']),
    'username' => htmlspecialchars($request['username']),
    'password' => password_hash($request['password'], PASSWORD_DEFAULT),
    'full_name' => htmlspecialchars($request['full_name']),
    'phone_number' => htmlspecialchars($request['phone_number'])
];

$newUser = new User($userData);
$newUser->save();

echo json_encode(['message' => 'User registered successfully']);
die();
?>
