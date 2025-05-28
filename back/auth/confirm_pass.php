<?php

require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';
require 'phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    header("HTTP/1.0 404 Not Found");
    die();
}

require __DIR__ . '/../entities/Users.php';

$rawInput = file_get_contents("php://input");
$request = json_decode($rawInput, true);

if (empty($request['code'])) {
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

error_log("Reset token for {$user->email}: $resetToken");

$mail = new PHPMailer(true);

$mail->isSMTP();
$mail->Host       = 'smtp.gmail.com';
$mail->SMTPAuth   = true;
$mail->Username   = 'bazzaar24@gmail.com';
$mail->Password   = '';
$mail->SMTPSecure = 'tls';
$mail->Port       = 587;

$mail->setFrom('bazzaar24@gmail.com', 'Bazaar');
$mail->addAddress($user->email, 'Recipient');

$mail->isHTML(true);
$mail->Subject = 'Verification Code';
$mail->Body    = 'Hello! You have requested to change your password. Enter this code to proceed to change your password.' . $resetToken;

$mail->send();

echo json_encode([
    'message' => 'Message has been sent.'
]);

die();
?>
