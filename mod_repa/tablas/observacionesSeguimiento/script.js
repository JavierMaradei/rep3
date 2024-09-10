(() => {
    let formulario  = document.querySelector('#form')//Captura del formulario
    let inputs      = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData    = new FormData() //Creo el formData para transferencia de información con el Backend
    let descripcion = document.querySelector('#descripcion')
    let btnGrabar   = document.querySelector('#btnGrabar')//Captura de boton grabar
    let btnEliminar = document.querySelector('#btnEliminar')//Captura de boton eliminar
    let btnCancelar = document.querySelector('#btnCancelar')//Captura de boton cancelar
    let activo      = document.querySelector('#activo')
    let edit        = false//flag de edición de registro existente o nuevo registro
    let id          = ''
    let arrayVal    = {
        id          : {readonly: true},
        descripcion : {required: true, maxlength: 50, validated: true},
        activo      : {maxlength: 6, validated: true}
    }
    
    $('#btnEliminar').hide() //Oculto el botón eliminar hasta que no se selecciona algún elemento de la tabla
    limitaCaracteres(descripcion, 100)
    activo.checked = true

    function limpieza(){
        cleanInputs(inputs)
        cleanFormData(inputs, formData)
        activo.checked  = true
        edit            = false
        id              = ''
        $('#btnEliminar').hide()
    }

    //Declaración del complemento DataTable
    let tabla = $('#tabla').DataTable( {
        "ajax": {
            url: 'mod_repa/tablas/observacionesSeguimiento/observacionesSeguimiento_list.php',
            type: 'GET',
            dataSrc: ""
        },
        "columns": [  
            {"data" : "observacion_seguimiento_id",
                "render": function ( data, type, row, meta ) {
                    return '<a class="task-item" href="'+data+'">' + data + '</a>';
                    }, 
            },
            {"data" : "descripcion"},
            {"data" : "activo"}
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
            {extend: 'excel', title: 'Lista de observaciones de seguimiento', text: 'Exportar a Excel'},
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
        id      = e.target.innerText
        url     = 'mod_repa/tablas/observacionesSeguimiento/observacionesSeguimiento_single.php'
        edit    = true
        showData(id, url, inputs)
        $('#btnEliminar').show()
    })

    //Funcionalidad del botón de Grabar
    btnGrabar.addEventListener('click', e => {
        e.preventDefault()
        let validacion = validateData(inputs, arrayVal)
        if(validacion){
            collectData(inputs, formData)
            let agregar = 'mod_repa/tablas/observacionesSeguimiento/observacionesSeguimiento_add.php'
            let editar = 'mod_repa/tablas/observacionesSeguimiento/observacionesSeguimiento_edit.php'
            let estado = enviarData(agregar, editar, formData, edit, id)
            estado.then((respuesta) => {
                cleanFormData(inputs, formData)
                switch (respuesta.estado) {
                    case 'Transacción exitosa':
                        msgTransaccionExitosa()
                        tabla.ajax.reload();
                        limpieza()
                        break;
                    case 'Sesión expirada':
                        sesionExpiradaMensajeFlotante()
                        break;
                    case 'Error perfil':
                        msgErrorPerfil()
                        break;
                    default:
                        msgAlgoNoFueBien()
                        break;
                }
            }) 
        }
    })
    
    //Funcionalidad del botón de Eliminar
    btnEliminar.addEventListener('click', e => {
        e.preventDefault()
        let xhr2 = new XMLHttpRequest
        let url2 = 'mod_repa/tablas/observacionesSeguimiento/observacionesSeguimiento_use.php?id='+id
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
                            let url = 'mod_repa/tablas/observacionesSeguimiento/observacionesSeguimiento_delete.php'
                            xhr.open('GET', url+'?id='+id)
                            xhr.send()
                            xhr.addEventListener('load', () => {
                                if(xhr.status == 200){ 
                                    let respuesta = JSON.parse(xhr.response)
                                    cleanFormData(inputs, formData)
                                    switch (respuesta.estado) {
                                        case 'Transacción exitosa':
                                            msgEliminado()
                                            tabla.ajax.reload();
                                            limpieza()                                            
                                            break;
                                        case 'Sesión expirada':
                                            sesionExpiradaMensajeFlotante()
                                            break;
                                        case 'Error perfil':
                                            msgErrorPerfil()
                                            break;
                                        default:
                                            msgAlgoNoFueBien()
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
    btnCancelar.addEventListener('click', e => {
        e.preventDefault()
        limpieza()
    })
})()