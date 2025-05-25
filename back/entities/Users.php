<?php
require_once __DIR__ . '/BaseModel.php';

class User extends Model {
    protected $table = 'users';

    public static function findByEmail($email) {
        $pdo = Database::connect();
        if (!$pdo) {
            error_log("Database connection failed in findByEmail");
            return null;
        }

        $sql = 'SELECT * FROM users WHERE email = :email LIMIT 1';
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['email' => $email]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        error_log("findByEmail query for '$email' returned: " . ($user ? "user found" : "no user found"));

        return $user ? new static($user) : null;
    }
    
    public static function findByResetToken($token) {
        $pdo = Database::connect();
        if (!$pdo) {
            error_log("Database connection failed in findByResetToken");
            return null;
        }

        $sql = 'SELECT * FROM users WHERE reset_token = :token AND reset_token_expiry > NOW() LIMIT 1';
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['token' => $token]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        return $user ? new static($user) : null;
    }
}
?>
