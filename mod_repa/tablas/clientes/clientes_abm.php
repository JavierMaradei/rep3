<div class="card h-100">
    <form id="formClientes">
        <div class="card-body">
            <h3 class="card-title text-center"><i>Clientes</i></h3>
            <hr>
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
                <label for="clienteDireccion" class="col-sm-2 col-form-label">Dirección</label>
                <div class="col-sm-10">
                    <input type="text" id="clienteDireccion" class="form-control input-sm">
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
                <div class="input-group col-sm-12">
                    <span class="input-group-addon" style="font-weight: bold;">Activo</span>
                    <div class="input-group-addon">
                        <div class="switch">
                            <div class="onoffswitch">
                                <input type="checkbox" class="onoffswitch-checkbox" id="clienteActivo" checked>
                                <label class="onoffswitch-label" for="clienteActivo">
                                    <span class="onoffswitch-inner"></span>
                                    <span class="onoffswitch-switch"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <button id="btnGrabaCliente" class="btn btn-success btn-outline">Grabar</button>
            <button id="btnEliminaCliente" class="btn btn-danger btn-outline">Eliminar</button>
            <button id="btnCancelaCliente" class="btn btn-default btn-outline">Cancelar</button>
        </div>
    </form>
</div>