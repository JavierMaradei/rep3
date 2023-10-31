<div class="card h-100">
    <h4 class="card-header bg-dark text-white text-center"><i>Clientes</i></h4>
    <form id="formClientes">
        <div class="card-body">
            <div class="row mb-2">
                <label for="clienteCodigo" class="col-sm-2 col-form-label">Id</label>
                <div class="col-sm-10">
                    <input type="text" id="clienteId" class="form-control input-sm" readonly>
                </div>
            </div>
            <div class="row mb-2">
                <label for="clienteNombre" class="col-sm-2 col-form-label">Nombre</label>
                <div class="col-sm-10">
                    <input type="text" id="clienteNombre" class="form-control input-sm">
                </div>
            </div>
            <div class="row mb-2">
                <label for="clienteApellido" class="col-sm-2 col-form-label">Apellido</label>
                <div class="col-sm-10">
                    <input type="text" id="clienteApellido" class="form-control input-sm">
                </div>
            </div>
            <div class="row mb-2">
                <label for="clienteTelefono" class="col-sm-2 col-form-label">Teléfono</label>
                <div class="col-sm-10">
                    <input type="text" id="clienteTelefono" class="form-control input-sm">
                </div>
            </div>                    
            <div class="row mb-2">
                <label for="clienteCelular" class="col-sm-2 col-form-label">Celular</label>
                <div class="col-sm-10">
                    <input type="text" id="clienteCelular" class="form-control input-sm">
                </div>
            </div>
            <div class="row mb-2">
                <label for="clienteEmail" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="text" id="clienteEmail" class="form-control input-sm">
                </div>
            </div>
            <div class="row mb-2">
                <label for="provincia" class="col-sm-2 col-form-label" title="Provincia">Prov.</label>
                <div class="col-sm-10">
                    <select class="form-select" id="provincia"></select>
                </div>
            </div>
            <div class="row mb-2">
                <label for="localidad" class="col-sm-2 col-form-label" title="Localidad">Loc.</label>
                <div class="col-sm-10">
                    <select class="form-select" id="localidad"></select>
                </div>
            </div>
            <div class="row mb-2">
                <label for="calle" class="col-sm-2 col-form-label">Calle</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="calle"> 
                </div>
            </div>
            <div class="row mb-2">
                <label for="numeroCalle" class="col-sm-2 col-form-label">Número</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="numeroCalle"> 
                </div>
            </div>
            <div class="row mb-2">
                <label for="dpto" class="col-sm-2 col-form-label">Dpto.</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="dpto"> 
                </div>
            </div>
            <div class="row mb-2">
                <label for="clienteActivo" class="col-sm-2 col-form-label">Activo</label>
                <div class="col-sm-10 text-center">
                    <input type="checkbox" id="clienteActivo" class="form-check-input bigCheck">
                </div>
            </div>
        </div>
        <div class="card-footer text-center">
            <button id="btnGrabaCliente" class="btn btn-success btn-outline">Grabar</button>
            <button id="btnEliminaCliente" class="btn btn-danger btn-outline">Eliminar</button>
            <button id="btnCancelaCliente" class="btn btn-default btn-outline">Cancelar</button>
        </div>
    </form>
</div>