<div class="content__boxed bg-gray-500" style="background-image: url('./img/banner.jpg'); background-size: cover; border-radius: 10px;">
    <div class="content__wrap">
        <div class="mb-3 mt-3 text-end">
            <h2><i style="color: white;">Productos</i></h2>
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-md-5 mb-3">
        <?php include 'mod_repa/tablas/productos/productos_abm.php'; ?>
    </div>
    <div class="col-md-7 mb-3">
        <div class="card h-100">
            <h4 class="card-header bg-light text-center"><i>Listado de Productos</i></h4>
            <div class="card-body">
                <div class="row mb-2">
                    <div class="table-responsive">
                        <table id="tabla_productos" class="table table-striped table-hover" style="font-size: 11px; font-weight: 400;">
                            <thead>
                                <th>Id</th>
                                <th>Codigo</th>
                                <th>Desc.</th>
                                <th>Marca</th>
                                <th>Familia</th>
                                <th>CostoEst.</th>
                                <th>Mono/Tri</th>
                                <th>Activo</th>
                            </thead>
                            <tbody id="tbodyProductosList">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--Modal despiece-->
<div id="modalDespiece" class="modal" role="dialog" tabindex="-1" >
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button id="btnCloseModal" type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" id="titulo">Despiece</h4>
            </div>
            <div class="modal-body">
                <div id="bodyDespiece" style="overflow-x: auto;"></div>
            </div>
            <div class="modal-footer">
                <button id="btnCerrarModal" type="button" class="btn btn-outline-danger" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>


<script src="./mod_repa/tablas/productos/script_productos.js?v=<?php echo uniqid();?>"></script>