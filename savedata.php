<?php
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $filename = 'flashcards.txt';
    file_put_contents($filename, json_encode($data));
    echo 'Data saved successfully!';
} else {
    echo 'Error: Invalid data.';
}
?>