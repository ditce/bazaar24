<?php

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
