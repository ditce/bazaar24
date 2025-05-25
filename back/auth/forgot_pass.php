<?php
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    header("HTTP/1.0 404 Not Found");
    die();
}

require __DIR__ . '/../entities/Users.php';

$rawInput = file_get_contents("php://input");
$request = json_decode($rawInput, true);

if (empty($request['email'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Email is required']);
    die();
}

$user = User::findByEmail(htmlspecialchars($request['email']));

if (!$user) {
    echo json_encode([
        'message' => 'If your email exists in our system, you will receive password reset instructions.'
    ]);
    die();
}

$resetToken = bin2hex(random_bytes(32));
$tokenExpiry = date('Y-m-d H:i:s', strtotime('+1 hour'));

$user->reset_token = $resetToken;
$user->reset_token_expiry = $tokenExpiry;
$user->save();

error_log("Reset token for {$user->email}: $resetToken");

echo json_encode([
    'message' => 'If your email exists in our system, you will receive password reset instructions.'
]);

die();
?>
