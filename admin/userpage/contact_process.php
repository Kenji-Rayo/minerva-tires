<?php

// ✅ Enable error reporting for debugging (only in development)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// ✅ Include your database connection file
include '../dbconnection/connector.php';

// ✅ Check if the form is submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // ✅ Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $inquiry_type = $_POST['inquiry_type'];
    $message = $_POST['message'];

    try {
        // ✅ Prepare insert statement
        $sql = "INSERT INTO contacts (name, email, inquiry_type, message) 
                VALUES (:name, :email, :inquiry_type, :message)";
        $stmt = $pdo->prepare($sql);

        // ✅ Bind parameters
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':inquiry_type', $inquiry_type);
        $stmt->bindParam(':message', $message);

        // ✅ Execute and return only clean response
        if ($stmt->execute()) {
            ob_clean(); // ✅ Clear any unexpected output
            echo "Success"; // ✅ Must match what JS is expecting
        } else {
            ob_clean();
            echo "Failed"; // ✅ Safe fallback
        }

    } catch (PDOException $e) {
        ob_clean(); // ✅ Ensure clean response on error
        echo "Failed"; // ❌ Avoid printing $e->getMessage() for AJAX use
    }
}
?>
