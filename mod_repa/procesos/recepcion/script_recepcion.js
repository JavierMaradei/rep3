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
    let clienteCodigo               = document.querySelector('#clienteCodigo')
    let clienteApellido             = document.querySelector('#clienteApellido')
    let clienteNombre               = document.querySelector('#clienteNombre')
    let clienteTelefono             = document.querySelector('#clienteTelefono')
    let clienteCelular              = document.querySelector('#clienteCelular')
    let clienteDireccion            = document.querySelector('#clienteDireccion')
    let clienteEmail                = document.querySelector('#clienteEmail')
    let codigoProducto              = document.querySelector('#codigoProducto')
    let descripcionProducto         = document.querySelector('#descripcionProducto')
    let btnBuscarProducto           = document.querySelector('#btnBuscarProducto')
    let marcaProducto               = document.querySelector('#marcaProducto')
    let familiaProducto             = document.querySelector('#familiaProducto')
    let serieProducto               = document.querySelector('#serieProducto')
    let btnGenerarNroSerie          = document.querySelector('#btnGenerarNroSerie')
    let problemaProducto            = document.querySelector('#problemaProducto')
    let observacionesProducto       = document.querySelector('#observacionesProducto')
    let fechaRetiro                 = document.querySelector('#fechaRetiro')
    let costoProducto               = document.querySelector('#costoProducto')
    let codigoProductoCanje         = document.querySelector('#codigoProductoCanjeR')
    let descripcionProductoCanje    = document.querySelector('#descripcionProductoCanjeR')
    let buscarProductoCanje         = document.querySelector('#buscarProductoCanje')
    let btnGenerarOrden             = document.querySelector('#btnGenerarOrden')
    let btnCancelarOrden            = document.querySelector('#btnCancelarOrden')
    let nuevoNroSerie               = false
    let nuevoCliente                = false
    let datosCliente                = [clienteId, clienteApellido, clienteNombre, clienteTelefono, clienteCelular, clienteDireccion, clienteEmail]
    let datosClienteEditable        = [clienteApellido, clienteNombre, clienteTelefono, clienteCelular, clienteDireccion, clienteEmail]
    let hoy                         = moment(new Date(), 'DD-MM-YYYY').format('YYYY-MM-DD')

    function inputsClienteEstado(estado){
        datosClienteEditable.forEach(element => {
            estado == 'activos' ? element.readOnly = false : element.readOnly = true
        });  
    }

    function limpieza(){
        inputsClienteEstado('inactivos')
        nuevoCliente = false
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
        xhr.open('GET', 'mod_repa/procesos/recepcion/productosModal_search.php?marca='+marca+'&familia='+familia+'&buscador='+buscador)
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

    let arrayVal = {
        fechaRecepcion              : {},
        sucursalRecepcion           : {},
        lugarRecepcion              : {},
        tipoReparacion              : {},
        atencion                    : {required: true, maxlength: 60, validated: true},
        remitoCliente               : {maxlength: 25, validated: true},
        garantia                    : {required: true, validated: 'email', maxlength: 50},
        flete                       : {},
        clienteCodigo               : {},
        clienteApellido             : {},
        clienteNombre               : {},
        clienteTelefono             : {},
        clienteCelular              : {},
        clienteDireccion            : {},
        clienteEmail                : {},
        codigoProducto              : {},
        descripcionProducto         : {},
        marcaProducto               : {},
        familiaProducto             : {},
        serieProducto               : {},
        problemaProducto            : {},
        observacionesProducto       : {},
        fechaRetiro                 : {},
        costoProducto               : {},
        codigoProductoCanjeR        : {},
        descripcionProductoCanjeR   : {}
    }

    inputsClienteEstado('inactivos')
    limitaCaracteres(clienteNombre, 50)
    limitaCaracteres(clienteApellido, 50)
    limitaCaracteres(clienteDireccion, 100)
    limitaCaracteres(clienteTelefono, 60)
    limitaCaracteres(clienteCelular, 25)
    limitaCaracteres(clienteEmail, 50)

    cargaSucursales(sucursalRecepcion)
    cargaLugaresRecepcion(lugarRecepcion)

    /////////////////// PRODUCTOS ///////////////////
    codigoProducto.addEventListener('keyup', () => {
        serieProducto.value = ''
        serieProducto.readOnly = false
        if(codigoProducto.value.length == CODIGO_LENGTH){
            let xhr = new XMLHttpRequest
            xhr.open('GET', 'mod_repa/tablas/productos/productos_search.php?code='+codigoProducto.value)
            xhr.send()
            xhr.addEventListener('load', () => {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    if(respuesta != null){
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
                                        <th>Dirección</th>
                                        <th>Teléfono</th>
                                        <th>Celular</th>
                                        <th>Email</th>
                                    </thead>
                                    <tbody>`
                            respuesta.forEach(element => {
                                template += `
                                        <tr>
                                            <td><a class="client-item" href="${element.cliente_id}">${element.cliente_id}</td>
                                            <td>${element.nombre}</td>
                                            <td>${element.apellido}</td>
                                            <td>${element.direccion}</td>
                                            <td>${element.telefono}</td>
                                            <td>${element.celular}</td>
                                            <td>${element.email}</td>
                                        </tr>`
                            })
                            template += `
                                    </tbody>
                                </table>
                            `
                            $('#bodyRecepcion').html(template)

                        } else {
                            $('#clienteNombre').val(respuesta[0].nombre)
                            $('#clienteApellido').val(respuesta[0].apellido)
                            $('#clienteTelefono').val(respuesta[0].telefono)
                            $('#clienteCelular').val(respuesta[0].celular)
                            $('#clienteDireccion').val(respuesta[0].direccion)
                            $('#clienteEmail').val(respuesta[0].email)
                            inputsClienteEstado('activos')
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
        url = 'mod_repa/tablas/clientes/clientes_single.php'
        $('#modalRecepcion').hide()
        datosCliente.forEach(element => {
            element.value = ''
        });
        inputsClienteEstado('activos')
        showDataReloaded(id, url, inputs)
    })

    ///////////////// FIN CLIENTES /////////////////


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
        let validacion = validateData(inputs, arrayVal)
        if(validacion){
            collectData(inputs, formData)
            let agregar = 'mod_repa/tablas/clientes/clientes_add.php'
            let editar = 'mod_repa/tablas/clientes/clientes_edit.php'
            let estado = enviarData(agregar, editar, formData, edit, id)
            estado.then((respuesta) => {
                switch (respuesta.estado) {
                    case 'Transacción exitosa':
                        msgTransaccionExitosa()
                        cleanInputs(inputs)
                        cleanFormData(inputs, formData)
                        limpieza()
                        break;
                    case 'Sesión expirada':
                        sesionExpiradaMensajeFlotante()
                        break;
                    case 'Error perfil':
                        msgErrorPerfil()
                        cleanFormData(inputs, formData)
                        break;
                    case 'Cliente duplicado':
                        msgClienteDuplicado()
                        cleanFormData(inputs, formData)
                        break;
                    default:
                        msgAlgoNoFueBien()
                        cleanFormData(inputs, formData)
                        break;
                }
            })
        }
    })
    
    //Funcionalidad del botón de Cancelar
    btnCancelarOrden.addEventListener('click', e => {
        e.preventDefault()
        cleanInputs(inputs)
        limpieza()
    })
})()