<?php
    ini_set("date.timezone", "America/Argentina/Buenos_Aires");
    require_once('includes/config.php');

    function conectar($dsn, $usuario, $contrasena) {
        $gbd = false;
        try {
        $gbd = new PDO($dsn, $usuario, $contrasena);
        } catch (PDOException $e) {
        echo 'Falló la conexión: ' . $e->getMessage;
        }

        return $gbd;
    }

    $mensaje = "";

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $conexion = conectar(DB_DSN, DB_USER, DB_PASS);

    $query = "SELECT * FROM usuarios WHERE usuario_id = '".$_POST['usuarioV3']."' AND clave = '".md5($_POST['passwordV3'])."' AND activo = 'S'";
    $resultado = $conexion->prepare($query);
    $resultado->execute();
        
    if ($resultado->rowCount() > 0) {
        $usuario = $resultado->fetch(PDO::FETCH_ASSOC);
            //Usuario logueado
            session_start();

            /* Se agregan $_SESSION['usuario'] y $_SESSION['clave'] para compatibilizar
            con la plantilla original */
            $_SESSION['nombre']     = $usuario['nombre'];
            $_SESSION['apellido']   = $usuario['apellido'];
            $_SESSION['usuario_id'] = $usuario['usuario_id'];

            $fecha = new DateTime();
            $fechaFormateada = $fecha->format('Y-m-d H:i:s');
            $update = "UPDATE usuario SET fultimocambio ='".$fechaFormateada."' WHERE usuario_id = ".$usuario['usuario_id'];
            $resultado = $conexion->prepare($update);
            $resultado->execute();

        header("Location: index.php?page=home");
        exit();
    } else {
        $mensaje = "Usuario o password incorrecto";
    }
    }

?>

<!DOCTYPE html>
<html lang="en">

<!-- Mirrored from themeon.net/nifty/v3.0.1/front-pages/login/ by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 13 Jun 2022 19:27:38 GMT -->
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
    <meta name="description" content="The login page allows a user to gain access to an application by entering their username and password or by authenticating using a social media login.">
    <title>Login | Hidroeléctrica del norte - Intranet</title>

    <!-- STYLESHEETS -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--- -->

    <!-- Fonts [ OPTIONAL ] -->
    <link rel="preconnect" href="https://fonts.googleapis.com/">
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&amp;family=Ubuntu:wght@400;500;700&amp;display=swap" rel="stylesheet">

    <!-- Bootstrap CSS [ REQUIRED ] -->
    <link rel="stylesheet" href="./assets/css/bootstrap.min.75a07e3a3100a6fed983b15ad1b297c127a8c2335854b0efc3363731475cbed6.css">

    <!-- Nifty CSS [ REQUIRED ] -->
    <link rel="stylesheet" href="./assets/css/nifty.min.4d1ebee0c2ac4ed3c2df72b5178fb60181cfff43375388fee0f4af67ecf44050.css">

    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~---

    [ REQUIRED ]
    You must include this category in your project.


    [ OPTIONAL ]
    This is an optional plugin. You may choose to include it in your project.


    [ DEMO ]
    Used for demonstration purposes only. This category should NOT be included in your project.


    [ SAMPLE ]
    Here's a sample script that explains how to initialize plugins and/or components: This category should NOT be included in your project.


    Detailed information and more samples can be found in the documentation.

    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--- -->
</head>

<body class="" style="background-image: url('./assets/premium/boxed-bg/blurred/bg/12.jpg')";>

    <!-- PAGE CONTAINER -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div id="root" class="root front-container">

        <!-- CONTENTS -->
        <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
        <section id="content" class="content">
            <div class="content__boxed w-100 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                <div class="content__wrap">

                    <!-- Login card -->
                    <div class="card shadow-lg">
                        <div class="card-body">

                            <div class="text-center">
                                <h1 class="h3">Logeo de Cuentas</h1>
                                <div class="card bg-dark mb-3">
                                    <img class="card-img-top" src="./img/logoHDN.jpg" alt="town" loading="lazy">
                                </div>
                                <p>Iniciar sesión en tu cuenta</p>
                            </div>

                            <form class="mt-4" role="form" action="" method="POST">

                                <div class="mb-3">
                                    <input type="text" name="usuarioV3" class="form-control" placeholder="Email" autofocus>
                                </div>

                                <div class="mb-3">
                                    <input type="password" name="passwordV3" class="form-control" placeholder="Password">
                                </div>

                                <section>
                                    <?php
                                        if ($mensaje != '') {
                                            echo $_SESSION;
                                            echo $mensaje;
                                        }
                                    ?>
                                </section>

                                <div class="d-grid mt-5">
                                    <button class="btn btn-primary btn-lg" type="submit">Ingresar</button>
                                </div>
                            </form>

                        </div>
                    </div>
                    <!-- END : Login card -->

                </div>
            </div>
        </section>

        <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
        <!-- END - CONTENTS -->
    </div>
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- END - PAGE CONTAINER -->

    <!-- JAVASCRIPTS -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

    <!-- Bootstrap JS [ OPTIONAL ] -->
    <script src="./assets/js/bootstrap.min.bdf649e4bf3fa0261445f7c2ed3517c3f300c9bb44cb991c504bdc130a6ead19.js" defer></script>

    <!-- Nifty JS [ OPTIONAL ] -->
    <script src="./assets/js/nifty.min.b53472f123acc27ffd0c586e4ca3dc5d83c0670a3a5e120f766f88a92240f57b.js" defer></script>

</body>


<!-- Mirrored from themeon.net/nifty/v3.0.1/front-pages/login/ by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 13 Jun 2022 19:27:38 GMT -->
</html>