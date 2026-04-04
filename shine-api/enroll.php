<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once 'config.php';
setCORSHeaders(); // Yeh function saare headers handle kar lega

// Baaki ka code niche...

// Agar request 'OPTIONS' (preflight) hai, toh yahin stop karein
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

// Aapka baaki ka code yahan se shuru hoga...
require_once 'config.php';
setCORSHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// Parse JSON body
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON payload.']);
    exit;
}

// --- Validation ---
$required = ['course_id', 'course_name', 'price', 'batch', 'student_name'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(422);
        echo json_encode([
            'success' => false,
            'message' => "Missing required field: $field"
        ]);
        exit;
    }
}

$course_id   = (int)   $data['course_id'];
$course_name = trim(   $data['course_name']);
$price       = (float) $data['price'];
$batch       = trim(   $data['batch']);
$student_name = trim(  $data['student_name']);

// Sanity checks
if ($course_id <= 0 || $price <= 0) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Invalid course ID or price.']);
    exit;
}

if (strlen($student_name) < 2) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Student name is too short.']);
    exit;
}

// --- Insert ---
$conn = getConnection();

$stmt = $conn->prepare(
    "INSERT INTO enrollments (course_id, course_name, price, batch, student_name)
     VALUES (?, ?, ?, ?, ?)"
);

$stmt->bind_param('isdss', $course_id, $course_name, $price, $batch, $student_name);

if ($stmt->execute()) {
    $enrollment_id = $stmt->insert_id;
    http_response_code(201);
    echo json_encode([
        'success'       => true,
        'message'       => 'Enrollment successful.',
        'enrollment_id' => $enrollment_id
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save enrollment.']);
}

$stmt->close();
$conn->close();
