<?php include ('mod_sirep/nav_sirep/nav_sirep.php');?>
<div class="row">
    <div class="wrapper wrapper-content  animated fadeInRight">       
        <div class="col-lg-7 m-b">
            <div class="ibox float-e-margins">
                <div class="ibox-title text-center">
                    <h3>Listado de Clientes</h3>
                </div>
                <div class="ibox-content">
                    <div class="table-responsive">
                        <table id="tabla_clientes" class="table table-striped table-hover" style="font-size: 11px;">
                            <thead>
                                <th>Id</th>
                                <th>Código</th>
                                <th>Razón Social 1</th>
                                <th>Razón Social 2</th>
                                <th>Dirección</th>  
                                <th>Teléfono</th>
                                <!--<th>Celular</th>
                                <th>Email</th> -->                                
                            </thead>
                            <tbody id="tbodyClientesList">
                            </tbody>
                        </table>
                    </div>                                                   
                </div>
            </div>
        </div>
        <div class="col-lg-5 m-b">
            <?php include ('mod_sirep/admin/tablas/clientes/clientes_abm.php');?>
        </div>
    </div>
</div>

<script src="./mod_sirep/admin/tablas/clientes/script_clientes.js"></script>