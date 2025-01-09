<?php
session_start();

$response = array("isLoggedIn" => false, "userId" => null);

if (isset($_SESSION['user_id'])) {
    $response["isLoggedIn"] = true;
    $response["userId"] = $_SESSION['user_id'];
}

header('Content-Type: application/json');
echo json_encode($response);
?>
