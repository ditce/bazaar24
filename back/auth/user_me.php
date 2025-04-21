<?php

if ($_SERVER['REQUEST_METHOD'] != 'GET') {
    header("HTTP/1.0 404 Not Found");
    die();
}

require '../entities/Users.php';

session_start();

if (!isset($_SESSION['email'])) {
    http_response_code(403);
    echo json_encode([ 'error' => 'Problem with authentication']);
    die();
}

$currentUser = User::findByEmail($email);

echo json_encode($currentUser);

?>
