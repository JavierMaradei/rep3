<?php
    require_once('includes/funciones.php');

    if ( isset( $_GET["page"] ) ) {
        $page = $_GET["page"];
    } else {
        $page = "home";
    } 

    include('head.php');
?>
    <body class="jumping">
        <div id="root" class="root mn--max hd--expanded">
            <section id="content" class="content">
                <div class="content__boxed">
                    <div id="page" class="content__wrap">
                        <?php CargarPagina( $page ); ?>
                    </div>
                </div>
            </section>
        <?php
            include('header.php');
            include('nav.php');
            include('sidebar.php');
        ?>
        </div>
        <?php
            include('footer.php');
        ?>