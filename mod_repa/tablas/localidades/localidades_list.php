<?php
    session_start();
    date_default_timezone_set('America/Argentina/Buenos_Aires');
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');
    
    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }

    //Creamos la conexión
    $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
    $arrayProv  = array();
    $activo     = $_GET['activo'];
    $provincia  = $_GET['provincia'];

    if(isset($provincia)){
        $stringProvincias = $provincia;
    } else {

        $query00 =" SELECT provincia_id FROM rep3_provincias ";
        $sentenciaSQL   = $conexion->prepare($query00);
        $sentenciaSQL   ->execute();
        $provinciasAll  = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        foreach ($provinciasAll as $key => $value) {
            array_push($arrayProv, $value['provincia_id']);
        }
        $stringProvincias    = implode("', '", $arrayProv);
    }

    $query  = " SELECT 
                    rep3_localidades.localidad_id, 
                    rep3_localidades.descripcion, 
                    rep3_localidades.provincia_id,
                    rep3_provincias.descripcion as provinciaDescripcion,
                    rep3_localidades.activo 
                FROM 
                    rep3_localidades
                INNER JOIN
                    rep3_provincias
                ON
                    rep3_localidades.provincia_id = rep3_provincias.provincia_id
                WHERE
                    rep3_localidades.provincia_id  IN ('{$stringProvincias}')
            ";
    if($activo == "S"){
        $query .= "AND rep3_localidades.activo = 'S'";
    }           
    $sentenciaSQL= $conexion->prepare($query);
    //var_dump($sentenciaSQL);
    $sentenciaSQL->execute();

    $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

    header("Content-type: aplication/json");
    echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);