<div class="row p-3">
    <!-- Card datos del ingreso -->
    <div class="col-md-6 mb-3" id="divDatosGenerales">
        <div class="card h-100 shadow">
            <h4 class="card-header bg-danger text-white text-center"><i>Datos generales de Ingreso</i></h4>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-6 mb-2">
                        <label for="ordenFicha" class="form-label">Orden</label>
                        <input type="text" class="form-control" id="ordenFicha" readonly> 
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="lugarRecepcionFicha" class="form-label">Lugar de Recepción</label>
                        <select id="lugarRecepcionFicha" class="form-select" disabled></select>
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="sucursalRecepcionFicha" class="form-label">Sucursal</label>
                        <select id="sucursalRecepcionFicha" class="form-select" disabled></select>
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="tecnicoFicha" class="form-label">Técnico Domicilio asignado</label>
                        <select id="tecnicoFicha" class="form-select" disabled></select>
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="emisorFicha" class="form-label">Emisor</label>
                        <select id="emisorFicha" class="form-select" disabled></select>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Card fechas -->
    <div class="col-md-6 mb-3" id="divFechas">
        <div class="card h-100 shadow">
            <h4 class="card-header bg-danger text-white text-center"><i>Fechas generales</i></h4>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-6 mb-2">
                        <label for="fechaRecepcionFicha" class="form-label">Fecha de Recepción</label>
                        <input type="text" class="form-control" id="fechaRecepcionFicha" readonly> 
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="fechaDiagnosticoFicha" class="form-label">Fecha de Diagnóstico</label>
                        <input type="text" class="form-control" id="fechaDiagnosticoFicha" readonly> 
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="fechaVisitaFicha" class="form-label">Fecha de visita a domicilio</label>
                        <input type="text" class="form-control" id="fechaVisitaFicha" readonly>  
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="fechaReparacionFicha" class="form-label">Fecha de Reparación</label>
                        <input type="text" class="form-control" id="fechaReparacionFicha" readonly>  
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="fechaCierreFicha" class="form-label">Fecha de Cierre</label>
                        <input type="text" class="form-control" id="fechaCierreFicha" readonly> 
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="fechaEmbalajeFicha" class="form-label">Fecha de Embalaje</label>
                        <input type="text" class="form-control" id="fechaEmbalajeFicha" readonly> 
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Card datos del cliente -->
    <div class="col-md-6 mb-3" id="divDatosCliente">
        <div class="card h-100 shadow">
            <h4 class="card-header bg-danger text-white text-center"><i>Datos Cliente</i></h4>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-2 mb-2">
                        <label for="clienteIdFicha" class="form-label">ID Cliente</label>
                        <input type="text" class="form-control" id="clienteIdFicha" readonly> 
                    </div>
                    <div class="col-sm-10 mb-2">
                        <label for="clienteDireccionFicha" class="form-label">Dirección</label>
                        <input type="text" class="form-control" id="clienteDireccionFicha" readonly> 
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="clienteApellidoFicha" class="form-label">Apellido</label>
                        <input type="text" class="form-control" id="clienteApellidoFicha" readonly> 
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="clienteNombreFicha" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="clienteNombreFicha" readonly> 
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="clienteTelCelFicha" class="form-label">Telefono/Celular</label>
                        <input type="text" class="form-control" id="clienteTelCelFicha" readonly> 
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="clienteEmailFicha" class="form-label">Email</label>
                        <input type="text" class="form-control" id="clienteEmailFicha" readonly> 
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Card Datos Reparación -->
    <div class="col-md-6 mb-3" id="divDatosRecepcion">
        <div class="card h-100 shadow">
            <h4 class="card-header bg-danger text-white text-center"><i>Datos de Recepción</i></h4>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-6 mb-2">
                        <label for="tipoReparacionFicha" class="form-label">Tipo de ingreso</label>
                        <select id="tipoReparacionFicha" class="form-select" disabled><?php echo tiposReparacion(); ?></select>
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="atencionFicha" class="form-label">Atención</label>
                        <select id="atencionFicha" class="form-select" disabled><?php echo tiposAtencion(); ?></select>
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="garantiaFicha" class="form-label">Reclama garantía</label>
                        <input type="text" class="form-control" id="garantiaFicha" readonly> 
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="fleteFicha" class="form-label">Flete</label>
                        <input type="text" class="form-control" id="fleteFicha" readonly> 
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="remitoClienteFicha" class="form-label">Remito</label>
                        <input type="text" class="form-control" id="remitoClienteFicha" readonly> 
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Card datos del producto -->
    <div class="col-md-6 mb-3" id="divDatosProducto">
        <div class="card h-100 shadow">
            <h4 class="card-header bg-danger text-white text-center"><i>Datos del Producto</i></h4>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-6 mb-2">
                        <label for="marcaProductoFicha" class="form-label">Marca</label>
                        <select id="marcaProductoFicha" class="form-select" disabled></select>
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="familiaProductoFicha" class="form-label">Familia</label>
                        <select id="familiaProductoFicha" class="form-select" disabled></select>
                    </div>
                    <div class="col-sm-8 mb-2">
                        <label for="productoFicha" class="form-label">Producto</label>
                        <input type="text" class="form-control" id="productoFicha" readonly> 
                    </div>
                    <div class="col-sm-4 mb-2">
                        <label for="serieProductoFicha" class="form-label">Serie</label>
                        <input type="text" id="serieProductoFicha" class="form-control" readonly>
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="problemaProductoFicha" class="form-label">Problema</label>
                        <input type="text" class="form-control" id="problemaProductoFicha" readonly> 
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="observacionesProductoFicha" class="form-label">Observaciones</label>
                        <textarea class="form-control" id="observacionesProductoFicha" cols="30" rows="4" readonly></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Card Estados -->
    <div class="col-md-6 mb-3" id="divEstadoOrden">
        <div class="card h-100 shadow">
            <h4 class="card-header bg-danger text-white text-center"><i>Estado</i></h4>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-6 mb-2">
                        <label for="estadoFicha" class="form-label">Estado</label>
                        <select id="estadoFicha" class="form-select" disabled></select>
                    </div>
                    <div class="col-sm-4 mb-2">
                        <label for="estanteFicha" class="form-label">Estante</label>
                        <select id="estanteFicha" class="form-select" disabled></select>
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="detalleEmbalajeFicha" class="form-label">Detalle del embalaje</label>
                        <textarea class="form-control" id="detalleEmbalajeFicha" cols="30" rows="3" readonly></textarea>
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="diagnosticadorFicha" class="form-label">Diagnosticador</label>
                        <select class="form-select" id="diagnosticadorFicha" disabled> </select>
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="reparadorFicha" class="form-label">Reparador</label>
                        <select class="form-select" id="reparadorFicha" disabled> </select>
                    </div>
                    <div class="col-sm-6 mb-2">
                        <label for="embaladorFicha" class="form-label">Embalador</label>
                        <select class="form-select" id="embaladorFicha" disabled> </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Card Producto destino Canje -->
    <div class="col-md-6 mb-3" id="divDatosCanje">
        <div class="card h-100 shadow">
            <h4 class="card-header bg-danger text-white text-center"><i>Producto destino Canje</i></h4>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-4 mb-2">
                        <label for="codigoProductoCanje" class="form-label">Código</label>
                        <input type="text" class="form-control" id="codigoProductoCanje" readonly> 
                    </div>
                    <div class="col-sm-8 mb-2">
                        <label for="descripcionProductoCanje" class="form-label">Descripción</label>
                        <input type="text" id="descripcionProductoCanje" class="form-control" readonly>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Card Remito -->
    <div class="col-md-6 mb-3" id="divDatosRemito">
        <div class="card h-100 shadow">
            <h4 class="card-header bg-danger text-white text-center"><i>Remito</i></h4>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-12 mb-2">
                        <label for="remitoResolucionFicha" class="form-label">Remito de Despacho</label>
                        <input type="text" class="form-control" id="remitoResolucionFicha" readonly> 
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Card Resolución / cargo -->
    <div class="col-md-6 mb-3" id="divDatosResolucion">
        <div class="card h-100 shadow">
            <h4 class="card-header bg-danger text-white text-center"><i>Resolución / Cargo</i></h4>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-12 mb-2">
                        <label for="formaResolucionFicha" class="form-label">Forma de Resolución</label>
                        <select class="form-select" id="formaResolucionFicha" disabled></select>
                    </div>
                    <div class="col-sm-4 mb-2">
                        <label for="costoFicha" class="form-label">Costo</label>
                        <input type="text" id="costoFicha" class="form-control" readonly>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Card Presupuesto -->
    <div class="col-md-6 mb-3" id="divDatosPresupuesto">
        <div class="card h-100 shadow">
            <h4 class="card-header bg-danger text-white text-center"><i>Presupuesto</i></h4>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-8 mb-2">
                        <label for="presupuestadorFicha" class="form-label">Presupuestado por:</label>
                        <select class="form-select" id="presupuestadorFicha" disabled></select>
                    </div>
                    <div class="col-sm-4 mb-2">
                        <label for="fechaPresupuestoFicha" class="form-label">Fecha</label>
                        <input type="text" id="fechaPresupuestoFicha" class="form-control" readonly>
                    </div>
                    <div class="col-sm-8 mb-2">
                        <label for="numeroPresupuestoFicha" class="form-label">Número de Presupuesto</label>
                        <input type="text" id="numeroPresupuestoFicha" class="form-control" readonly>
                    </div>
                    <div class="col-sm-4 mb-2">
                        <label for="cajonPresupuestoFicha" class="form-label">Cajón</label>
                        <input type="text" id="cajonPresupuestoFicha" class="form-control" readonly>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Card Monitor Diagnostico -->
    <div class="col-md-6 mb-3" id="divMonitorDiagnostico">
        <div class="card h-100 shadow">
            <form id="formAccionesDiagnostico">
                <h4 class="card-header bg-danger text-white text-center"><i>Acciones Diagnóstico</i></h4>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 mb-2">
                            <label for="reparadorFichaDiagnostico" class="form-label">Asignar Reparador:</label>
                            <select class="form-select" id="reparadorFichaDiagnostico"></select>
                        </div>
                        <div class="col-sm-12 mb-2">
                            <label for="cajonFichaDiagnostico" class="form-label">Cajón</label>
                            <input type="text" id="cajonFichaDiagnostico" class="form-control">
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!-- Card Monitor Presupuesto -->
    <div class="col-md-6 mb-3" id="divMonitorPresupuesto">
        <div class="card h-100 shadow">
            <h4 class="card-header bg-danger text-white text-center"><i>Acciones Presupuesto</i></h4>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-12 mb-2">
                        <label for="tipoFichaPresupuesto" class="form-label">Tipo</label>
                        <select class="form-select" id="tipoFichaPresupuesto"></select>
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="atencionFichaPresupuesto" class="form-label">Atención</label>
                        <select class="form-select" id="atencionFichaPresupuesto"></select>
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="numeroFichaPresupuesto" class="form-label">Número de Presupuesto</label>
                        <input type="text" id="numeroFichaPresupuesto" class="form-control">
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="cargoFichaPresupuesto" class="form-label">Cargo/Forma</label>
                        <select class="form-select" id="cargoFichaPresupuesto"></select>
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="costoFichaPresupuesto" class="form-label">Costo</label>
                        <input type="text" id="costoFichaPresupuesto" class="form-control">
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="observacionesFichaPresupuesto" class="form-label">Observaciones</label>
                        <textarea class="form-control" id="observacionesFichaPresupuesto" cols="30" rows="4"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Card Monitor Embalaje -->
    <div class="col-md-6 mb-3" id="divMonitorEmbalaje">
        <div class="card h-100 shadow">
            <h4 class="card-header bg-danger text-white text-center"><i>Acciones Embalaje</i></h4>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-12 mb-2">
                        <label for="estadoFichaEmbalaje" class="form-label">Estado</label>
                        <select class="form-select" id="estadoFichaEmbalaje"></select>
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="estanteFichaEmbalaje" class="form-label">Estante</label>
                        <select class="form-select" id="estanteFichaEmbalaje"></select>
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="observacionesFichaEmbalaje" class="form-label">Observaciones</label>
                        <textarea class="form-control" id="observacionesFichaEmbalaje" cols="30" rows="4"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Card Monitor Resolución -->
    <div class="col-md-6 mb-3" id="divMonitorResolucion">
        <div class="card h-100 shadow">
            <h4 class="card-header bg-danger text-white text-center"><i>Acciones Resolución</i></h4>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-12 mb-2">
                        <label for="cargoFichaResolucion" class="form-label">Cargo/Forma</label>
                        <select class="form-select" id="cargoFichaResolucion"></select>
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="costoFichaResolucion" class="form-label">Costo</label>
                        <input type="text" id="costoFichaResolucion" class="form-control">
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="numeroRemitoFicha" class="form-label">Remito</label>
                        <input type="text" id="numeroRemitoFicha" class="form-control">
                    </div>
                    <div class="col-sm-12 mb-2">
                        <label for="fechaRemitoFichaResolucion" class="form-label">Fecha</label>
                        <input type="text" id="fechaRemitoFichaResolucion" class="form-control">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>