<?php
    include_once('../../../../includes/funciones.php');
    //include('../../../../includes/funciones.php');
    //include('../../../../includes/config.php');
    
    //Creamos la conexión
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        $conexion = conectar(DB_DSN_SIREP, DB_USER_SIREP_R, DB_PASS_SIREP_R);
        $query = "SELECT feriado_id, CONVERT(varchar, fecha, 103) as fecha, descripcion FROM tg_feriados WHERE feriado_id > 0";           
        $sentenciaSQL= $conexion->prepare($query);
        $sentenciaSQL->execute();
    
        $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);
    
        header("Content-type: aplication/json");
        echo json_encode($resultado/* , JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR */);
    }