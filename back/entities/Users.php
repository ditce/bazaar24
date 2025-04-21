<?php
require_once './BaseModel.php';

class User extends Model {
    protected $table = 'users';

    public static function findByEmail($email) {
        $pdo = Database::connect();
        $sql = 'SELECT * FROM users WHERE email = :email LIMIT 1';
        $stmt = $pdo->prepare($sql);

        $stmt->bindValue('email', $email, PDO::PARAM_STR);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        return $user ? new static($user) : 'No user found';
    }
}

?>
