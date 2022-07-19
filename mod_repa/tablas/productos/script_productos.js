(function iniciarProductos(){
    let formulario          = document.querySelector('#formProductos')//Captura del formulario
    let inputs              = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData            = new FormData() //Creo el formData para transferencia de información con el Backend
    let btnGrabaProducto    = document.querySelector('#btnGrabaProducto')//Captura de boton grabar
    let btnEliminaProducto  = document.querySelector('#btnEliminaProducto')//Captura de boton eliminar
    let btnCancelaProducto  = document.querySelector('#btnCancelaProducto')//Captura de boton cancelar
    let productoCodigo      = document.querySelector('#productoCodigo')
    let productoDescripcion = document.querySelector('#productoDescripcion')
    let productoCosto       = document.querySelector('#productoCosto')
    let productoMarca       = document.querySelector('#productoMarca')//Captura de boton cancelar
    let productoFamilia     = document.querySelector('#productoFamilia')//Captura de boton cancelar
    let productoSubirFoto   = document.querySelector('#productoSubirFoto')
    let productoImagen      = document.querySelector('#productoImagen')
    let edit                = false//flag de edición de registro existente o nuevo registro
    let id                  = ''
    let arrayVal = {
        productoId          : {},
        productoCodigo      : {required: true, maxlength: 30, validated: true},
        productoMarca       : {required: true, validated: true},
        productoFamilia     : {required: true, validated: true},
        productoDescripcion : {required: true, maxlength: 100, validated: true},
        productoCosto       : {maxlength: 21, validated: true},
        productoMonoTri     : {required: true, validated: true},
        productoSubirFoto   : {maxlength: 100},
        productoActivo      : {validated: true},
        productoCanjeable   : {validated: true}
    }

    limitaCaracteres(productoCodigo, 30)
    limitaCaracteres(productoDescripcion, 100)
    limitaCaracteres(productoCosto, 10)
    cargaFamilias(productoFamilia)
    cargaMarcas(productoMarca)
    productoActivo.checked = true
    $(btnEliminaProducto).hide() //Oculto el botón eliminar hasta que no se selecciona algún elemento de la tabla

    //Declaración del complemento DataTable
    let tabla = $('#tabla_productos').DataTable( {
        "ajax": {
            url: 'mod_repa/tablas/productos/productos_list.php',
            type: 'GET',
            dataSrc: ""
        },
        "columns": [  
            {"data" : "producto_id",
                "render": function ( data, type, row, meta ) {
                    return '<a class="task-item" href="'+data+'">' + data + '</a>';
                    }, 
            },
            {"data" : "codigo"},
            {"data" : "descripcion"},
            {"data" : "marca"},
            {"data" : "familia"},
            {"data" : "costo_estimado"},
            {"data" : "mono_tri"},
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
            {extend: 'excel', title: 'Lista de Productos', text: 'Exportar a Excel'}  
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
        url = 'mod_repa/tablas/productos/productos_single.php'
        showDataReloaded(id, url, inputs).then((r) => {
            if(r.productoImagen != ''){
                productoImagen.src = `mod_repa/tablas/productos/adjuntos/${r.productoImagen}`
            } else {
                productoImagen.src = '../../hdn/img/sinImagen.png'
            }
        })
        $(btnEliminaProducto).show()
        edit = true
    })

    //Funcionalidad del botón de Grabar
    btnGrabaProducto.addEventListener('click', e => {
        e.preventDefault()
        
        let validacion = validateData(inputs, arrayVal)
        
        if(validacion){
            collectData(inputs, formData)
            formData.append('archivoAdjunto', productoSubirFoto.files[0])

            let agregar = 'mod_repa/tablas/productos/productos_add.php'
            let editar = 'mod_repa/tablas/productos/productos_edit.php'

            let estado = enviarData(agregar, editar, formData, edit, id)
            
            estado.then((respuesta) => {
                switch (respuesta.estado) {

                    case 'Transacción exitosa':
                        msgTransaccionExitosa()
                        tabla.ajax.reload();
                        $(btnEliminaProducto).hide()
                        cleanInputs(inputs)
                        cleanFormData(inputs, formData)
                        formData.delete('archivoAdjunto')
                        productoActivo.checked = true
                        productoImagen.src = '../../hdn/img/sinImagen.png'
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

                    case 'Error adjunto':
                        swal({
                            title   : "Error :( !",
                            text    : respuesta.msgError+' (Formatos permitidos: pdf, png y jpg.)',
                            type    : "error",
                        });
                        cleanFormData(inputs, formData)
                        formData.delete('archivoAdjunto')
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
    btnEliminaProducto.addEventListener('click', e => {
        e.preventDefault()
        let xhr2 = new XMLHttpRequest
        let url2 = 'mod_repa/tablas/productos/productos_use.php?id='+id
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
                            let url = 'mod_repa/tablas/productos/productos_delete.php'
                            xhr.open('GET', url+'?id='+id)
                            xhr.send()
                            xhr.addEventListener('load', () => {
                                if(xhr.status == 200){ 
                                    let respuesta = JSON.parse(xhr.response)
                                    switch (respuesta.estado) {
                                        case 'Transacción exitosa':
                                            msgEliminado()
                                            tabla.ajax.reload();
                                            $(btnEliminaProducto).hide()
                                            cleanInputs(inputs)
                                            cleanFormData(inputs, formData)
                                            productoActivo.checked = true
                                            id = ''
                                            edit = false
                                            productoImagen.src = '../../hdn/img/sinImagen.png'
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
    btnCancelaProducto.addEventListener('click', e => {
        e.preventDefault()
        cleanInputs(inputs)
        edit = false
        $(btnEliminaProducto).hide()
        productoActivo.checked = true
        id = ''
        productoImagen.src = '../../hdn/img/sinImagen.png'
    })
})()