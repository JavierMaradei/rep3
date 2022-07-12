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