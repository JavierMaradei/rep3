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
    if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $conexion       = conectar(DB_DSN_SIREP, DB_USER_SIREP_RW, DB_PASS_SIREP_RW);
        $descripcion    = filter_var($_POST['descripcionEstantes'], FILTER_SANITIZE_STRING);
        $activo         = $_POST['activoEstantes'] == 'true' ? 'S' : 'N';
        $perfilSirep    = recuperaPerfil($_SESSION['usuario']);

        $query0         = "SELECT TOP (1) ESTANTE_ID FROM REP_ESTANTES ORDER BY ESTANTE_ID DESC";
        $sentenciaSQL   = $conexion->prepare($query0);
        $sentenciaSQL   -> execute();
        $ultimoId       = $sentenciaSQL->fetch();
        $idIncrementado = ++$ultimoId[0];

        if($perfilSirep == 1 || $perfilSirep == 13 || $perfilSirep == 16){

            if(!empty($descripcion)){
                $query =    "INSERT INTO rep_estantes (
                            estante_id, 
                            nombre, 
                            activo
                            ) VALUES (
                            '{$idIncrementado}', 
                            '{$descripcion}', 
                            '{$activo}'
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
        echo json_encode($arrayRespuesta/* , JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR */);

    }