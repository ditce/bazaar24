<?php

class Database {
    protected static $pdo;

    public static function connect() {
        if (!self::$pdo) {
            $user = getenv('DB_USER') ?: 'postgres';
            $password = getenv('DB_PASSWORD') ?: 'Shadow';

            try {
                self::$pdo = new PDO('pgsql:host=localhost;port=5432;dbname=bazaar', $user, $password);
            } catch (PDOException $e) {
                error_log($e->getMessage());
                return null;
            }
        }
        return self::$pdo;
    }
}

?>
