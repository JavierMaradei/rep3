<?php
    include_once('../../../../includes/funciones.php');
    //include('../../../../includes/funciones.php');
    //include('../../../../includes/config.php');
    
    //Creamos la conexión
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $id = $_GET['id'];
        $conexion = conectar(DB_DSN_SIREP, DB_USER_SIREP_R, DB_PASS_SIREP_R);
        $query =    "SELECT LugarRecep_id as idLugaresRecepcion, 
                            Descripcion as descripcionLugaresRecepcion, 
                            Dias_demora as demoraLugaresRecepcion,
                            Activo as activoLugaresRecepcion,
                            Flete as fleteLugaresRecepcion,
                            Hoja1 as hoja1LugaresRecepcion,
                            Hoja2 as hoja2LugaresRecepcion 
                    FROM rep_lugares_recepcion
                    WHERE LugarRecep_id = '{$id}'";           
        $sentenciaSQL= $conexion->prepare($query);
        $sentenciaSQL->execute();

        $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        header("Content-type: aplication/json");
        echo json_encode($resultado/* , JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR */);
    }