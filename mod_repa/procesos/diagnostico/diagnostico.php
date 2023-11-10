<div class="content__boxed bg-gray-500">
    <div class="content__wrap">
        <div class="mb-3 mt-3">
            <div class="row">
                <div class="dropdown col-md-4">
                    <button class="btn btn-warning btn-sm" type="button" id="btnPrefiltro">
                        <i class="fa fa-search"> Prefiltro</i>
                    </button>
                </div>
                <div class="col-md-8 text-end">
                    <h2><i>Diagnóstico</i></h2>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row mt-3">

    <div class="col-md-12 mb-3">
        <div class="card h-100">
            <h4 class="card-header bg-dark text-white text-center"><i>Ordenes para diagnósticar</i></h4>
            <div class="card-body">
                <div class="row mb-2">
                    <div class="table-responsive">
                        <table id="tabla_diagnostico" class="table table-striped table-hover" style="font-size: 11px; font-weight: 400;">
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
                            <tbody id="tbodyDiagnosticoList">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</div>

<?php include('mod_repa/prefiltro/prefiltro.php');?>

<script src="./mod_repa/procesos/diagnostico/script_diagnostico.js?v=<?php echo uniqid();?>"></script>