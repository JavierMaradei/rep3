<div class="content__boxed bg-gray-500" style="background-image: url('./img/banner.jpg'); background-size: cover; border-radius: 10px;">
    <div class="content__wrap">
        <div class="mb-3 mt-3 text-end">
            <h2><i style="color: white;">Clientes</i></h2>
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-md-5 mb-3">
        <?php include 'mod_repa/tablas/clientes/clientes_abm.php'; ?>
    </div>
    <div class="col-md-7 mb-3">
        <div class="card h-100">
            <h4 class="card-header bg-light text-center"><i>Listado de Clientes</i></h4>
            <div class="card-body">
                <div class="row mb-2">
                    <div class="table-responsive">
                        <table id="tabla_clientes" class="table table-striped table-hover" style="font-size: 11px; font-weight: 400;">
                            <thead>
                                <th>Id</th>
                                <th>R.S.1/Nombre</th>
                                <th>R.S.2/Apellido</th>
                                <th>Teléfono</th>                          
                                <th>Celular</th>                          
                                <th>Email</th>                          
                            </thead>
                            <tbody id="tbodyClientesList">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="./mod_repa/tablas/clientes/script_clientes.js?v=<?php echo uniqid();?>"></script>