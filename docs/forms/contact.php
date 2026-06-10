<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    header('Content-Type: application/json'); // Set response type to JSON

    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';

    if (!$name || !$email || !$subject || !$message) {
        echo json_encode(['success' => false, 'message' => 'All fields are required.']);
        exit;
    }

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'fayyazwebpenter@gmail.com';
        $mail->Password = 'umhb ymxa vqay hjnb';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom($email, $name);
        $mail->addAddress('fayyazwebpenter@gmail.com');

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = "<strong>Name:</strong> {$name}<br><strong>Email:</strong> {$email}<br><strong>Message:</strong> {$message}";
       
        $response = [
          "success" => true,
          "message" => "Message Sent successfully to Fayyaz"
      ];
      
      try {
          $mail->send();
      } catch (Exception $e) {
          $response["success"] = false;
          $response["message"] = "There was an error sending the form. Please try again later.";
      }
      header('Access-Control-Allow-Origin: https://fayyaz-webpenter.github.io');

      echo json_encode($response);
 
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo]);
    }
}
