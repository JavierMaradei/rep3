<div class="content__boxed bg-gray-500">
    <div class="content__wrap">
        <div class="mb-3 mt-3">
            <div class="row">
                <div class="col-md-12 text-end">
                    <h2><i>Informe de embalajes</i></h2>
                </div>
            </div>
        </div>
    </div>
</div>
<form id="inputsPrefiltro">
    <div class="row mt-3">
        <div class="col-md-12 mb-3">
            <div class="card h-100" style="box-shadow: 0 0 1px grey !important;">
                <h4 class="card-header bg-black text-white text-center"><i>Pre-filtro</i></h4>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-4 mb-2">
                            <label for="desdeFechaEmbalaje" class="form-label" >Desde fecha de embalaje</label>
                            <input type="date" class="form-control" id="desdeFechaEmbalaje" value="<?php echo date('Y-m-d', strtotime('-18 month')); ?>"> 
                        </div>
                        <div class="col-sm-4 mb-2">
                            <label for="hastaFechaEmbalaje" class="form-label">Hasta fecha de embalaje</label>
                            <input type="date" class="form-control" id="hastaFechaEmbalaje" value="<?php echo date('Y-m-d', strtotime('now')); ?>"> 
                        </div>
                        <div class="col-sm-4 mb-2">
                            <label for="embalador" class="form-label">Embalador</label>
                            <select id="embalador" class="form-select"></select>
                        </div>
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
                <h4 class="card-header bg-dark text-white text-center"><i>Tabla de órdenes</i></h4>
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
                                <tbody id="tbody">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>

<script src="./mod_repa/informes/embalajes/script.js?v=<?php echo uniqid();?>"></script>