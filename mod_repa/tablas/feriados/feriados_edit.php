<?php
   session_start();
   date_default_timezone_set('America/Argentina/Buenos_Aires');
   include_once('../../../../includes/funciones.php');
   //include('../../../../includes/funciones.php');
   //include('../../../../includes/config.php');

   $arrayRespuesta = array();

   if(empty($_SESSION['usuario'])){
       $arrayRespuesta['estado'] = "Sesión expirada";
       header("Content-type: aplication/json");
       echo json_encode($arrayRespuesta/* , JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR */);
       exit();
   }

    //Creamos la conexión
    $id = $_GET['id'];
    if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $conexion       = conectar(DB_DSN_SIREP, DB_USER_SIREP_RW, DB_PASS_SIREP_RW);
        $descripcion    = filter_var($_POST['descripcionFeriados'], FILTER_SANITIZE_STRING);
        $fecha          = new DateTime($_POST['fechaFeriados']);
        $formateada     = $fecha ->format('d/m/Y');
        $combo          = $formateada.' '.$descripcion;
        $perfilSirep    = recuperaPerfil($_SESSION['usuario']);
        if(MODO == 'dev'){
            $formateadaArg = $fecha->format('d-m-Y');
        } else {
            $formateadaArg = $fecha->format('Y-m-d');
        }

        if($perfilSirep == 1 || $perfilSirep == 13 || $perfilSirep == 16){

            if(!empty($descripcion)){
                $query = "  UPDATE tg_feriados SET 
                            fecha = '{$formateadaArg}', 
                            descripcion = '{$descripcion}', 
                            combo = '{$combo}' 
                            WHERE feriado_id = '{$id}'
                        ";           
                
                $sentenciaSQL= $conexion->prepare($query);
                $respuesta = $sentenciaSQL->execute();
            
                if($respuesta){
                    $arrayRespuesta['estado'] = "Transacción exitosa";
                } else {
                    $arrayRespuesta['estado'] = "Algo salió mal";
                } 
            }

        } else {
            $arrayRespuesta['estado'] = "Error perfil"; 
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta/* , JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR */);

    }