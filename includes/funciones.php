<?php

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