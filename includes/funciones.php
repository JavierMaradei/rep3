<?php

    /**
     * Conexión con la base de datos
     */
    function conectar($dsn, $usuario, $contrasena) {
        $gbd = false;
        try {
            $gbd = new PDO($dsn, $usuario, $contrasena);
        } catch (PDOException $e) {
            echo 'Falló la conexión: ' . $e->getMessage;
        }

        return $gbd;
    }

    /**
     * Carga el cuerpo de la página
     * @param string $pagina
    */
    function CargarPagina($pagina){
		include(dirname(__FILE__).'/../includes/config.php');

		$modulo = "./" . $pagina . ".php";
		if ( file_exists( $modulo ) ) {
            include( $modulo );
        }
    }

    /**
     * Retorna el perfil según el email del usuario logueado
     * @param {string} $email
     * @return {string}
     * @version 1.0
     */
    function recuperaPerfil($email){

        $query 			= "SELECT perfil_id FROM rep3_usuarios WHERE email = '{$email}'";

        $conexion       = conectar(DB_DSN, DB_USER, DB_PASS);
        $sentenciaSQL	= $conexion->prepare($query);
        $sentenciaSQL	-> execute();
        $perfil 		= $sentenciaSQL->fetch(PDO::FETCH_ASSOC);
        return $perfil['perfil_id'];
	}

    /**
     * Verifica si el usuario logueado es tecnico de calle
     * @param {string} $email
     * @return {string}
     * @version 1.0
     */
    function soyTecnico($email){

        $query 			= "SELECT tecnico, usuario_id FROM rep3_usuarios WHERE email = '{$email}'";

        $conexion       = conectar(DB_DSN, DB_USER, DB_PASS);
        $sentenciaSQL	= $conexion->prepare($query);
        $sentenciaSQL	-> execute();
        $tecnico 		= $sentenciaSQL->fetch(PDO::FETCH_ASSOC);
        return $tecnico;
	}

    /**
     * Template de los tipos de alimentacion de los equipos
     * @return {string}
     * @version 1.0
     */
    function tiposMonoTri(){
        $template = '
            <option value="">Seleccionar</option>
            <option value="M">Monofásico</option>
            <option value="T">Trifásico</option>
        ';
        return $template;
	}

    /**
     * Template de los tipos de reparación en la recepción de productos
     * @return {string}
     * @version 1.0
     */
    function tiposReparacion(){
        $template = '
            <option value="R" selected>Reparación</option>
            <option value="P">Presupuesto</option>
            <option value="C">Plan canje</option>
            <option value="E">Cambio de equipo</option>
        ';
        return $template;
	}

    /**
     * Template de los tipos de reparación en la recepción de productos
     * @return {string}
     * @version 1.0
     */
    function tiposAtencion(){
        $template = '
            <option value="1" selected>Revisar</option>
            <option value="2">Reparar en el momento</option>
        ';
        return $template;
	}

    /**
     * Subida de archivos al servidor
     * @param {string}
     * @param {string}
     * @param {string}
     * @param {string}
     * @return {array}
     */
	function subirArchivo($error, $tipo, $tmp_name, $name){
        $nombreArchivoDestino   = '';

		switch ($error) {
			case UPLOAD_ERR_OK:
				$extensiones = array('image/jpeg', 'image/png', 'image/gif');

				if (in_array($tipo, $extensiones)) {
					//Seguimos adelante con validacion de tamanio
                    $info_imagen = getimagesize($tmp_name);

					if (is_array($info_imagen)) {
						//Si llegamos hasta es porque es una imagen y esta OK
						$fecha = new DateTime();
						$fechahora = $fecha->format('YmdHis');
						$nombreArchivoDestino = uniqid().$fechahora.$name;

						if (move_uploaded_file($tmp_name, './adjuntos/'.$nombreArchivoDestino)) {
							$error = false;
							$mensaje = "Archivo subido exitosamente";
						} else {
							$error = true;
							$mensaje = "Error al subir el archivo";
						}
					} else {
						$error = true;
						$mensaje = "Error al subir el archivo";
					}
				} else {
					$error = true;
					$mensaje = "Esta intentando subir un archivo con un formato inválido";
				}
			break;

			case UPLOAD_ERR_INI_SIZE:
			case UPLOAD_ERR_FORM_SIZE:
				$error = true;
				$mensaje = "El archivo que esta intentando subir supera el tamaño máximo permitido";
			break;
			case UPLOAD_ERR_PARTIAL:
				$error = true;
				$mensaje = "Error al subir el archivo. El mismo fue subido parcialmente";
			break;
			case UPLOAD_ERR_NO_FILE:
				$error = true;
				$mensaje = "Error al subir el archivo. No ha seleccionado ningún archivo";
			break;
			default:
			//case UPLOAD_ERR_NO_TMP_DIR:
			//case UPLOAD_ERR_CANT_WRITE:
			//case UPLOAD_ERR_EXTENSION:
				$error = true;
				$mensaje = "Error al subir el archivo.";
			break;
		}

		return array($error, $mensaje, $nombreArchivoDestino);
	}

    	/**
     * Retorna el id del código ingresado de producto
     * @param {string} $codigo
     * @return {string}
     * @version 1.0
     */
    function recuperaIdProducto($codigo){

        $query 			= "SELECT producto_id FROM rep3_productos WHERE codigo = '{$codigo}'";

		$conexion 		= conectar(DB_DSN, DB_USER, DB_PASS);
        $sentenciaSQL	= $conexion->prepare($query);
        $sentenciaSQL	-> execute();
		$idProducto		= $sentenciaSQL->fetch(PDO::FETCH_ASSOC);
        return $idProducto['producto_id'];
	}

    /**
     * Retorna el id del usuario logueado
     * @param {string} $codigo
     * @return {string}
     * @version 1.0
     */
    function recuperaIdUsuario($email){

        $query 			= "SELECT usuario_id FROM rep3_usuarios WHERE email = '{$email}'";

		$conexion 		= conectar(DB_DSN, DB_USER, DB_PASS);
        $sentenciaSQL	= $conexion->prepare($query);
        $sentenciaSQL	-> execute();
		$idUsuario		= $sentenciaSQL->fetch(PDO::FETCH_ASSOC);
        return $idUsuario['usuario_id'];
	}

        /**
     * Retorna el id del usuario logueado
     * @param {string} $codigo
     * @return {string}
     * @version 1.0
     */
    function recuperaSucursalUsuario($email){

        $query 			= "SELECT sucursal_id FROM rep3_usuarios WHERE email = '{$email}'";

		$conexion 		= conectar(DB_DSN, DB_USER, DB_PASS);
        $sentenciaSQL	= $conexion->prepare($query);
        $sentenciaSQL	-> execute();
		$sucUsuario		= $sentenciaSQL->fetch(PDO::FETCH_ASSOC);
        return $sucUsuario['sucursal_id'];
	}

    /**
     * Retorna el id de pieza
     * @param {string} $codigo
     * @return {string}
     * @version 1.0
     */
    function recuperaIdPieza($codigo){
        $conexion       = conectar(DB_DSN, DB_USER, DB_PASS);
        $query0         = "SELECT pieza_id FROM rep3_piezas WHERE codigo = '{$codigo}'";
        $sentenciaSQL   = $conexion->prepare($query0);
        $respuesta0     = $sentenciaSQL->execute();
        $respuesta0     = $sentenciaSQL->fetch(PDO::FETCH_ASSOC);
        return $respuesta0['pieza_id'];
    }