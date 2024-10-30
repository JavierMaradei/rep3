<div class="content__boxed bg-gray-500">
    <div class="content__wrap">
        <div class="mb-3 mt-3">
            <div class="row">
                <div class="col-md-12 text-end">
                    <h2><i>Modificar orden</i></h2>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row mt-3"> 
    <form id="inputsBuscador">
        <div class="col-md-12 mb-3">
            <div class="card h-100" style="box-shadow: 0 0 1px grey !important;">
                <h4 class="card-header bg-light text-center"><i>Pre-filtro</i></h4>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-4 mb-2">
                            <label for="orden" class="form-label">Orden</label>
                            <input type="text" class="form-control" id="orden"> 
                        </div>
                        <div class="col-sm-8 mb-2"></div>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-12 text-center mt-2">
                            <button id="btnCancelar" type="button" class="btn btn-lg btn-danger">Cancelar</button>
                            <button id="btnBuscar" type="button" class="btn btn-lg btn-success">Buscar</button>
                            <div id="respuesta" class="text-center"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>

    <div class="col-md-12 mb-3">
        <div class="card h-100">
            <h4 class="card-header bg-light text-center"><i>Tabla de órdenes</i></h4>
            <div class="card-body">
                <div class="row mb-2">
                    <div class="table-responsive">
                        <table id="tabla" class="table table-striped table-hover" style="font-size: 11px; font-weight: 400;">
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
                            <tbody id="tbodyBuscadorList">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</div>

<!--Modal Buscador-->
<div id="modal" class="modal" role="dialog" tabindex="-1" >
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button id="btnCloseModal" type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" id="titulo"></h4>
            </div>
            <div class="modal-body">
                <div id="body" style="overflow-x: auto;"></div>
            </div>
            <div class="modal-footer">
                <button id="btnCerrarModal" type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<script src="./mod_repa/procesos/modificarOrden/script.js?v=<?php echo uniqid();?>"></script>