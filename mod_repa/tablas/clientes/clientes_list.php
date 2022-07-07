<?php
    include_once('../../../../includes/funciones.php');
    //include('../../../../includes/funciones.php');
    //include('../../../../includes/config.php');
    
    //Creamos la conexión
    $conexion = conectar(DB_DSN_SIREP, DB_USER_SIREP_R, DB_PASS_SIREP_R);
    $query = "SELECT cliente_id, codigo, razon_social1, razon_social2, telefono, celular, direccion, mail, solicita_oc FROM rep_clientes WHERE cliente_id > 0";           
    $sentenciaSQL= $conexion->prepare($query);
    $sentenciaSQL->execute();

    $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

    header("Content-type: aplication/json");
    echo json_encode($resultado/* , JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR */);