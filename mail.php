 <?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$email = $_POST['user_email'];
$mail = $_POST['user_mail'];
                              

$mail->isSMTP();                                      
$mail->Host = '';  																							
$mail->SMTPAuth = true;                            
$mail->Username = ''; 
$mail->Password = ''; 
$mail->SMTPSecure = 'ssl';                            
$mail->Port = 465; 

$mail->setFrom(''); 
$mail->addAddress('');     
$mail->isHTML(true);                                 

$mail->Subject = 'Заявка с тестового сайта';
$mail->Body    = '' .$name . ' оставил заявку, его телефон ' .$phone. '<br>Почта этого пользователя: ' .$emails;
$mail->AltBody = '';

if(!$mail->send()) {}
?>