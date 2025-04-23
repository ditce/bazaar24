
<?php
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    header("HTTP/1.0 404 Not Found");
    die();
}

echo json_encode([
    'message' => 'To Be Implemented',
]);
?>
