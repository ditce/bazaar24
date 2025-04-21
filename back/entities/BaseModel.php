<?php

require_once __DIR__ . '/../database.php';

abstract class Model {
    protected $table;
    protected $primaryKey = 'id';
    protected $attributes = [];

    private function generateUuidv4() {
      $data = random_bytes(16);

      $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
      $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
        
      return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }

    public function __construct(array $attributes = []) {
        $this->attributes = $attributes;
    }

    public static function find($id): ?Model {
        $instance = new static();
        $pdo = Database::connect();

        $sql = "SELECT * FROM {$instance->table} WHERE id = :id LIMIT 1";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['id' => $id]);

        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        return $data ? new static($data) : null;
    }

    public static function all(): array {
        $instance = new static();
        $pdo = Database::connect();

        $sql = "SELECT * FROM {$instance->table}";
        $stmt = $pdo->query($sql);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return array_map(fn($row) => new static($row), $results);
    }

    public function save(): void {
        $pdo = Database::connect();

        $fields = array_keys($this->attributes);
        $placeholders = array_map(fn($f) => ":$f", $fields);

        if (!isset($this->attributes['id'])) {
            $this->attributes['id'] = $this->generateUuidv4();
            $sql = "INSERT INTO {$this->table} (" . implode(', ', $fields) . ")
                    VALUES (" . implode(', ', $placeholders) . ")";
        } else {
            $set = implode(', ', array_map(fn($f) => "$f = :$f", $fields));
            $sql = "UPDATE {$this->table} SET $set WHERE id = :pk";
        }

        $stmt = $pdo->prepare($sql);

        foreach ($this->attributes as $field => $value) {
            $stmt->bindValue(":$field", $value);
        }

        if (isset($this->attributes[$this->primaryKey])) {
            $stmt->bindValue(':pk', $this->attributes[$this->primaryKey]);
        }

        $stmt->execute();
    }

    public function delete(): void {
        $pdo = Database::connect();

        $sql = "DELETE FROM {$this->table} WHERE {$this->primaryKey} = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['id' => $this->attributes[$this->primaryKey]]);
    }
}
