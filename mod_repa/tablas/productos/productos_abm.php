<div class="card h-100">
    <h4 class="card-header bg-dark text-white text-center"><i>Productos</i></h4>
    <form id="formProductos">
        <div class="card-body">
            <div class="mininav-toggle text-center pb-4 collapsed">
                <img id="productoImagen" class="mainnav__avatar img-xl " src="../../hdn/img/sinImagen.png" alt="Imagen Producto">
            </div>
            <div class="row mb-2">
                <label for="productoId" class="col-sm-2 col-form-label">Id</label>
                <div class="col-sm-10">
                    <input type="text" id="productoId" class="form-control input-sm" readonly>
                </div>
            </div>
            <div class="row mb-2">
                <label for="productoCodigo" class="col-sm-2 col-form-label">Codigo</label>
                <div class="col-sm-10">
                    <input type="text" id="productoCodigo" class="form-control input-sm">
                </div>
            </div>
            <div class="row mb-2">
                <label for="productoMarca" class="col-sm-2 col-form-label">Marca</label>
                <div class="col-sm-10">
                    <select id="productoMarca" class="form-select"></select>
                </div>
            </div>
            <div class="row mb-2">
                <label for="productoFamilia" class="col-sm-2 col-form-label">Familia</label>
                <div class="col-sm-10">
                    <select id="productoFamilia" class="form-select"></select>
                </div>
            </div>
            <div class="row mb-2">
                <label for="productoDescripcion" class="col-sm-2 col-form-label" title="Descripción">Desc.</label>
                <div class="col-sm-10">
                    <input type="text" id="productoDescripcion" class="form-control input-sm">
                </div>
            </div>                    
            <div class="row mb-2">
                <label for="productoCosto" class="col-sm-2 col-form-label">Costo</label>
                <div class="col-sm-10">
                    <input type="text" id="productoCosto" class="form-control input-sm">
                </div>
            </div>
            <div class="row mb-2">
                <label for="productoMonoTri" class="col-sm-2 col-form-label">Mono/Tri</label>
                <div class="col-sm-10">
                    <select id="productoMonoTri" class="form-select"><?php echo tiposMonoTri();?></select>
                </div>
            </div>
            <div class="row mb-2">
                <label for="productoSubirFoto" class="col-sm-2 col-form-label" title="Foto del producto">Foto</label>
                <div class="col-sm-10 text-center">
                    <input type="file" id="productoSubirFoto" class="form-control">
                </div>
            </div>
            <div class="row mb-2">
                <label for="productoSubirFotoDespiece" class="col-sm-2 col-form-label" title="Foto del despiece">Desp.</label>
                <div class="col-sm-10 text-center">
                    <input type="file" id="productoSubirFotoDespiece" class="form-control">
                </div>
            </div>
            <div class="row mb-2">
                <label for="productoActivo" class="col-sm-2 col-form-label">Activo</label>
                <div class="col-sm-10 text-center">
                    <input type="checkbox" id="productoActivo" class="form-check-input bigCheck">
                </div>
            </div>
            <div class="row mb-2">
                <label for="productoCanjeable" class="col-sm-2 col-form-label">Canje?</label>
                <div class="col-sm-10 text-center">
                    <input type="checkbox" id="productoCanjeable" class="form-check-input bigCheck">
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
                    <button id="btnDespieceProducto" class="btn btn-info" hidden>Despiece</button>
                </div>
            </div>
        </div>
    </form>
</div>