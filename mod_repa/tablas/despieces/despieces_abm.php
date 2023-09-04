<div class="card h-100">
    <h4 class="card-header bg-dark text-white text-center"><i>Despiece</i></h4>
    <form id="formProductos">
        <div class="card-body">
            <div class="mininav-toggle text-center pb-4 collapsed">
                <img id="productoImagen" class="mainnav__avatar img-xl " src="../../hdn/img/sinImagen.png" alt="Imagen Producto">
            </div>
            <div class="col-sm-12 mb-2">
                <label for="codigoPieza" class="form-label">Código</label>
                <input type="text" class="form-control" id="codigoPieza"> 
            </div>
            <div class="col-sm-12 mb-2">
                <label for="descripcionPieza" class="form-label">Descripción</label>
                <div class="input-group">
                    <input type="text" id="descripcionPieza" class="form-control" readonly>
                    <button class="btn btn-outline-secondary" type="button" id="btnBuscarPieza">Buscar</button>
                </div>
            </div>
        </div>
        <div class="card-footer text-center">
            <div class="row">
                <div class="col-sm-8 text-left mb-2">
                    <button id="btnGrabaProducto" class="btn btn-success btn-outline">Grabar</button>
                    <button id="btnEliminaProducto" class="btn btn-danger btn-outline">Eliminar</button>
                    <button id="btnCancelaProducto" class="btn btn-outline-warning">Cancelar</button>
                </div>
                <div class="col-sm-4 text-right">
                    <button id="btnDespieceProducto" class="btn btn-info">Despiece</button>
                </div>
            </div>
        </div>
    </form>
</div>