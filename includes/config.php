<?php

$mode = 'dev';
//$mode = 'prod';

switch ($mode) {
    case 'dev':
        define("DB_DSN", 'mysql:dbname=rep3;host=localhost;charset=UTF8');
        define("DB_USER", 'root');
        define("DB_PASS", '');
        define("MODO", 'dev');
    break;
    case 'prod':
        define("DB_DSN", 'mysql:dbname=gufaxrex_rep3;host=localhost;charset=UTF8');
        define("DB_USER", 'gufaxrex_rep3');
        define("DB_PASS", '=b5Dp!T7$}QZ');
        define("MODO", 'prod');
    break;
}

?>