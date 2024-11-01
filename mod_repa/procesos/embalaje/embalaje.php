<div class="content__boxed bg-gray-500" style="background-image: url('./img/banner.jpg'); background-size: cover; border-radius: 10px;">
    <div class="content__wrap">
        <div class="mb-3 mt-3">
            <div class="row">
                <div class="dropdown col-md-4">
                    <button class="btn btn-warning btn-sm" type="button" id="btnPrefiltro">
                        <i class="fa fa-search"></i> Prefiltro
                    </button>
                </div>
                <div class="col-md-8 text-end">
                    <h2><i style="color: white;">Embalaje</i></h2>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row mt-3">

    <div class="col-md-12 mb-3">
        <div class="card h-100">
            <h4 class="card-header bg-light text-center"><i>Ordenes para embalar</i></h4>
            <div class="col-sm-12 p-4">
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
                        <table id="tabla_embalajes" class="table table-striped table-hover" style="font-size: 11px; font-weight: 400;">
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
                            <tbody id="tbodyEmbalajesList">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</div>

<?php include('mod_repa/prefiltro/prefiltro.php');?>

<script src="./mod_repa/procesos/embalaje/script_embalaje.js?v=<?php echo uniqid();?>"></script>