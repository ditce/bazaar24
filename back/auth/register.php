<?php

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    header("HTTP/1.0 404 Not Found");
    die();
}

require __DIR__ . '/../entities/Users.php';

$rawInput = file_get_contents("php://input");
$request = json_decode($rawInput, true);

$required_fields = ['email', 'password', 'firstName', 'lastName', 'gender', 'phone_number'];

$hasEmptyFields = array_any($required_fields, fn($input) => empty($request[$input]));

if ($hasEmptyFields) {
    http_response_code(400);
    echo json_encode(['error' => 'All required fields must be filled']);
    die();
}

if ($request['password'] !== $request['confirmPassword']) {
    http_response_code(400);
    echo json_encode(['error' => 'Passwords do not match']);
    die();
}

if (User::findByEmail($request['email'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Email already in use']);
    die();
}

if (!$day || !$year || empty($month)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid date of birth']);
    die();
}

$months = ["Jan" => 1, "Feb" => 2, "Mar" => 3, "Apr" => 4, "May" => 5, "Jun" => 6, 
           "Jul" => 7, "Aug" => 8, "Sep" => 9, "Oct" => 10, "Nov" => 11, "Dec" => 12];
$monthNum = $months[$month] ?? null;

if (!$monthNum) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid month']);
    die();
}

$dob = sprintf('%04d-%02d-%02d', $year, $monthNum, $day);

$full_name = htmlspecialchars($request['firstName']) . ' ' . htmlspecialchars($request['lastName']);

$userData = [
    'email' => htmlspecialchars($request['email']),
    'password_hash' => password_hash($request['password'], PASSWORD_DEFAULT),
    'full_name' => $full_name,
    'gender' => htmlspecialchars($request['gender']),
    'phone_number' => htmlspecialchars($request['phone_number']),
    'date_of_birth' => $dob,
    'created_at' => date('Y-m-d H:i:s'),
];

$newUser = new User($userData);
$newUser->save();

// Auto-login after registration
$_SESSION['user_id'] = $newUser->id;
$_SESSION['email'] = $newUser->email;

echo json_encode(['message' => 'User registered successfully']);
die();
?>
