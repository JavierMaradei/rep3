(function iniciarEstadoReparacion(){
    let formulario                  = document.querySelector('#formEstadoReparacion')//Captura del formulario
    let inputs                      = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData                    = new FormData() //Creo el formData para transferencia de información con el Backend
    let descripcionEstadoReparacion = document.querySelector('#descripcionEstadoReparacion')
    let btnGrabaEstadoReparacion    = document.querySelector('#btnGrabaEstadoReparacion')//Captura de boton grabar
    let btnEliminaEstadoReparacion  = document.querySelector('#btnEliminaEstadoReparacion')//Captura de boton eliminar
    let btnCancelaEstadoReparacion  = document.querySelector('#btnCancelaEstadoReparacion')//Captura de boton cancelar
    let activoEstadoReparacion      = document.querySelector('#activoEstadoReparacion')//Captura de boton cancelar
    let edit                        = false//flag de edición de registro existente o nuevo registro
    let id                          = ''

    let arrayVal = {
        idEstadoReparacion          : {readonly: true},
        descripcionEstadoReparacion : {required: true, maxlength: 45, validated: true},
        activoEstadoReparacion      : {}
    }

    activoEstadoReparacion.checked = true
    limitaCaracteres(descripcionEstadoReparacion, 45)
    $(btnEliminaEstadoReparacion).hide() //Oculto el botón eliminar hasta que no se selecciona algún elemento de la tabla

    //Declaración del complemento DataTable
    let tabla = $('#tabla_estadosReparacion').DataTable( {
        "ajax": {
            url: 'mod_repa/tablas/estadosReparacion/estadosReparacion_list.php',
            type: 'GET',
            dataSrc: ""
        },
        "columns": [  
            {"data" : "estado_id",
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
            {extend: 'excel', title: 'Lista de estados de reparación', text: 'Exportar a Excel'}   
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
        url = 'mod_repa/tablas/estadosReparacion/estadosReparacion_single.php'
        showData(id, url, inputs)
        $(btnEliminaEstadoReparacion).show()
        edit = true
    })

    //Funcionalidad del botón de Grabar
    btnGrabaEstadoReparacion.addEventListener('click', e => {
        e.preventDefault()
        let validacion = validateData(inputs, arrayVal)
        if(validacion){
            collectData(inputs, formData)
            let agregar = 'mod_repa/tablas/estadosReparacion/estadosReparacion_add.php'
            let editar  = 'mod_repa/tablas/estadosReparacion/estadosReparacion_edit.php'

            let estado = enviarData(agregar, editar, formData, edit, id)
            estado.then((respuesta) => {
                switch (respuesta.estado) {
                    case 'Transacción exitosa':
                        msgTransaccionExitosa()
                        tabla.ajax.reload();
                        $(btnEliminaEstadoReparacion).hide()
                        cleanInputs(inputs)
                        cleanFormData(inputs, formData)
                        activoEstadoReparacion.checked = true
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
            })
        }
    })
    
    //Funcionalidad del botón de Eliminar
    btnEliminaEstadoReparacion.addEventListener('click', e => {
        e.preventDefault()
        let xhr2 = new XMLHttpRequest
        let url = 'mod_repa/tablas/estadosReparacion/estadosReparacion_use.php?id='+id
        xhr2.open('GET', url)
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
                            let url = 'mod_repa/tablas/estadosReparacion/estadosReparacion_delete.php'
                            xhr.open('GET', url+'?id='+id)
                            xhr.send()
                            xhr.addEventListener('load', () => {

                                if(xhr.status == 200){ 
                                    let respuesta = JSON.parse(xhr.response)
                                    switch (respuesta.estado) {
                                        case 'Transacción exitosa':
                                            msgEliminado()
                                            tabla.ajax.reload();
                                            $(btnEliminaEstadoReparacion).hide()
                                            cleanInputs(inputs)
                                            cleanFormData(inputs, formData)
                                            activoEstadoReparacion.checked = true
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
                    msgEnUso()
                }
            }
        })
    })
    
    //Funcionalidad del botón de Cancelar
    btnCancelaEstadoReparacion.addEventListener('click', e => {
        e.preventDefault()
        cleanInputs(inputs)
        edit = false
        activoEstadoReparacion.checked = true
        $(btnEliminaEstadoReparacion).hide()
        id = ''
    })
})()