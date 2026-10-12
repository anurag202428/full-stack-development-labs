<?php
declare(strict_types=1);
// Local development defaults. Prefer environment variables for real deployments.
$host = getenv('DB_HOST') ?: '127.0.0.1';
$dbname = getenv('DB_NAME') ?: 'studentdb';
$username = getenv('DB_USER') ?: 'root';
$password = getenv('DB_PASSWORD') ?: '';
$dsn = "mysql:host={$host};dbname={$dbname};charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];
try {
    $pdo = new PDO($dsn, $username, $password, $options);
} catch (PDOException $exception) {
    http_response_code(500);
    exit('Database connection failed. Check local MySQL settings in config.php.');
}
