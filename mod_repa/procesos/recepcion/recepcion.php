<div class="ibox float-e-margins">
    <form id="formRecepcion">
        <div class="ibox-title">
            <h3>Recepción</h3>
        </div>
        <div class="ibox-content">
            <div class="panel-body">
                <!--<div class="panel-group" id="accordion">-->
                <div class="panel-group">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                Recepción del equipo
                            </h4>
                        </div>
                        <!--<div aria-expanded="false" style="height: 0px;">-->
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;">Orden</span>
                                        <input type="text" id="nroDeOrden" class="form-control input-sm" readonly>
                                    </div>
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;">Fecha</span>
                                        <input type="date" id="fechaRecepcion" class="form-control input-sm" value="<?php echo date('Y-m-d'); ?>" readonly>
                                    </div>
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;">Remito</span>
                                        <div class="form-inline">
                                            <div class="form-group col-sm-4" style="padding-left: 0px; padding-right: 0px;">
                                                <input type="text" id="prefijoRemitoClienteSirep" class="form-control input-sm" placeholder="Prefijo">
                                            </div>
                                            <div class="form-group col-sm-8" style="padding-left: 0px; padding-right: 0px;">
                                                <input type="text" id="nroRemitoClienteSirep" class="form-control input-sm" placeholder="Nro. de remito">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-5">
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;" title="Lugar de recepción">L.Recep.</span>
                                        <select id="lugarRecepcion" class="form-control input-sm">
                                        </select>
                                    </div>
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;" title="Tipo de reparación">Tipo</span>
                                        <select id="tipoReparacion" class="form-control input-sm">
                                            <?php /* echo tiposReparacion() */ ?>
                                        </select>
                                    </div>
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;">Atención</span>
                                        <select id="atencion" class="form-control input-sm">
                                            <?php /* echo tiposAtencionABM() */ ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" id="tipoGarantia" hidden>
                                    <div class="input-group col-sm-12 text-left">
                                        <label for="garantia" class="checkbox-inline"> <input id="garantia" type="checkbox" name="c">Reclama garantía </label>
                                    </div>
                                    <div class="input-group col-sm-12 text-left">
                                        <label for="reduccionTurbina" class="checkbox-inline"> <input id="reduccionTurbina" type="checkbox" name="c">Reducción de turbina </label>
                                    </div>
                                    <div class="input-group col-sm-12 text-left">
                                        <label for="flete" class="checkbox-inline"> <input id="flete" type="checkbox" name="c">Flete </label>
                                    </div>
                                    <div class="input-group col-sm-12 text-left">
                                        <label for="antisarro" class="checkbox-inline"> <input id="antisarro" type="checkbox" name="c">Antisarro </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--</div>-->
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                Info del Cliente
                            </h4>
                        </div>
                        <!--<div id="collapseTwo" class="panel-collapse" aria-expanded="false" style="height: 0px;">-->
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-3 text-center">
                                    <button id="btnNuevoCliente" type="button" class="btn btn-success btn-sm">Nuevo cliente</button>
                                </div>
                                <div class="col-sm-5 text-right">
                                    <div class="input-group">
                                    <!--<input type="text" class="form-control input-sm" id="searchCliente" placeholder="Ingrese código, nombre, apellido, teléfono, celular o mail">-->
                                        <input type="text" class="form-control input-sm" id="searchCliente" placeholder="Ingrese código, nombre o apellido">
                                        <span class="input-group-btn">
                                            <button id="btnBuscarCliente" type="button" class="btn btn-primary btn-outline btn-sm">Buscar cliente</button>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <input type="checkbox" id="tipoBusquedaCliente"><label for="tipoBusquedaCliente">Incluir celular, email y teléfono</label>
                                </div>
                                <div class="col-sm-12">
                                    <hr>
                                </div>
                                <div class="col-sm-4">
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;">Código</span>
                                        <input type="text" id="clienteCodigo" class="form-control input-sm" readonly>
                                    </div>
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;">Apellido</span>
                                        <input type="text" id="clienteRazonSocial1" class="form-control input-sm" maxlength="50">
                                    </div>
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;">Nombre</span>
                                        <input type="text" id="clienteRazonSocial2" class="form-control input-sm" maxlength="50">
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;">Teléfono</span>
                                        <input type="text" id="clienteTelefono" class="form-control input-sm" maxlength="60">
                                    </div>
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;">Celular</span>
                                        <input type="text" id="clienteCelular" class="form-control input-sm" maxlength="25">
                                    </div>
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;">Email</span>
                                        <input type="text" id="clienteEmail" class="form-control input-sm" maxlength="50">
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" title="Referencia" style="font-weight: bold;">Ref.</span>
                                        <input type="text" id="referencia" class="form-control input-sm" maxlength="50">
                                    </div>
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;">O/C</span>
                                        <input type="text" id="ordenDeCompra" class="form-control input-sm" maxlength="20">
                                    </div>
                                    <div class="input-group col-sm-12" id="divTecnico">
                                        <span class="input-group-addon" style="font-weight: bold;">Técnico</span>
                                        <select id="tecnico" class="form-control input-sm"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--</div>-->
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                Info del Producto
                            </h4>
                        </div>
                        <!--<div id="collapseThree" class="panel-collapse" aria-expanded="false">-->
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-5">

                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;">Código</span>
                                        <input type="text" id="codigo" class="form-control input-sm" maxlength="9">
                                    </div>
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;" title="Número de Serie">Serie</span>
                                        <input type="text" id="nroSerieProducto" class="form-control input-sm" maxlength="10">
                                        <small class="input-group-btn">
                                            <button type="button" title="Generar nuevo nro. de serie" id="generarNroSerie" class="btn btn-outline btn-primary btn-sm"><i class="fa fa-plus"></i></button>
                                        </small>
                                    </div>
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;">Serie Gtía</span>
                                        <input type="text" id="nroSerieGarantia" class="form-control input-sm" readonly>
                                    </div>
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;" title="Modelo">Modelo</span>
                                        <select id="modeloFicha" class="form-control input-sm"></select>
                                    </div>
                                    <div class="input-group col-sm-12" id="divMediaUnion">
                                        <span class="input-group-addon" style="font-weight: bold;" title="Media unión">M.Unión</span>
                                        <select class="form-control input-sm" id="mediaUnion">
                                            <option value="">Seleccionar</option>
                                            <option value="S">Si</option>
                                            <option value="N">No</option>
                                        </select>
                                    </div>
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;">Equipo a Recuperar</span>
                                        <div class="input-group-addon">
                                            <div class="switch">
                                                <div class="onoffswitch">
                                                    <input type="checkbox" class="onoffswitch-checkbox" id="equipoRecuperar">
                                                    <label class="onoffswitch-label" for="equipoRecuperar">
                                                        <span class="onoffswitch-inner"></span>
                                                        <span class="onoffswitch-switch"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-7">
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;" title="Descripción">Desc.</span>
                                        <input type="text" id="descripcion" class="form-control input-sm" readonly>
                                        <span class="input-group-btn">
                                            <button id="btnBuscarBomba" type="button" class="btn btn-primary btn-outline btn-sm">Buscar</button>
                                        </span>
                                    </div>
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;" title="Problema Declarado">Prob.Dec.</span>
                                        <select id="problemaDeclarado" class="form-control input-sm"></select>
                                    </div>
                                    <div class="input-group col-sm-12">
                                        <span class="input-group-addon" style="font-weight: bold;" title="Pedido de Service">P.Serv.</span>
                                        <input type="text" id="pedidoServiceSirep" class="form-control input-sm">
                                    </div>
                                    <textarea name="observacionesProductoSirep" id="observacionesProductoSirep" cols="30" rows="4" placeholder="Observaciones" class="form-control input-sm"></textarea>
                                    <div class="col-sm-12 text-center" style="padding-top: 1em;">
                                        <button id="btnProdSinRep" type="button" class="btn btn-warning btn-sm">Ver Productos sin repuestos</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <!--</div>-->
                    </div>
                    <div class="panel panel-default" id="divCanje">
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                Producto de destino por Plan canje o Cambio de equipo
                            </h4>
                        </div>
                        <!--<div id="collapseThree" class="panel-collapse" aria-expanded="false">-->
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="input-group">
                                        <span class="input-group-addon" style="font-weight: bold;">Código</span>
                                        <input type="text" id="codigoCanje" class="form-control input-sm" maxlength="9">
                                    </div>
                                </div>
                                <div class="col-sm-8">
                                    <div class="input-group">
                                        <span class="input-group-addon" style="font-weight: bold;">Descripción</span>
                                        <input type="text" id="descripcionCanje" class="form-control input-sm" readonly>
                                        <span class="input-group-btn">
                                            <button id="btnBuscarBombaCanje" type="button" class="btn btn-primary btn-outline btn-sm">Buscar</button>
                                        </span>
                                    </div>
                                </div>

                                <div class="col-sm-12" id="mensajeIOX" hidden>
                                    <p style="color: red; font-size: 14px; font-weight: bold">Recuerde que el producto de destino debe ser IOX.</p>
                                </div>
                            </div>
                        </div>
                        <!--</div>-->
                    </div>
                    <div class="row" style="margin-top: 5px;">
                        <div class="col-sm-6">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title">
                                        Retiro
                                    </h4>
                                </div>
                                <!--<div id="collapseFour" class="panel-collapse" aria-expanded="false">-->
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="form-group col-sm-6">
                                            <div class="input-group">
                                                <span class="input-group-addon" style="font-weight: bold;" title="Fecha de retiro">F.Ret.</span>
                                                <input type="date" id="fechaReparacion" hidden>
                                                <input id="fechaRetiroProductoSirep" type="date" class="form-control input-sm" name="fechaRetiroProductoSirep">
                                            </div>
                                        </div>
                                        <div class="form-group col-sm-6">
                                            <div class="input-group">
                                                <span class="input-group-addon" style="font-weight: bold;" title="Costo estimado">C.Est.</span>
                                                <input id="costoEstimadoProducto" type="text" class="form-control input-sm" name="costoEstimadoProducto">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--</div>-->
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="panel panel-default" style="border-color: ; box-shadow: 10px 5px 5px #cdcdcd; background-color: #f5f5f5;">
                                <!--<div id="collapseFour" class="panel-collapse" aria-expanded="false">-->
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col-sm-12 text-center" style= "height: 9vh; display: flex; justify-content: center; align-content: center; flex-wrap: wrap;">
                                            <div class="col-sm-6 text-right">
                                                <button class="btn btn-danger" id="btnCancelar" type="button">Cancelar</button>
                                            </div>
                                            <div class="col-sm-6 text-left">
                                                <button class="btn btn-primary" id="btnAceptar" type="button">Generar orden</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--</div>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>

<!--Modal Recepción-->
<div id="modalRecepcion" class="modal" role="dialog" tabindex="-1" >
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button id="btnCloseModal" type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" id="titulo"></h4>
            </div>
            <div class="modal-body">
                <div id="bodyRecepcion" style="overflow-x: auto;"></div>
            </div>
            <div class="modal-footer">
                <button id="btnCerrarModal" type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>