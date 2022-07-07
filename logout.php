<?php

    session_start();
    session_destroy();
    session_unset();

    // Opcional 
    unset($_SESSION);

    header ("Location: index.php");
