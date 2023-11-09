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
       
        $id                 = $_GET['id'];
        $conexion           = conectar(DB_DSN, DB_USER, DB_PASS);
        $fechaReparacion    = filter_var($_POST['fechaReparacion'], FILTER_SANITIZE_STRING);
        $hoy                = new DateTime();
        $hoyFormat          = $hoy->format('Y-m-d');
        $fecha              = new DateTime($fechaReparacion);
        $fechaRepFormat     = $fecha->format('Y-m-d');
        $tecnico            = filter_var($_POST['tecnico'], FILTER_SANITIZE_STRING);
        $hojaRuta           = $_POST['hojaRuta'] == 'true' ? 'S' : 'N';
        $perfilSirep        = recuperaPerfil($_SESSION['usuario_id']);

        if($fechaRepFormat < $hoyFormat){
            $arrayRespuesta['estado'] = "err fecha";
        } else {
            if($perfilSirep == 1){

                $query = "  UPDATE 
                                rep3_reparaciones 
                            SET 
                                freparacion     = '{$fechaRepFormat}',
                                tecnico_id      = {$tecnico},
                                hoja_ruta       = '{$hojaRuta}'
                            WHERE 
                                reparacion_id   = '{$id}'
                        ";           
                
                $sentenciaSQL= $conexion->prepare($query);
                $respuesta = $sentenciaSQL->execute();
            
                if($respuesta){
                    $arrayRespuesta['estado'] = "ok";
                } else {
                    $arrayRespuesta['estado'] = "err";
                } 
    
            } else {
                $arrayRespuesta['estado'] = "err perfil"; 
            }
        }
        
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR); 
    }