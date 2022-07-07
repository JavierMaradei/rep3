<?php
    include_once('../../../../includes/funciones.php');
    //include('../../../../includes/funciones.php');
    //include('../../../../includes/config.php');
    
    //Creamos la conexión
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $id = $_GET['id'];
        $conexion = conectar(DB_DSN_SIREP, DB_USER_SIREP_R, DB_PASS_SIREP_R);
        $query =    "SELECT
                    REP_PRODUCTOS.PRODUCTO_ID as idProducto, 
                    REP_PRODUCTOS.CODIGO as codigoProducto, 
                    REP_PRODUCTOS.DESCRIPCION as descripcionProducto, 
                    REP_PRODUCTOS.DIFICULTAD as dificultadProducto, 
                    REP_PRODUCTOS.COSTO_ESTIMADO as costoProducto, 
                    REP_PRODUCTOS.TIPO_ID as tipoProducto,
                    REP_PRODUCTOS.GRUPO_ID as grupoProducto,
                    REP_PRODUCTOS.MODELO_FICHA_ID as fichaProducto,
                    REP_PRODUCTOS.MONOFASICO_TRIFASICO as alimentacionProducto,
                    REP_PRODUCTOS.NROSERIE_GARANTIA as nroDeSerieProducto,
                    REP_PRODUCTOS.GAMA_PROD as gamaProducto,
                    REP_PRODUCTOS.CARGO_RED as cargoReducidoProducto,
                    REP_PRODUCTOS.MEDIA_UNION as mediaUnionProducto,
                    REP_PRODUCTOS.ACTIVO as activoProducto,
                    REP_PRODUCTOS.CODIGO_ADONIX as codigoSinonimoProducto,
                    REP_PRODUCTOS.DESCRIP_ADONIX as descripcionSinonimoProducto,
                    REP_PRODUCTOS.CANJE_FLAG as canjeableProducto
        FROM rep_productos WHERE REP_PRODUCTOS.PRODUCTO_ID = '{$id}'";
        $sentenciaSQL= $conexion->prepare($query);
        $sentenciaSQL->execute();

        $resultado= $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

        header("Content-type: aplication/json");
        echo json_encode($resultado/* , JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR */);
    }