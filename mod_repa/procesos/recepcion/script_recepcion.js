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
    let clienteCodigo               = document.querySelector('#clienteCodigoR')
    let clienteApellido             = document.querySelector('#clienteApellidoR')
    let clienteNombre               = document.querySelector('#clienteNombreR')
    let clienteTelefono             = document.querySelector('#clienteTelefonoR')
    let clienteCelular              = document.querySelector('#clienteCelularR')
    let clienteDireccionR           = document.querySelector('#clienteDireccionR')
    let clienteEmail                = document.querySelector('#clienteEmailR')
    let btnNuevoProducto            = document.querySelector('#btnNuevoProductoR')
    let codigoProducto              = document.querySelector('#codigoProductoR')
    let descripcionProducto         = document.querySelector('#descripcionProductoR')
    let serieProducto               = document.querySelector('#serieProductoR')
    let problemaProducto            = document.querySelector('#problemaProducto')
    let observacionesProducto       = document.querySelector('#observacionesProducto')
    let fechaRetiro                 = document.querySelector('#fechaRetiro')
    let costoProducto               = document.querySelector('#costoProducto')
    let codigoProductoCanje         = document.querySelector('#codigoProductoCanjeR')
    let descripcionProductoCanje    = document.querySelector('#descripcionProductoCanjeR')
    let buscarProductoCanje         = document.querySelector('#buscarProductoCanje')
    let btnGenerarOrden             = document.querySelector('#btnGenerarOrden')
    let btnCancelarOrden            = document.querySelector('#btnCancelarOrden')
    let nuevoCliente                = false
    //let datosCliente                = [clienteRazonSocial1, clienteRazonSocial2, clienteTelefono, clienteCelular, clienteEmail, referencia]
    let hoy                         = moment(new Date(), 'DD-MM-YYYY').format('YYYY-MM-DD')

    let arrayVal = {
        fechaRecepcion              : {},
        sucursalRecepcion           : {},
        lugarRecepcion              : {},
        tipoReparacion              : {},
        atencion                    : {required: true, maxlength: 60, validated: true},
        remitoCliente               : {maxlength: 25, validated: true},
        garantia                    : {required: true, validated: 'email', maxlength: 50},
        flete                       : {},
        clienteCodigoR              : {},
        clienteApellidoR            : {},
        clienteNombreR              : {},
        clienteTelefonoR            : {},
        clienteCelularR             : {},
        clienteDireccionR           : {},
        clienteEmailR               : {},
        codigoProductoR             : {},
        descripcionProductoR        : {},
        serieProductoR              : {},
        problemaProducto            : {},
        observacionesProducto       : {},
        fechaRetiro                 : {},
        costoProducto               : {},
        codigoProductoCanjeR        : {},
        descripcionProductoCanjeR   : {}
    }

    limitaCaracteres(clienteNombreR, 50)
    limitaCaracteres(clienteApellidoR, 50)
    limitaCaracteres(clienteDireccionR, 100)
    limitaCaracteres(clienteTelefonoR, 60)
    limitaCaracteres(clienteCelularR, 25)
    limitaCaracteres(clienteEmailR, 50)

    cargaSucursales(sucursalRecepcion)
    cargaLugaresRecepcion(lugarRecepcion)

    //Funcionalidad del botón nuevo cliente
    btnNuevoCliente.addEventListener('click', e => {
        e.preventDefault()
        nuevoCliente = true
        /*datosCliente.forEach(element => {
            element.value = ''
        });*/
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/cliente_new.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                clienteCodigo.value = respuesta
            }
        })
    })

    //Funcionalidad del botón buscar cliente
    btnBuscarCliente.addEventListener('click', e => {
        e.preventDefault()
        $('#bodyRecepcion').empty()
        $('#titulo').text('Clientes')

        let search          = document.querySelector('#searchCliente').value

        if(search.length > 0){
            let xhr = new XMLHttpRequest
            xhr.open('GET', 'mod_repa/procesos/recepcion/clientes_search.php?busqueda='+search)
            xhr.send()
            xhr.addEventListener('load', () => {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    //nuevoCliente = false
                    if(respuesta ==''){
                        alert ('La búsqueda no ha encontrado ningún resultado')
                    } else {
                        if(respuesta.length > 1){
                            //console.log(respuesta.length)
                            $('#modalRecepcion').show()
                        } else {
                            //console.log(respuesta.length)
                            $('#clienteNombreR').val(respuesta[0].nombre)
                            $('#clienteApellidoR').val(respuesta[0].apellido)
                            $('#clienteTelefonoR').val(respuesta[0].telefono)
                            $('#clienteCelularR').val(respuesta[0].celular)
                            $('#clienteDireccionR').val(respuesta[0].direccion)
                            $('#clienteEmailR').val(respuesta[0].email)
                        }
                    }
/*                     let template = ''
                    template += `
                        <table class="table table-striped table-hover" style="font-size: 10px;">
                            <thead>
                                <th>Id</th>
                                <th>Código</th>
                                <th>Razón Social 1</th>
                                <th>Razón Social 2</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Celular</th>
                                <th>Email</th>
                            </thead>
                            <tbody>`
                    respuesta.forEach(element => {
                        template += `
                                <tr>
                                    <td><a class="task-item" href="${element.cliente_id}">${element.cliente_id}</td>
                                    <td>${element.codigo}</td>
                                    <td>${element.razon_social1}</td>
                                    <td>${element.razon_social2}</td>
                                    <td>${element.direccion}</td>
                                    <td>${element.telefono}</td>
                                    <td>${element.celular}</td>
                                    <td>${element.mail}</td>
                                </tr>`
                    })
                    template += `
                            </tbody>
                        </table>
                    ` */
                    $('#bodyRecepcion').html(template)
                    searchCliente.value = ''
                }
            })

            //Tomo el link de la tabla con el ID del registro
            $(document).on('click', '.task-item', (e) => {
                e.preventDefault()
                nuevoCliente = false
                id= e.target.innerText
                url = 'mod_sirep/admin/tablas/clientes/clientes_single.php'
                $('#modalRecepcion').hide()
                datosCliente.forEach(element => {
                    element.value = ''
                });
                showDataReloaded(id, url, inputs).then((resolve)=>{
                    if(resolve.clienteSolicitaOc == 'S'){
                        arrayVal.ordenDeCompra.required = true
                        msgAvisoOc()
                    } else {
                        arrayVal.ordenDeCompra.required = false
                    }
        })
            })
        } else {
            alert("Ingrese algún valor al buscador de clientes")
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
                        tabla.ajax.reload();
                        $(btnEliminaCliente).hide()
                        cleanInputs(inputs)
                        cleanFormData(inputs, formData)
                        activoCliente.checked = true
                        id = ''
                        edit = false
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
    })
})()