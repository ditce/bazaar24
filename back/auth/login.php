<?php

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    header("HTTP/1.0 404 Not Found");
    die();
}

require __DIR__ . '/../entities/Users.php';

$rawInput = file_get_contents("php://input");

$request = json_decode($rawInput, true);

$input_fields = ['email', 'password'];

$hasEmptyFields = array_any($input_fields, fn($input) => empty($request[$input]));

if ($hasEmptyFields) {
    http_response_code(400);
    echo json_encode(['error' => 'Username and password required']);
    die();
}

$user = User::findByEmail(htmlspecialchars($request['email']));

$isCorrectPassword = password_verify(htmlspecialchars($request['password']), $user->password ?? '');

if (!$user || !$isCorrectPassword) {
    http_response_code(403);
    echo json_encode(['error' => 'Wrong Credentials']);
    die();
}

session_start();

$_SESSION['user_id'] = $user->id;
$_SESSION['email'] = $user->email;

echo json_encode([
    'message' => 'Logged in successfully',
]);

die();
