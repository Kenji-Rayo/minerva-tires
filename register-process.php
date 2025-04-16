<?php
include 'connector.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fname = trim($_POST['fullname'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $pnum  = trim($_POST['phone'] ?? '');
    $pass  = $_POST['password'] ?? '';

    if (empty($fname) || empty($email) || empty($pass)) {
        echo "Please fill in all required fields.";
        exit;
    }

    try {
        $stmt = $pdo->prepare("
            INSERT INTO adminreg (fname, email, pnum, pass)
            VALUES (:fname, :email, :pnum, :pass)
        ");

        $stmt->execute([
            ':fname' => $fname,
            ':email' => $email,
            ':pnum'  => $pnum,
            ':pass'  => $pass
        ]);

        echo "Success"; // ✅ This is what AJAX checks for

    } catch (PDOException $e) {
        echo "Registration failed: " . $e->getMessage();
    }
}
?>
