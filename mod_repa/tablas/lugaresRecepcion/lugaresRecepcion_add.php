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

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $conexion       = conectar(DB_DSN_SIREP, DB_USER_SIREP_RW, DB_PASS_SIREP_RW);
        $descripcion    = filter_var($_POST['descripcionLugaresRecepcion'], FILTER_SANITIZE_STRING);
        $demora         = filter_var($_POST['demoraLugaresRecepcion'], FILTER_SANITIZE_NUMBER_INT);
        $activo         = $_POST['activoLugaresRecepcion'] == 'true' ? 'S' : 'N';
        $flete          = $_POST['fleteLugaresRecepcion'] == 'true' ? 'S' : 'N';
        $hoja1          = $_POST['hoja1LugaresRecepcion'] == 'true' ? 'S' : 'N';
        $hoja2          = $_POST['hoja2LugaresRecepcion'] == 'true' ? 'S' : 'N';
        $perfilSirep    = recuperaPerfil($_SESSION['usuario']);

        if($perfilSirep == 1 || $perfilSirep == 13){

            if(!empty($descripcion)){
                $query0         = "SELECT TOP (1) LugarRecep_Id FROM REP_LUGARES_RECEPCION ORDER BY LugarRecep_Id DESC";
                $sentenciaSQL   = $conexion->prepare($query0);
                $sentenciaSQL   -> execute();
                $ultimoId       = $sentenciaSQL->fetch();
                $idIncrementado = ++$ultimoId[0];
        
                $query1 = " INSERT INTO rep_lugares_recepcion (
                            LugarRecep_Id, 
                            empresa_id, 
                            sucursal_id, 
                            Descripcion, 
                            Dias_demora, 
                            Activo, 
                            Flete, 
                            Hoja1, 
                            Hoja2
                            ) VALUES (
                            '{$idIncrementado}', 
                            '1', 
                            '1', 
                            '{$descripcion}', 
                            '{$demora}', 
                            '{$activo}', 
                            '{$flete}', 
                            '{$hoja1}', 
                            '{$hoja2}'
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
        echo json_encode($arrayRespuesta/* , JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR */);

    }