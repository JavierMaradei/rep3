<div class="content__boxed bg-gray-500" style="background-image: url('./img/banner.jpg'); background-size: cover; border-radius: 10px;">
    <div class="content__wrap">
        <div class="mb-3 mt-3 text-end">
            <h2><i style="color: white;">Piezas</i></h2>
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-md-5 mb-3">
        <?php include 'mod_repa/tablas/piezas/piezas_abm.php'; ?>
    </div>
    <div class="col-md-7 mb-3">
        <div class="card h-100">
            <h4 class="card-header bg-light text-center"><i>Listado de Piezas</i></h4>
            <div class="card-body">
                <div class="row mb-2">
                    <div class="table-responsive">
                        <table id="tabla_piezas" class="table table-striped table-hover" style="font-size: 11px; font-weight: 400;">
                            <thead>
                                <th>Id</th>
                                <th>Codigo</th>
                                <th>Ref.</th>
                                <th>Desc.</th>
                                <th>Marca</th>
                                <th>Costo</th>
                                <th>Activo</th>
                            </thead>
                            <tbody id="tbodyPiezasList">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="./mod_repa/tablas/piezas/script_piezas.js?v=<?php echo uniqid();?>"></script>