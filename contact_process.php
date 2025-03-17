<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include your database connection file
include 'connector.php'; // Make sure this path is correct

// Check if form is submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Debugging: Print form data
    //var_dump($_POST);

    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $inquiry_type = $_POST['inquiry_type'];
    $message = $_POST['message'];

    try {
        // Insert data into the contacts table
        $sql = "INSERT INTO contacts (name, email, inquiry_type, message) VALUES (:name, :email, :inquiry_type, :message)";
        $stmt = $pdo->prepare($sql);

        // Bind form data to SQL query
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':inquiry_type', $inquiry_type);
        $stmt->bindParam(':message', $message);

        // Execute the query and debug errors if any
        if ($stmt->execute()) {
            echo "Success";
        } else {
            echo "Failed";
            print_r($stmt->errorInfo()); // Print detailed error info
        }

    } catch (PDOException $e) {
        // Handle any errors
        echo "Error: " . $e->getMessage();
    }
}
?>
