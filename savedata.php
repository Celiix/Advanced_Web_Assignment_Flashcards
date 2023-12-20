<?php
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $filename = 'flashcards.txt';
      $existingData = json_decode(file_get_contents($filename), true);

     // Add new data to existing data
   if ($existingData) {
    $data = array_merge($existingData, $data);
   }
    
 //Updated data save into the file
   file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT));

   echo 'Data saved!';
} else {
    echo 'Error! Data is invalid';
}   
?>
