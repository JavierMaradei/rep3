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