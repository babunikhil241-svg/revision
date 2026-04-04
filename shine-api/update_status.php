<?php
require_once 'config.php';
setCORSHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['id']) || empty($data['status'])) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'id and status are required.']);
    exit;
}

$allowed_statuses = ['pending', 'confirmed', 'cancelled'];
if (!in_array($data['status'], $allowed_statuses)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Invalid status value.']);
    exit;
}

$conn = getConnection();

$stmt = $conn->prepare("UPDATE enrollments SET status = ? WHERE id = ?");
$stmt->bind_param('si', $data['status'], $data['id']);

if ($stmt->execute() && $stmt->affected_rows > 0) {
    echo json_encode(['success' => true, 'message' => 'Status updated.']);
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Record not found or no change made.']);
}

$stmt->close();
$conn->close();
