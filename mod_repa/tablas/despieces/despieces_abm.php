<div class="card h-100">
    <h4 class="card-header bg-dark text-white text-center"><i>Despiece</i></h4>
    <form id="formDespiece">
        <div class="card-body">
            <div class="mininav-toggle text-center pb-4 collapsed">
                <img id="productoImagen" class="mainnav__avatar img-xl " src="../../hdn/img/sinImagen.png" alt="Imagen Producto">
            </div>
            <div class="col-sm-12 mb-2">
                <label for="productoCodDesc" class="form-label">Producto</label>
                <input type="text" id="productoCodDesc" class="form-control" readonly>
            </div>
        </div>
        <hr>
        <div class="col-md-12 mb-3">
            <div class="card-body">
                <div class="col-sm-12 text-left mb-2">
                    <button class="btn btn-info" id="btnBuscarPieza">Agregar pieza</button>
                </div>

                <div class="row mb-2">
                    <div class="table-responsive">
                        <table id="tabla_piezas" class="table table-striped table-hover" style="font-size: 11px; font-weight: 400;">
                            <thead>
                                <th>Id</th>
                                <th>Codigo</th>
                                <th>Desc.</th>
                                <th>Referencia</th>
                                <th>Marca</th>
                                <th>Eliminar</th>
                            </thead>
                            <tbody id="tbodyPiezasList">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="card-footer text-center">
            <div class="row">
                <div class="col-sm-12 text-center mb-2">
                    <button id="btnGrabaDespiece" class="btn btn-success btn-outline" disabled>Grabar</button>
                    <button id="btnCancelaDespiece" class="btn btn-outline-warning">Cancelar</button>
                    <button class="btn btn-outline-secondary" type="button" id="btnVerDespieceProducto" disabled hidden>Ver despiece</button>
                </div>
            </div>
        </div>
    </form>
</div>