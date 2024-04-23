(() => {
    let formulario              = document.querySelector('#formDespiece')//Captura del formulario
    let inputs                  = formulario.querySelectorAll('input,textarea,select')//Captura los inputs del formulario
    let formData                = new FormData() //Creo el formData para transferencia de información con el Backend
    let btnGrabaDespiece        = document.querySelector('#btnGrabaDespiece')//Captura de boton grabar
    let btnCancelaDespiece      = document.querySelector('#btnCancelaDespiece')//Captura de boton cancelar
    let btnVerDespieceProducto  = document.querySelector('#btnVerDespieceProducto')//Captura de boton grabar
    let btnBuscarPieza          = document.querySelector('#btnBuscarPieza')
    let productoCodigo          = document.querySelector('#productoCodigo')
    let productoDescripcion     = document.querySelector('#productoDescripcion')
    let productoCosto           = document.querySelector('#productoCosto')
    let productoMarca           = document.querySelector('#productoMarca')//Captura de boton cancelar
    let productoFamilia         = document.querySelector('#productoFamilia')//Captura de boton cancelar
    let productoSubirFoto       = document.querySelector('#productoSubirFoto')
    let productoImagen          = document.querySelector('#productoImagen')
    let btnDespieceProducto     = document.querySelector('#btnDespieceProducto')
    let btnCloseModal           = document.querySelector('#btnCloseModal')
    let btnCerrarModal          = document.querySelector('#btnCerrarModal')
    let btnAgregarPiezasModal   = document.querySelector('#btnAgregarPiezasModal')
    let edit                    = false//flag de edición de registro existente o nuevo registro
    let id                      = ''
    let bodyTablaModalPiezas    = ''
    let tablaModalPiezas        = ''
    let listaPieza              = [];
    let listaPiezaDuplicada     = [];
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

    btnGrabaDespiece.disabled   = true
    btnBuscarPieza.disabled     = true

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

    let tablaPiezas = $('#tabla_piezas').DataTable( {
        columnDefs: [
            {
                "targets": 5,
                "render": function ( data, type, row, meta ) {
                    return '<a class="icon-delete" href="'+data+'"><i class="fa fa-trash fa-2x"></i></a>';
                },
            }
        ],
        order: [[3,'asc']],
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
            {extend: 'excel', title: 'Lista de piezas', text: 'Exportar a Excel'}  
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

    function recargaTabla(productoId){
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/despieces/piezasRelProductos_search.php?productoId='+productoId)//Envío la información del filtro
        xhr.send()

        xhr.addEventListener('load', () => { //Cuando me vuelven los datos de la query armo la tabla
            tablaPiezas.clear() // Primero la vacío de registros preexistentes
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                respuesta.forEach(element => {
                    tablaPiezas.row.add([ //Agrego las nuevas filas
                        element.pieza_id,
                        element.piezaCodigo,
                        element.piezaDescripcion,
                        element.piezaReferencia,
                        element.marcaDescripcion,
                        element.pieza_producto_id
                    ])
                });
                tablaPiezas.draw() //Imprimo la tabla en pantalla
            }
        })
    }

    function limpieza(){
        cleanInputs(inputs)
        edit = false
        id = ''
        btnVerDespieceProducto.disabled = true
        btnVerDespieceProducto.hidden   = true
        productoImagen.src = '../../hdn/img/sinImagen.png'
        tablaPiezas.clear().draw()
        formData.delete('detalleProductoDespiece')
        formData.delete('productoId')
        btnGrabaDespiece.disabled   = true
        btnBuscarPieza.disabled     = true
    }

    function busquedaPorPieza(){
        return new Promise(function(resolve, reject) {    
            $('#modalDespiece').show()
            $('#bodyDespiece').empty()
            $('#titulo').text('Piezas')
    
            let template = ''
            template = `
                <div class="row">
                    <div class="row g-3">
                        <div class="form-group col-sm-2">
                        </div>
                        <div class="form-group col-sm-8">
                            <label for="marcaPiezaModal">Marca</label>
                            <select id="marcaPiezaModal" class="form-control"></select>
                        </div>
                        <div class="form-group col-sm-2">
                        </div>
                        <div class="form-group col-sm-12 text-center mb-4">
                            <button id="btnBuscarPiezaModal" type="button" class="btn btn-primary">Buscar
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="row">
                        <div class="table-responsive-sm">
                            <table class="table table-striped table-hover table-sm" id="tablaModalPiezas">
                                <thead>
                                    <th>Selección</th>
                                    <th>Código</th>
                                    <th>Descripción</th>
                                    <th>Referencia</th>
                                    <th>Marca</th>
                                </thead>
                                <tbody id="bodyTablaModalPiezas"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `
            $('#bodyDespiece').html(template)

            resolve()
        })

    }

    function enviarParametrosModal(marca, tablaModalPiezas){
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/despieces/piezasModal_search.php?marca='+marca)
        xhr.send()
        xhr.addEventListener('load', () => {
            tablaModalPiezas.clear().draw() // Primero la vacío de registros preexistentes
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                let checks = `<input type="checkbox" class="checkPieza">`
                respuesta.forEach(element => {
                    tablaModalPiezas.row.add([
                        checks,
                        element.codigo,
                        element.descripcion,
                        element.referencia,
                        element.marca
                    ])
                });

                tablaModalPiezas.draw()
            }
        })
    }

    function habilitarBtnGrabar(){
        setTimeout(() => {
            if(tablaPiezas.rows().count() > 0){
                btnGrabaDespiece.disabled = false
            } else {
                btnGrabaDespiece.disabled = true
            } 
        }, 200);
    }

    $('#tabla_piezas').on( 'click', '.icon-delete', e => {
        e.preventDefault()
        let fila = e.target.parentNode.parentNode.parentNode
        tablaPiezas.row(fila).remove().draw()
        habilitarBtnGrabar()
    } );

/*     $(document).on( 'click', '.pieza-item', e => {
        e.preventDefault()
        let seleccion = e.target.innerText
        listaPieza.push(seleccion)

        let stateSeleccion = false
        //validar si ya existe ese código en el despiece
        tablaPiezas.rows().data().each(function (value) {
            let codigo = value[1];
            
            if(codigo == seleccion){
                stateSeleccion = true
            }
        });
        
        if(stateSeleccion == false){
            $('#modalDespiece').hide()

            listaPieza = JSON.stringify(listaPieza)

            let xhr = new XMLHttpRequest
            xhr.open('GET', 'mod_repa/tablas/piezas/piezas_search.php?code='+listaPieza)//Envío la información del filtro
            xhr.send()
    
            xhr.addEventListener('load', () => { //Cuando me vuelven los datos de la query armo la tabla
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)

                    tablaPiezas.row.add([ //Agrego las nuevas filas
                        respuesta.pieza_id,
                        respuesta.codigo,
                        respuesta.descripcion,
                        respuesta.referencia,
                        respuesta.marca,
                        respuesta.pieza_id
                    ])

                    tablaPiezas.draw() //Imprimo la tabla en pantalla
                }
            })
            habilitarBtnGrabar()
        } else {
            alert('Código existente')
        } 
    } ); */

    btnAgregarPiezasModal.addEventListener('click', e =>{
        e.preventDefault()

        let stateSeleccion  = false
        listaPieza          = [];
        listaPiezaDuplicada = [];
        let data            = tablaModalPiezas.rows().nodes();

        data.each(function (value, index) {

            let codigoPieza = value.cells[1].innerText;
            let check       = value.cells[0].children[0].checked;

            if (check){
                listaPieza.push(codigoPieza)
            }            
        }); 

        tablaPiezas.rows().data().each(function (value) {
            let codigo = value[1];

            listaPieza.forEach(element => {
                if(codigo == element){
                    stateSeleccion = true
                    listaPiezaDuplicada.push(codigo)
                }
            }); 
        });

        if(stateSeleccion == false){
            $('#modalDespiece').hide()

            listaPieza = JSON.stringify(listaPieza)

            let xhr = new XMLHttpRequest
            xhr.open('GET', 'mod_repa/tablas/piezas/piezas_search.php?code='+listaPieza)//Envío la información del filtro
            xhr.send()
    
            xhr.addEventListener('load', () => { //Cuando me vuelven los datos de la query armo la tabla
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    respuesta.forEach(element => {
                        tablaPiezas.row.add([ //Agrego las nuevas filas
                            element.pieza_id,
                            element.codigo,
                            element.descripcion,
                            element.referencia,
                            element.marca,
                            element.pieza_id
                        ])
                    });
                    tablaPiezas.draw() //Imprimo la tabla en pantalla 
                }
            })
            habilitarBtnGrabar()
        } else {
            let piezasDuplicadasmsj = JSON.stringify(listaPiezaDuplicada)

            swal('Atención', `Codigo/s duplicado/s: ${piezasDuplicadasmsj}`, 'warning')
        }
    })

    btnBuscarPieza.addEventListener('click', e => {
        e.preventDefault()
        bodyTablaModalPiezas    = ''
        listaPieza              = [];

        btnAgregarPiezasModal.disabled = true
        busquedaPorPieza().then(() => {
            let marcaPiezaModal         = document.querySelector('#marcaPiezaModal')
            let btnBuscarPiezaModal     = document.querySelector('#btnBuscarPiezaModal')
            bodyTablaModalPiezas        = document.querySelector('#bodyTablaModalPiezas')

            tablaModalPiezas = $('#tablaModalPiezas').DataTable( {
                order: [[2,'asc']],
                processing: true,
                paging: true,
                bLengthChange: true,
                iDisplayLength: 10,
                bAutoWidth: false,
                /* buttons: [
                    {extend: 'excel', title: 'Lista de piezas', text: 'Exportar a Excel'}  
                ], */
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

            $(document).on( 'click', '.checkPieza', e => {
                let contador    = 0
                
                $(tablaModalPiezas.$('input[type="checkbox"]:checked').each(function () {
                    contador = ++contador
                 }));
        
                if(contador > 0){
                    btnAgregarPiezasModal.disabled = false
                } else {
                    btnAgregarPiezasModal.disabled = true
                }
            } );

            cargaMarcas(marcaPiezaModal)

            btnBuscarPiezaModal.addEventListener('click', e => {
                e.preventDefault()
                enviarParametrosModal(marcaPiezaModal.value, tablaModalPiezas)
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
        btnGrabaDespiece.disabled   = true
        btnBuscarPieza.disabled     = false
        cleanInputs(inputs)
        id= e.target.innerText
        url = 'mod_repa/tablas/productos/productos_single.php'
        showDataReloaded(id, url, inputs).then((r) => {
            if(r.productoImagen != ''){
                productoImagen.src = `mod_repa/tablas/productos/adjuntos/${r.productoImagen}`
            } else {
                productoImagen.src = '../../hdn/img/sinImagen.png'
            }
            if(r.productoImagenDespiece != ''){
                btnVerDespieceProducto.hidden   = false
                btnVerDespieceProducto.disabled = false
            } else {
                btnVerDespieceProducto.hidden   = true
                btnVerDespieceProducto.disabled = true
            }    
        })
        recargaTabla(id)
        edit = true
    })

    btnVerDespieceProducto.addEventListener('click', e =>{
        e.preventDefault()
        $('#modalDespiece').show()
        $('#bodyDespiece').empty()
        $('#titulo').text('Despiece del producto')

        let template = ''
        template = `
                    <div class="col-sm-12 text-center dataBasica">
                        <img id="productoDespiece" src="../../hdn/img/sinImagen.png" alt="Despiece Producto" class="imagen-escalada">
                    </div>
                `
        url = 'mod_repa/tablas/productos/productos_single.php'
        showDataReloaded(id, url, inputs).then((r) => {
            if(r.productoImagenDespiece != ''){
                productoDespiece.src = `mod_repa/tablas/productos/adjuntos/${r.productoImagenDespiece}`
            } else {
                productoDespiece.src = '../../hdn/img/sinImagen.png'
            }
        })

        $('#bodyDespiece').html(template)

    })

    //Funcionalidad del botón de Grabar
    btnGrabaDespiece.addEventListener('click', e => {
        e.preventDefault()

        swal({
            title               : "Confirma la grabación?",
            type                : "warning",
            showCancelButton    : true,
            confirmButtonColor  : "#DD6B55",
            confirmButtonText   : "Si, confirmar!",
            cancelButtonText    : "No, Cancelar!",
            closeOnConfirm      : false,
            closeOnCancel       : false
            },
            function (isConfirm) {
                if (isConfirm) {

                    let arrayProductoDespiece = {}
                    tablaPiezas.rows().data().each(function (value, index ) {
                        arrayProductoDespiece[index] = {
                            'idPieza'       : value[0],
                            'idProducto'    : id
                        }
                    });
            
                    let datosProductoDespiece = JSON.stringify(arrayProductoDespiece)

                    formData.append('detalleProductoDespiece', datosProductoDespiece)
                    formData.append('productoId', id)
            
                    let xhr = new XMLHttpRequest
                    xhr.open('POST', 'mod_repa/tablas/despieces/despieces_add.php')//Envío la información del formulario
                    xhr.send(formData)
                    xhr.addEventListener('load', ()=> {
                        if (xhr.status == 200){
                            let respuesta = JSON.parse(xhr.response)
                            switch (respuesta.estado) {
                                case 'Transacción exitosa':
                                    msgTransaccionExitosa()
                                    limpieza()
                                    break;
                                case 'Sesión expirada':
                                    sesionExpiradaMensajeFlotante()
                                    break;
                                case 'Error perfil':
                                    msgErrorPerfil()
                                    limpieza()
                                    break;
                                default:
                                    msgAlgoNoFueBien()
                                    limpieza()
                                    break;
                            }
                        }
                    })

                } else {
                    msgCancelado()
                }
            }
        )
    })
        
    //Funcionalidad del botón de Cancelar
    btnCancelaDespiece.addEventListener('click', e => {
        e.preventDefault()
        limpieza()
    })

})()