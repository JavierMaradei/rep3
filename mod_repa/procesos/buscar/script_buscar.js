(() =>{
    let formulario              = document.querySelector('#inputsBuscador')//Captura del formulario
    let inputs                  = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData                = new FormData() //Creo el formData para transferencia de información con el Backend
    let respBtn                 = document.querySelector('#respuesta')//Div para mostrar los avisos de espera
    let tecnico                 = document.querySelector('#tecnico')
    let f_inicial               = document.querySelector('#desdeFechaRecepcion')
    let f_final                 = document.querySelector('#hastaFechaRecepcion')
    let hasta                   = moment(new Date()).format('YYYY-MM-DD');
    let desde                   = moment().subtract(18, 'months').format('YYYY-MM-DD');
    let codigoProducto          = document.querySelector('#codigoProducto')
    let descripcionProducto     = document.querySelector('#descripcionProducto')
    let btnBuscarProducto       = document.querySelector('#btnBuscarProducto')
    let btnCloseModalBuscador   = document.querySelector('#btnCloseModalBuscador')
    let btnCerrarModalBuscador  = document.querySelector('#btnCerrarModalBuscador')
    let searchCliente           = document.querySelector('#searchCliente')
    let btnBuscarCliente        = document.querySelector('#btnBuscarCliente')
    let clienteId               = document.querySelector('#clienteId')
    let clienteApellido         = document.querySelector('#clienteApellido')
    let clienteNombre           = document.querySelector('#clienteNombre')
    let clienteTelefono         = document.querySelector('#clienteTelefono')
    let clienteCelular          = document.querySelector('#clienteCelular')
    let clienteEmail            = document.querySelector('#clienteEmail')
    let provincia               = document.querySelector('#provincia')
    let localidad               = document.querySelector('#localidad')
    let calle                   = document.querySelector('#calle')
    let numeroCalle             = document.querySelector('#numeroCalle')
    let dpto                    = document.querySelector('#dpto')
    let datosCliente            = [clienteId, clienteApellido, clienteNombre, clienteTelefono, clienteCelular, clienteEmail, provincia, localidad, calle, numeroCalle, dpto]
    let inputsFiltrado          = [orden, nroPresupuesto, remitoCliente, remitoDespacho, serieProducto, clienteApellido, clienteNombre, clienteTelefono, 
        clienteCelular, clienteEmail, calle, numeroCalle, dpto]
    let btnBuscar               = document.querySelector('#btnBuscar')
    let btnCancelar             = document.querySelector('#btnCancelar')

    cargaTecnicos(tecnico)
    limitaCaracteres(codigoProducto, CODIGO_LENGTH)
    listaProvincias(provincia, 'S')

    provincia.addEventListener('change', e => {
        e.preventDefault()
        listaLocalidades(localidad,e.target.value, 'S')
    })

    //Declaración del complemento DataTable
    let tabla = $('#tabla_buscador').DataTable( {
        "order": [[1,'asc'], [0,'asc']],
        columnDefs: [
            {
                "targets"   : 0,
                "render"    : function ( data, type, row, meta ) {
                    return '<a class="reparacion-item" href="'+data+'">'+data+'</a>'}
            },
            {
                targets: [1,2],
                render: $.fn.dataTable.render.moment('YYYY-MM-DD HH:mm:ss', 'DD/MM/YYYY')
            } 
        ],
        processing: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'Lista de reparaciones'},
            {extend: 'pdf', title: 'Lista de reparaciones'},
            {extend: 'print',}
        ],
        "bLengthChange": false,
        "iDisplayLength": 10,
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Cargando...</span> ',
            "processing": '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span class="sr-only">Procesando...</span>',
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
    })

    function recargaTabla(){
        let xhr = new XMLHttpRequest
        xhr.open('POST', 'mod_repa/procesos/buscar/buscar_search.php')//Envío la información del filtro
        xhr.send(formData)

        xhr.addEventListener('load', () => { //Cuando me vuelven los datos de la query armo la tabla
            tabla.clear() // Primero la vacío de registros preexistentes
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                respuesta.forEach(element => {//Si las fechas son del año 1900 limpio el valor
                    if(element.freparacion == '01/01/1900'){
                        element.freparacion = ''
                    }                  
                    tabla.row.add([ //Agrego las nuevas filas
                        element.reparacion_id,
                        element.frecepcion,
                        element.fretiro,
                        element.producto_codigo,
                        element.producto_descripcion,
                        element.nro_serie,
                        element.cliente_completo,
                        element.lugar_recepcion_descripcion,
                        element.atencion,
                        element.RepPres,
                        element.sucursal_descripcion
                    ])
                });
                tabla.draw() //Imprimo la tabla en pantalla
            }
        })

        xhr.addEventListener('loadend', () => { //Cuando termina la carga de los datos borro el mensaje de espera
            respBtn.innerHTML= ''
            //cleanInputs(inputs)
            cleanFormData(inputs, formData)
        })
    }

    btnBuscar.addEventListener('click', e => {//Al hacer click en el botón Buscar del prefiltro...
        e.preventDefault()
        $('html, body').animate({scrollTop: $("#tabla_buscador").offset().top}, 100);
        let progreso = '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span>Procesando los filtros... <br><i>Esta operación puede demorarse dependiendo del rango de fechas que hayas seleccionado.</i></span>'
        respBtn.innerHTML = progreso //Muestro un aviso de espera
        collectData(inputs, formData)//Recolecto los datos
        recargaTabla()
    })

    inputsFiltrado.forEach(element => { //el Enter en el formulario de prefiltro equivale a un click en el botón de Buscar
        element.addEventListener('keyup', (e) => {
            e.preventDefault()
            if(e.keyCode === 13){
                btnBuscar.click()
            }
        })
    });

    btnCancelar.addEventListener('click', e => {
        e.preventDefault()
        cleanInputs(inputs)
        f_inicial.value = desde
        f_final.value = hasta
        tabla.clear().draw()
        listaLocalidades(localidad,0, 'S')
        tecnico.value = '0'
    })

    /////////////////// PRODUCTOS ///////////////////
    codigoProducto.addEventListener('keyup', (e) => {
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
                    } else {
                        descripcionProducto.value   = ''
                        codigoProducto.value        = ''
                        swal('Atención', 'Código inexistente o inválido :(', 'warning')
                    }
                }
            })
        } else {
            descripcionProducto.value   = ''
        }
    })

    btnBuscarProducto.addEventListener('click', e => {
        e.preventDefault()

        busquedaPorProducto('#modalBuscador', '#bodyBuscador', '#tituloBuscador').then(() => {
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
        $('#modalBuscador').hide()
        
        let xhr = new XMLHttpRequest
        xhr.open('GET', url)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                codigoProducto.value        = respuesta.codigo
                descripcionProducto.value   = respuesta.descripcion
            }
        })
    })

    //Cierro modal
    btnCerrarModalBuscador.addEventListener('click', e => {
        e.preventDefault()
        $('#modalBuscador').hide()
    })

    //Cierro modal 2
    btnCloseModalBuscador.addEventListener('click', e => {
        e.preventDefault()
        $('#modalBuscador').hide()
    })
    /////////////////// FIN PRODUCTOS ///////////////////

    searchCliente.addEventListener('keyup', e => {
        e.preventDefault()
        if(e.keyCode === 13){
            btnBuscarCliente.click()
        }
    })

    //Funcionalidad del botón buscar cliente
    btnBuscarCliente.addEventListener('click', e => {
        e.preventDefault()
        $('#bodyBuscador').empty()
        $('#tituloBuscador').text('Clientes')

        let search  = document.querySelector('#searchCliente').value

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

                            $('#modalBuscador').show()

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
                            $('#bodyBuscador').html(template)

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
                                }
                            })
                        }
                    }
                    searchCliente.value = ''
                }
            })

        } else {
            swal('Atención', 'Ingrese algún valor al buscador de clientes', 'warning')
        }
    })

    //Click en la lista del buscador de clientes
    $(document).on('click', '.client-item', (e) => {
        e.preventDefault()
        id  = e.target.innerText
        $('#modalBuscador').hide()
        datosCliente.forEach(element => {
            element.value = ''
        });
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

    setTimeout(() => {
        dataGeneral()
    }, 500);

})()