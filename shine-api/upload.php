<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost","root","","shine_institute");

$admin_password = "123456";

$method = $_SERVER['REQUEST_METHOD'];


// ================= GET IMAGES =================

if($method == "GET"){

$result = $conn->query("SELECT * FROM gallery ORDER BY id DESC");

$data = [];

while($row = $result->fetch_assoc()){
$data[] = $row;
}

echo json_encode($data);

}



// ================= UPLOAD =================

if($method == "POST"){

$password = $_POST['password'];

if($password != $admin_password){

echo json_encode(["error"=>"Unauthorized"]);
exit;

}

$file = $_FILES['image'];

$name = time()."_".$file['name'];

$path = "uploads/".$name;

move_uploaded_file($file['tmp_name'],$path);

$conn->query("INSERT INTO gallery (image_path,title) VALUES ('$path','Gallery')");

echo json_encode(["status"=>"uploaded"]);

}



// ================= DELETE =================

if($method == "DELETE"){

$password = $_GET['password'];

if($password != $admin_password){

echo json_encode(["error"=>"Unauthorized"]);
exit;

}

$id = $_GET['id'];

$res = $conn->query("SELECT image_path FROM gallery WHERE id=$id");

$row = $res->fetch_assoc();

$file = $row['image_path'];

if(file_exists($file)){
unlink($file);
}

$conn->query("DELETE FROM gallery WHERE id=$id");

echo json_encode(["status"=>"deleted"]);

}