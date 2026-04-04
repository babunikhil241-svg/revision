<?php
require_once 'config.php';
setCORSHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

$conn = getConnection();

// Optional filters via query params: ?status=pending&course_id=2
$where  = [];
$params = [];
$types  = '';

if (!empty($_GET['status'])) {
    $where[]  = 'status = ?';
    $params[] = $_GET['status'];
    $types   .= 's';
}

if (!empty($_GET['course_id'])) {
    $where[]  = 'course_id = ?';
    $params[] = (int) $_GET['course_id'];
    $types   .= 'i';
}

$sql = "SELECT * FROM enrollments";
if ($where) {
    $sql .= ' WHERE ' . implode(' AND ', $where);
}
$sql .= ' ORDER BY enrolled_at DESC';

$stmt = $conn->prepare($sql);

if ($params) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

$enrollments = [];
while ($row = $result->fetch_assoc()) {
    $enrollments[] = $row;
}

echo json_encode([
    'success' => true,
    'count'   => count($enrollments),
    'data'    => $enrollments
]);

$stmt->close();
$conn->close();
