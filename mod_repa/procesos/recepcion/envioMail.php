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

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                                           
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
        $mail->addAddress('javier.maradei@hotmail.com');     // Add a recipient

        // Content
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = " HDN - RECEPCIÓN DE PRODUCTO";
        $mail->Body    = "  <h1 style='color: blue'>Notificacion de recepción de equipo</h1>
                            <hr>
                            </br>
                            <h6 style='margin:5px;'>Fecha: {$respuesta6['frecepcion']}</h6>
                            <h6 style='margin:5px;'>Nro. de Orden: {$respuesta6['reparacion_id']}</h6>
                            <h6 style='margin:5px;'>Modelo: {$respuesta6['modelo']}</h6>
                            <h6 style='margin:5px;'>Nro. de Serie: {$respuesta6['nro_serie']}</h6>
                            <h6 style='margin:5px;'>Probl.: {$respuesta6['problema']}</h6>
                            <h6 style='margin:5px;'>Obs.: {$respuesta6['observaciones']}</h6>
                            <h6 style='margin:5px;'>Nombre: {$respuesta6['apellido_cliente']}, {$respuesta6['nombre_cliente']}</h6>
                            <h6 style='margin:5px;'>Teléfono: {$respuesta6['telefono_cliente']}</h6>
                            <h6 style='margin:5px;'>Celular: {$respuesta6['celular_cliente']}</h6>
                            <h6 style='margin:5px;'>OPERACION: {$respuesta6['tipo_ingreso']}</h6>
                            <h6 style='margin:5px;'>GARANTÍA: {$respuesta6['reclama_garantia']}</h6>
                            <h6 style='margin:5px;'>Fecha de Retiro: CONSULTAR</h6>
                            <h6 style='margin:5px;'>Atendido por: {$respuesta6['apellido_usuario']}, {$respuesta6['nombre_usuario']}</h6>
                        "
                            ;

        $mail->send();

        $arrayRespuesta['estadoMail'] = "ok";
    } catch (Exception $e) {
        $arrayRespuesta['estadoMail'] = "error";
    }

}
