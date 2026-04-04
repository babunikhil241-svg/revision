<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root'); 
define('DB_PASS', ''); 
define('DB_NAME', 'shine_institute'); // Make sure database name is correct

function getConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if ($conn->connect_error) {
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'message' => 'Database connection failed: ' . $conn->connect_error
        ]);
        exit;
    }

    $conn->set_charset('utf8mb4');
    return $conn;
}

function setCORSHeaders() {
    // DHAYAN DEIN: Yahan koi extra bracket ya link format nahi hona chahiye
    header('Access-Control-Allow-Origin: http://localhost:5173'); 
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}