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

        $conexion       = conectar(DB_DSN, DB_USER, DB_PASS);
        $nombre         = filter_var($_POST['nombreUsuarios'], FILTER_SANITIZE_STRING);
        $apellido       = filter_var($_POST['apellidoUsuarios'], FILTER_SANITIZE_STRING);
        $lugarRecepcion = filter_var($_POST['lugarRecepcionUsuarios'], FILTER_SANITIZE_STRING);
        $sucursal       = filter_var($_POST['sucursalUsuarios'], FILTER_SANITIZE_STRING);
        $perfil         = filter_var($_POST['perfilUsuarios'], FILTER_SANITIZE_STRING);
        $email          = filter_var($_POST['emailUsuarios'], FILTER_SANITIZE_STRING);
        $clave          = md5(filter_var($_POST['claveUsuarios'], FILTER_SANITIZE_STRING));
        $emisor         = $_POST['emisorUsuarios'] == 'true' ? 'S' : 'N';
        $diagnosticador = $_POST['diagnosticadorUsuarios'] == 'true' ? 'S' : 'N';
        $reparador      = $_POST['reparadorUsuarios'] == 'true' ? 'S' : 'N';
        $embalador      = $_POST['embaladorUsuarios'] == 'true' ? 'S' : 'N';
        $tecnico        = $_POST['tecnicoUsuarios'] == 'true' ? 'S' : 'N';
        $activo         = $_POST['activoUsuarios'] == 'true' ? 'S' : 'N';
        $perfilSirep    = recuperaPerfil($_SESSION['usuario_id']);
        $fecha          = new DateTime();
        $formateadaArg  = $fecha->format('Y-m-d');

        if($perfilSirep == 1){

            if(!empty($nombre)){
                $query = "  INSERT INTO rep3_usuarios (
                                nombre, 
                                apellido, 
                                fecha_alta, 
                                activo, 
                                lugar_recepcion_id, 
                                perfil_id, 
                                email, 
                                clave, 
                                emisor, 
                                diagnosticador, 
                                reparador,
                                embalador,
                                tecnico, 
                                sucursal_id, 
                                fultimocambio
                            ) VALUES (
                                '{$nombre}', 
                                '{$apellido}', 
                                '{$formateadaArg}', 
                                '{$activo}', 
                                '{$lugarRecepcion}', 
                                '{$perfil}', 
                                '{$email}', 
                                '{$clave}', 
                                '{$emisor}', 
                                '{$diagnosticador}', 
                                '{$reparador}', 
                                '{$embalador}', 
                                '{$tecnico}',
                                '{$sucursal}', 
                                '{$formateadaArg}'
                            )
                        ";           
                $sentenciaSQL = $conexion -> prepare($query);
                $sentenciaSQL -> execute();
    
                if($sentenciaSQL->rowCount() > 0){
                    $arrayRespuesta['estado'] = "Transacción exitosa";
                } else {
                    $arrayRespuesta['estado'] = "Algo salió mal";
                } 
            }

        } else {
            $arrayRespuesta['estado'] = "Error perfil";  
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);

    }