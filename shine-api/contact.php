<?php
error_reporting(0); // Taaki warnings JSON ko kharab na karein
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Baaki code niche...

$conn = new mysqli("localhost", "root", "", "coaching_db");

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $name = $data['name'];
    $email = $data['email'];
    $phone = $data['phone'];
    $message = $data['message'];

    // 1. Database mein save karein
    $sql = "INSERT INTO contact_queries (name, email, phone, message) VALUES ('$name', '$email', '$phone', '$message')";
    
    if ($conn->query($sql) === TRUE) {
        
        // 2. Email Notification bhejein (Aapki email ID yahan likhein)
        $to = "babunikhil@gamil.com"; 
        $subject = "New Inquiry from Coaching Website";
        $body = "Name: $name\nEmail: $email\nPhone: $phone\nMessage: $message";
        $headers = "From: webmaster@yourwebsite.com";

        mail($to, $subject, $body, $headers); // Ye live server par kaam karega

        echo json_encode(["status" => "success", "message" => "Data saved & Mail sent!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database error"]);
    }
}
$conn->close();
?>