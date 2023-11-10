<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
// Load Composer's autoloader
/*IMPORTANTE!!!!!!!!!!!!!!!!!!!!!!!! PHP 7 (Descomentar ambas líneas, 6,7,8 y 10), PHP 5, se deben comentar (6,7,8 y 10)!!!*/
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;
  
require '../../../vendor/autoload.php';
//require_once '../../../vendor/PHPMailer_5/PHPMailerAutoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
                                           
    // Instantiation and passing `true` enables exceptions
    $mail = new PHPMailer(true);
                      
    try {
        //Server settings
        $mail->SMTPDebug = 0;
        $mail->CharSet = 'UTF-8';                           // Enable verbose debug output
        $mail->isSMTP();                                    // Set mailer to use SMTP
        $mail->Host       = 'smtp.office365.com';          // Specify main and backup SMTP servers
        $mail->SMTPAuth   = true;                           // Enable SMTP authentication
        $mail->Username   = 'cristian_miraval_92@hotmail.com';    // SMTP username
        $mail->Password   = 'ROwa2017**';                     // SMTP password
        $mail->SMTPSecure = 'TLS';
        $mail->Port       = 587;                            // TCP port to connect to
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true,
            )
        );

        //Recipients
        $mail->setFrom("cristian_miraval_92@hotmail.com", "HDN - RECEPCIÓN DE EQUIPOS");
        if(MODO != 'prod'){
            $mail->addAddress('javier.maradei@hotmail.com');     
        } else {
            $mail->addAddress($email);
        }

        // Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = " HDN | HOJA DE RUTA | Cliente: {$razonSocialCliente}";
        $mail->Body    = "  <h1 style='color: blue'>Pedido Service domiciliario - HDN </h1>
                            <hr>
                            </br>
                            {$tabla}
                            <hr>
                            </br>
                            <p style='text-align: center; font-style: italic;'><b>HDN</b></p>"
                            ;
        $mail->send();
        $arrayRespuesta['mail'] = "Enviado";
        $countEnvioOk++;
    } catch (Exception $e) {
        $arrayRespuesta['mail'] = "Error";
        $countEnvioError++;
        
        $query98= " UPDATE 
                        rep3_reparaciones 
                    SET 
                        estado_id       = 1,
                        envio_mail      = 'N' 
                    WHERE 
                        reparacion_id   = {$value[0]}  
                ";
        $sentenciaSQL   = $conexion->prepare($query98);
        $sentenciaSQL   ->execute();
    }
}