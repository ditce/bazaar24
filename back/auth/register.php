<?php

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    header("HTTP/1.0 404 Not Found");
    die();
}

require '../entities/Users.php';

$rawInput = file_get_contents("php://input");

$request = json_decode($rawInput, true);

$input_fields = ['username', 'password', 'full_name', 'phone_number'];

$hasEmptyFields = array_any($input_fields, fn($input) => empty($request[$input]));

if ($hasEmptyFields) {
    http_response_code(400);
    return json_encode(['error' => 'Username and password required']);
    die();
}

if (User::findByEmail($email)) {
    http_response_code(400);
    return json_encode(['error' => 'Cannot create user']);
    die();
}

$data->password = password_hash($password, PASSWORD_DEFAULT);

$newUser = new User($data);
$newUser->save();

return json_encode(['message' => 'User registered successfully']);

?>
