<?php

$host = 'dpg-ctvumd2j1k6c73dsvvtg-a.frankfurt-postgres.render.com';
$user = 'test_vkpe_user';
$password = 'UV2N33w1DzuNmAO6FV59kvC08zhREzFk';
$dbname = 'test_vkpe';
$port = '5432'; 

$dsn = "pgsql:host=$host;port=$port;dbname=$dbname";

try {
    $conn = new PDO($dsn, $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Connected to the database successfully!";
} catch (PDOException $e) {
    die("Database connection error: " . $e->getMessage());
}
?>
