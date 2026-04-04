<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$host = 'localhost';
$db   = 'auth_system';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // 🔥 ye zaroor add karo

    $raw = json_decode(file_get_contents("php://input"), true);

    // 🔎 debug: agar data nahi aa raha
    if (!$raw) {
        echo json_encode(["status" => "error", "message" => "No data received. Check JSON format."]);
        exit;
    }

    $action = $_GET['action'] ?? '';

    if ($action === 'signup') {
        $username = $raw['username'] ?? '';
        $password = $raw['password'] ?? '';

        if (!$username || !$password) {
            echo json_encode(["status" => "error", "message" => "Please provide username and password"]);
            exit;
        }

        // Check if user already exists
        $check = $pdo->prepare("SELECT 1 FROM users WHERE username = ?");
        $check->execute([$username]);
        if ($check->fetch()) {
            echo json_encode(["status" => "error", "message" => "User already exists"]);
            exit;
        }

        $hashed = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        if ($stmt->execute([$username, $hashed])) {
            echo json_encode(["status" => "success", "message" => "Account Created!"]);
        } else {
            print_r($stmt->errorInfo()); // 🔥 error detail dekhne ke liye
            echo json_encode(["status" => "error", "message" => "Signup failed"]);
        }

    } elseif ($action === 'login') {
        $username = $raw['username'] ?? '';
        $password = $raw['password'] ?? '';

        if (!$username || !$password) {
            echo json_encode(["status" => "error", "message" => "Username or password missing"]);
            exit;
        }

        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            echo json_encode(["status" => "success", "user" => $user['username']]);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid Username/Password"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Action missing: ?action=login or ?action=signup"]);
    }

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
