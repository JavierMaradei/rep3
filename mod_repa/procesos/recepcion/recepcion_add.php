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

        $fechaDefault               = new DateTime("01-01-1900");
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
        $fechaRecepcion             = new DateTime($_POST['fechaRecepcion']);
        $sucursalRecepcion          = filter_var($_POST['sucursalRecepcion'], FILTER_SANITIZE_STRING);
        $lugarRecepcion             = filter_var($_POST['lugarRecepcion'], FILTER_SANITIZE_STRING);
        $tipoReparacion             = filter_var($_POST['tipoReparacion'], FILTER_SANITIZE_STRING);
        $atencion                   = filter_var($_POST['atencion'], FILTER_SANITIZE_STRING);
        $remitoCliente              = filter_var($_POST['remitoCliente'], FILTER_SANITIZE_STRING);
        $fechaReparacion            = new DateTime($_POST['fechaReparacion']);
        $tecnico                    = filter_var($_POST['tecnico'], FILTER_SANITIZE_STRING);
        $costoProducto              = filter_var($_POST['costoProducto'], FILTER_SANITIZE_STRING);
        $codigoProductoCanje        = filter_var($_POST['codigoProductoCanje'], FILTER_SANITIZE_STRING);
        $descripcionProductoCanje   = filter_var($_POST['descripcionProductoCanje'], FILTER_SANITIZE_STRING);
        $nuevoCliente               = $_POST['nuevoCliente'] == 'true' ? 'S' : 'N';
        $nuevoNroSerie              = $_POST['nuevoNroSerie'] == 'true' ? 'S' : 'N';
        $garantia                   = $_POST['garantia'] == 'true' ? 'S' : 'N';
        $flete                      = $_POST['flete'] == 'true' ? 'S' : 'N';
        $perfilSirep                = recuperaPerfil($_SESSION['usuario_id']);
        $fecha                      = new DateTime();
        $formateadaArg              = $fecha->format("Y-m-d H:i:s");
        $fechaRecepcion             = $fechaRecepcion->format("Y-m-d H:i:s");
        $fechaReparacion            = $fechaReparacion->format("Y-m-d");
        $fechaDefault               = $fechaDefault->format("Y-m-d");
        $productoId                 = recuperaIdProducto($codigoProducto);
        $productoIdCanje            = recuperaIdProducto($codigoProductoCanje);
        $usuarioId                  = recuperaIdUsuario($_SESSION['usuario_id']);
        $conexion                   = conectar(DB_DSN, DB_USER, DB_PASS);

        if($perfilSirep == 1){

            for ($i=0; $i < 5 ; $i++) {
                $queryLock     = "SELECT valor AS bloqueo FROM rep3_parametros WHERE parametro_id = 5";
                $sentenciaSQL  = $conexion->prepare($queryLock);
                $respuestaLock = $sentenciaSQL->execute();
                $respuestaLock = $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

                if($respuestaLock['bloqueo'] == 'N'){
                    break;
                }

                usleep(500000);
            }

            if($respuestaLock['bloqueo'] == 'S'){
                $arrayRespuesta['estado'] = "Tabla bloqueada";
                header("Content-type: aplication/json");
                echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
                exit();
            } else {
                $queryLock     = "UPDATE rep3_parametros SET valor = 'S' WHERE parametro_id = 5";
                $sentenciaSQL  = $conexion->prepare($queryLock);
                $respuestaLock = $sentenciaSQL->execute();
            }

            if($nuevoNroSerie == 'S'){
                $query2         = "SELECT valor FROM rep3_parametros WHERE parametro_id = 4";
                $sentenciaSQL   = $conexion->prepare($query2);
                $respuesta2     = $sentenciaSQL->execute();
                $serieNuevo		= $sentenciaSQL->fetch(PDO::FETCH_ASSOC);
                $serieProducto  = ++$serieNuevo['valor'];
            }

            if($nuevoCliente == 'S' && $clienteId == ''){

                $query4 = " INSERT INTO rep3_clientes (
                                nombre, 
                                apellido, 
                                direccion, 
                                telefono, 
                                celular, 
                                email,
                                activo
                            ) VALUES (
                                '{$clienteNombre}', 
                                '{$clienteApellido}', 
                                '{$clienteDireccion}', 
                                '{$clienteTelefono}', 
                                '{$clienteCelular}', 
                                '{$clienteEmail}', 
                                'S'
                            )
                        ";
                $sentenciaSQL= $conexion->prepare($query4);
                $sentenciaSQL->execute();

                $query5         = "SELECT cliente_id FROM rep3_clientes ORDER BY cliente_id DESC LIMIT 1";
                $sentenciaSQL   = $conexion->prepare($query5);
                $respuesta5     = $sentenciaSQL->execute();
                $clienteId      = $respuesta5['cliente_id'];

            } else {
                $query4 = " UPDATE 
                                rep3_clientes 
                            SET 
                                nombre      = '{$clienteNombre}',
                                apellido    = '{$clienteApellido}', 
                                direccion   = '{$clienteDireccion}', 
                                telefono    = '{$clienteTelefono}',
                                celular     = '{$clienteCelular}', 
                                email       = '{$clienteEmail}'
                            WHERE 
                                cliente_id  = '{$clienteId}'
                        ";
                $sentenciaSQL= $conexion->prepare($query4);
                //var_dump($sentenciaSQL);
                $sentenciaSQL->execute();
            }
           
            $query1 = " INSERT INTO rep3_reparaciones (
                            frecepcion, 
                            reclama_garantia, 
                            flete,
                            problema, 
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
                            '{$fechaRecepcion}',
                            '{$garantia}',
                            '{$flete}',
                            '{$problemaProducto}',
                            '{$observacionesProducto}',
                            '{$serieProducto}',
                            '{$fechaReparacion}',
                            '{$costoProducto}',
                            '{$fechaDefault}',
                            '{$fechaReparacion}',
                            '{$fechaDefault}',
                            '{$fechaDefault}',
                            '{$fechaDefault}',
                            '',
                            'N',
                            '{$fechaDefault}',
                            '',
                            'N',
                            '{$fechaDefault}',
                            '{$remitoCliente}',
                            '1',
                            '{$lugarRecepcion}',
                            '{$tipoReparacion}',
                            '{$atencion}',
                            '{$productoId}',
                            '0',
                            '0',
                            '{$clienteId}',
                            '0',
                            '{$productoIdCanje}',
                            '0',
                            '0',
                            '0',
                            '0',
                            '0',
                            '0',
                            '{$usuarioId}',
                            '{$sucursalRecepcion}',
                            '{$tecnico}'
                        )
                    ";

            $sentenciaSQL = $conexion->prepare($query1);
            //var_dump($sentenciaSQL);
            $respuesta1 = $sentenciaSQL->execute();

            $queryLock     = "UPDATE rep3_parametros SET valor = 'N' WHERE parametro_id = 5";
            $sentenciaSQL  = $conexion->prepare($queryLock);
            $respuestaLock = $sentenciaSQL->execute();

            if($respuesta1){
                if($nuevoNroSerie == 'S'){
                    $query3         = "UPDATE rep3_parametros SET valor = '{$serieProducto}' WHERE parametro_id = 4";
                    $sentenciaSQL   = $conexion->prepare($query3);
                    $respuesta3     = $sentenciaSQL->execute();
                }

                $query6         = "SELECT * FROM rep3_reparaciones ORDER BY reparacion_id DESC LIMIT 1";
                $sentenciaSQL   = $conexion->prepare($query6);
                $respuesta6     = $sentenciaSQL->execute();
                $respuesta6		= $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

                $arrayRespuesta['estado'] = 'Transacción exitosa';
                $arrayRespuesta['valores'] = $respuesta6;
            } else {
                $arrayRespuesta['estado'] = "Algo salió mal";
            } 

        } else {
            $arrayRespuesta['estado'] = "Error perfil";  
        }

        header("Content-type: aplication/json");
        echo json_encode($arrayRespuesta, JSON_PARTIAL_OUTPUT_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    };