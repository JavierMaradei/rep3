<?php
    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');

    $arrayRespuesta = array();

    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }

    //Creamos la conexión
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
       
        $id             = $_GET['id'];
        $conexion       = conectar(DB_DSN, DB_USER, DB_PASS);
        $nombre         = filter_var($_POST['nombreUsuarios'], FILTER_SANITIZE_STRING);
        $apellido       = filter_var($_POST['apellidoUsuarios'], FILTER_SANITIZE_STRING);
        $lugarRecepcion = filter_var($_POST['lugarRecepcionUsuarios'], FILTER_SANITIZE_STRING);
        $sucursal       = filter_var($_POST['sucursalUsuarios'], FILTER_SANITIZE_STRING);
        $perfil         = filter_var($_POST['perfilUsuarios'], FILTER_SANITIZE_STRING);
        $email          = filter_var($_POST['emailUsuarios'], FILTER_SANITIZE_STRING);
        $clave          = filter_var($_POST['claveUsuarios'], FILTER_SANITIZE_STRING);
        $emisor         = $_POST['emisorUsuarios'] == 'true' ? 'S' : 'N';
        $reparador      = $_POST['reparadorUsuarios'] == 'true' ? 'S' : 'N';
        $tecnico        = $_POST['tecnicoUsuarios'] == 'true' ? 'S' : 'N';
        $activo         = $_POST['activoUsuarios'] == 'true' ? 'S' : 'N';
        $perfilSirep    = recuperaPerfil($_SESSION['usuario_id']);
        $fecha          = new DateTime();
        $formateadaArg  = $fecha->format('Y-m-d');

        if($perfilSirep == 1){

            if($id != ''){
                $query0 = " SELECT
                                clave
                            FROM
                                rep3_usuarios
                            WHERE
                                usuario_id = '{$id}'
                        ";
                $sentenciaSQL   = $conexion->prepare($query0);
                $sentenciaSQL   ->execute();
                $resultado0     = $sentenciaSQL->fetch(PDO::FETCH_ASSOC);
                
                if($resultado0['clave'] != $clave){
                    $clave = md5($clave);
                }

                $query1 = "  UPDATE 
                                rep3_usuarios 
                            SET 
                                nombre              = '{$nombre}', 
                                apellido            = '{$apellido}', 
                                activo              = '{$activo}', 
                                lugar_recepcion_id  = '{$lugarRecepcion}', 
                                perfil_id           = '{$perfil}', 
                                clave               = '{$clave}', 
                                emisor              = '{$emisor}', 
                                diagnosticador      = 'N', 
                                reparador           = '{$reparador}', 
                                tecnico             = '{$tecnico}', 
                                sucursal_id         = '{$sucursal}', 
                                fultimocambio       = '{$formateadaArg}'
                            WHERE 
                                usuario_id          = '{$id}'
                        ";           
                
                $sentenciaSQL   = $conexion->prepare($query1);
                $respuesta1     = $sentenciaSQL->execute();
            
                if($respuesta1){
                    $arrayRespuesta['estado'] = "Transacción exitosa";
                } else {
                    $arrayRespuesta['estado'] = "Algo salió mal";
                } 

            } else {
                $arrayRespuesta['estado'] = "Error perfil"; 
            }

        }
        
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR); 
    }