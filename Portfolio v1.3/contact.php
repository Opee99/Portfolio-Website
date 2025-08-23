<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');
    
    // Basic server-side validation
    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header('Content-Type: application/json', true, 400);
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
        exit;
    }
    
    $to = "mubtasimfuad99@gmail.com";
    $subject = "New Contact Form Submission";
    
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    $email_body = "You have received a new message from your website contact form.\n\n" .
                 "Name: " . $name . "\n" .
                 "Email: " . $email . "\n" .
                 "Message:\n" . $message;
    
    // Send mail (may return false on some environments)
    $mail_sent = @mail($to, $subject, $email_body, $headers);
    
    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode(['success' => (bool)$mail_sent, 'message' => $mail_sent ? 'Message sent successfully' : 'Failed to send message']);
    exit;
}
?>