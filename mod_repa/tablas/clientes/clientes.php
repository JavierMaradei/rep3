<div class="content__boxed bg-gray-500">
    <div class="content__wrap">
        <div class="mb-3 mt-3 text-end">
            <h2><i>Clientes</i></h2>
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-md-7 mb-3">
        <div class="card h-100">
            <div class="card-body">
                <h3 class="card-title text-center"><i>Listado de Clientes</i></h3>
                <hr>
                <div class="row mb-2">
                    <div class="table-responsive">
                        <table id="tabla_clientes" class="table table-striped table-hover" style="font-size: 11px; font-weight: 400;">
                            <thead>
                                <th>Id</th>
                                <th>Razón Social 1</th>
                                <th>Razón Social 2</th>
                                <th>Dirección</th>  
                                <th>Teléfono</th>                          
                            </thead>
                            <tbody id="tbodyClientesList">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-5 mb-3">
        <?php include 'mod_repa/tablas/clientes/clientes_abm.php'; ?>
    </div>
</div>

<script src="./mod_repa/tablas/clientes/script_clientes.js?v=<?php echo uniqid();?>"></script>