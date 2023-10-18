(function iniciarClientes(){
    let formulario          = document.querySelector('#formClientes')//Captura del formulario
    let inputs              = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData            = new FormData() //Creo el formData para transferencia de información con el Backend
    let clienteId           = document.querySelector('#clienteId')
    let clienteNombre       = document.querySelector('#clienteNombre')
    let clienteApellido     = document.querySelector('#clienteApellido')
    let clienteTelefono     = document.querySelector('#clienteTelefono')
    let clienteCelular      = document.querySelector('#clienteCelular')
    let clienteEmail        = document.querySelector('#clienteEmail')
    let provincia           = document.querySelector('#provincia')
    let localidad           = document.querySelector('#localidad')
    let calle               = document.querySelector('#calle')
    let numeroCalle         = document.querySelector('#numeroCalle')
    let dpto                = document.querySelector('#dpto')
    let clienteActivo       = document.querySelector('#clienteActivo')
    let btnGrabaCliente     = document.querySelector('#btnGrabaCliente')//Captura de boton grabar
    let btnEliminaCliente   = document.querySelector('#btnEliminaCliente')//Captura de boton eliminar
    let btnCancelaCliente   = document.querySelector('#btnCancelaCliente')//Captura de boton cancelar
    let activoCliente       = document.querySelector('#clienteActivo')//Captura de boton cancelar
    let edit                = false//flag de edición de registro existente o nuevo registro
    let id                  = ''

    let arrayVal = {
        clienteId           : {},
        clienteNombre       : {required: true, maxlength: 50, validated: true},
        clienteApellido     : {required: true, maxlength: 50, validated: true},
        clienteTelefono     : {required: true, maxlength: 60, validated: true},
        clienteCelular      : {maxlength: 25, validated: true},
        clienteEmail        : {required: true, validated: 'email', maxlength: 50},
        provincia           : {required: true, validated: true},
        localidad           : {required: true, validated: true},
        calle               : {required: true, validated: true, maxlength: 50},
        numeroCalle         : {required: true, validated: true, maxlength: 10},
        dpto                : {required: true, validated: true, maxlength: 10},
        clienteActivo       : {}
    }

    activoCliente.checked = true
    limitaCaracteres(clienteNombre, 50)
    limitaCaracteres(clienteApellido, 50)
    limitaCaracteres(clienteTelefono, 60)
    limitaCaracteres(clienteCelular, 25)
    limitaCaracteres(clienteEmail, 50)
    limitaCaracteres(calle, 50)
    limitaCaracteres(numeroCalle, 10)
    limitaCaracteres(dpto, 10)
    $(btnEliminaCliente).hide() //Oculto el botón eliminar hasta que no se selecciona algún elemento de la tabla

    listaProvincias(provincia, 'S')

    provincia.addEventListener('change', e => {
        e.preventDefault()
        listaLocalidades(localidad,e.target.value, 'S')
    })

    //Declaración del complemento DataTable
    let tabla = $('#tabla_clientes').DataTable( {
        "ajax": {
            url: 'mod_repa/tablas/clientes/clientes_list.php',
            type: 'GET',
            dataSrc: ""
        },
        "columns": [  
            {"data" : "cliente_id",
                "render": function ( data, type, row, meta ) {
                    return '<a class="task-item" href="'+data+'">' + data + '</a>';
                    }, 
            },
            {"data" : "nombre"},
            {"data" : "apellido"},
            {"data" : "telefono"},
            {"data" : "celular"},
            {"data" : "email"}
        ],
        processing: true,
        paging: true,
        bLengthChange: false,
        iDisplayLength: 10,
        bInfo: true,
        bAutoWidth: false,
        dom:
            "<'row'<'col-sm-4'B><'col-sm-4 text-center'l><'col-sm-4'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-6'i><'col-sm-6'p>>",
        buttons: [
            {extend: 'excel', title: 'Lista de clientes', text: 'Exportar a Excel'}  
        ],
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
        }
    })
    
    //Tomo el link de la tabla con el ID del registro
    $(document).on('click', '.task-item', (e) => {
        e.preventDefault()
        cleanInputs(inputs)
        id= e.target.innerText
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/clientes/clientes_single.php?id='+id)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)

                listaLocalidades(localidad,respuesta[0].provincia, 'S').then((r) => {
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
                    respuesta[0].clienteActivo == 'S'? clienteActivo.checked = true : clienteActivo.checked = false
                })
            }
        })
        $(btnEliminaCliente).show()
        edit = true
    })

    //Funcionalidad del botón de Grabar
    btnGrabaCliente.addEventListener('click', e => {
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
    
    //Funcionalidad del botón de Eliminar
    btnEliminaCliente.addEventListener('click', e => {
        e.preventDefault()
        let xhr2 = new XMLHttpRequest
        let url2 = 'mod_repa/tablas/clientes/clientes_use.php?id='+id
        xhr2.open('GET', url2)
        xhr2.send()
        xhr2.addEventListener('load', () => {
            if(xhr2.status == 200){
                let respuesta = JSON.parse(xhr2.response)
                if(respuesta == ''){
                    swal({
                        title: "Estás seguro?",
                        text: "Si lo eliminas, el registro no podrá ser recuperado!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Si, eliminar!",
                        cancelButtonText: "No, Cancelar!",
                        closeOnConfirm: false,
                        closeOnCancel: false },
                    function (isConfirm) {
                        if (isConfirm) {
                            
                            let xhr = new XMLHttpRequest
                            let url = 'mod_repa/tablas/clientes/clientes_delete.php'
                            xhr.open('GET', url+'?id='+id)
                            xhr.send()
                            xhr.addEventListener('load', () => {
                                if(xhr.status == 200){ 
                                    let respuesta = JSON.parse(xhr.response)
                                    switch (respuesta.estado) {
                                        case 'Transacción exitosa':
                                            msgEliminado()
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
                                        default:
                                            msgAlgoNoFueBien()
                                            cleanFormData(inputs, formData)
                                            break;
                                    }
                                }
                            }) 
                        } else {
                            msgCancelado()
                        }
                    });
                } else {
                    swal("Cancelado", "El registro no se puede eliminar porque se encuentra en uso", "error");
                }
            }
        })
    })
    
    //Funcionalidad del botón de Cancelar
    btnCancelaCliente.addEventListener('click', e => {
        e.preventDefault()
        cleanInputs(inputs)
        edit = false
        $(btnEliminaCliente).hide()
        activoCliente.checked = true
        id = ''
        listaLocalidades(localidad,0, 'S')
    })
})()