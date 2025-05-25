<?php
session_set_cookie_params([
    'lifetime' => 3600,
    'path' => '/',
    'secure' => false,
    'httponly' => true,
    'samesite' => 'None',
]);
session_start();

header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$url = trim($path, '/');
$params = [];

$static_routes = [
    'register' => './auth/register.php',
    'login' => './auth/login.php',
    'me' => './auth/user_me.php',
    'forgot-password' => './auth/forgot_pass.php',
    'search' => './listing/search.php',
    'listing' => './listing/detail.php',
    'featured-listings' => './listing/featured.php',
    'categories' => './listing/categories.php',
    'subcategories' => './listing/subcategories.php',
];

if (isset($static_routes[$url])) {
    include $static_routes[$url];
    exit;
} else {
    if (preg_match('#^user/([^/]+)$#', $url, $matches)) {
        $_GET['id'] = $matches[1];
        include './user/profile.php';
        exit;
    } else {
        http_response_code(404);
        echo json_encode(['error' => '404 Page Not Found']);
        exit;
    }
}
?>
