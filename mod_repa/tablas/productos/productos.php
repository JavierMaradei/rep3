<?php include ('mod_sirep/nav_sirep/nav_sirep.php');?>
<div class="row">
    <div class="wrapper wrapper-content  animated fadeInRight">       
        <div class="col-lg-7 m-b">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <div class="row">
                        <div class="text-center col-sm-12">
                            <h3>Listado de Productos</h3>
                        </div>
                        <div class="col-sm-12">

                            <div class="col-sm-8 text-left">
                                <div class="row">
                                    <label for="productosSinSinonimo" class="checkbox-inline"> <input id="productosSinSinonimo" type="checkbox">Filtrar solo por productos sin sinónimo</label>  
                                </div>
                                <div class="row">
                                    <label for="productosActivos" class="checkbox-inline"> <input id="productosActivos" type="checkbox" checked>Filtrar solo por productos activos</label>
                                </div>
                            </div>
                            <div class="col-sm-4 text-right">
                                <button type="button" id="importadorProductos" class="btn btn-info btn-outline">Importador</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="ibox-content">
                    <div class="table-responsive">
                        <table id="tabla_productos" class="table table-striped table-hover" style="font-size: 11px;">
                            <thead>
                                <th>Id</th>
                                <th>Código</th>
                                <th>Descripción</th>
                                <th>Serie</th>
                                <th>Dificultad</th>
                                <th>Costo</th>  
                                <th>Estado</th>
                                <th>Tipo</th>
                                <th>Grupo</th>                                 
                            </thead>
                            <tbody id="tbodyProductosList">
                            </tbody>
                        </table>
                    </div>                                                   
                </div>
            </div>
        </div>
        <div class="col-lg-5 m-b">
            <div class="ibox float-e-margins">
                <div class="ibox content">
                    <div class="ibox-title text-center">
                        <div class="row">
                            <div class="col-sm-6">
                                <h3>Producto</h3>
                            </div>
                            <div class="col-sm-6 text-right">
                                <button type="button" id="btnStockAdonix" class="btn btn-info btn-outline" disabled>Ver stock Adonix</button>
                            </div>
                        </div>
                    </div>
                    <form id="formProductos">
                        <div class="ibox-content">
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="text" id="idProducto" hidden>
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Código</span>
                                    <input type="text" id="codigoProducto" class="form-control input-sm">
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;" title="Descripción producto">Desc.</span>
                                    <input type="text" id="descripcionProducto" class="form-control input-sm">
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Dificultad</span>
                                    <input type="text" id="dificultadProducto" class="form-control input-sm">
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Costo</span>
                                    <input type="text" id="costoProducto" class="form-control input-sm">
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Grupo</span>
                                    <select class="form-control input-sm" id="grupoProducto"></select>
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Tipo</span>
                                    <select class="form-control input-sm" id="tipoProducto"></select>
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;" title="Modelo Ficha">Mod.Ficha</span>
                                    <select class="form-control input-sm" id="fichaProducto"></select>
                                </div>
                                <div class="form-group text-center">
                                    <label for="monofasica" class="radio-inline"> <input id="monofasica" name="alimentacionProducto" type="radio">Monofásica</label>
                                    <label for="trifasica" class="radio-inline"> <input id="trifasica" name="alimentacionProducto" type="radio">Trifásica</label>                           
                                </div>                               
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;" title="Número de serie garantía">S.Gtía</span>
                                    <input type="text" id="nroDeSerieProducto" class="form-control input-sm">
                                </div>
                            
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;" title="Gama del producto">Gama</span>
                                    <input type="text" id="gamaProducto" class="form-control input-sm">
                                </div>                          
                                <div class="col-sm-12 text-center">
                                    <label for="cargoReducidoProducto" class="checkbox-inline"> <input id="cargoReducidoProducto" type="checkbox">Cargo Reducido</label>
                                    <label for="mediaUnionProducto" class="checkbox-inline"> <input id="mediaUnionProducto" type="checkbox">Media Unión</label>
                                    <label for="activoProducto" class="checkbox-inline"> <input id="activoProducto" type="checkbox" checked>Activo</label>
                                </div>
                                <div class="col-sm-12">
                                    <hr>                             
                                </div>
                                <h3 class="text-center">Producto nuevo (Sinónimo)</h3>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Código</span>
                                    <input type="text" id="codigoSinonimoProducto" class="form-control input-sm">
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;" title="Descripción sinónimo">Desc.</span>
                                    <input type="text" id="descripcionSinonimoProducto" class="form-control input-sm">
                                </div>
                                <div class="form-group col-sm-12 text-center">
                                    <label for="canjeableProducto" class="checkbox-inline"> <input id="canjeableProducto" type="checkbox">Canjeable?</label>
                                </div>
                                <div class="col-sm-12">
                                    <hr>                             
                                </div>
                                <div class="form-group text-center">
                                    <button id="btnGrabaProducto" class="btn btn-success btn-outline">Grabar</button>
                                    <button id="btnEliminaProducto" class="btn btn-danger btn-outline">Eliminar</button>
                                    <button id="btnCancelaProducto" class="btn btn-default btn-outline">Cancelar</button>
                                </div>                
                            </div>
                        </div>
                    </form>                                                  
                </div>
            </div>
        </div>
    </div>
</div>

<!--Modal de productos-->
<div class="modal" tabindex="-1" role="dialog" id="modal_productos">
    <div class="modal-dialog" role="document">
        <div class="modal-content modal-lg">
            <div class="modal-header">
                <h2 class="modal-title text-center" id="titulo">Importador de productos</h2>
                <button type="button" id="btnCloseModal" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" style="overflow-x: auto;">
                <div id="bodyProductos">
                    <?php include ('mod_sirep/admin/importacion/nroSerie/nroSerie_abm.php'); ?>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id="btnCerrarModal" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
<!--Modal de stock Adonix-->
<div class="modal" tabindex="-1" role="dialog" id="modal_stockAdonix">
    <div class="modal-dialog" role="document">
        <div class="modal-content modal-lg">
            <div class="modal-header">
                <h2 class="modal-title text-center" id="titulo">Stock Adonix</h2>
                <button type="button" id="btnCloseModal2" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" style="overflow-x: auto;">
                <div id="bodyStockAdonix">
                    <div class="table-responsive">
                        <table id="tabla_stockAdonix" class="table table-striped table-hover">
                            <thead>
                                <th>Artículo</th>
                                <th>Descripción</th>
                                <th>Cantidad</th>
                                <th>Unidad</th>
                                <th>Depósito</th>
                                <th>Tipo ubicación</th>
                                <th>Ubicación</th>
                                <th>Estado artículo</th>
                                <th>Estado stock</th>
                            </thead>
                            <tbody id="tbodystockAdonix">
                            </tbody>
                        </table>
                    </div>          
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id="btnCerrarModal2" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<script src="./mod_sirep/admin/tablas/productos/script_productos.js"></script>
