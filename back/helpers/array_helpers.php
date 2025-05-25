<?php
if (!function_exists('array_any')) {
    function array_any(array $array, callable $fn) {
    foreach ($array as $value) {
        if ($fn($value)) {
            return true;
        }
    }
    return false;
}
}
?>