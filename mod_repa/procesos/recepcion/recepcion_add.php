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

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        var_dump($_POST);
        exit();
        $codigoProducto             = filter_var($_POST['codigoProducto'], FILTER_SANITIZE_STRING);
        $descripcionProducto        = filter_var($_POST['descripcionProducto'], FILTER_SANITIZE_STRING);
        $marcaProducto              = filter_var($_POST['marcaProducto'], FILTER_SANITIZE_STRING);
        $familiaProducto            = filter_var($_POST['familiaProducto'], FILTER_SANITIZE_STRING);
        $serieProducto              = filter_var($_POST['serieProducto'], FILTER_SANITIZE_STRING);
        $problemaProducto           = filter_var($_POST['problemaProducto'], FILTER_SANITIZE_STRING);
        $observacionesProducto      = filter_var($_POST['observacionesProducto'], FILTER_SANITIZE_STRING);
        $clienteId                  = filter_var($_POST['clienteId'], FILTER_SANITIZE_STRING);
        $clienteApellido            = filter_var($_POST['clienteApellido'], FILTER_SANITIZE_STRING);
        $clienteNombre              = filter_var($_POST['clienteNombre'], FILTER_SANITIZE_STRING);
        $clienteTelefono            = filter_var($_POST['clienteTelefono'], FILTER_SANITIZE_STRING);
        $clienteCelular             = filter_var($_POST['clienteCelular'], FILTER_SANITIZE_STRING);
        $clienteDireccion           = filter_var($_POST['clienteDireccion'], FILTER_SANITIZE_STRING);
        $clienteEmail               = filter_var($_POST['clienteEmail'], FILTER_SANITIZE_STRING);
        $fechaRecepcion             = filter_var($_POST['fechaRecepcion'], FILTER_SANITIZE_STRING);
        $sucursalRecepcion          = filter_var($_POST['sucursalRecepcion'], FILTER_SANITIZE_STRING);
        $lugarRecepcion             = filter_var($_POST['lugarRecepcion'], FILTER_SANITIZE_STRING);
        $tipoReparacion             = filter_var($_POST['tipoReparacion'], FILTER_SANITIZE_STRING);
        $atencion                   = filter_var($_POST['atencion'], FILTER_SANITIZE_STRING);
        $remitoCliente              = filter_var($_POST['remitoCliente'], FILTER_SANITIZE_STRING);
        $fechaReparacion            = filter_var($_POST['fechaReparacion'], FILTER_SANITIZE_STRING);
        $tecnico                    = filter_var($_POST['tecnico'], FILTER_SANITIZE_STRING);
        $costoProducto              = filter_var($_POST['costoProducto'], FILTER_SANITIZE_STRING);
        $codigoProductoCanje        = filter_var($_POST['codigoProductoCanje'], FILTER_SANITIZE_STRING);
        $descripcionProductoCanje   = filter_var($_POST['descripcionProductoCanje'], FILTER_SANITIZE_STRING);
        $nuevoCliente               = filter_var($_POST['nuevoCliente'], FILTER_SANITIZE_STRING);
        $nuevoNroSerie              = filter_var($_POST['nuevoNroSerie'], FILTER_SANITIZE_STRING);
        $garantia                   = $_POST['garantia'] == 'true' ? 'S' : 'N';
        $flete                      = $_POST['flete'] == 'true' ? 'S' : 'N';
        $perfilSirep                = recuperaPerfil($_SESSION['usuario_id']);
        $conexion                   = conectar(DB_DSN, DB_USER, DB_PASS);

        if($perfilSirep == 1){
            
            $query1 = " INSERT INTO rep3_reparaciones (
                            frecepcion, 
                            reclama_garantia, 
                            flete, 
                            observaciones, 
                            nro_serie, 
                            fretiro, 
                            costo, 
                            fdiagnostico, 
                            freparacion, 
                            fembalaje, 
                            fpresupuesto, 
                            fresolucion, 
                            reparacion_detalle, 
                            anulado, 
                            fanulado, 
                            cajon, 
                            finalizado, 
                            ffinalizado, 
                            remito, 
                            estado_id, 
                            lugar_recepcion_id, 
                            tipo_ingreso_id, 
                            tipo_atencion_id, 
                            producto_id, 
                            forma_retiro_id, 
                            motivo_anulacion_id, 
                            cliente_id, 
                            estante_id, 
                            producto_canje_id, 
                            diagnosticador_id, 
                            reparador_id, 
                            embalador_id, 
                            anulador_id, 
                            presupuestador_id, 
                            finalizador_id, 
                            usuario_id, 
                            sucursal_id, 
                            tecnico_id
                        ) VALUES (
                            '{value-2}',
                            '{value-3}',
                            '{value-4}',
                            '{value-5}',
                            '{value-6}',
                            '{value-7}',
                            '{value-8}',
                            '{value-9}',
                            '{value-10}',
                            '{value-11}',
                            '{value-12}',
                            '{value-13}',
                            '{value-14}',
                            '{value-15}',
                            '{value-16}',
                            '{value-17}',
                            '{value-18}',
                            '{value-19}',
                            '{value-20}',
                            '{value-21}',
                            '{value-22}',
                            '{value-23}',
                            '{value-24}',
                            '{value-25}',
                            '{value-26}',
                            '{value-27}',
                            '{value-28}',
                            '{value-29}',
                            '{value-30}',
                            '{value-31}',
                            '{value-32}',
                            '{value-33}',
                            '{value-34}',
                            '{value-35}',
                            '{value-36}',
                            '{value-37}',
                            '{value-38}',
                            '{value-39}'
                        )
                    ";

            $sentenciaSQL= $conexion->prepare($query1);
            //var_dump($sentenciaSQL);
            $sentenciaSQL->execute();

            if($sentenciaSQL->rowCount() > 0){
                $arrayRespuesta['estado'] = 'Transacción exitosa';
            } else {
                $arrayRespuesta['estado'] = "Algo salió mal";
            } 

        } else {
            $arrayRespuesta['estado'] = "Error perfil";  
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    };