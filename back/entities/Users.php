<?php
require __DIR__ . '/BaseModel.php';

class User extends Model {
    protected $table = 'users';

    public static function findByEmail($email) {
        $pdo = Database::connect();
        $sql = 'SELECT * FROM users WHERE email = :email LIMIT 1';
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['email' => $email]);

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        return $user ? new static($user) : null;
    }
}

?>
