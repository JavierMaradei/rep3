<div class="content__boxed bg-gray-500">
    <div class="content__wrap">
        <div class="mb-3 mt-3 text-end">
            <h2><i>Reparación</i></h2>
            <!-- User dropdown -->
            <div class="dropdown">

                <!-- Toggler -->
                <!-- <button class="header__btn btn btn-icon btn-sm" type="button" data-bs-toggle="dropdown" aria-label="User dropdown" aria-expanded="false">
                    <i class="demo-psi-male"></i>
                </button> -->

                <button class="header__btn btn btn-icon btn-sm" type="button" id="btnPrefiltro">
                    <i class="fa fa-search fa-2x"></i>
                </button>
            </div>
            <!-- End - User dropdown -->

        </div>
    </div>
</div>

<div class="row mt-3">

    <div class="col-md-12 mb-3">
        <div class="card h-100">
            <h4 class="card-header bg-dark text-white text-center"><i>Ordenes para reparar</i></h4>
            <div class="col-sm-12 p-4">
                <div class="form-check">
                    <input id="chkTodasLasReparaciones" class="form-check-input" type="checkbox">
                    <label for="chkTodasLasReparaciones" class="form-check-label">
                        Mostrar todas las reparaciones pendientes
                    </label>
                </div>
                <div class="form-check">
                    <input id="chkTodasLasSucursales" class="form-check-input" type="checkbox">
                    <label for="chkTodasLasSucursales" class="form-check-label">
                        Mostrar todas las sucursales
                    </label>
                </div>
            </div>
            <div class="card-body">
                <div class="row mb-2">
                    <div class="table-responsive">
                        <table id="tabla_reparaciones" class="table table-striped table-hover" style="font-size: 11px; font-weight: 400;">
                            <thead>
                                <th>Orden</th>
                                <th>F.Recepción</th>
                                <th>F.Retiro</th>
                                <th>Producto</th>
                                <th>Descripción</th>
                                <th>Nro.Serie</th>
                                <th>Cliente</th>
                                <th>Ingreso</th>
                                <th>Atención</th>  
                                <th>Tipo</th>                          
                                <th>Sucursal</th>                          
                            </thead>
                            <tbody id="tbodyReparacionesList">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</div>

<?php include('mod_repa/prefiltro/prefiltro.php');?>

<script src="./mod_repa/procesos/reparacion/script_reparacion.js?v=<?php echo uniqid();?>"></script>