<div class="ibox float-e-margins">
                <div class="ibox content">
                    <div class="ibox-title text-center">
                        <h3>Cliente</h3>
                    </div>
                    <form id="formClientes">
                        <div class="ibox-content">
                            <div class="form-group">
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;" title="Código cliente">Cód.</span>
                                    <input type="text" id="clienteCodigo" class="form-control input-sm">
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;" title="Razón Social 1">R.S.1</span>
                                    <input type="text" id="clienteRazonSocial1" class="form-control input-sm">
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;" title="Razón Social 2">R.S.2</span>
                                    <input type="text" id="clienteRazonSocial2" class="form-control input-sm">
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;" title="Dirección">Dir.</span>
                                    <input type="text" id="clienteDireccion" class="form-control input-sm">
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;" title="Teléfono">Tel.</span>
                                    <input type="text" id="clienteTelefono" class="form-control input-sm">
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;" title="Celular">Cel.</span>
                                    <input type="text" id="clienteCelular" class="form-control input-sm">
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Email</span>
                                    <input type="email" id="clienteEmail" class="form-control input-sm">
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;" title="Zonas de despacho">Z.Desp.</span>
                                    <select class="form-control input-sm" id="clienteZonasDespacho"></select>
                                </div>
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
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Antisarro</span>
                                    <div class="input-group-addon">
                                        <div class="switch">
                                            <div class="onoffswitch">
                                                <input type="checkbox" class="onoffswitch-checkbox" id="clienteAntisarro">
                                                <label class="onoffswitch-label" for="clienteAntisarro">
                                                    <span class="onoffswitch-inner"></span>
                                                    <span class="onoffswitch-switch"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Solicita OC</span>
                                    <div class="input-group-addon">
                                        <div class="switch">
                                            <div class="onoffswitch">
                                                <input type="checkbox" class="onoffswitch-checkbox" id="clienteSolicitaOc">
                                                <label class="onoffswitch-label" for="clienteSolicitaOc">
                                                    <span class="onoffswitch-inner"></span>
                                                    <span class="onoffswitch-switch"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ibox-content">
                            <h3 class="text-center">Contacto reparaciones</h3>
                            <div class="form-group">
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Contacto</span>
                                    <input type="text" id="clienteContactoNombre" class="form-control input-sm">
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;">Email</span>
                                    <input type="email" id="clienteContactoEmail" class="form-control input-sm">
                                </div>
                                <div class="input-group col-sm-12">
                                    <span class="input-group-addon" style="font-weight: bold;" title="Teléfono">Tel.</span>
                                    <input type="text" id="clienteContactoTelefono" class="form-control input-sm">
                                </div>
                            </div>
                        </div>
                        
                    </form>                    
                    <div class="ibox-content text-center" id="botonesAbmClientes">
                        <button id="btnGrabaCliente" class="btn btn-success btn-outline">Grabar</button>
                        <button id="btnEliminaCliente" class="btn btn-danger btn-outline">Eliminar</button>
                        <button id="btnCancelaCliente" class="btn btn-default btn-outline">Cancelar</button>
                    </div>                                                   
                </div>
            </div>
