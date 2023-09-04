(function iniciarProductos(){
    let formulario          = document.querySelector('#formProductos')//Captura del formulario
    let inputs              = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData            = new FormData() //Creo el formData para transferencia de información con el Backend
    let btnGrabaProducto    = document.querySelector('#btnGrabaProducto')//Captura de boton grabar
    let btnEliminaProducto  = document.querySelector('#btnEliminaProducto')//Captura de boton eliminar
    let btnCancelaProducto  = document.querySelector('#btnCancelaProducto')//Captura de boton cancelar
    let btnBuscarPieza      = document.querySelector('#btnBuscarPieza')
    let productoCodigo      = document.querySelector('#productoCodigo')
    let productoDescripcion = document.querySelector('#productoDescripcion')
    let productoCosto       = document.querySelector('#productoCosto')
    let productoMarca       = document.querySelector('#productoMarca')//Captura de boton cancelar
    let productoFamilia     = document.querySelector('#productoFamilia')//Captura de boton cancelar
    let productoSubirFoto   = document.querySelector('#productoSubirFoto')
    let productoImagen      = document.querySelector('#productoImagen')
    let btnDespieceProducto = document.querySelector('#btnDespieceProducto')
    let btnCloseModal       = document.querySelector('#btnCloseModal')
    let btnCerrarModal      = document.querySelector('#btnCerrarModal')
    let edit                = false//flag de edición de registro existente o nuevo registro
    let id                  = ''
    let arrayVal = {
        productoId          : {},
        productoCodigo      : {required: true, maxlength: 30, validated: true},
        productoMarca       : {required: true, validated: true, noCero: true},
        productoFamilia     : {required: true, validated: true, noCero: true},
        productoDescripcion : {required: true, maxlength: 100, validated: true},
        productoCosto       : {maxlength: 21, validated: true},
        productoMonoTri     : {required: true, validated: true},
        productoSubirFoto   : {maxlength: 100},
        productoActivo      : {validated: true},
        productoCanjeable   : {validated: true}
    }

    /* limitaCaracteres(productoCodigo, 30)
    limitaCaracteres(productoDescripcion, 100)
    limitaCaracteres(productoCosto, 10)
    cargaFamilias(productoFamilia)
    cargaMarcas(productoMarca)
    productoActivo.checked = true */
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
            {"data" : "marca"}
        ],
        processing: true,
        paging: true,
        bLengthChange: false,
        iDisplayLength: 10,
        bInfo: false,
        bAutoWidth: false,
        dom:
            "<'row'<'col-sm-12'f>>" +
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

    function limpieza(){
        cleanInputs(inputs)
        edit = false
        $(btnEliminaProducto).hide()
        id = ''
        productoImagen.src = '../../hdn/img/sinImagen.png'
    }

    function busquedaPorPieza(){
        return new Promise(function(resolve, reject) {    
            $('#modalDespiece').show()
            $('#bodyDespiece').empty()
            $('#titulo').text('Piezas')
    
            let template = ''
            template = `
                <div class="row">
                    <form id="formModalPiezas">
                        <div class="row g-3">
                            <div class="form-group col-sm-4">
                                <label for="marcaPiezaModal">Marca</label>
                                <select id="marcaPiezaModal" class="form-control"></select>
                            </div>
                            <div class="form-group col-sm-8">
                                <label for="buscadorModal">Buscador</label>
                                <input id="buscadorModal" type="text" class="form-control">
                            </div>
                            <div class="form-group col-sm-12 text-center">
                                <button id="btnBuscarPiezaModal" type="button" class="btn btn-primary">Buscar
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
                                    <th>Referencia</th>
                                    <th>Marca</th>
                                </thead>
                                <tbody id="modalBusquedaTabla"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `
            $('#bodyDespiece').html(template)

            resolve()
        })

    }

    function enviarParametrosModal(marca, buscador, idBodyTabla){
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/despieces/piezasModal_search.php?marca='+marca+'&buscador='+buscador)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                let template = ''
                respuesta.forEach(element => {
                    template += `
                        <tr>
                            <td><a class="pieza-item" href="${element.codigo}">${element.codigo}</td>
                            <td>${element.descripcion}</td>
                            <td>${element.referencia}</td>
                            <td>${element.marca}</td>
                        </tr>
                    `
                });

                idBodyTabla.innerHTML = template
            }
        })
    }

    btnBuscarPieza.addEventListener('click', e => {
        e.preventDefault()
        busquedaPorPieza().then(() => {
            let marcaPiezaModal         = document.querySelector('#marcaPiezaModal')
            let buscadorModal           = document.querySelector('#buscadorModal')
            let btnBuscarPiezaModal     = document.querySelector('#btnBuscarPiezaModal')
            let modalBusquedaTabla      = document.querySelector('#modalBusquedaTabla')

            cargaMarcas(marcaPiezaModal)

            let filtros = document.querySelectorAll('#marcaPiezaModal, #buscadorModal')
            filtros.forEach(element => {
                if(element.keyCode === 13){
                    btnBuscarPiezaModal.click()
                } 
            });

            btnBuscarPiezaModal.addEventListener('click', e => {
                e.preventDefault()
                enviarParametrosModal(marcaPiezaModal.value, buscadorModal.value, modalBusquedaTabla)
            })
        })
    })

    btnCerrarModal.addEventListener('click', e =>{
        e.preventDefault()
        $('#modalDespiece').hide()
    })

    btnCloseModal.addEventListener('click', e =>{
        e.preventDefault()
        $('#modalDespiece').hide()
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
        limpieza()
    })

})()