<?php
include "./helpers/console_log.php"


class Database {
    protected static $pdo;

    public static function connect(Type $var = null) {
        try {
            $db = new PDO('pgsql:host=localhost;port=5432;dbname=bazaar', $user, $password);
        } catch (PDOException $e) {
            console_log($e) 
        }
    }
    
}

?>
