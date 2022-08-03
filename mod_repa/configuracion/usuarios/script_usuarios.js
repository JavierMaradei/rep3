(function iniciarUsuarios(){
    let formulario              = document.querySelector('#formUsuarios')//Captura del formulario
    let inputs                  = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData                = new FormData() //Creo el formData para transferencia de información con el Backend
    let nombreUsuarios          = document.querySelector('#nombreUsuarios')
    let apellidoUsuarios        = document.querySelector('#apellidoUsuarios')
    let emailUsuarios           = document.querySelector('#emailUsuarios')
    let claveUsuarios           = document.querySelector('#claveUsuarios')
    let sucursalUsuarios        = document.querySelector('#sucursalUsuarios')
    let lugarRecepcionUsuarios  = document.querySelector('#lugarRecepcionUsuarios')
    let perfilUsuarios          = document.querySelector('#perfilUsuarios')
    let btnGrabaUsuarios        = document.querySelector('#btnGrabaUsuarios')//Captura de boton grabar
    let btnEliminaUsuarios      = document.querySelector('#btnEliminaUsuarios')//Captura de boton eliminar
    let btnCancelaUsuarios      = document.querySelector('#btnCancelaUsuarios')//Captura de boton cancelar
    let activoUsuarios          = document.querySelector('#activoUsuarios')//Captura de boton cancelar
    let edit                    = false//flag de edición de registro existente o nuevo registro
    let id                      = ''
    let arrayVal                = {
        idUsuarios              : {readonly: true},
        nombreUsuarios          : {required: true, maxlength: 40, validated: true},
        apellidoUsuarios        : {required: true, maxlength: 40, validated: true},
        lugarRecepcionUsuarios  : {required: true, validated: true, noCero: true},
        sucursalUsuarios        : {required: true, validated: true, noCero: true},
        perfilUsuarios          : {required: true, validated: true, noCero: true},
        emailUsuarios           : {required: true, maxlength: 50, validated: 'email'},
        claveUsuarios           : {required: true, maxlength: 50, validated: true},
        emisorUsuarios          : {},
        reparadorUsuarios       : {},
        tecnicoUsuarios         : {},
        activoUsuarios          : {}
    }
    
    $(btnEliminaUsuarios).hide() //Oculto el botón eliminar hasta que no se selecciona algún elemento de la tabla
    cargaSucursales(sucursalUsuarios)
    cargaLugarRecepcion(lugarRecepcionUsuarios)
    cargaPerfiles(perfilUsuarios)
    limitaCaracteres(nombreUsuarios, 40)
    limitaCaracteres(apellidoUsuarios, 40)
    limitaCaracteres(emailUsuarios, 50)
    limitaCaracteres(claveUsuarios, 50)
    activoUsuarios.checked = true

    //Declaración del complemento DataTable
    let tabla = $('#tabla_usuarios').DataTable( {
        "ajax": {
            url: 'mod_repa/configuracion/usuarios/usuarios_list.php',
            type: 'GET',
            dataSrc: ""
        },
        "columns": [  
            {"data" : "usuario_id",
                "render": function ( data, type, row, meta ) {
                    return '<a class="task-item" href="'+data+'">' + data + '</a>';
                    }, 
            },
            {"data" : "nombre"},
            {"data" : "apellido"},
            {"data" : "email"},
            {"data" : "perfil"},
            {"data" : "sucursal"},
            {"data" : "emisor"},
            {"data" : "reparador"},
            {"data" : "activo"},
            {"data" : "fecha_alta"}
        ],
        columnDefs: [ {
            targets: 9,
            render: $.fn.dataTable.render.moment('YYYY-MM-DD', 'DD/MM/YYYY')
        } ],
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
            {extend: 'excel', title: 'Lista de perfiles', text: 'Exportar a Excel'},
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
        },
    })
    
    //Tomo el link de la tabla con el ID del registro
    $(document).on('click', '.task-item', (e) => {
        e.preventDefault()
        cleanInputs(inputs)
        id= e.target.innerText
        url = 'mod_repa/configuracion/usuarios/usuarios_single.php'
        showData(id, url, inputs)
        $(btnEliminaUsuarios).show()
        edit = true
        emailUsuarios.readOnly = true
        arrayVal.emailUsuarios.readonly = true
    })

    //Funcionalidad del botón de Grabar
    btnGrabaUsuarios.addEventListener('click', e => {
        
        e.preventDefault()
        let validacion = validateData(inputs, arrayVal)
        if(validacion){

            collectData(inputs, formData)
            let agregar = 'mod_repa/configuracion/usuarios/usuarios_add.php'
            let editar = 'mod_repa/configuracion/usuarios/usuarios_edit.php'
            let estado = enviarData(agregar, editar, formData, edit, id)

            estado.then((respuesta) => {
                switch (respuesta.estado) {
                    
                    case 'Transacción exitosa':
                        msgTransaccionExitosa()
                        tabla.ajax.reload();
                        $(btnEliminaUsuarios).hide()
                        cleanInputs(inputs)
                        cleanFormData(inputs, formData)
                        activoUsuarios.checked = true
                        id = ''
                        edit = false
                        emailUsuarios.readOnly = false
                        arrayVal.emailUsuarios.readonly = false
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
            })
        }
    })
    
    //Funcionalidad del botón de Eliminar
    btnEliminaUsuarios.addEventListener('click', e => {
        e.preventDefault()
        let xhr2 = new XMLHttpRequest
        let url2 = 'mod_repa/configuracion/usuarios/usuarios_use.php?id='+id
        xhr2.open('GET', url2)
        xhr2.send()
        xhr2.addEventListener('load', () => {
            if(xhr2.status == 200){
                let respuesta2 = JSON.parse(xhr2.response)
                if(respuesta2 == ''){
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
                            let url = 'mod_repa/configuracion/usuarios/usuarios_delete.php'
                            xhr.open('GET', url+'?id='+id)
                            xhr.send()
                            xhr.addEventListener('load', () => {
                                if(xhr.status == 200){
                                    let respuesta = JSON.parse(xhr.response)
                                    switch (respuesta.estado) {
                                        case 'Transacción exitosa':
                                            msgEliminado()
                                            tabla.ajax.reload();
                                            $(btnEliminaUsuarios).hide()
                                            cleanInputs(inputs)
                                            cleanFormData(inputs, formData)
                                            activoUsuarios.checked = true
                                            id = ''
                                            edit = false
                                            emailUsuarios.readOnly = false
                                            arrayVal.emailUsuarios.readonly = false
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
    btnCancelaUsuarios.addEventListener('click', e => {
        e.preventDefault()
        cleanInputs(inputs)
        edit = false
        emailUsuarios.readOnly = false
        arrayVal.emailUsuarios.readonly = false
        activoUsuarios.checked = true
        $(btnEliminaUsuarios).hide()
        id = ''
    })
})()