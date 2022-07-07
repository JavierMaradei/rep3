<?php
    include_once('../../../../includes/funciones.php');
    //include('../../../../includes/funciones.php');
    //include('../../../../includes/config.php');
    
    //Creamos la conexión
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        $conexion = conectar(DB_DSN_SIREP, DB_USER_SIREP_R, DB_PASS_SIREP_R);

        $query = "  SELECT 
                        COUNT(*) as prodSinSinonimos
                    FROM 
                        rep_productos
                    WHERE 
                        activo = 'S'
                    AND 
                        codigo_adonix = ''                       

                ";
           
        $sentenciaSQL= $conexion->prepare($query);
        $sentenciaSQL->execute();
    
        $resultado= $sentenciaSQL->fetch(PDO::FETCH_ASSOC);
    
        header("Content-type: aplication/json");
        echo json_encode($resultado);
    }