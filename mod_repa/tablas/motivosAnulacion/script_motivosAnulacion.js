(function iniciarMotivosAnulacion(){
    let formulario                  = document.querySelector('#formMotivosAnulacion')//Captura del formulario
    let inputs                      = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData                    = new FormData() //Creo el formData para transferencia de información con el Backend
    let btnGrabaMotivosAnulacion    = document.querySelector('#btnGrabaMotivosAnulacion')//Captura de boton grabar
    let btnEliminaMotivosAnulacion  = document.querySelector('#btnEliminaMotivosAnulacion')//Captura de boton eliminar
    let btnCancelaMotivosAnulacion  = document.querySelector('#btnCancelaMotivosAnulacion')//Captura de boton cancelar
    let activoMotivosAnulacion      = document.querySelector('#activoMotivosAnulacion')//Captura de boton cancelar
    let edit                        = false//flag de edición de registro existente o nuevo registro
    let id                          = ''
    let arrayVal = {
        idMotivosAnulacion: {
            readonly : true,
        },
        descripcionMotivosAnulacion: {
            required: true,
            maxlength: 50,
            validated: true
        },
        activoMotivosAnulacion: {
            maxlength: 6,
            validated: true
        }
    }
    
    $(btnEliminaMotivosAnulacion).hide() //Oculto el botón eliminar hasta que no se selecciona algún elemento de la tabla

    //Declaración del complemento DataTable
    let tabla = $('#tabla_motivosAnulacion').DataTable( {
        "ajax": {
            url: 'mod_sirep/admin/tablas/motivosAnulacion/motivosAnulacion_list.php',
            type: 'GET',
            dataSrc: ""
        },
        "columns": [  
            {"data" : "motivoanulacion_id",
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
            {extend: 'excel', title: 'Lista de motivos de anulación', text: 'Exportar a Excel'},
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
        url = 'mod_sirep/admin/tablas/motivosAnulacion/motivosAnulacion_single.php'
        showData(id, url, inputs)
        $(btnEliminaMotivosAnulacion).show()
        edit = true
    })

    //Funcionalidad del botón de Grabar
    btnGrabaMotivosAnulacion.addEventListener('click', e => {
        e.preventDefault()
        let validacion = validateData(inputs, arrayVal)
        if(validacion){
            collectData(inputs, formData)
            let agregar = 'mod_sirep/admin/tablas/motivosAnulacion/motivosAnulacion_add.php'
            let editar = 'mod_sirep/admin/tablas/motivosAnulacion/motivosAnulacion_edit.php'
            let estado = enviarData(agregar, editar, formData, edit, id)
            estado.then((respuesta) => {
                switch (respuesta.estado) {
                    case 'Transacción exitosa':
                        msgTransaccionExitosa()
                        tabla.ajax.reload();
                        $(btnEliminaMotivosAnulacion).hide()
                        cleanInputs(inputs)
                        cleanFormData(inputs, formData)
                        activoMotivosAnulacion.checked = true
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
    btnEliminaMotivosAnulacion.addEventListener('click', e => {
        e.preventDefault()
        let xhr2 = new XMLHttpRequest
        let url2 = 'mod_sirep/admin/tablas/motivosAnulacion/motivosAnulacion_use.php?id='+id
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
                            let url = 'mod_sirep/admin/tablas/motivosAnulacion/motivosAnulacion_delete.php'
                            xhr.open('GET', url+'?id='+id)
                            xhr.send()
                            xhr.addEventListener('load', () => {
                                if(xhr.status == 200){ 
                                    let respuesta = JSON.parse(xhr.response)
                                    switch (respuesta.estado) {
                                        case 'Transacción exitosa':
                                            msgEliminado()
                                            tabla.ajax.reload();
                                            $(btnEliminaMotivosAnulacion).hide()
                                            cleanInputs(inputs)
                                            cleanFormData(inputs, formData)
                                            activoMotivosAnulacion.checked = true
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
    btnCancelaMotivosAnulacion.addEventListener('click', e => {
        e.preventDefault()
        cleanInputs(inputs)
        activoMotivosAnulacion.checked = true
        edit = false
        $(btnEliminaMotivosAnulacion).hide()
        id = ''
    })
})()