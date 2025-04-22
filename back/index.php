<?php
session_set_cookie_params([
    'lifetime' => 3600,
    'path' => '/',
    'secure' => false,
    'httponly' => true,
    'samesite' => 'None',
]);
session_start();

header("Access-Control-Allow-Origin: http://localhost:5175");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit;
}

$url = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
header('Content-Type: application/json');

$routes = [
    'register' => function() {
        include './auth/register.php';
    },
    'login' => function() {
        include './auth/login.php';
    },
    'me' => function() {
        include './auth/user_me.php';
    },
];

if (array_key_exists($url, $routes)) {
    $routes[$url]();
} else {
    echo "404 Page Not Found";
}

?>
