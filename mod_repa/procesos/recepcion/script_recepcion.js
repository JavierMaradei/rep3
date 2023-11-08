(function iniciarRecepcion(){
    let formulario                  = document.querySelector('#formRecepcion')//Captura del formulario
    let inputs                      = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData                    = new FormData() //Creo el formData para transferencia de información con el Backend
    let fechaRecepcion              = document.querySelector('#fechaRecepcion')
    let sucursalRecepcion           = document.querySelector('#sucursalRecepcion')
    let lugarRecepcion              = document.querySelector('#lugarRecepcion')
    let tipoReparacion              = document.querySelector('#tipoReparacion')
    let atencion                    = document.querySelector('#atencion')
    let remitoCliente               = document.querySelector('#remitoCliente')
    let garantia                    = document.querySelector('#garantia')
    let flete                       = document.querySelector('#flete')
    let btnNuevoCliente             = document.querySelector('#btnNuevoCliente')
    let searchCliente               = document.querySelector('#searchCliente')
    let btnBuscarCliente            = document.querySelector('#btnBuscarCliente')
    let clienteId                   = document.querySelector('#clienteId')
    let clienteApellido             = document.querySelector('#clienteApellido')
    let clienteNombre               = document.querySelector('#clienteNombre')
    let clienteTelefono             = document.querySelector('#clienteTelefono')
    let clienteCelular              = document.querySelector('#clienteCelular')
    let clienteEmail                = document.querySelector('#clienteEmail')
    let provincia                   = document.querySelector('#provincia')
    let localidad                   = document.querySelector('#localidad')
    let calle                       = document.querySelector('#calle')
    let numeroCalle                 = document.querySelector('#numeroCalle')
    let dpto                        = document.querySelector('#dpto')
    let codigoProducto              = document.querySelector('#codigoProducto')
    let descripcionProducto         = document.querySelector('#descripcionProducto')
    let btnBuscarProducto           = document.querySelector('#btnBuscarProducto')
    let marcaProducto               = document.querySelector('#marcaProducto')
    let familiaProducto             = document.querySelector('#familiaProducto')
    let serieProducto               = document.querySelector('#serieProducto')
    let btnGenerarNroSerie          = document.querySelector('#btnGenerarNroSerie')
    let problemaProducto            = document.querySelector('#problemaProducto')
    let observacionesProducto       = document.querySelector('#observacionesProducto')
    let fechaReparacion             = document.querySelector('#fechaReparacion')
    let tecnico                     = document.querySelector('#tecnico')
    let costoProducto               = document.querySelector('#costoProducto')
    let codigoProdCanje             = document.querySelector('#codigoProductoCanje')
    let descripcionProdCanje        = document.querySelector('#descripcionProductoCanje')
    let buscarProductoCanje         = document.querySelector('#buscarProductoCanje')
    let btnGenerarOrden             = document.querySelector('#btnGenerarOrden')
    let btnCancelarOrden            = document.querySelector('#btnCancelarOrden')
    let respBtn                     = document.querySelector('#respuesta')//Div para mostrar los avisos de espera
    let nuevoNroSerie               = false
    let nuevoCliente                = false
    let datosCliente                = [clienteId, clienteApellido, clienteNombre, clienteTelefono, clienteCelular, clienteEmail, provincia, localidad, calle, numeroCalle, dpto]
    let datosClienteEditable        = [clienteApellido, clienteNombre, clienteTelefono, clienteCelular, clienteEmail, provincia, localidad, calle, numeroCalle, dpto]
    let datosCanje                  = [codigoProdCanje, buscarProductoCanje]
    let hoy                         = moment(new Date(), 'DD-MM-YYYY').format('YYYY-MM-DD')
    let modal                       = document.querySelector('#modalRecepcion')
    let modalBody                   = document.querySelector('#bodyRecepcion')
    let modalTitulo                 = document.querySelector('#titulo')
    let arrayVal = {
        fechaRecepcion              : {required : true, readOnly : true},
        sucursalRecepcion           : {required : true, noCero : true},
        lugarRecepcion              : {required : true, noCero : true},
        tipoReparacion              : {required : true, noCero : true},
        atencion                    : {required : true, noCero : true},
        remitoCliente               : {validated : true},
        garantia                    : {},
        flete                       : {},
        searchCliente               : {},
        clienteId                   : {readOnly : true},
        clienteCodigo               : {required : true, validated : true},
        clienteApellido             : {required : true, validated : true},
        clienteNombre               : {required : true, validated : true},
        clienteTelefono             : {validated : true},
        clienteCelular              : {validated : true},
        clienteEmail                : {validated : 'email'},
        provincia                   : {required : false, validated : true},
        localidad                   : {required : false, validated : true},
        calle                       : {required : false, validated : true},
        numeroCalle                 : {required : false, validated : true},
        dpto                        : {required : false, validated : true},
        codigoProducto              : {required : true, validated : true},
        descripcionProducto         : {required : true, readOnly : true},
        marcaProducto               : {readOnly : true},
        familiaProducto             : {readOnly : true},
        serieProducto               : {required : true, validated : true},
        problemaProducto            : {validated : true},
        observacionesProducto       : {validated : true},
        fechaReparacion             : {validated : true},
        tecnico                     : {},
        costoProducto               : {validated : true},
        codigoProductoCanje         : {},
        descripcionProductoCanje    : {readOnly : true}
    }

    function inputsClienteEstado(estado){
        datosClienteEditable.forEach(element => {
            estado == 'activos' ? element.disabled = false : element.disabled = true
        });  
    }

    function recuperaDatosPerfil(){
        return new Promise(function(resolve, reject) {
            let xhr = new XMLHttpRequest
            xhr.open('GET', 'mod_repa/configuracion/usuarios/usuariosData_search.php')
            xhr.send()
            xhr.addEventListener('load', () => {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    sucursalRecepcion.value = respuesta.sucursalUsuarios 
                    lugarRecepcion.value = respuesta.lugarRecepcionUsuarios
                    resolve(respuesta)
                } else {
                    reject()
                }
            })
        })
    }

    function limpieza(){
        cleanInputs(inputs)
        inputsClienteEstado('inactivos')
        nuevoCliente            = false
        tipoReparacion.value    = 'R'
        atencion.value          = '1'
        fechaRecepcion.value    = hoy
        fechaReparacion.value   = hoy
        tecnico.disabled        = true
        tecnico.value           = '0'
        formData.delete('nuevoCliente')
        formData.delete('nuevoNroSerie')
        listaLocalidades(localidad,0, 'S')
        recuperaDatosPerfil()
    }

    function busquedaPorProducto(){
        return new Promise(function(resolve, reject) {    
            $('#modalRecepcion').show()
            $('#bodyRecepcion').empty()
            $('#titulo').text('Equipos')
    
            let template = ''
            template = `
                <div class="row">
                    <form id="formModalEquipos">
                        <div class="row g-3">
                            <div class="form-group col-sm-4">
                                <label for="marcaProductoModal">Marca</label>
                                <select id="marcaProductoModal" class="form-control"></select>
                            </div>
                            <div class="form-group col-sm-4">
                                <label for="familiaProductoModal">Familia</label>
                                <select id="familiaProductoModal" class="form-control"></select>
                            </div>
                            <div class="form-group col-sm-4">
                                <label for="buscadorModal">Buscador</label>
                                <input id="buscadorModal" type="text" class="form-control">
                            </div>
                            <div class="form-group col-sm-12 text-center">
                                <button id="btnBuscarEquipo" type="button" class="btn btn-primary">Buscar
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-sm-12">
                    <div class="row">
                        <div class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead>
                                    <th>Código</th>
                                    <th>Descripción</th>
                                    <th>Marca</th>
                                    <th>Familia</th>
                                </thead>
                                <tbody id="modalBusquedaTabla"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `
            $('#bodyRecepcion').html(template)

            resolve()
        })

    }

    function enviarParametrosModal(marca, familia, buscador, idBodyTabla){
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/productos/productosModal_search.php?marca='+marca+'&familia='+familia+'&buscador='+buscador)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                let template = ''
                respuesta.forEach(element => {
                    template += `
                        <tr>
                            <td><a class="product-item" href="${element.codigo}">${element.codigo}</td>
                            <td>${element.descripcion}</td>
                            <td>${element.marca}</td>
                            <td>${element.familia}</td>
                        </tr>
                    `
                });

                idBodyTabla.innerHTML = template
            }
        })
    }

    function estadoCanje(){

        datosCanje.forEach(element => {

            if(tipoReparacion.value == 'C' || tipoReparacion.value == 'E'){
                element.disabled                            = false
                arrayVal.codigoProductoCanje.required       = true
                arrayVal.descripcionProductoCanje.required  = true
            }else {
                element.disabled                            = true
                codigoProductoCanje.value                   = ''
                descripcionProductoCanje.value              = ''
                arrayVal.codigoProductoCanje.required       = false
                arrayVal.descripcionProductoCanje.required  = false
            }
        });
        
    }

    inputsClienteEstado('inactivos')
    limitaCaracteres(clienteNombre, 50)
    limitaCaracteres(clienteApellido, 50)
    limitaCaracteres(clienteTelefono, 60)
    limitaCaracteres(clienteCelular, 25)
    limitaCaracteres(clienteEmail, 50)
    limitaCaracteres(remitoCliente, 45)
    limitaCaracteres(codigoProducto, CODIGO_LENGTH)
    limitaCaracteres(serieProducto, 10)
    limitaCaracteres(problemaProducto, 200)
    limitaCaracteres(observacionesProducto, 500)
    limitaCaracteres(costoProducto, 15)
    limitaCaracteres(codigoProdCanje, CODIGO_LENGTH)

    cargaSucursales(sucursalRecepcion).then(() => {
        cargaLugaresRecepcion(lugarRecepcion).then(() => {
            recuperaDatosPerfil()
        })
    })
    cargaTecnicos(tecnico)
    listaProvincias(provincia, 'S')

    provincia.addEventListener('change', e => {
        e.preventDefault()
        listaLocalidades(localidad,e.target.value, 'S')
    })

    fechaReparacion.value = hoy

    /////////////////// PRODUCTOS ///////////////////
    codigoProducto.addEventListener('keyup', (e) => {
        serieProducto.value = ''
        serieProducto.readOnly = false

        if(e.keyCode === 13){
            btnBuscarProducto.click()
        }

        if(codigoProducto.value.length == CODIGO_LENGTH){
            let xhr = new XMLHttpRequest
            xhr.open('GET', 'mod_repa/tablas/productos/productos_search.php?code='+codigoProducto.value)
            xhr.send()
            xhr.addEventListener('load', () => {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    if(respuesta != null && respuesta != false){
                        descripcionProducto.value   = respuesta.descripcion
                        marcaProducto.value         = respuesta.marca
                        familiaProducto.value       = respuesta.familia
                        costoProducto.value         = respuesta.costo_estimado
                    } else {
                        descripcionProducto.value   = ''
                        codigoProducto.value        = ''
                        marcaProducto.value         = ''
                        familiaProducto.value       = ''
                        costoProducto.value         = ''
                        alert('Código inexistente o inválido :(')
                    }
                }
            })
        } else {
            descripcionProducto.value   = ''
            costoProducto.value         = ''
            familiaProducto.value       = ''
            marcaProducto.value         = ''
        }
    })

    btnBuscarProducto.addEventListener('click', e => {
        e.preventDefault()

        busquedaPorProducto().then(() => {
            let marcaProductoModal      = document.querySelector('#marcaProductoModal')
            let familiaProductoModal    = document.querySelector('#familiaProductoModal')
            let buscadorModal           = document.querySelector('#buscadorModal')
            let btnBuscarEquipo         = document.querySelector('#btnBuscarEquipo')
            let modalBusquedaTabla      = document.querySelector('#modalBusquedaTabla')

            cargaFamilias(familiaProductoModal)
            cargaMarcas(marcaProductoModal)

            let filtros = document.querySelectorAll('#marcaProductoModal, #familiaProductoModal, #buscadorModal')
            filtros.forEach(element => {
                if(element.keyCode === 13){
                    btnBuscarEquipo.click()
                } 
            });
            

            btnBuscarEquipo.addEventListener('click', e => {
                e.preventDefault()

                enviarParametrosModal(marcaProductoModal.value, familiaProductoModal.value, buscadorModal.value, modalBusquedaTabla)
            })
        })
    })

    //Click en la lista del buscador de clientes
    $(document).on('click', '.product-item', (e) => {
        e.preventDefault()
        codigo  = e.target.innerText
        url     = 'mod_repa/tablas/productos/productos_search.php?code='+codigo
        $('#modalRecepcion').hide()
        
        let xhr = new XMLHttpRequest
        xhr.open('GET', url)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                codigoProducto.value        = respuesta.codigo
                descripcionProducto.value   = respuesta.descripcion
                marcaProducto.value         = respuesta.marca
                familiaProducto.value       = respuesta.familia
                costoProducto.value         = respuesta.costo_estimado
                serieProducto.value         = ''
                serieProducto.readOnly      = false

            }
        })
    })

    btnGenerarNroSerie.addEventListener('click', e => {
        e.preventDefault()
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/procesos/recepcion/nroSerie_new.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                serieProducto.readOnly   = true
                serieProducto.value      = respuesta
                nuevoNroSerie            = true
            }
        })
    })

    ///////////////// FIN PRODUCTOS /////////////////

    /////////////////// CLIENTES ///////////////////

    //Funcionalidad del botón nuevo cliente
    btnNuevoCliente.addEventListener('click', e => {
        e.preventDefault()
        nuevoCliente = true
        datosCliente.forEach(element => {
            element.value = ''
        });
        inputsClienteEstado('activos')
    })

    searchCliente.addEventListener('keyup', e => {
        e.preventDefault()
        if(e.keyCode === 13){
            btnBuscarCliente.click()
        }
    })

    //Funcionalidad del botón buscar cliente
    btnBuscarCliente.addEventListener('click', e => {
        e.preventDefault()
        $('#bodyRecepcion').empty()
        $('#titulo').text('Clientes')

        let search          = document.querySelector('#searchCliente').value

        if(search.length > 0){
            let xhr = new XMLHttpRequest
            xhr.open('GET', 'mod_repa/tablas/clientes/clientes_search.php?busqueda='+search)
            xhr.send()
            xhr.addEventListener('load', () => {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    //nuevoCliente = false
                    if(respuesta ==''){
                        alert ('La búsqueda no ha encontrado ningún resultado')
                    } else {
                        if(respuesta.length > 1){

                            $('#modalRecepcion').show()

                            let template = ''
                            template += `
                                <table class="table table-striped table-hover" style="font-size: 10px;">
                                    <thead>
                                        <th>Id</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Teléfono</th>
                                        <th>Celular</th>
                                        <th>Email</th>
                                        <th>Calle</th>
                                        <th>Nro</th>

                                    </thead>
                                    <tbody>`
                            respuesta.forEach(element => {
                                template += `
                                        <tr>
                                            <td><a class="client-item" href="${element.cliente_id}">${element.cliente_id}</td>
                                            <td>${element.nombre}</td>
                                            <td>${element.apellido}</td>
                                            <td>${element.telefono}</td>
                                            <td>${element.celular}</td>
                                            <td>${element.email}</td>
                                            <td>${element.calle}</td>
                                            <td>${element.nro_calle}</td>
                                        </tr>`
                            })
                            template += `
                                    </tbody>
                                </table>
                            `
                            $('#bodyRecepcion').html(template)

                        } else {
                            listaLocalidades(localidad,respuesta[0].provincia_id, 'S').then((r) => {
                                if(r != ''){
                                    $('#clienteId').val(respuesta[0].cliente_id)
                                    $('#clienteNombre').val(respuesta[0].nombre)
                                    $('#clienteApellido').val(respuesta[0].apellido)
                                    $('#clienteTelefono').val(respuesta[0].telefono)
                                    $('#clienteCelular').val(respuesta[0].celular)
                                    $('#clienteEmail').val(respuesta[0].email)
                                    $('#provincia').val(respuesta[0].provincia_id)
                                    $('#localidad').val(respuesta[0].localidad_id)
                                    $('#calle').val(respuesta[0].calle)
                                    $('#numeroCalle').val(respuesta[0].nro_calle)
                                    $('#dpto').val(respuesta[0].dpto)
                                    inputsClienteEstado('activos')
                                }
                            })
                        }
                    }
                    searchCliente.value = ''
                }
            })

        } else {
            alert("Ingrese algún valor al buscador de clientes")
        }
    })

    //Click en la lista del buscador de clientes
    $(document).on('click', '.client-item', (e) => {
        e.preventDefault()
        nuevoCliente = false
        id  = e.target.innerText
        $('#modalRecepcion').hide()
        datosCliente.forEach(element => {
            element.value = ''
        });
        inputsClienteEstado('activos')
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/clientes/clientes_single.php?id='+id)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)

                listaLocalidades(localidad,respuesta[0].provincia, 'S').then((r) => {
                    if(r != ''){
                        clienteId.value         =  respuesta[0].clienteId        
                        clienteNombre.value     =  respuesta[0].clienteNombre
                        clienteApellido.value   =  respuesta[0].clienteApellido
                        clienteTelefono.value   =  respuesta[0].clienteTelefono
                        clienteCelular.value    =  respuesta[0].clienteCelular
                        clienteEmail.value      =  respuesta[0].clienteEmail
                        provincia.value         =  respuesta[0].provincia
                        localidad.value         =  respuesta[0].localidad
                        calle.value             =  respuesta[0].calle
                        numeroCalle.value       =  respuesta[0].numeroCalle
                        dpto.value              =  respuesta[0].dpto 
                    }
                })
            }
        })
    })

    ///////////////// FIN CLIENTES /////////////////
    

    //////////////// CANJE ////////////////////////

    // Evaluo desplegable tipo de reparación para habilitar los campos de canje
    tipoReparacion.addEventListener('change', e => {
        e.preventDefault()
        estadoCanje()
    })

    //Funcionalidad botón buscar canje
    modalBuscarBombaCanje(modal, modalBody, modalTitulo, buscarProductoCanje)

    //Funcionalidad campo código canje
    codigoProdCanje.addEventListener('keyup', e => {
        e.preventDefault()
        if(e.keyCode === 13){
            buscarProductoCanje.click()
        }

        if(codigoProdCanje.value.length == CODIGO_LENGTH){
            let xhr = new XMLHttpRequest
            xhr.open('GET', 'mod_repa/tablas/productos/productos_search.php?code='+codigoProdCanje.value)
            xhr.send()
            xhr.addEventListener('load', () => {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    if(respuesta != null && respuesta != false && respuesta.canje_flag == 'S'){
                        descripcionProdCanje.value  = respuesta.descripcion
                    } else {
                        descripcionProdCanje.value  = ''
                        codigoProdCanje.value       = ''
                        alert('Código inexistente o inválido :(')
                    }
                }
            })
        } else {
            descripcionProdCanje.value  = ''
        }

    })

    ///////////////// FIN CANJE //////////////////

    lugarRecepcion.addEventListener('change', e => {
        e.preventDefault()
        if(lugarRecepcion.value == '2'){
            tecnico.disabled            = false
            arrayVal.tecnico.required   = false
            arrayVal.tecnico.noCero     = false
        } else {
            tecnico.disabled            = true
            tecnico.value               = '0'
            arrayVal.tecnico.required   = false
            arrayVal.tecnico.noCero     = false
        } 
    })

    //Cierro modal
    btnCerrarModal.addEventListener('click', e => {
        e.preventDefault()
        $('#modalRecepcion').hide()
    })

    //Cierro modal 2
    btnCloseModal.addEventListener('click', e => {
        e.preventDefault()
        $('#modalRecepcion').hide()
    })

    //Funcionalidad del botón de Grabar
    btnGenerarOrden.addEventListener('click', e => {
        e.preventDefault()
        if(clienteTelefono.value == '' && clienteCelular.value == '' && clienteEmail.value == ''){
            alert('Al menos debe completar uno de los campos: teléfono, celular o email')
        } else {
            let validacion = validateData(inputs, arrayVal)
            if(validacion){
                swal({
                    title               : "Confirma la grabación?",
                    type                : "warning",
                    showCancelButton    : true,
                    confirmButtonColor  : "#DD6B55",
                    confirmButtonText   : "Si, confirmar!",
                    cancelButtonText    : "No, Cancelar!",
                    closeOnConfirm      : true,
                    closeOnCancel       : true
                    },

                    function (isConfirm) {
                        if (isConfirm) {
                            btnGenerarOrden.disabled    = true
                            let progreso                = '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span>Generando orden... <br><i>Esta operación puede demorar unos segundos.</i></span>'
                            respBtn.innerHTML           = progreso //Muestro un aviso de espera                    
                            let btnAceptarSwal          = document.querySelector('.confirm')
                            btnAceptarSwal.disabled     = true
                            collectData(inputs, formData)
                            formData.append('nuevoCliente', nuevoCliente)
                            formData.append('nuevoNroSerie', nuevoNroSerie)
                            let url = 'mod_repa/procesos/recepcion/recepcion_add.php'
                            let xhr = new XMLHttpRequest
                            xhr.open('POST', url)
                            xhr.send(formData)
                            xhr.addEventListener('load', () => {
                                if(xhr.status == 200){
                                    respBtn.innerHTML = ''
                                    btnGenerarOrden.disabled = false
                                    let respuesta           = JSON.parse(xhr.response)
                                    btnAceptarSwal.disabled = false

                                    switch (respuesta.estado) {
                                        case 'Transacción exitosa':
                                            //alert("Orden nro: "+respuesta.valores.reparacion_id)
                                            setTimeout(() => {
                                                swal({
                                                    title: "Orden nro: "+respuesta.valores.reparacion_id,
                                                    text: "La orden se generó exitosamente",
                                                    type: "success",
                                                });
                                            }, 500);

                                            let ticket2 = window.open("", "", "width=800,height=600");
                                            ticket2.document.write(`
                                                                        <p>
                                                                            <h4 style="margin: 0px; padding: 0px;">Hidroeléctrica del Norte</h4>
                                                                            Av. Beiró 4296</br>
                                                                            Villa Devoto - C.A.B.A</br>
                                                                            Argentina</br>
                                                                            Teléfono: 011 2300-5121</br>
                                                                        </p>
                                                                        <h6>COMPROBANTE NO VALIDO COMO FACTURA</h6>
                                                                        <h6 style="margin:5px;">Fecha: ${respuesta.valores.frecepcion}</h6>
                                                                        <h6 style="margin:5px;">Nro. de Orden: ${respuesta.valores.reparacion_id}</h6>
                                                                        <h6 style="margin:5px;">Modelo: ${respuesta.valores.modelo}</h6>
                                                                        <h6 style="margin:5px;">Nro. de Serie: ${respuesta.valores.nro_serie}</h6>
                                                                        <h6 style="margin:5px;">Probl.: ${respuesta.valores.problema}</h6>
                                                                        <h6 style="margin:5px;">Obs.: ${respuesta.valores.observaciones}</h6>
                                                                        <h6 style="margin:5px;">Nombre: ${respuesta.valores.apellido_cliente}, ${respuesta.valores.nombre_cliente}</h6>
                                                                        <h6 style="margin:5px;">Teléfono: ${respuesta.valores.telefono_cliente}</h6>
                                                                        <h6 style="margin:5px;">Celular: ${respuesta.valores.celular_cliente}</h6>
                                                                        <h6 style="margin:5px;">OPERACION: ${respuesta.valores.tipo_ingreso}</h6>
                                                                        <h6 style="margin:5px;">GARANTÍA: ${respuesta.valores.reclama_garantia}</h6>
                                                                        <h6 style="margin:5px;">Fecha de Retiro: CONSULTAR</h6>
                                                                        <h6 style="margin:5px;">Atendido por: ${respuesta.valores.apellido_usuario}, ${respuesta.valores.nombre_usuario}</h6>
                                                                        <h4>COPIA PARA EL CLIENTE</h4>
                                                                        <h5>********************************</h5>
                                                                        <h5>NRO. DE ORDEN: ${respuesta.valores.reparacion_id}</h5>
                                                                        <h5>NRO. DE SERIE: ${respuesta.valores.nro_serie}</h5>
                                                                        <h5>OPERACION: ${respuesta.valores.tipo_ingreso}</h5>
                                                                        <h5>${respuesta.valores.modelo}</h5>
                                                                        <h5>CLIENTE: ${respuesta.valores.apellido_cliente}, ${respuesta.valores.nombre_cliente}</h5>
                                                                        <h5>********************************</h5>                                                               
                                                                    `);
                                            ticket2.window.print();
                                            ticket2.window.close();

                                            limpieza()
                                            break;

                                        case 'Sesión expirada':
                                            sesionExpiradaMensajeFlotante()
                                            break;

                                        case 'Error perfil':
                                            msgErrorPerfil()
                                            cleanFormData(inputs, formData)
                                            formData.delete('nuevoCliente')
                                            formData.delete('nuevoNroSerie')
                                            break;

                                        case 'Tabla bloqueada':
                                            swal({
                                                title: "Datos no registrados",
                                                text: "Por favor intente nuevamente",
                                                type: "error",
                                            });
                                            cleanFormData(inputs, formData)
                                            formData.delete('nuevoCliente')
                                            formData.delete('nuevoNroSerie')
                                            break;

                                        default:
                                            msgAlgoNoFueBienRecep(respuesta.falla)
                                            cleanFormData(inputs, formData)
                                            formData.delete('nuevoCliente')
                                            formData.delete('nuevoNroSerie')
                                            break;
                                    }
                                }
                            })
                        }
                    }

                )
            }

        }    
    })
    
    //Funcionalidad del botón de Cancelar
    btnCancelarOrden.addEventListener('click', e => {
        e.preventDefault()
        cleanInputs(inputs)
        limpieza()
    })
    
})()