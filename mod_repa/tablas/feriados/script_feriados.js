(function iniciarFeriados(){
    let formulario          = document.querySelector('#formFeriados')//Captura del formulario
    let inputs              = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData            = new FormData() //Creo el formData para transferencia de información con el Backend
    let btnGrabaFeriados    = document.querySelector('#btnGrabaFeriados')//Captura de boton grabar
    let btnEliminaFeriados  = document.querySelector('#btnEliminaFeriados')//Captura de boton eliminar
    let btnCancelaFeriados  = document.querySelector('#btnCancelaFeriados')//Captura de boton cancelar
    let edit                = false//flag de edición de registro existente o nuevo registro
    let id                  = ''
    let arrayVal = {
        idFeriados: {
            readonly : true,
        },
        fechaFeriados: {
            required: true
        },
        descripcionFeriados: {
            required: true,
            maxlength: 50,
            validated: true
        }
    }

    $(btnEliminaFeriados).hide() //Oculto el botón eliminar hasta que no se selecciona algún elemento de la tabla

    //Declaración del complemento DataTable
    let tabla = $('#tabla_feriados').DataTable( {
        "ajax": {
            url: 'mod_sirep/admin/tablas/feriados/feriados_list.php',
            type: 'GET',
            dataSrc: ""
        },
        "order": [ 1, 'desc' ],
        "columns": [
            {"data" : "feriado_id",
                "render": function ( data, type, row, meta ) {
                    return '<a class="task-item" href="'+data+'">' + data + '</a>';
                    },
            },
            {"data" : "fecha"},
            {"data" : "descripcion"}
        ],
        columnDefs: [ {
            targets: 1,
            render: $.fn.dataTable.render.moment('DD/MM/YYYY', 'DD/MM/YYYY')
          } ],
        processing: true,
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'Lista de feriados'},
            {extend: 'pdf', title: 'Lista de feriados'},

            {extend: 'print',}

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
        url = 'mod_sirep/admin/tablas/feriados/feriados_single.php'
        showData(id, url, inputs)
        $(btnEliminaFeriados).show()
        edit = true
    })

    //Funcionalidad del botón de Grabar
    btnGrabaFeriados.addEventListener('click', e => {
        e.preventDefault()
        let validacion = validateData(inputs, arrayVal)
        if(validacion){
            collectData(inputs, formData)
            let agregar = 'mod_sirep/admin/tablas/feriados/feriados_add.php'
            let editar = 'mod_sirep/admin/tablas/feriados/feriados_edit.php'
            let estado = enviarData(agregar, editar, formData, edit, id)
            estado.then((respuesta) => {
                switch (respuesta.estado) {
                    case 'Transacción exitosa':
                        msgTransaccionExitosa()
                        tabla.ajax.reload();
                        $(btnEliminaFeriados).hide()
                        cleanInputs(inputs)
                        cleanFormData(inputs, formData)
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
                    case 'duplicado':
                        swal('Atención!', 'El feriado que intentás grabar ya está registrado', 'warning')
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
    btnEliminaFeriados.addEventListener('click', e => {
        e.preventDefault()
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
                let url = 'mod_sirep/admin/tablas/feriados/feriados_delete.php'
                xhr.open('GET', url+'?id='+id)
                xhr.send()
                xhr.addEventListener('load', () => {
                    if(xhr.status == 200){
                        let respuesta = JSON.parse(xhr.response)
                        switch (respuesta.estado) {
                            case 'Transacción exitosa':
                                msgEliminado()
                                tabla.ajax.reload();
                                $(btnEliminaFeriados).hide()
                                cleanInputs(inputs)
                                cleanFormData(inputs, formData)
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
    })

    //Funcionalidad del botón de Cancelar
    btnCancelaFeriados.addEventListener('click', e => {
        e.preventDefault()
        cleanInputs(inputs)
        edit = false
        $(btnEliminaFeriados).hide()
        id = ''
    })
})()