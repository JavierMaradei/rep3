<div class="content__boxed bg-gray-500">
    <div class="content__wrap">
        <div class="mb-3 mt-3 text-end">
            <h2><i>Usuarios</i></h2>
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-md-8 mb-3">
        <div class="card h-100">
            <h4 class="card-header bg-dark text-white text-center"><i>Listado de Usuarios</i></h4>
            <div class="card-body">
                <div class="row mb-2">
                    <div class="table-responsive">
                        <table id="tabla_usuarios" class="table table-striped table-hover" style="font-size: 11px; font-weight: 400;">
                            <thead>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Perfil</th>
                                <th>Sucursal</th>
                                <th>Emisor</th>
                                <th>Reparador</th>
                                <th>Activo</th>                          
                                <th>Alta</th>                          
                            </thead>
                            <tbody id="tbodyUsuariosList">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-4 mb-3">
        <div class="card h-100">
            <form id="formUsuarios">
                <h4 class="card-header bg-dark text-white text-center"><i>Usuario</i></h4>
                <div class="card-body">
                    <div class="row mb-2">
                        <label for="idUsuarios" class="col-sm-2 col-form-label">Id</label>
                        <div class="col-sm-10">
                            <input type="text" id="idUsuarios" class="form-control input-sm" readonly>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="nombreUsuarios" class="col-sm-2 col-form-label" title="Nombre">Nom.</label>
                        <div class="col-sm-10">
                            <input type="text" id="nombreUsuarios" class="form-control input-sm">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="apellidoUsuarios" class="col-sm-2 col-form-label" title="Apellido">Ape.</label>
                        <div class="col-sm-10">
                            <input type="text" id="apellidoUsuarios" class="form-control input-sm">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="lugarRecepcionUsuarios" class="col-sm-2 col-form-label" title="Lugar de Recepción">L.R.</label>
                        <div class="col-sm-10">
                            <select id="lugarRecepcionUsuarios" class="form-select input-sm"></select>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="sucursalUsuarios" class="col-sm-2 col-form-label" title="Sucursal">Suc.</label>
                        <div class="col-sm-10">
                            <select id="sucursalUsuarios" class="form-select input-sm"></select>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="perfilUsuarios" class="col-sm-2 col-form-label">Perfil</label>
                        <div class="col-sm-10">
                            <select id="perfilUsuarios" class="form-select input-sm"></select>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="emailUsuarios" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="text" id="emailUsuarios" class="form-control input-sm">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="claveUsuarios" class="col-sm-2 col-form-label">Clave</label>
                        <div class="col-sm-10">
                            <input type="password" id="claveUsuarios" class="form-control input-sm">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="emisorUsuarios" class="col-sm-2 col-form-label">Emisor</label>
                        <div class="col-sm-10 text-center">
                            <input type="checkbox" id="emisorUsuarios" class="form-check-input bigCheck">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="diagnosticadorUsuarios" class="col-sm-2 col-form-label" title="Diagnosticador">Diag.</label>
                        <div class="col-sm-10 text-center">
                            <input type="checkbox" id="diagnosticadorUsuarios" class="form-check-input bigCheck">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="reparadorUsuarios" class="col-sm-2 col-form-label" title="Reparador">Repa.</label>
                        <div class="col-sm-10 text-center">
                            <input type="checkbox" id="reparadorUsuarios" class="form-check-input bigCheck">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="embaladorUsuarios" class="col-sm-2 col-form-label" title="Embalador">Emb.</label>
                        <div class="col-sm-10 text-center">
                            <input type="checkbox" id="embaladorUsuarios" class="form-check-input bigCheck">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="tecnicoUsuarios" class="col-sm-2 col-form-label" title="Tecnico">Tec.</label>
                        <div class="col-sm-10 text-center">
                            <input type="checkbox" id="tecnicoUsuarios" class="form-check-input bigCheck">
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label for="activoUsuarios" class="col-sm-2 col-form-label">Activo</label>
                        <div class="col-sm-10 text-center">
                            <input type="checkbox" id="activoUsuarios" class="form-check-input bigCheck">
                        </div>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <button id="btnGrabaUsuarios" class="btn btn-success btn-outline">Grabar</button>
                    <button id="btnEliminaUsuarios" class="btn btn-danger btn-outline">Eliminar</button>
                    <button id="btnCancelaUsuarios" class="btn btn-default btn-outline">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="./mod_repa/configuracion/usuarios/script_usuarios.js?v=<?php echo uniqid();?>"></script>