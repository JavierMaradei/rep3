(function iniciarProductos(){
    
    let formulario              = document.querySelector('#formProductos')//Captura del formulario
    let inputs                  = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData                = new FormData() //Creo el formData para transferencia de información con el Backend
    let btnImportador           = document.querySelector('#importadorProductos')
    let btnCerrarModal          = document.querySelector('#btnCerrarModal')
    let btnCloseModal           = document.querySelector('#btnCloseModal')
    let btnCerrarModal2         = document.querySelector('#btnCerrarModal2')
    let btnCloseModal2          = document.querySelector('#btnCloseModal2')
    let btnGrabaProductos       = document.querySelector('#btnGrabaProducto')//Captura de boton grabar
    let btnEliminaProductos     = document.querySelector('#btnEliminaProducto')//Captura de boton eliminar
    let btnCancelaProductos     = document.querySelector('#btnCancelaProducto')//Captura de boton cancelar
    let codigoProducto          = document.querySelector('#codigoProducto')//Captura el codigo del campo "Codigo Producto"
    let productosSinSinonimo    = document.querySelector('#productosSinSinonimo')
    let productosActivos        = document.querySelector('#productosActivos')
    let activoProducto          = document.querySelector('#activoProducto')
    let edit                    = false//flag de edición de registro existente o nuevo registro
    let id                      = ''
    let btnStockAdonix          = document.querySelector('#btnStockAdonix')
    let sinonimo                = document.querySelector('#codigoSinonimoProducto')
    let tbodystockAdonix        = document.querySelector('#tbodystockAdonix')
    let nroDeSerieProducto      = document.querySelector('#nroDeSerieProducto')
    let dificultadProducto      = document.querySelector('#dificultadProducto')
    let costoProducto           = document.querySelector('#costoProducto')
    let gamaProducto            = document.querySelector('#gamaProducto')
    let valorCookie             = leerCookie('modulo')
    let arrayVal                = {
        idProducto                  :{},
        codigoProducto              :{validated: true, required: true,  maxlength: 30},
        descripcionProducto         :{required: true, maxlength: 100, validated: true},
        dificultadProducto          :{maxlength: 9, validated: 'numeric'},
        costoProducto               :{validated: true, maxlength: 21},
        grupoProducto               :{validated: 'numeric', maxlength: 9},
        tipoProducto                :{validated: 'numeric',  maxlength: 9},            
        fichaProducto               :{validated: 'numeric', maxlength: 9},
        monofasica                  :{validated: true},
        trifasica                   :{validated: true},
        nroDeSerieProducto          :{validated: 'numeric', maxlength: 10},
        gamaProducto                :{maxlength: 2, validated: 'numeric'},
        cargoReducidoProducto       :{validated: true},
        mediaUnionProducto          :{validated: true},
        activoProducto              :{validated: true},
        codigoSinonimoProducto      :{validated: 'codigo', maxlength: 30, required: true},
        descripcionSinonimoProducto :{validated: true, maxlength: 100, required: true},
        canjeableProducto           :{validated: true}     
    }

    soloNumeros(nroDeSerieProducto)
    soloNumeros(dificultadProducto)
    soloNumeros(costoProducto)
    soloNumeros(gamaProducto)

    function prodSinSinonimoCount(){
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/productos/buscarProductosSinSinonimos.php')
        xhr.send()
        xhr.addEventListener('load', () =>{
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                if(parseInt(respuesta.prodSinSinonimos) > 0){
                    swal({
                        html    : true,
                        title   : "Atención!!!",
                        text    : `Se registra <b>${respuesta.prodSinSinonimos}</b> equipo/s sin sinónimo/s`,
                        type    : "warning",
                    });
                }
            }
        })
    }

    valorCookie == '33' ? $('#btnStockAdonix').hide() : $('#btnStockAdonix').show()

    setTimeout(() => {
        prodSinSinonimoCount()
    }, 500);

    btnStockAdonix.addEventListener('click', e => {
        e.preventDefault()
        stockAdonix(tbodystockAdonix, codigoProducto.value, sinonimo.value)
        $('#modal_stockAdonix').show()
    })
        
    $(btnEliminaProductos).hide() //Oculto el botón eliminar hasta que no se selecciona algún elemento de la tabla

    perfilUsuario().then((resolve) => {
        let perfil = resolve[0].perfil_id

        if(perfil == 1 || perfil == 13){
            $('#importadorProductos').show() 
        } else {
            $('#importadorProductos').hide() 
        }
    })
    //Declaración del complemento DataTable
    let tabla = $('#tabla_productos').DataTable( {
        "ajax": {
            url: 'mod_sirep/admin/tablas/productos/productos_list.php',
            type: 'GET',
            dataSrc: "",
            //Envío de parámetros Ajax datatable.
            data: function(d){
                d.prodSinSinonimo   = productosSinSinonimo.checked;
                d.prodActivos       = productosActivos.checked;
            }
        },
        "order": [[6,'asc'],[2,'asc']],
        "columns": [  
            {"data" : "PRODUCTO_ID",
            "render": function ( data, type, row, meta ) {
                return '<a class="task-item" href="'+data+'">' + data + '</a>';
                }, 
            },
            {"data" : "CODIGO"},
            {"data" : "DESCRIPCION"},
            {"data" : "NROSERIE"},
            {"data" : "DIFICULTAD"},
            {"data" : "COSTO_ESTIMADO"},   
            {"data" : "ACTIVO"},
            {"data" : "descTipoProducto"}, 
            {"data" : "descGrupo"}  
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
            {extend: 'excel', title: 'Lista de productos', text: 'Exportar a Excel'},
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

    //tabla.search('Activo').draw()

    productosSinSinonimo.addEventListener('change', e => {
        if(productosSinSinonimo.checked == true){
            tabla.ajax.reload();
        } else {
            tabla.ajax.reload();             
        }
    })

    productosActivos.addEventListener('change', e => {
        if(productosActivos.checked == true){
            tabla.ajax.reload();
        } else {
            tabla.ajax.reload();             
        }
    })
    
    //Tomo el link de la tabla con el ID del registro
    $(document).on('click', '.task-item', (e) => {
        e.preventDefault()
        cleanInputs(inputs)
        id      = e.target.innerText
        url     = 'mod_sirep/admin/tablas/productos/productos_single.php'
        showData(id, url, inputs)
        $(btnEliminaProductos).show()
        btnStockAdonix.disabled = false
        edit    = true
    })

    //Funcionalidad del boton Importador de números de serie de productos en garantía
    btnImportador.addEventListener('click', e => {
        e.preventDefault()
        $('#modal_productos').show()
    })

    btnCerrarModal.addEventListener('click', e => {
        e.preventDefault()
        $('#modal_productos').hide()
    })

    btnCloseModal.addEventListener('click', e => {
        e.preventDefault()
        $('#modal_productos').hide()
    })

    btnCerrarModal2.addEventListener('click', e => {
        e.preventDefault()
        $('#modal_stockAdonix').hide()
    })

    btnCloseModal2.addEventListener('click', e => {
        e.preventDefault()
        $('#modal_stockAdonix').hide()
    })

    //Funcionalidad del botón de Grabar
    btnGrabaProductos.addEventListener('click', e => {
        e.preventDefault()
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/productos/buscarProductoRepetido.php?codigo='+codigoProducto.value)
        xhr.send()
        xhr.addEventListener('load', () =>{
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                //console.log(respuesta)
                if(respuesta != '' && edit == false){
                    alert ('Código ya existente')
                } else {
                    let validacion = validateData(inputs, arrayVal)
                    if(validacion){
                        collectData(inputs, formData)
                        let agregar = 'mod_sirep/admin/tablas/productos/productos_add.php'
                        let editar  = 'mod_sirep/admin/tablas/productos/productos_edit.php'
                        let estado  = enviarData(agregar, editar, formData, edit, id)
                        estado.then((respuesta) => {
                            switch (respuesta.estado) {
                                case 'Transacción exitosa':
                                    msgTransaccionExitosa()
                                    tabla.ajax.reload();
                                    $(btnEliminaProductos).hide()
                                    cleanInputs(inputs)
                                    cleanFormData(inputs, formData)
                                    activoProducto.checked  = true
                                    btnStockAdonix.disabled = true
                                    id                      = ''
                                    edit                    = false
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
                }
            }
        })

    })
    
    //Funcionalidad del botón de Eliminar
    btnEliminaProductos.addEventListener('click', e => {
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
                let url = 'mod_sirep/admin/tablas/productos/productos_delete.php'
                xhr.open('GET', url+'?id='+id)
                xhr.send()
                xhr.addEventListener('load', () => {
                    if(xhr.status == 200){
                        let respuesta = JSON.parse(xhr.response)
                        switch (respuesta.estado) {
                            case 'Transacción exitosa':
                                msgEliminado()
                                tabla.ajax.reload();
                                $(btnEliminaProductos).hide()
                                cleanInputs(inputs)
                                cleanFormData(inputs, formData)
                                activoProducto.checked  = true
                                btnStockAdonix.disabled = true
                                id                      = ''
                                edit                    = false
                                break;
                            case 'Sesión expirada':
                                sesionExpiradaMensajeFlotante()
                                break;
                            case 'Error perfil':
                                msgErrorPerfil()
                                cleanFormData(inputs, formData)
                                break;
                            case 'En uso':
                                msgEnUso()
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
    btnCancelaProductos.addEventListener('click', e => {
        e.preventDefault()
        cleanInputs(inputs)
        activoProducto.checked  = true
        btnStockAdonix.disabled = true
        edit                    = false
        id                      = ''
        $(btnEliminaProductos).hide()
    })

    //Cargo el select de Grupos
    let xhr = new XMLHttpRequest
    xhr.open('GET', 'mod_sirep/admin/tablas/grupos/grupos_list.php')
    xhr.send()
    xhr.addEventListener('load', () => {
        if(xhr.status == 200){
            let respuesta = JSON.parse(xhr.response)
            let option = ''
            respuesta.forEach(element => {
                option += `<option value= ${element.GRUPO_ID}>${element.DESCRIPCION}</option>`
            });
            let select = document.querySelector('#grupoProducto')
            select.innerHTML = option
        }
    })

    //Cargo el select de Tipos de Productos
    let xhr2 = new XMLHttpRequest
    xhr2.open('GET', 'mod_sirep/admin/tablas/tiposProducto/tiposProducto_list.php')
    xhr2.send()
    xhr2.addEventListener('load', () => {
        if(xhr2.status == 200){
            let respuesta2 = JSON.parse(xhr2.response)
            let option2 = ''
            respuesta2.forEach(element2 => {
                option2 += `<option value= ${element2.tipo_id}>${element2.descripcion}</option>`
            });
            let select2 = document.querySelector('#tipoProducto')
            select2.innerHTML = option2
        }
    })

    //Cargo el select de Modelos Ficha
    let xhr3 = new XMLHttpRequest
    xhr3.open('GET', 'mod_sirep/admin/tablas/productos/modeloFicha_list.php')
    xhr3.send()
    xhr3.addEventListener('load', () => {
        if(xhr3.status == 200){
            let respuesta3 = JSON.parse(xhr3.response)
            let option3 = ''
            respuesta3.forEach(element => {
                option3 += `<option value= ${element.MODELO_ID}>${element.NOMBRE}</option>`
            });
            let select3 = document.querySelector('#fichaProducto')
            select3.innerHTML = option3
        }
    })
})()