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

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $conexion       = conectar(DB_DSN, DB_USER, DB_PASS);
        $descripcion    = filter_var($_POST['descripcionLugaresRecepcion'], FILTER_SANITIZE_STRING);
        $demora         = filter_var($_POST['demoraLugaresRecepcion'], FILTER_SANITIZE_NUMBER_INT);
        $activo         = $_POST['activoLugaresRecepcion'] == 'true' ? 'S' : 'N';
        $flete          = $_POST['fleteLugaresRecepcion'] == 'true' ? 'S' : 'N';
        $perfilSirep    = recuperaPerfil($_SESSION['usuario_id']);

        if($perfilSirep == 1){

            if(!empty($descripcion)){
        
                $query1 = " INSERT INTO rep3_lugares_recepcion (
                                descripcion, 
                                dias_demora, 
                                activo, 
                                flete
                            ) VALUES (
                                '{$descripcion}', 
                                '{$demora}', 
                                '{$activo}', 
                                '{$flete}'
                            )
                        ";
                $sentenciaSQL= $conexion->prepare($query1);
                $sentenciaSQL->execute();
                
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