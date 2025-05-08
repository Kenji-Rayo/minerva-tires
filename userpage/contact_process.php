<?php
// ✅ Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// include '../dbconnection/connector.php';

// 🔥 ADDED PHPMailer imports
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // ✅ Get form data
    $name         = $_POST['name']         ?? '';
    $email        = $_POST['email']        ?? '';
    $inquiry_type = $_POST['inquiry_type'] ?? '';
    $message      = $_POST['message']      ?? '';

    // validation
    if (empty($name) || empty($email) || empty($message)) {
        echo "Failed";
        exit;
    }

    // 🔥 SET UP PHPMailer
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'minervatires@gmail.com';  // Gmail address
        $mail->Password   = 'oskrmswaoonzfbht';       // App Password
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // 🔥 Email headers & body
        $mail->setFrom($email, $name);
        $mail->addAddress('minervatires@gmail.com', 'Minerva Tires');
        $mail->Subject = "Inquiry Type: {$inquiry_type}";
        $mail->Body    = "You’ve got a new message:\n\n"
                       . "Name: {$name}\n"
                       . "Email: {$email}\n"
                       . "Inquiry Type: {$inquiry_type}\n\n"
                       . "Message:\n{$message}";

        // 🔥 Send
        $mail->send();
        echo "Success"; // ✅ matches JS
    } catch (Exception $e) {
        echo "Failed";  // ✅ fallback
    }
}
?>
