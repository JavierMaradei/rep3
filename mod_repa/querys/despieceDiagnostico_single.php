<?php
    session_start();
    include_once('../../includes/funciones.php');
    include_once('../../includes/config.php');

    $arrayRespuesta  = array();

    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }
    
    //Creamos la conexión
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        
        $orden      = $_GET['orden'];
        $producto   = $_GET['producto'];
        $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
        
        $query      =   "SELECT 
                            rep3_productos.foto          as productoImagen,
                            rep3_productos.foto_despiece as productoImagenDespiece
                        FROM 
                            rep3_productos
                        WHERE 
                            producto_id = '{$producto}'
                    ";           
        $sentenciaSQL   = $conexion->prepare($query);
        $sentenciaSQL   -> execute();
        $resultado      = $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

        $query2 =  "    SELECT 
                            rep3_diagnostico.pieza_id,
                            rep3_diagnostico.cantidad,
                            rep3_piezas.codigo,
                            rep3_piezas.referencia,
                            rep3_piezas.descripcion,
                            rep3_piezas.costo
                        FROM 
                            rep3_diagnostico
                        INNER JOIN
                            rep3_piezas
                        ON 
                            rep3_diagnostico.pieza_id       = rep3_piezas.pieza_id
                        WHERE 
                            rep3_diagnostico.reparacion_id  = '{$orden}'
                        AND
                            rep3_piezas.activo              = 'S'
                    ";           
        $sentenciaSQL   = $conexion->prepare($query2);
        $sentenciaSQL   -> execute();
        $resultado2     = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        $resultado['despiece'] = $resultado2;

        header("Content-type: aplication/json");
        echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }