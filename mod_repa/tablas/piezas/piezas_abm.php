<div class="card h-100">
    <h4 class="card-header bg-dark text-white text-center"><i>Piezas</i></h4>
    <form id="formPiezas">
        <div class="card-body">
            <div class="mininav-toggle text-center pb-4 collapsed">
                <img id="piezaImagen" class="mainnav__avatar img-xl " src="../../hdn/img/sinImagen.png" alt="Imagen de Pieza">
            </div>
            <div class="row mb-2">
                <label for="piezaId" class="col-sm-2 col-form-label">Id</label>
                <div class="col-sm-10">
                    <input type="text" id="piezaId" class="form-control input-sm" readonly>
                </div>
            </div>
            <div class="row mb-2">
                <label for="piezaCodigo" class="col-sm-2 col-form-label">Codigo</label>
                <div class="col-sm-10">
                    <input type="text" id="piezaCodigo" class="form-control input-sm">
                </div>
            </div>
            <div class="row mb-2">
                <label for="piezaRef" class="col-sm-2 col-form-label">Ref.</label>
                <div class="col-sm-10">
                    <input type="text" id="piezaRef" class="form-control input-sm">
                </div>
            </div>
            <div class="row mb-2">
                <label for="piezaMarca" class="col-sm-2 col-form-label">Marca</label>
                <div class="col-sm-10">
                    <select id="piezaMarca" class="form-select"></select>
                </div>
            </div>
            <div class="row mb-2">
                <label for="piezaDescripcion" class="col-sm-2 col-form-label" title="Descripción">Desc.</label>
                <div class="col-sm-10">
                    <input type="text" id="piezaDescripcion" class="form-control input-sm">
                </div>
            </div>                    
            <div class="row mb-2">
                <label for="piezaCosto" class="col-sm-2 col-form-label">Costo</label>
                <div class="col-sm-10">
                    <input type="text" id="piezaCosto" class="form-control input-sm">
                </div>
            </div>
            <div class="row mb-2">
                <label for="piezaSubirFoto" class="col-sm-2 col-form-label">Foto</label>
                <div class="col-sm-10 text-center">
                    <input type="file" id="piezaSubirFoto" class="form-control">
                </div>
            </div>
            <div class="row mb-2">
                <label for="piezaActivo" class="col-sm-2 col-form-label">Activo</label>
                <div class="col-sm-10 text-center">
                    <input type="checkbox" id="piezaActivo" class="form-check-input bigCheck">
                </div>
            </div>           
        </div>
        <div class="card-footer text-center">
            <button id="btnGrabaPieza" class="btn btn-success btn-outline">Grabar</button>
            <button id="btnEliminaPieza" class="btn btn-danger btn-outline">Eliminar</button>
            <button id="btnCancelaPieza" class="btn btn-default btn-outline">Cancelar</button>
        </div>
    </form>
</div>