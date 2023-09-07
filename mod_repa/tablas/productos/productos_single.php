<?php
    session_start();
    include_once('../../../includes/funciones.php');
    include_once('../../../includes/config.php');

    $arrayRespuesta  = array();

    if(empty($_SESSION['usuario_id'])){
        $arrayRespuesta['estado'] = "Sesión expirada";
        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }
    
    //Creamos la conexión
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        
        $id         = $_GET['id'];
        $conexion   = conectar(DB_DSN, DB_USER, DB_PASS);
        
        $query      =   "SELECT 
                            rep3_productos.producto_id                                          as productoId, 
                            rep3_productos.codigo                                               as productoCodigo, 
                            rep3_productos.marca_id                                             as productoMarca, 
                            rep3_productos.familia_id                                           as productoFamilia, 
                            rep3_productos.descripcion                                          as productoDescripcion, 
                            rep3_productos.costo_estimado                                       as productoCosto, 
                            rep3_productos.activo                                               as productoActivo, 
                            rep3_productos.mono_tri                                             as productoMonoTri, 
                            rep3_productos.canje_flag                                           as productoCanjeable, 
                            rep3_productos.foto                                                 as productoImagen,
                            rep3_productos.foto_despiece                                        as productoImagenDespiece,
                            concat(rep3_productos.codigo, ' - ', rep3_productos.descripcion)    as productoCodDesc
                        FROM 
                            rep3_productos
                        WHERE 
                            producto_id = '{$id}'
                    ";           
        $sentenciaSQL   = $conexion->prepare($query);
        $sentenciaSQL   -> execute();
        $resultado      = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        $query2 =  "    SELECT 
                            rep3_piezas_rel_productos.pieza_id,
                            rep3_piezas.codigo,
                            rep3_piezas.referencia,
                            rep3_piezas.descripcion,
                            rep3_piezas.costo
                        FROM 
                            rep3_piezas_rel_productos
                        INNER JOIN
                            rep3_piezas
                        ON 
                            rep3_piezas_rel_productos.pieza_id      = rep3_piezas.pieza_id
                        WHERE 
                            rep3_piezas_rel_productos.producto_id   = '{$id}'
                        AND
                            rep3_piezas.activo                      = 'S'
                    ";           
        $sentenciaSQL   = $conexion->prepare($query2);
        $sentenciaSQL   -> execute();
        $resultado2     = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        $resultado[0]['despiece'] = $resultado2;

        header("Content-type: aplication/json");
        echo json_encode($resultado, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }