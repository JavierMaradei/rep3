//---------------------LIBRERÍA DE FUNCIONES JS---------------------//

//Se define constante para determinar la cantidad de caractéres del campo Código.
const CODIGO_LENGTH = 12;

/**
 * Mostrar datos del ID seleccionado. Esta función se utiliza para mostrar la data de los campos en los ABM.
 * @param {string} id
 * @param {string} ruta
 * @param {array} entradas
 * @version 1.0
 */
 function showData(id, ruta, entradas){
    let xhr = new XMLHttpRequest
    xhr.open('GET', ruta+'?id='+id)
    xhr.send()
    xhr.addEventListener('load', () => {
        if(xhr.status == 200){
            let respuesta = JSON.parse(xhr.response)
            if (Object.entries(respuesta).length === 0) {
                edit = false
                cleanInputs(entradas)
            } else {
                edit = true
                respuesta = respuesta[0]
                for (let [key, value] of Object.entries(respuesta)) {
                    if(value != null){//Algunos datos vienen en null y tira error al hacer el matcheo
                        if(value.match(/([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))/)){
                            //SI el formato del valor de respesta cumple esta condicion yyyy/mm/dd entro acá
                            let date = value.replace('/','-')
                            date = date.replace('/','-')
                            $('#'+key).val(date)
                        } else {//sino caigo al switch
                            switch (value) {
                                case 'S':
                                    $('#'+key).prop("checked", true)
                                    break;
                                case 'N':
                                    $('#'+key).prop("checked", false)
                                    break;
                                default:
                                    $('#'+key).val(value)
                                    break;
                            }
                        }
                    }
                }
            }
        }
    })
}

/**
 * Mostrar datos del ID seleccionado. Esta función se utiliza para mostrar la data de los campos en los ABM.
 * @param {string} id
 * @param {string} ruta
 * @param {array} entradas
 * @version 2.0 de showdata
 */
 function showDataReloaded(id, ruta, entradas){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', ruta+'?id='+id)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                if (Object.entries(respuesta).length === 0) {
                    edit = false
                    cleanInputs(entradas)
                } else {
                    edit = true
                    respuesta = respuesta[0]
                    resolve(respuesta)
                    for (let [key, value] of Object.entries(respuesta)) {
                        if(value != null){//Algunos datos vienen en null y tira error al hacer el matcheo
                            if(value.match(/([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))/)){
                                //SI el formato del valor de respesta cumple esta condicion yyyy/mm/dd entro acá
                                let date = value.replace('/','-')
                                date = date.replace('/','-')
                                $('#'+key).val(date)
                            } else {//sino caigo al switch
                                switch (value) {
                                    case 'S':
                                        $('#'+key).prop("checked", true)
                                        break;
                                    case 'N':
                                        $('#'+key).prop("checked", false)
                                        break;
                                    default:
                                        $('#'+key).val(value)
                                        break;
                                }
                            }
                        }
                    }
                }
            }
        })
    })
}

/**
 * Limpiar inputs
 * @param {array} entradas
 * @version 1.0
 */
function cleanInputs(entradas){
    entradas.forEach(input => {
        if(input.type == "radio" || input.type == "checkbox"){
            input.checked = false
        } else {
            input.value = ''
        }
    })
    let p = document.querySelectorAll('.validacion')//Limpio los mensajes de error
    p.forEach(mensaje => {
        mensaje.remove()
    })
}

/**
 * Recolección de datos de Formulario
 * @param {Array} entradas
 * @returns {array}
 * @version 1.0
 */
function collectData(entradas, formData) {
    entradas.forEach(input => {
        if(input.type == "radio" || input.type == "checkbox"){
            formData.append(`${input.id}`, input.checked)
        } else {
            let valor = input.value.trim()
            formData.append(`${input.id}`, valor)
        }
    })
    return formData
}

/**
 * Envía datos del Formulario
 * @param {string} agregar
 * @param {string} editar
 * @param {array} data
 * @param {boolean} valorEdit
 * @param {id} id //id para editar un registro
 * @version 1.0
 */
function sendData(agregar, editar, data, valorEdit, id){
    let xhr = new XMLHttpRequest
    let url = valorEdit == false ? agregar : editar+'?id='+id
    xhr.open('POST', url, false)
    xhr.send(data)
    return xhr.status
}

/**
 * Envía datos del Formulario
 * @param {string} agregar
 * @param {string} editar
 * @param {array} data
 * @param {boolean} valorEdit
 * @param {id} id //id para editar un registro
 * @version 1.0
 */
function enviarData(agregar, editar, data, valorEdit, id){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        let url = valorEdit == false ? agregar : editar+'?id='+id
        xhr.open('POST', url)
        xhr.send(data)
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
            } else {
                reject()
            }
        })
    })
}


/**
 * Limpio FormData
 * @param {array} entradas
 * @param {string} formData
 * @version 1.0
 */
function cleanFormData(entradas, formData){
    entradas.forEach(input => {
        formData.delete(input.id)
    })
}

/**
 * Validar datos
 * Toma dos parámetros: Entradas, array con los inputs. Validacion, donde se definen los puntos a validar.
 * El formato de array de validacion es array={idDelInput:{propiedad:valor}}
 * @param {array} entradas
 * @param {array} validacion
 * @return {boolean}
 * @version 1.0
 */
function validateData(entradas, validacion){
    let respuesta = []
    let contador = 0

    let p = document.querySelectorAll('.validacion')//Limpio los mensajes de error previos
    p.forEach(mensaje => {
        mensaje.remove()
    })
    entradas.forEach(input => {
        let campo = document.querySelector('#'+input.id)
        let id = input.id
        let valor = input.value.trim()

        for (let [key, value] of Object.entries(validacion[id])){
            switch (key) {
                case 'validated':
                    switch (value) {
                        case 'email':
                            if(valor.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) || valor == ''){
                                respuesta.push(true)
                                //console.log("Validated email: "+respuesta)
                            } else {
                                respuesta.push(false)
                                //console.log("Validated email: "+respuesta)
                                let respRequired = document.createElement('p')
                                respRequired.className = "validacion"
                                respRequired.innerText = "El correo que cargaste no tiene un formato correcto"
                                campo.after(respRequired)
                            }
                            break;
                        case 'fecha':
                            if(valor.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/g) || (valor == '')){
                                respuesta.push(true)
                                //console.log("Validé el campo")
                            } else {
                                respuesta.push(false)
                                //console.log("No validé el campo")
                                if(valor.length > 0){
                                    let respValidated = document.createElement('p')
                                    respValidated.className = "validacion"
                                    respValidated.innerText = "Este campo no corresponde con un formato de fecha válido"
                                    campo.after(respValidated)
                                }
                            }
                            break;
                        case 'codigo':
                            if(valor.match(/^([0-9]{4}-[0-9]{4})$/g) || (valor == '')){
                                respuesta.push(true)
                                //console.log("Validé el campo")
                            } else {
                                respuesta.push(false)
                                //console.log("No validé el campo")
                                if(valor.length > 0){
                                    let respValidated = document.createElement('p')
                                    respValidated.className = "validacion"
                                    respValidated.innerText = "Este campo no corresponde con un formato de código válido"
                                    campo.after(respValidated)
                                }
                            }
                            break;
                        case 'numeric':
                            if(valor.match(/^[0-9]+$/g) || valor == ''){
                                respuesta.push(true)
                                //console.log("Validated email: "+respuesta)
                            } else {
                                respuesta.push(false)
                                //console.log("Validated email: "+respuesta)
                                let respRequired = document.createElement('p')
                                respRequired.className = "validacion"
                                respRequired.innerText = "El campo solo admite números"
                                campo.after(respRequired)
                            }
                            break;
                        default:
                            if(value == true){
                                if(valor.match(/^[A-Z@a-zÀ-ÿ0-9_\s\.\+\-\/\(\)\ñ\Ñ\,\&\:\º\#\;\*]+$/g) || (valor == '')){
                                    respuesta.push(true)
                                    //console.log("Validé el campo")
                                } else {
                                    respuesta.push(false)
                                    //console.log("No validé el campo")
                                    if(valor.length > 0){
                                        let respValidated = document.createElement('p')
                                        respValidated.className = "validacion"
                                        respValidated.innerText = `Este campo no admite caracteres especiales, Caracteres bloqueantes: ¿,?,$,[,],%,',"`
                                        campo.after(respValidated)
                                    }
                                }
                            } else {
                                respuesta.push(true)
                            }
                            break;
                    }
                    break;
                case 'required':
                    if(value == true){
                        if(valor.length != 0){
                            respuesta.push(true)
                            //console.log("Required: "+respuesta)
                        } else {
                            respuesta.push(false)
                            //console.log("Required: "+respuesta)
                            let respRequired = document.createElement('p')
                            respRequired.className = "validacion"
                            respRequired.innerText = "Necesitamos algo mas de información"
                            campo.after(respRequired)
                        }
                    }
                    break;
                case 'readonly':
                    if(input.attributes.readonly){
                        respuesta.push(true)
                        //console.log("Readonly: "+respuesta)
                    } else {
                        respuesta.push(false)
                        //console.log("Readonly: "+respuesta)
                        let respReadonly = document.createElement('p')
                        respReadonly.className = "validacion"
                        respReadonly.innerText = "Sabemos lo que estás intentado hacer"
                        campo.after(respReadonly)
                    }
                    break;
                case 'maxlength':
                    if(valor.length <= value){
                        respuesta.push(true)
                        //console.log("Maxlength: "+respuesta)
                    } else {
                        respuesta.push("Maxlength: "+false)
                        //console.log(respuesta)
                        let respMaxlength = document.createElement('p')
                        respMaxlength.className = "validacion"
                        respMaxlength.innerText = "Superaste el máximo de "+value+" caracteres"
                        campo.after(respMaxlength)
                    }
                    break;
                case 'noCero':
                    if(value == true){
                        if(valor != '0'){
                            respuesta.push(true)
                            //console.log("Maxlength: "+respuesta)
                        } else {
                            respuesta.push("Cero: "+false)
                            //console.log(respuesta)
                            let respCero = document.createElement('p')
                            respCero.className = "validacion"
                            respCero.innerText = "Necesitamos algo mas de información"
                            campo.after(respCero)
                        }
                    }
                    break;
                default:
                    respuesta.push(true)
                    break;
            }
        }
    })

    respuesta.forEach(verif => {
        if(verif == true){
            contador++
        }
    })
    if(respuesta.length == contador){
        return true
    } else {
        alert("Verificá los campos requeridos :(")
        return false
    }
}

/**
 * Verifica si el equipo buscado está catalogado como conflictivo, la busqueda se realiza por nro de serie y por id de producto
 * @param {string} codigo
 * @param {string} nroSerie
 * @return {boolean}
 * @version 1.0
 */
function equipoConflictivo(codigo, nroSerie){
    let cod = codigo
    let nroSerieId = nroSerie

    let xhr = new XMLHttpRequest
    xhr.open('GET', 'mod_sirep/busquedas/equipoConflictivo_search.php?codigo='+cod+'&nroSerie='+nroSerieId, false)
    xhr.send()
    let respuesta = JSON.parse(xhr.response)
    if(respuesta.length == 0){
        return false
    } else {
        return true
    }
}

/**
 * Busca las reparaciones previas del equipo
 * @param {string} codigo
 * @param {string} nroSerie
 * @return {object}
 * @version 1.0
 */
function equipoReincidencias(codigo, nroSerie){
    let cod = codigo
    let nro = nroSerie
    let xhr = new XMLHttpRequest
    xhr.open('GET', 'mod_sirep/busquedas/equipoReincidencias_search.php?codigo='+cod+'&nroSerie='+nro, false)
    xhr.send()
    return JSON.parse(xhr.response)
}

/**
 * Completa el valor de un campo con el string indicado como parámetro
 * @param {string} string
 * @param {string} campo
 */
function completeInput(string, campo){
    return (campo.innerHTML = string)
}

/**
 * Busca si el producto tiene faltante de repuestos
 * @param {string} codigoProducto
 */
function productoSinRepuestos(codigoProducto){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/buscadorProductosSinRepuestos.php?codigo='+codigoProducto)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga la plantilla de Detalle Ficha requerida, dependiendo del modelo de equipo seleccionado
 * @param {string} orden
 * @param {bool} lectura
 */
function cargaPlantillaFicha(orden, lectura = false){
    return new Promise(function(resolve, reject) {
        function soloLecturaFicha(){
            if(lectura){
                let formFichaDetalleReparacion = document.querySelector('#formFichaDetalleReparacion')
                let inputsPanelDetalle = formFichaDetalleReparacion.querySelectorAll('input,textarea,select')
                inputsPanelDetalle.forEach(element => {
                    if(element.type == "radio" || element.type == "checkbox" || element.type == "select-one"){
                        element.disabled = true
                    } else {
                        element.readOnly = true
                    }
                })
            }
        }
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/procesos/diagnostico/info_search.php?id='+orden)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                if(respuesta.length > 0){
                    let grupo = respuesta[0].grupo_id
                    $('#enviarFicha').val(grupo)
                    switch (grupo) {
                        case '1':
                            $('#fd').load('mod_sirep/fichas/modal_ficha_electrobombas.php', () => {
                                soloLecturaFicha()
                            })
                            break;
                        case '2':
                            $('#fd').load('mod_sirep/fichas/modal_ficha_sfl.php', () => {
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
                                soloLecturaFicha()
                            })
                            break;
                        case '3':
                            $('#fd').load('mod_sirep/fichas/modal_ficha_press.php', () => {
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
                                soloLecturaFicha()
                            })
                            break;
                        case '4':
                            $('#fd').load('mod_sirep/fichas/modal_ficha_gpr.php', () => {
                                soloLecturaFicha()
                            })
                            break;
                        case '5':
                            $('#fd').load('mod_sirep/fichas/modal_ficha_control_automatico.php', () => {
                                soloLecturaFicha()
                            })
                            break;
                        default:
                            $('#fd').text('No hay registros de este grupo de equipos', () => {
                                soloLecturaFicha()
                            })
                            break;
                    }
                }
                resolve(respuesta[0])
            }
        })
    })
}

/**
 * Carga los valores de la solapa 1 del detalle de la ficha (Ventana desplegable lateral)
 * @param {string} numero
 */
function datosFichaSolapa1(numero){
    return new Promise(function(resolve, reject) {

        let equipoRecuperar = document.querySelector('#equipoRecuperar')

        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/buscar/generica/reparaciones_single.php?id='+numero)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = ''
                if (Object.entries(respuesta).length === 0) {
                    cleanInputs(inputsFicha)
                } else {
                    $('#tecnico').val(respuesta[0].tecnico_id);
                    $('#anuladoFicha').val(respuesta[0].anulado);
                    $('#finalizadoFicha').val(respuesta[0].finalizado);
                    $('#ordenFicha').val(respuesta[0].numero);
                    $('#ordenFicha2').val(respuesta[0].numero);
                    respuesta[0].equipoRecuperado == 'S' ? $('#equipoRecuperar').prop('checked', true) : $('#equipoRecuperar').prop('checked', false);
                    if(equipoRecuperar.disabled == true){
                        equipoRecuperar.parentNode.title = 'Dato no modificable'
                    } else {
                        equipoRecuperar.parentNode.title = ''
                    }
                    $('#lugarFicha').val(respuesta[0].lugar);
                    $('#clienteCodigoFicha').val(respuesta[0].codigo);
                    $('#clienteFicha').val(respuesta[0].razonsocial);
                    $('#clienteFicha2').val(respuesta[0].razonsocial);
                    $('#clienteAntisarro').val(respuesta[0].clienteAntisarro);
                    $('#telefonoFicha').val(respuesta[0].telefonoCliente);
                    $('#celularFicha').val(respuesta[0].celularCliente);
                    $('#clienteCelular').val(respuesta[0].celularCliente);
                    $('#mailFicha').val(respuesta[0].mailCliente);
                    $('#ubicacionFicha').val(respuesta[0].planta);
                    $('#referenciaFicha').val(respuesta[0].referenciaCliente);
                    $('#emisorFicha').val(respuesta[0].emisor);
                    $('#fechaRetiro').val(respuesta[0].fretiro);
                    $('#fechaRetiroFicha').val(respuesta[0].fretiro);
                    $('#fechaRetiroFormatDate').val(respuesta[0].fretiroFormatDate);
                    $('#fechaEmisionFicha').val(respuesta[0].frecepcion);
                    $('#fechaReparacionFicha').val(respuesta[0].freparacion);
                    $('#tipoFicha').val(respuesta[0].rep_pres);
                    if(respuesta[0].rep_pres == 'N'){$('#sinRepararFicha').prop('checked', true)} else {$('#sinRepararFicha').prop('checked', false)}
                    $('#atencionFicha').val(respuesta[0].tipo);
                    $('#tipoAtencionFicha').val(respuesta[0].tipoAtencion_id);
                    $('#garantiaFicha').val(respuesta[0].reclamagarantia);
                    if(respuesta[0].reclamagarantia == 'S'){
                        $('#garantiaFicha').css({'background':'#FF8080','font-weight':'bold'});
                    } else {
                        $('#garantiaFicha').css({'background':'#EEEEEE','font-weight':'normal'});
                    }
                    $('#fleteFicha').val(respuesta[0].flete);
                    $('#antisarroFicha2').val(respuesta[0].antisarro);
                    $('#reduccionTurbinaFicha2').val(respuesta[0].reduccion_turbina);
                    $('#mediaUnion2').val(respuesta[0].media_union);
                    $('#serviceFicha').val(respuesta[0].pedido_service);
                    $('#productoFicha').val(respuesta[0].producto);
                    $('#productoFicha2').val(respuesta[0].producto);
                    $('#productoCodigo').val(respuesta[0].productocodigo);
                    $('#codigoAdonix').val(respuesta[0].codigoAdonix);
                    $('#productoDescripcion').val(respuesta[0].productoDescripcion);
                    $('#nroDeSerieFicha').val(respuesta[0].nroserie);
                    $('#nroDeSerieFicha2').val(respuesta[0].nroserie);
                    $('#serieGarantiaFicha').val(respuesta[0].nroSerieGarantia);
                    $('#problemaFicha').val(respuesta[0].problema);
                    $('#observacionFicha').val(respuesta[0].observaciones);
                    $('#costoFicha').val(respuesta[0].costo);
                    $('#diagnosticoFicha').val(respuesta[8].combo);
                    $('#diagnosticadorFicha').val(respuesta[0].diagnosticador_id);//Este dato se utiliza en la ficha_diagnostico para mostrar el diagnosticador en caso de ser un presupuesto
                    $('#armoFicha').val(respuesta[9].codigo);
                    $('#presupuestoFicha').val(respuesta[0].nropresupuesto);
                    respuesta[9] ? $('#armadorNombreFicha').val(respuesta[9].combo) : $('#armadorNombreFicha').val('')
                    respuesta[9] ? $('#armadorFicha').val(respuesta[9].codigo) : $('#armadorFicha').val('')
                    $('#btnDatosClientes').val(respuesta[0].cliente_id);
                    $('#btnHistorialService').val(respuesta[0].nroserie);
                    $('#fdiagnostico').val(respuesta[0].fdiagnostico);
                    $('#diagnostico').val(respuesta[8].combo);
                    $('#estadoFicha').val(respuesta[0].estadoreparacion_id);
                    $('#nombreEstadoFicha').val(respuesta[0].nombreestado);
                    $('#motivoFicha').val(respuesta[0].motivocargoasignado);
                    $('#motivoFichaResolucion').val(respuesta[0].motivoscargosasignados_id);
                    respuesta[0].estadoreparacion_id == '2' ? $('#tipoReparacionFicha').val(respuesta[0].reparacion_recambio) : $('#tipoReparacionFicha');
                    $('#observacionFichaEstado').val(respuesta[0].reparacion_detalle);
                    $('#lugarFichaId').val(respuesta[0].lugarrecep_id);
                    $('#codigoArmo').val(respuesta[9].codigo);
                    $('#estanteFicha').val(respuesta[0].estante_id);
                    $('#cajonFicha').val(respuesta[0].cajon);
                    $('#embalo').val(respuesta[10].combo);
                    respuesta[10] ? $('#embaloFicha').val(respuesta[10].codigo) : $('#embaloFicha').val('')
                    $('#ordenDeCompraFicha').val(respuesta[0].oc_cliente);
                    $('#cargoForma').val(respuesta[0].formasderetiro_id);
                    if (respuesta[0].lugarrecep_id == '1' && respuesta[0].finalizado == 'S') {
                        $('#divTicket').show()
                        if(respuesta[0].retiroconticket == 'S'){
                            $('#ticketS').prop('checked',true);
                            $('#ticketN').attr('disabled', 'disabled');
                        }else {
                            $('#ticketN').prop('checked',true);
                            $('#ticketS').attr('disabled', 'disabled');
                        }
                    } else {
                        $('#divTicket').hide()
                    }

                    if (respuesta[0].lugarrecep_id == '1') {
                        $('#divTicket').show()
                        if(respuesta[0].retiroconticket == 'S'){
                            $('#ticketSResolucion').prop('checked',true);
                            /* $('#ticketNResolucion').attr('disabled', 'disabled'); */
                        }else {
                            $('#ticketNResolucion').prop('checked',true);
                            /* $('#ticketSResolucion').attr('disabled', 'disabled'); */
                        }
                    } else {
                        $('#divTicket').hide()
                    }

                    if(respuesta[10]){
                        $('#embalo').val(respuesta[10].combo);
                        if (respuesta[10].combo == "SIN DEFINIR"){
                            $('#fechaEmbalo').val('');
                        } else {
                            $('#fechaEmbalo').val(respuesta[0].fechaEmbalaje);
                        }
                    }
                    if (respuesta[1] == "") {
                        //$('#divPresupuesto').hide();
                        $('#cajon').val(respuesta[0].cajon);
                        $('#cajonNumero').val(respuesta[0].nropresupuesto);
                    } else {
                        $('#presupuestoModal').val(respuesta[1].combo);
                        $('#fechaPresupuesto').val(respuesta[1].fecha);
                        $('#cajon').val(respuesta[0].cajon);
                        $('#cajonNumero').val(respuesta[0].nropresupuesto);
                        //$('#divPresupuesto').show();
                    }
                    switch (respuesta[0].RepPres) {
                        case "PLAN CANJE":
                            $('#resolucion').val("Canje por Producto");
                            break;
                        case "CAMBIO EQUIPO":
                            $('#resolucion').val("Cambio de equipo");
                            break;
                        default:
                            $('#resolucion').val(respuesta[3].formaderetiro);
                            break;
                    }
                    if(respuesta[7] != ''){
                        $('#codigoCanje').val(respuesta[7].codigo_adonix)
                        $('#descripcionCanje').val(respuesta[7].descrip_adonix)
                        $('#codigoCanjeResolucion').val(respuesta[7].codigo_adonix)
                        $('#descripcionCanjeResolucion').val(respuesta[7].descrip_adonix)
                        $('#divCanje').show()
                        $('#btnBuscarBombaCanje').prop('disabled', true)
                        $('#codigoCanje').prop('readonly', true)
                    }else {
                        $('#codigoCanje').val('')
                        $('#descripcionCanje').val('')
                        $('#codigoCanjeResolucion').val('')
                        $('#descripcionCanjeResolucion').val('')
                        $('#divCanje').hide()
                        $('#btnBuscarBombaCanje').prop('disabled', false)
                        $('#codigoCanje').prop('readonly', false)
                    }
                    $('#remitoPrefijo').val(respuesta[0].prefijo_remito);
                    $('#remitoSufijo').val(respuesta[0].numero_remito);
                    $('#remitoCliente').val(respuesta[0].remitoCliente);
                    let fdespacho = moment(respuesta[0].fecha_despacho, 'DD/MM/YYYY').format('YYYY-MM-DD')
                    let fhoy      = moment(new Date()).format ('YYYY-MM-DD')
                    $('#fechaRemito').val(respuesta[0].fecha_despacho);
                    $('#fechaRemito2').val(respuesta[0].fecha_despacho);
                    if(respuesta[0].fecha_despacho == ''){
                        $('#fechaRemito3').val(fhoy);
                    } else {
                        $('#fechaRemito3').val(fdespacho);
                    }
                    $('#formasRetiro').val(respuesta[3].formaderetiro);
                    $('#productoIdFicha').val(respuesta[0].producto_id);
                    $('#estanteDescripcionFicha').val(respuesta[0].estante2);
                    $('#estanteDescripcionFicha2').val(respuesta[0].estante2);
                    $('#armoDescripcionFicha').val(respuesta[9].combo);
                    if(respuesta[5] != ''){
                        $('#divFechaCierre').show();
                        $('#fechaCierreFicha').val(respuesta[5].fecha_finalizado);
                        template += `<div class="alert alert-warning text-center"><b>Orden cerrada por ${respuesta[5].usuario} el ${respuesta[5].fecha_finalizado}</b></div>`
                    } else {
                        $('#fechaCierreFicha').val('');
                        $('#divFechaCierre').hide();
                    }
                    if(respuesta[11].media_union == 'S'){
                        if(respuesta[0].media_union == 'S'){
                            swal({
                                title   : "Atención!!!",
                                text    : `El equipo ingresó con media unión`,
                                type    : "warning",
                            });
                            template += `<div class="alert alert-warning text-center"><b>El equipo ingresó con media unión</b></div>`
                        }  else{
                            template += `<div class="alert alert-warning text-center"><b>El equipo NO ingresó con media unión</b></div>`
                        }
                    }
                    if(respuesta[0].suspension == 'S'){
                        template += `<div class="alert alert-warning text-center"><b>Armado requiere suspensión</b></div>`
                    }
                    if(respuesta[0].antisarro == 'S'){
                        $('#antisarroFicha').prop('checked', true);
                        template += `<div class="alert alert-warning text-center"><b>ANTISARRO</b></div>`
                    } else {
                        $('#antisarroFicha').prop('checked', false);
                    }
                    if(respuesta[0].reduccion_turbina == 'S'){
                        template += `<div class="alert alert-warning text-center"><b>REDUCCIÓN TURBINA</b></div>`
                    }
                    let conflicto = equipoConflictivo(respuesta[0].productocodigo, respuesta[0].nroserie)
                    if(conflicto){
                        template += `<div class="alert alert-danger text-center"><b>AVISAR A SERVICIO TÉCNICO</b></div>`
                    }
                    if(respuesta[0].estadoreparacion_id != '4'){
                        if(respuesta[0].facturada == 'S' || respuesta[12] != ''){
                            let fechaFpf = ''
                            let fechaFac = ''
                            if(respuesta[12].FECHA_FPF != '01/01/1900'){fechaFpf = respuesta[12].FECHA_FPF}
                            if(respuesta[12].FECHA_FAC != '01/01/1900'){fechaFac = respuesta[12].FECHA_FAC}
                            if(respuesta[0].facturada == 'S' && respuesta[12] == ''){
                                swal({
                                    title   : "Atención!!!",
                                    text    : `Orden facturada!!!!`,
                                    type    : "error",
                                });
                            } else {
                                swal({
                                    html    : true,
                                    title   : "Atención, órden con proforma/factura!!!",
                                    text    : ` <p><b>Proforma:</b> ${respuesta[12].NUMERO_FPF} - ${fechaFpf}</p>
                                                <p><b>Factura:</b> ${respuesta[12].NUMERO_FAC} - ${fechaFac}</p>`,
                                    type    : "error",
                                });
                            }
                        }
                    }
                    $('#mensajesFicha').html(template)
                    $('#pieFicha').empty();//Vacío el div de respuesta en pie de ficha
                    $('#cargoAsignadoFicha').empty();//Vacío el div de respuesta del cargo asignado
                    let divPie              = document.querySelector('#pieFicha')
                    let divCargoAsignado    = document.querySelector('#cargoAsignadoFicha')

                    if(respuesta[2] != ""){
                        $('#ordenAnulada').empty();//Vacío el div de respuesta
                        let anulacion = document.querySelector('#ordenAnulada')
                        let respuestaQuery2 = document.createElement('h3')
                        respuestaQuery2.style.color = 'red'
                        respuestaQuery2.style.textAlign = 'center'
                        respuestaQuery2.innerHTML = "Orden anulada por "+respuesta[2].usuario+" el "+respuesta[2].fanulado+" / "+respuesta[2].descripcion
                        anulacion.appendChild(respuestaQuery2)
                    }
                    if(respuesta[4] != ""){//Aviso de cargo asignado
                        let respuestaQuery4 = document.createElement('h3')
                        respuestaQuery4.style.color = 'red'
                        respuestaQuery4.style.textAlign = 'center'
                        respuestaQuery4.innerHTML = "Cargo asignado por "+respuesta[4].usuario+" el "+respuesta[4].fecha
                        divCargoAsignado.appendChild(respuestaQuery4)
                    }
                    if(respuesta[5] != ""){//Aviso de orden cerrada
                        let respuestaQuery5 = document.createElement('h3')
                        respuestaQuery5.style.color = 'red'
                        respuestaQuery5.style.textAlign = 'center'
                        respuestaQuery5.innerHTML = "Orden cerrada por "+respuesta[5].usuario+" el "+respuesta[5].fecha_finalizado
                        divPie.appendChild(respuestaQuery5)
                    }
                }
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga los valores de la solapa 2 del detalle de la ficha (Ventana desplegable lateral)
 * @param {string} nroReparacion
 */
function datosFichaSolapa2(nroReparacion){
    //TRAE LOS VALORES PARA COMPLETAR LA FICHA
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/procesos/diagnostico/info_search.php?id='+nroReparacion)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                if(respuesta.length > 0){
                    let grupo = respuesta[0].grupo_id

                    let xhr2 = new XMLHttpRequest
                    let url2 = "mod_sirep/fichas/modal_fichas_sql.php?grupoId="+grupo+"&reparacionId="+nroReparacion
                    xhr2.responseType = "json";
                    xhr2.open("get",url2)
                    xhr2.send()

                    xhr2.addEventListener("load",()=>{
                        if(xhr2.status == 200){
                            let respuesta2 = xhr2.response;
                            resolve(respuesta2)
                            if(respuesta2 != null){
                                $('#contenidoFichaTecnica').hide();
                                if (respuesta2.abierto == 'S') {
                                    $('#abierto').prop('checked',true);
                                }
                                if (respuesta2.anillo_mirilla == 'S') {
                                    $('#anilloMirilla').prop('checked',true);
                                }
                                if (respuesta2.arandela_sup_inf == 'S') {
                                    $('#arandelaSupInf').prop('checked',true);
                                }
                                if (respuesta2.bobinado == 'S') {
                                    $('#bobinado').prop('checked',true);
                                }
                                if (respuesta2.buje_d == 'S') {
                                    $('#bujeD').prop('checked',true);
                                }
                                if (respuesta2.buje_t == 'S') {
                                    $('#bujeT').prop('checked',true);
                                }
                                if (respuesta2.cable_ficha == 'S') {
                                    $('#cableFicha').prop('checked',true);
                                }
                                if (respuesta2.caja_conexiones == 'S') {
                                    $('#cajaConexiones').prop('checked',true);
                                }
                                if (respuesta2.cajacubrecondensador == 'S') {
                                    $('#cajaCubreCondensador').prop('checked',true);
                                }
                                if (respuesta2.condensador == 'S') {
                                    $('#condensador').prop('checked',true);
                                }
                                if (respuesta2.conexionescliente == 'S') {
                                    $('#conexAplicadasPorCliente').prop('checked',true);
                                }
                                if (respuesta2.conjuntomirilla_anillo == 'S') {
                                    $('#conjuntoMirillaAnillo').prop('checked',true);
                                }
                                if (respuesta2.conjuntomirilla_tornillo == 'S') {
                                    $('#conjuntoMirillaTornillo').prop('checked',true);
                                }
                                if (respuesta2.conjuntomirilla_vidrio == 'S') {
                                    $('#conjuntoMirillaVidrio').prop('checked',true);
                                }
                                if (respuesta2.contactor_1na_nc_9a == 'S') {
                                    $('#contactorNC9').prop('checked',true);
                                }
                                if (respuesta2.contactor_1na_nc_16a == 'S') {
                                    $('#contactorNC16').prop('checked',true);
                                }
                                if (respuesta2.control_estanqueidad == 'S') {
                                    $('#estanqueidadS').prop('checked',true);
                                    $('#estanqueidadN').prop('checked',false);
                                } else if(respuesta2.control_estanqueidad == 'N'){
                                    $('#estanqueidadS').prop('checked',false);
                                    $('#estanqueidadN').prop('checked',true);
                                }
                                if (respuesta2.conversionsanitaria == 'S') {
                                    $('#conversionSanitaria').prop('checked',true);
                                }
                                if (respuesta2.cuerpoimpulsor == 'S') {
                                    $('#cuerpoImpulsor').prop('checked',true);
                                }
                                if (respuesta2.cuerpomotor == 'S') {
                                    $('#cuerpoMotor').prop('checked',true);
                                }
                                if (respuesta2.cuerpofl == 'S') {
                                    $('#cuerpoFL').prop('checked',true);
                                }
                                if (respuesta2.cuerporpx == 'S') {
                                    $('#cuerpoRPX').prop('checked',true);
                                }
                                if (respuesta2.cuerpoturbinadebronce == 'S') {
                                    $('#cuerpoTurbinaBronce').prop('checked',true);
                                }
                                if (respuesta2.cuerpoturbinadefundicion == 'S') {
                                    $('#cuerpoTurbinaFundicion').prop('checked',true);
                                }
                                if (respuesta2.cuerpoturbinadeplastico == 'S') {
                                    $('#cuerpoTurbinaPlastico').prop('checked',true);
                                }
                                if (respuesta2.cuerpo_ctrl_aut == 'S') {
                                    $('#cuerpo').prop('checked',true);
                                }
                                if (respuesta2.diafragma_sup_inf == 'S') {
                                    $('#diafragmaSupInf').prop('checked',true);
                                }
                                if (respuesta2.difusor == 'S') {
                                    $('#difusor').prop('checked',true);
                                }
                                if (respuesta2.discodeempuje == 'S') {
                                    $('#discoDeEmpuje').prop('checked',true);
                                }
                                if (respuesta2.discomotor == 'S') {
                                    $('#discoMotor').prop('checked',true);
                                }
                                if (respuesta2.discomotordebronce == 'S') {
                                    $('#discoMotorDeBronce').prop('checked',true);
                                }
                                if (respuesta2.discomotordefundicion == 'S') {
                                    $('#discoMotorDeFundicion').prop('checked',true);
                                }
                                if (respuesta2.discomotorinoxidable == 'S') {
                                    $('#discoMotorInoxTango').prop('checked',true);
                                }
                                if (respuesta2.ejeconarandelaestrella == 'S') {
                                    $('#ejeArandelaEstrella').prop('checked',true);
                                }
                                if (respuesta2.ejesolamente == 'S') {
                                    $('#ejeSolamente').prop('checked',true);
                                }
                                switch (respuesta2.esferainoxidable) {
                                    case 'V':
                                        $('#esferaV').prop('checked',true);
                                        $('#esferaH').prop('checked',false);
                                        break;
                                    case 'H':
                                        $('#esferaV').prop('checked',false);
                                        $('#esferaH').prop('checked',true);
                                        break;
                                    default:
                                        $('#esferaV').prop('checked',false);
                                        $('#esferaH').prop('checked',false);
                                        break;
                                }
                                $('#esferaLitros').val(respuesta2.esferainoxidable_lts);

                                if (respuesta2.flexibles == 'S') {
                                    $('#flexibles').prop('checked',true);
                                }
                                if (respuesta2.flexibles_1_14 == 'S') {
                                    $('#flexibles114').prop('checked',true);
                                }
                                if (respuesta2.flexibles_12 == 'S') {
                                    $('#flexibles12').prop('checked',true);
                                }
                                if (respuesta2.gabinetepr354 == 'S') {
                                    $('#gabinetePR').prop('checked',true);
                                }
                                if (respuesta2.impulsor == 'S') {
                                    $('#impulsor').prop('checked',true);
                                }
                                if (respuesta2.interruptortermico2x20a == 'S') {
                                    $('#interruptorTermico2x20').prop('checked',true);
                                }
                                if (respuesta2.interruptortermico3x10a == 'S') {
                                    $('#interruptorTermico3x10').prop('checked',true);
                                }
                                if (respuesta2.inundada == 'S') {
                                    $('#inundada').prop('checked',true);
                                }
                                if (respuesta2.juegodejuntas == 'S') {
                                    $('#juegoDeJuntas').prop('checked',true);
                                }
                                if (respuesta2.manodeobra == 'S') {
                                    $('#manoDeObra').prop('checked',true);
                                }
                                if (respuesta2.manometro == 'S') {
                                    $('#manometroKgs').prop('checked',true);
                                }
                                if (respuesta2.membrana_tanque == 'S') {
                                    $('#membranaTanque').prop('checked',true);
                                }
                                if (respuesta2.membrete == 'S') {
                                    $('#membrete').prop('checked',true);
                                }
                                if (respuesta2.microinterruptor == 'S') {
                                    $('#microinterruptor').prop('checked',true);
                                }
                                if (respuesta2.microswich == 'S') {
                                    $('#microswitch').prop('checked',true);
                                }
                                $('#fichaProducto').val(respuesta2.modeloId);

                                if (respuesta2.mono_trifasico == 'T') {
                                    $('#alimentacionT').prop('checked',true);
                                    $('#alimentacionM').prop('checked',false);
                                } else if(respuesta2.mono_trifasico == 'M'){
                                    $('#alimentacionT').prop('checked',false);
                                    $('#alimentacionM').prop('checked',true);
                                } else {
                                    $('#alimentacionT').prop('checked',false);
                                    $('#alimentacionM').prop('checked',false);
                                }

                                $('#observaciones').val(respuesta2.observaciones);

                                /*if (respuesta2.oringtapasuperior == 'S') {
                                    $('#oringTapaSuperior').prop('checked',true);
                                }*/
                                if (respuesta2.pegado == 'S') {
                                    $('#pegado').prop('checked',true);
                                }
                                if (respuesta2.pintura == 'S') {
                                    $('#pintura').prop('checked',true);
                                }
                                if (respuesta2.plaqueta_inteligent20 == 'S') {
                                    $('#plaquetaInt').prop('checked',true);
                                }
                                if (respuesta2.plaqueta_rw9 == 'S') {
                                    $('#plaquetaRw').prop('checked',true);
                                }
                                $('#presionDeArranque').val(respuesta2.presiondearranque);

                                $('#presionDeCorte').val(respuesta2.presiondecorte);

                                $('#presionDeHidroesfera').val(respuesta2.presionhidroesfera);

                                if (respuesta2.presostatoyresorte == 'S') {
                                    $('#presostatoYResorte').prop('checked',true);
                                }
                                if (respuesta2.repasoylimpieza == "S") {
                                    $('#repasoYLimpieza').prop('checked',true);
                                }
                                if (respuesta2.resorte_sup_inf == 'S') {
                                    $('#resorteSupInf').prop('checked',true);
                                }
                                if (respuesta2.rigidez == 'S') {
                                    $('#rigidezS').prop('checked',true);
                                } else if(respuesta2.rigidez == 'N'){
                                    $('#rigidezN').prop('checked',true);
                                }
                                if (respuesta2.rotoryeje == 'S') {
                                    $('#rotorYEje').prop('checked',true);
                                }
                                if (respuesta2.selec_palanca_7100n == 'S') {
                                    $('#SelecPantalla').prop('checked',true);
                                }
                                if (respuesta2.senalled24rojo == 'S') {
                                    $('#senalLuminicaR').prop('checked',true);
                                }
                                if (respuesta2.senalled24verde == 'S') {
                                    $('#senalLuminicaV').prop('checked',true);
                                }
                                if (respuesta2.suciedadgeneral == 'S') {
                                    $('#suciedadGeneral').prop('checked',true);
                                }
                                if (respuesta2.tablerocompleto == 'S') {
                                    $('#tableroCompleto').prop('checked',true);
                                }
                                if (respuesta2.tapacajonconexion == 'S') {
                                    $('#tapaCajaConexion').prop('checked',true);
                                }
                                if (respuesta2.tapaconexiones == 'S') {
                                    $('#tapaConexiones').prop('checked',true);
                                }
                                if (respuesta2.tapainferior == 'S') {
                                    $('#tapaInferior').prop('checked',true);
                                }
                                if (respuesta2.tapainferiorrpx == 'S') {
                                    $('#tapaInferiorRPX').prop('checked',true);
                                }
                                if (respuesta2.tapasuperior_soporterpx == 'S') {
                                    $('#tapaSupConSoporteRPX').prop('checked',true);
                                }
                                if (respuesta2.tapasuperior == 'S') {
                                    $('#tapaSuperior').prop('checked',true);
                                }
                                if (respuesta2.tornillo_cuerpo == 'S') {
                                    $('#tornilloDeCuerpo').prop('checked',true);
                                }
                                if (respuesta2.tornillos == 'S') {
                                    $('#tornillos').prop('checked',true);
                                }
                                if (respuesta2.transformador_220 == 'S') {
                                    $('#transformador220').prop('checked',true);
                                }
                                if (respuesta2.tuboseparador == 'S') {
                                    $('#tuboSeparador').prop('checked',true);
                                }
                                if (respuesta2.turbina == 'S') {
                                    $('#turbina').prop('checked',true);
                                }
                                if (respuesta2.valvulaabierta == 'S') {
                                    $('#valvulaA').prop('checked',true);
                                }else if(respuesta2.valvulaabierta == 'N'){
                                    $('#valvulaC').prop('checked',true);
                                }
                                if (respuesta2.valvuladeretencion == 'S') {
                                    $('#valvulaDeRetencion').prop('checked',true);
                                }
                                if (respuesta2.velocidad == '1') {
                                    $('#velocidad1').prop('checked',true);
                                }else if(respuesta2.velocidad == '3'){
                                    $('#velocidad3').prop('checked',true);
                                }
                                if (respuesta2.vidrio_mirilla == 'S') {
                                    $('#vidrioMirilla').prop('checked',true);
                                }
                                if (respuesta2.vinosincuerpo == 'S') {
                                    $('#vinoSinCuerpo').prop('checked',true);
                                }
                                if (respuesta2.plaquetaQuemada == 'S') {
                                    $('#plaquetaQuemada').prop('checked',true);
                                }
                                if (respuesta2.plaquetaInutil == 'S') {
                                    $('#plaquetaInutil').prop('checked',true);
                                }
                                if (respuesta2.plaquetaDirecta == 'S') {
                                    $('#plaquetaDirecta').prop('checked',true);
                                }
                                if (respuesta2.impulsorObstruido == 'S') {
                                    $('#impulsorObstruido').prop('checked',true);
                                }
                                if (respuesta2.impulsorRoscaSuelta == 'S') {
                                    $('#impulsorRoscaSuelta').prop('checked',true);
                                }
                                if (respuesta2.impulsorRoto == 'S') {
                                    $('#impulsorRoto').prop('checked',true);
                                }
                                if (respuesta2.rotorYEjeGastado == 'S') {
                                    $('#rotorYEjeGastado').prop('checked',true);
                                }
                                if (respuesta2.rotorYEjeRayado == 'S') {
                                    $('#rotorYEjeRayado').prop('checked',true);
                                }
                                if (respuesta2.rotorYEjeEncSuelto == 'S') {
                                    $('#rotorYEjeEncSuelto').prop('checked',true);
                                }
                                if (respuesta2.rotorYEjeDistSuelto == 'S') {
                                    $('#rotorYEjeDistSuelto').prop('checked',true);
                                }
                                if (respuesta2.bujeGrafitoD == 'S') {
                                    $('#bujeGrafitoD').prop('checked',true);
                                }
                                if (respuesta2.bujeBronceD == 'S') {
                                    $('#bujeBronceD').prop('checked',true);
                                }
                                if (respuesta2.bujeGrafitoT == 'S') {
                                    $('#bujeGrafitoT').prop('checked',true);
                                }
                                if (respuesta2.bujeBronceT == 'S') {
                                    $('#bujeBronceT').prop('checked',true);
                                }
                                if (respuesta2.tapaSuperiorPerdida == 'S') {
                                    $('#tapaSuperiorPerdida').prop('checked',true);
                                }
                                if (respuesta2.tapaSuperiorDesalineada == 'S') {
                                    $('#tapaSuperiorDesalineada').prop('checked',true);
                                }
                                if (respuesta2.tapaSuperiorDuroDesplazar == 'S') {
                                    $('#tapaSuperiorDuroDesplazar').prop('checked',true);
                                }
                                if (respuesta2.sensorFlujoPress == 'S') {
                                    $('#sensorFlujoPress').prop('checked',true);
                                }
                                if (respuesta2.sensorDiafragmaDeformado == 'S') {
                                    $('#sensorDiafragmaDeformado').prop('checked',true);
                                }
                                if (respuesta2.sensorDiafragmaRoto == 'S') {
                                    $('#sensorDiafragmaRoto').prop('checked',true);
                                }
                                if (respuesta2.presostatoDiafragmaDeformado == 'S') {
                                    $('#presostatoDiafragmaDeformado').prop('checked',true);
                                }
                                if (respuesta2.presostatoDiafragmaRoto == 'S') {
                                    $('#presostatoDiafragmaRoto').prop('checked',true);
                                }
                                if (respuesta2.presostatoInundada == 'S') {
                                    $('#presostatoInundada').prop('checked',true);
                                }
                                if (respuesta2.presostatoDuroDesplazar == 'S') {
                                    $('#presostatoDuroDesplazar').prop('checked',true);
                                }
                                if (respuesta2.bobinadoBajaRigidez == 'S') {
                                    $('#bobinadoBajaRigidez').prop('checked',true);
                                }
                                if (respuesta2.bobinadoEnCorto == 'S') {
                                    $('#bobinadoEnCorto').prop('checked',true);
                                }
                                if (respuesta2.bobinadoSinContinuidad == 'S') {
                                    $('#bobinadoSinContinuidad').prop('checked',true);
                                }
                                if (respuesta2.bobinadoPerdidaAislante == 'S') {
                                    $('#bobinadoPerdidaAislante').prop('checked',true);
                                }
                                if (respuesta2.bobinadoReparadoAfuera == 'S') {
                                    $('#bobinadoReparadoAfuera').prop('checked',true);
                                }
                                if (respuesta2.bobinadoAmperajeFueraRango == 'S') {
                                    $('#bobinadoAmperajeFueraRango').prop('checked',true);
                                }
                                if (respuesta2.bobinadoGiroInvertido == 'S') {
                                    $('#bobinadoGiroInvertido').prop('checked',true);
                                }
                                if (respuesta2.bobinadoSinKlixon == 'S') {
                                    $('#bobinadoSinKlixon').prop('checked',true);
                                }
                                if (respuesta2.bobinadoCuerpoDeteriorado == 'S') {
                                    $('#bobinadoCuerpoDeteriorado').prop('checked',true);
                                }
                            } else {
                                let p = document.createElement('p')
                                p.innerText = "El equipo aún no cuenta con un diagnóstico realizado"
                                $('#contenidoFichaTecnica').show();
                                $('#contenidoFichaTecnica').html(p);
                            }
                        } else {
                            reject()
                        }
                    })
                }
            }
        })

    })

}

/**
 * Verifica si el nro de serie ingresado se encuentra en garantía
 * @param {string} codigo
 * @param {string} nroSerie
 */
function enGarantiaEnDiv(codigo, nroSerie, div){
    $('#productoEnGarantiaFicha').empty()
    let xhr = new XMLHttpRequest
    xhr.open('GET', 'mod_sirep/busquedas/equipoEnGarantia_search.php?codigo='+codigo+'&nroSerie='+nroSerie)
    xhr.send()
    xhr.addEventListener('load', () => {
        if(xhr.status == 200){
            let respuesta = JSON.parse(xhr.response)
            switch (respuesta) {
                case 1:
                    $(div).html('<div class="alert alert-danger text-center"><b>Producto dentro del período de garantía de fabricación.</b></div>')
                    break;
                case 2:
                    $(div).html('<div class="alert alert-warning text-center"><b>Producto dentro del período de garantía de reparación.</b></div>')
                    break;
                default:
                    break;
            }
        }
    })
}

/**
 * Carga el select de Modelos Ficha. el segundo parámetro(S = carga desplegable sin la opción "SIN DEFINIR")
 * @param {string} select
 * @param {string} sinDefinir
 */
function cargaModeloFicha(select, sinDefinir = 'N'){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', "mod_sirep/admin/tablas/productos/modeloFicha_list.php?sinDefinir=S")
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "">Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= ${element.MODELO_ID}>${element.NOMBRE}</option>`
                });
                select.innerHTML    = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de Modelos Ficha. el segundo parámetro(S = carga desplegable sin la opción "SIN DEFINIR")
 * @param {string} select
 * @param {string} sinDefinir
 */
 function cargaModeloFicha2(select, sinDefinir = 'N'){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', "mod_sirep/busquedas/modeloFicha_list.php?sinDefinir="+sinDefinir)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "">Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= ${element.MODELO_ID}>${element.NOMBRE}</option>`
                });
                select.innerHTML    = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de zonas de despacho. Admite un solo parámetro con el cual se define el input en donde se cargará
 * @param {string} select
 */
function cargaZonasDespacho(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/zonasDespacho/zonasDespacho_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0" selected>Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.zona_id}">${element.nombre}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de impresoras. Admite un solo parámetro con el cual se define el input en donde se cargará
 * @param {string} select
 */
 function cargaImpresorasSirep(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/impresoras_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0" selected>Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.impresora_id}">${element.nombreImpresora}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de motivos de anulación. Admite 2 parámetros, select para el id del campo y activo por defecto "todos", con valor "S" solo activos
 * @param {string} select
 * @param {string} activo
 */
function cargaMotivosAnulacion(select, activo = 'N'){
    let xhr = new XMLHttpRequest
    xhr.open('GET', 'mod_sirep/admin/tablas/motivosAnulacion/motivosAnulacion_list.php?activo='+activo)
    xhr.send()
    xhr.addEventListener('load', () => {
        if(xhr.status == 200){
            let respuesta = JSON.parse(xhr.response)
            let template = '<option value= "">Seleccionar</option>'
            respuesta.forEach(element => {
                template += `<option value= "${element.motivoanulacion_id}">${element.descripcion}</option>`
            })
            select.innerHTML = template
        }
    })
}

/**
 * Carga el select de formas de resolución. Admite 2 parámetros, select para el id del campo y activo por defecto "todos", con valor "S" solo activos
 * @param {string} select
 * @param {string} activo
 */
function cargaFormasDeResolucion(select, activo = 'N'){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/formasRetiro/formasRetiro_list.php?activo='+activo)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0">Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.formasderetiro_id}">${element.descripcion}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Muestra si el cargo ingresado es valorizado S o N
 * @param {string} id
 * @returns string
 */
function cargoFormaValorizado(id){
    return new Promise(function(resolve, reject) {
        if(id != '0'){
            let xhr = new XMLHttpRequest
            xhr.open('GET', 'mod_sirep/admin/tablas/formasRetiro/formasRetiro_single.php?id='+id)
            xhr.send()
            xhr.addEventListener('load', () => {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    resolve(respuesta[0].valorizadoFormasRetiro)
                } else {
                    reject()
                }
            })
        } else {
            resolve('N')
        }
    })
}

/**
 * Carga el select de formas de resolución Cuando el equipo es plan Canje. Admite 1 parámetro, select para el id del campo
 * @param {string} select
 */
 function cargaFormasDeResolucionPlanCanje(select){

    let template = `<option value= "7">Canje por Producto</option>
                    <option value= "4">Sin Reparar</option>
                `
    select.innerHTML = template
}

/**
 * Carga el select de formas de resolución Cuando es Cambio de equipo. Admite 1 parámetro, select para el id del campo
 * @param {string} select
 */
 function cargaFormasDeResolucionCambioEquipo(select){

    let template = `<option value= "10">Cambio de equipo</option>
                    <option value= "4">Sin Reparar</option>
                `
    select.innerHTML = template
}

/**
 * Carga el select de motivos de cargo asignado. Admite 2 parámetros, select para el id del campo y activo por defecto "todos", con valor "S" solo activos
 * @param {string} select
 * @param {string} activo
 */
function cargaMotivosCargoAsignado(select, activo = 'N'){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/motivosCargoAsignado/motivosCargoAsignado_list.php?activo='+activo)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0">S/D</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.motivo_id}">${element.nombre}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de lugares de recepción. Como parámetro se indica el id del select a utilizar
 * @param {string} campoLugar
 */
function receptionPlaces(campoLugar){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/lugaresRecepcion/lugaresRecepcion_list.php?activo=s')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value selected>Seleccionar</option>'
                respuesta.forEach(element => {
                    template +=`<option value="${element.LugarRecep_id}">${element.Descripcion}</option>`
                });
                campoLugar.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de estados en solapa1 de Embalaje. Como parámetro se indica el id del select a utilizar, no trae inactivos y <> '3' y <> '4'
 * @param {string} estado
 */
function estadosDeReparacionEmbalaje(estado){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/estadosDeReparacion_search.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value selected>Seleccionar</option>'
                respuesta.forEach(element => {
                    template +=`<option value="${element.estadoreparacion_id}">${element.descripcion}</option>`
                });
                estado.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de estados en solapa1 de Embalaje. Como parámetro se indica el id del select a utilizar
 * @param {string} estado
 */
function estadosDeReparacion(estado){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/estadosReparacion/estadosReparacion_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value selected>Seleccionar</option>'
                respuesta.forEach(element => {
                    template +=`<option value="${element.estadoreparacion_id}">${element.descripcion}</option>`
                });
                estado.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de reparadores. Como parámetro se indica el id del select a utilizar
 * @param {string} campoReparadores
 */
function listarReparadores(campoReparadores, activo = 's'){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/reparadores/reparadores_list.php?activo='+activo)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value="0" selected>Sin Definir</option>'
                respuesta.forEach(element => {
                    template +=`<option value="${element.CODIGO}">${element.APELLIDO+','+element.NOMBRE}</option>`
                });
                campoReparadores.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de emisores. Como parámetro se indica el id del select a utilizar
 * @param {string} campoEmisores
 */
function listarEmisores(campoEmisores){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/emisores/emisores_list.php?activo=s')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value="0" selected>Sin Definir</option>'
                respuesta.forEach(element => {
                    template +=`<option value="${element.emisor_id}">${element.combo}</option>`
                });
                campoEmisores.innerHTML = template
            } else {
                reject()
            }
        })
    })
}


/**
 * Busca el perfil de SIREP del usuario que está logueado.
 */
function perfilUsuario(){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/perfil_search.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
            } else {
                reject()
            }
        })
    })
}

/**
 * Listado de perfiles activos. Ultiliza 1 parametro, del id del desplegable en donde se deben insertar los valores
 * @param {string} select
 */
 function listarPerfiles(select){
    let xhr = new XMLHttpRequest
    xhr.open('GET', 'mod_sirep/admin/configuracion/perfiles/perfiles_list_activos.php')
    xhr.send()
    xhr.addEventListener('load', () => {
        if(xhr.status == 200){
            let respuesta = JSON.parse(xhr.response)
            let template = ''
            template +=`<option value="">Seleccionar</option>`
            respuesta.forEach(element => {
                template +=`<option value="${element.perfil_id}">${element.descripcion}</option>`
            })
            select.innerHTML = template
        }
    })
}

/**
 * Carga la descripcion del producto dependiendo del codigo ingresado. Admite dos parametros para
 * indicar los id de campos codigo y descripción. Formato ej. '#codigo'
 * @param {string} codigoDelProducto
 * @param {string} descripcionDelProducto
 */
function codigoProducto(codigoDelProducto, descripcionDelProducto){
    let codigoProducto = document.querySelector(codigoDelProducto)
    let descripcionProducto = document.querySelector(descripcionDelProducto)
    codigoProducto.addEventListener('keyup', () => {
        if(codigoProducto.value.length == 9){
            let xhr = new XMLHttpRequest
            xhr.open('GET', 'mod_sirep/busquedas/descripcionBomba_search.php?codigo='+codigoProducto.value)
            xhr.send()
            xhr.addEventListener('load', () => {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    if(respuesta[0] != null){
                        descripcionProducto.value = respuesta[0].descripcion
                    } else {
                        descripcionProducto.value = ''
                        codigoProducto.value = ''
                        alert('Código inexistente o inválido :(')
                    }
                }
            })
        } else {
            descripcionProducto.value = ''
        }
    })
}

/*
* CANJE
* Carga la descripcion del producto dependiendo del codigo ingresado. Admite dos parametros para
* indicar los id de campos codigo y descripción. Formato ej. '#codigo'
* @param {string} codigoDelProducto
* @param {string} descripcionDelProducto
*/
function codigoProductoCanje(codigoDelProducto, descripcionDelProducto){
   let codigoProducto = document.querySelector(codigoDelProducto)
   let descripcionProducto = document.querySelector(descripcionDelProducto)
   codigoProducto.addEventListener('keyup', () => {
       if(codigoProducto.value.length == 9){
           let xhr = new XMLHttpRequest
           xhr.open('GET', 'mod_sirep/busquedas/descripcionAdonix_search.php?canje=S&codigo='+codigoProducto.value)
           xhr.send()
           xhr.addEventListener('load', () => {
               if(xhr.status == 200){
                   let respuesta = JSON.parse(xhr.response)
                   if(respuesta[0] != null){
                       descripcionProducto.value = respuesta[0].descrip_adonix
                   } else {
                       descripcionProducto.value = ''
                       codigoProducto.value = ''
                       alert('Código inexistente o inválido :(')
                   }
               }
           })
       } else {
           descripcionProducto.value = ''
       }
   })
}


/**
 * Si el usuario pierde la sesión, aparece ventana flotante con redireccionado al login.php
 */
 function sesionExpiradaMensajeFlotante(){
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr.warning("Volver a loguearse", "Sesión expirada")
    setTimeout(function(){
        window.location="login.php"
    }, 2000);
}

/**
 * Abre el modal de selecion de equipo
 * @param {string} idModal
 * @param {string} idBodyModal
 * @param {string} idTituloModal
 */
function modalBuscarBomba(idModal, idBodyModal, idTituloModal){
    btnBuscarBomba.addEventListener('click', e => {
        e.preventDefault()
        $(idModal).show()
        $(idBodyModal).empty()
        $(idTituloModal).text('Equipos')
        let template = ''
        template = `
            <div class="row">
                <form id="formModalEquipos">
                    <div class="form-group col-sm-6 text-center">
                        <label for="tiposProductoModal">Tipo Producto</label>
                        <select id="tiposProductoModal" class="form-control"></select>
                    </div>
                    <div class="form-group col-sm-6 text-center">
                        <label for="buscadorModal">Buscador por descripción</label>
                        <input id="buscadorModal" type="text" class="form-control">
                    </div>
                    <div class="form-group col-sm-12 text-center">
                        <button id="btnBuscarEquipo" type="button" class="btn btn-primary">Buscar
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
                            </thead>
                            <tbody id="modalBusquedaTabla"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        `
        $(idBodyModal).html(template)

        let formModalEquipos = document.querySelector('#formModalEquipos')
        formModalEquipos.addEventListener('submit', e => {
            e.preventDefault()
        })

        let buscadorModal = document.querySelector('#buscadorModal')
        let btnBuscarEquipo = document.querySelector('#btnBuscarEquipo')
        let modalBusquedaTabla = document.querySelector('#modalBusquedaTabla')
        let tiposProductoModal = document.querySelector('#tiposProductoModal')

        buscadorModal.addEventListener('keyup', e => {
            e.preventDefault()
            if(e.keyCode === 13){
                btnBuscarEquipo.click()
            }
        })

        let xhr2 = new XMLHttpRequest
        xhr2.open('GET', 'mod_sirep/admin/tablas/tiposProducto/tiposProducto_list.php')
        xhr2.send()
        xhr2.addEventListener('load', () => {
            if(xhr2.status == 200){
                let respuesta2 = JSON.parse(xhr2.response)
                let template2 = ''
                template2 +=`<option value="">Seleccionar</option>`
                respuesta2.forEach(element2 => {
                    template2 +=`<option value="${element2.tipo_id}">${element2.descripcion}</option>`
                });
                tiposProductoModal.innerHTML = template2
            }
        })

        btnBuscarEquipo.addEventListener('click', e => {
            e.preventDefault()
            let xhr = new XMLHttpRequest
            xhr.open('GET', 'mod_sirep/busquedas/equipos_search.php?tipo='+tiposProductoModal.value+'&buscador='+buscadorModal.value)
            xhr.send()
            xhr.addEventListener('load', ()=> {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    let template = ''
                    respuesta.forEach(element => {
                        template += `
                            <tr>
                                <td><a class="equipo-item" href="${element.codigo}">${element.codigo}</td>
                                <td>${element.descripcion}</td>
                            </tr>
                        `
                    })
                    modalBusquedaTabla.innerHTML = template

                    //Tomo el link de la tabla con el ID del registro
                    $(document).on('click', '.equipo-item', (e) => {
                        e.preventDefault()
                        let cod= e.target.innerText
                        let xhr = new XMLHttpRequest
                        xhr.open('GET', 'mod_sirep/busquedas/descripcionBomba_search.php?codigo='+cod)
                        xhr.send()
                        xhr.addEventListener('load', () => {
                            if(xhr.status == 200){
                                let respuesta = JSON.parse(xhr.response)
                                if(respuesta[0] != null){
                                    codigo.value = respuesta[0].codigo
                                    descripcion.value = respuesta[0].descripcion
                                    $(idModal).hide()

                                } else {
                                    codigo.value = ''
                                    descripcion.value = ''
                                    $(idModal).hide()
                                }
                            }
                        })
                    })
                }
            })
        })
    })
}

/**
 * Abre el modal de selecion de equipo
 * @param {string} idModal
 * @param {string} idBodyModal
 * @param {string} idTituloModal
 */
 function modalBuscarBomba2(idModal, idBodyModal, idTituloModal, codigo, descripcion){

    let code = document.querySelector(codigo)
    let desc = document.querySelector(descripcion)

    btnBuscarBomba.addEventListener('click', e => {
        e.preventDefault()
        $(idModal).show()
        $(idBodyModal).empty()
        $(idTituloModal).text('Equipos')
        let template = ''
        template = `
            <div class="row">
                <form id="formModalEquipos">
                    <div class="form-group col-sm-6 text-center">
                        <label for="tiposProductoModal">Tipo Producto</label>
                        <select id="tiposProductoModal" class="form-control"></select>
                    </div>
                    <div class="form-group col-sm-6 text-center">
                        <label for="buscadorModal">Buscador por descripción</label>
                        <input id="buscadorModal" type="text" class="form-control">
                    </div>
                    <div class="form-group col-sm-12 text-center">
                        <button id="btnBuscarEquipo" type="button" class="btn btn-primary">Buscar
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
                            </thead>
                            <tbody id="modalBusquedaTabla"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        `
        $(idBodyModal).html(template)

        let formModalEquipos = document.querySelector('#formModalEquipos')
        formModalEquipos.addEventListener('submit', e => {
            e.preventDefault()
        })

        let buscadorModal = document.querySelector('#buscadorModal')
        let btnBuscarEquipo = document.querySelector('#btnBuscarEquipo')
        let modalBusquedaTabla = document.querySelector('#modalBusquedaTabla')
        let tiposProductoModal = document.querySelector('#tiposProductoModal')

        buscadorModal.addEventListener('keyup', e => {
            e.preventDefault()
            if(e.keyCode === 13){
                btnBuscarEquipo.click()
            }
        })

        let xhr2 = new XMLHttpRequest
        xhr2.open('GET', 'mod_sirep/admin/tablas/tiposProducto/tiposProducto_list.php')
        xhr2.send()
        xhr2.addEventListener('load', () => {
            if(xhr2.status == 200){
                let respuesta2 = JSON.parse(xhr2.response)
                let template2 = ''
                template2 +=`<option value="">Seleccionar</option>`
                respuesta2.forEach(element2 => {
                    template2 +=`<option value="${element2.tipo_id}">${element2.descripcion}</option>`
                });
                tiposProductoModal.innerHTML = template2
            }
        })

        btnBuscarEquipo.addEventListener('click', e => {
            e.preventDefault()
            let xhr = new XMLHttpRequest
            xhr.open('GET', 'mod_sirep/busquedas/equipos_search.php?tipo='+tiposProductoModal.value+'&buscador='+buscadorModal.value)
            xhr.send()
            xhr.addEventListener('load', ()=> {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    let template = ''
                    respuesta.forEach(element => {
                        template += `
                            <tr>
                                <td><a class="equipo-item" href="${element.codigo}">${element.codigo}</td>
                                <td>${element.descripcion}</td>
                            </tr>
                        `
                    })
                    modalBusquedaTabla.innerHTML = template

                    //Tomo el link de la tabla con el ID del registro
                    $(document).on('click', '.equipo-item', (e) => {
                        e.preventDefault()
                        let cod= e.target.innerText
                        let xhr = new XMLHttpRequest
                        xhr.open('GET', 'mod_sirep/busquedas/descripcionBomba_search.php?codigo='+cod)
                        xhr.send()
                        xhr.addEventListener('load', () => {
                            if(xhr.status == 200){
                                let respuesta = JSON.parse(xhr.response)
                                if(respuesta[0] != null){
                                    code.value = respuesta[0].codigo
                                    desc.value = respuesta[0].descripcion
                                    $(idModal).hide()

                                } else {
                                    cod.value = ''
                                    desc.value = ''
                                    $(idModal).hide()
                                }
                            }
                        })
                    })
                }
            })
        })
    })
}

/**
 * Abre el modal de selecion de equipo
 * @param {string} idModal
 * @param {string} idBodyModal
 * @param {string} idTituloModal
 */
 function modalBuscarBombaCanje(idModal, idBodyModal, idTituloModal, botonAccion){
    botonAccion.addEventListener('click', e => {
        e.preventDefault()
        $(idModal).show()
        $(idBodyModal).empty()
        $(idTituloModal).text('Equipos')
        let template = ''
        template = `
            <div class="row">
                <form id="formModalEquiposCanje">
                    <div class="row g-3">
                        <div class="form-group col-sm-4">
                            <label for="marcaProductoModalCanje">Marca</label>
                            <select id="marcaProductoModalCanje" class="form-control"></select>
                        </div>
                        <div class="form-group col-sm-4">
                            <label for="familiaProductoModalCanje">Familia</label>
                            <select id="familiaProductoModalCanje" class="form-control"></select>
                        </div>
                        <div class="form-group col-sm-4">
                            <label for="buscadorModalCanje">Buscador</label>
                            <input id="buscadorModalCanje" type="text" class="form-control">
                        </div>
                        <div class="form-group col-sm-12 text-center">
                            <button id="btnBuscarEquipoCanje" type="button" class="btn btn-primary">Buscar
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-sm-12">
                <div class="row">
                    <div class="table-responsive">
                        <table class="table table-striped table-hover">
                            <thead>
                                <th>Id</th>
                                <th>Código</th>
                                <th>Descripción</th>
                                <th>Marca</th>
                                <th>Familia</th>
                            </thead>
                            <tbody id="modalBusquedaTabla"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        `
        $(idBodyModal).html(template)

        let formModalEquipos = document.querySelector('#formModalEquiposCanje')
        formModalEquipos.addEventListener('submit', e => {
            e.preventDefault()
        })

        let modalBusquedaTabla          = document.querySelector('#modalBusquedaTabla')
        let marcaProductoModalCanje     = document.querySelector('#marcaProductoModalCanje')
        let familiaProductoModalCanje   = document.querySelector('#familiaProductoModalCanje')
        let buscadorModalCanje          = document.querySelector('#buscadorModalCanje')
        let btnBuscarEquipoCanje        = document.querySelector('#btnBuscarEquipoCanje')

        cargaFamilias(familiaProductoModalCanje)
        cargaMarcas(marcaProductoModalCanje)

        buscadorModalCanje.addEventListener('keyup', e => {
            e.preventDefault()
            if(e.keyCode === 13){
                btnBuscarEquipoCanje.click()
            }
        })

        btnBuscarEquipoCanje.addEventListener('click', e => {
            e.preventDefault()
            let xhr = new XMLHttpRequest
            xhr.open('GET', 'mod_repa/tablas/productos/productosCanje_list.php?familia='+familiaProductoModalCanje.value+'&marca='+marcaProductoModalCanje.value+'&buscador='+buscadorModalCanje.value)
            xhr.send()
            xhr.addEventListener('load', ()=> {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    let template = ''
                    respuesta.forEach(element => {
                        template += `
                            <tr>
                                <td style="width: 10%;"><a class="equipoCanje-item" href="${element.producto_id}">${element.producto_id}</td>
                                <td style="width: 40%;">${element.codigo}</td>
                                <td style="width: 40%;">${element.descripcion}</td>
                                <td style="width: 10%;">${element.marca}</td>
                                <td style="width: 40%;">${element.familia}</td>
                            </tr>
                        `
                    })
                    modalBusquedaTabla.innerHTML = template

                    $(document).on('click', '.equipoCanje-item', (e) => {
                        e.preventDefault()
                        let tr              = e.target.parentNode.parentNode
                        let codProdCanje    = document.querySelector('#codigoProductoCanje')
                        let descProdCanje   = document.querySelector('#descripcionProductoCanje')
                    
                        codProdCanje.value  = tr.querySelector("td:nth-of-type(2)").innerText
                        descProdCanje.value = tr.querySelector("td:nth-of-type(3)").innerText
                        $(idModal).hide()
                    })
                }
            })
        })
    })
}

/**
 * Calcula la fecha de retiro según código de producto seleccionado y lugar de recepción.
 * @param {string} idLugarRecep
 * @param {string} codigoProducto
 * @param {string} tipoReparacion
 * @param {string} atencionReparacion
 */
function calculaFechaRetiro(idLugarRecep, codigoProducto, tipoReparacion, atencionReparacion){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/fechaDeRetiro_search.php?lugar='+idLugarRecep+'&codigo='+codigoProducto+'&tipo='+tipoReparacion+'&atencion='+atencionReparacion)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
            } else {
                reject()
            }
        })
    })
}

/**
 * Calcula la fecha de retiro según código de producto seleccionado y lugar de recepción en presupuesto.
 * @param {string} idLugarRecep
 * @param {string} codigoProducto
 * @param {string} tipoReparacion
 * @param {string} atencionReparacion
 */
 function calculaFechaPresupuesto(idLugarRecep, codigoProducto, tipoReparacion, atencionReparacion){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/fechaDePresupuesto_search.php?lugar='+idLugarRecep+'&codigo='+codigoProducto+'&tipo='+tipoReparacion+'&atencion='+atencionReparacion)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de formas de resolución. Admite 2 parámetros, select para el id del campo y activo por defecto "todos", con valor "S" solo activos
 * @param {string} select
 * @param {string} activo
 */
function cargaFormasDeResolucionOSCA(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/formasRetiro/formasRetiroOSCA_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0">Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.formasderetiro_id}">${element.descripcion}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de Marcas
 * @param {string} select
 * @param {string} activo
 */
 function cargaMarcas(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/marcas/marcas_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0">Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.marca_id}">${element.descripcion}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de sucursales. Admite un solo parámetro con el cual se define el input en donde se cargará
 * @param {string} select
 */
 function cargaSucursales(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/sucursales/sucursales_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0" selected>Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.sucursal_id}">${element.descripcion}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de lugaresRecepcion. Admite un solo parámetro con el cual se define el input en donde se cargará
 * @param {string} select
 */
 function cargaLugaresRecepcion(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/lugaresRecepcion/lugaresRecepcion_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0" selected>Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.lugar_recepcion_id}">${element.descripcion}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de perfiles. Admite un solo parámetro con el cual se define el input en donde se cargará
 * @param {string} select
 */
 function cargaPerfiles(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/configuracion/perfiles/perfiles_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0" selected>Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.perfil_id}">${element.descripcion}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de lugar Recepcion. Admite un solo parámetro con el cual se define el input en donde se cargará
 * @param {string} select
 */
 function cargaLugarRecepcion(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/lugaresRecepcion/lugaresRecepcion_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0" selected>Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.lugar_recepcion_id}">${element.descripcion}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de Familias
 * @param {string} select
 * @param {string} activo
 */
 function cargaFamilias(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/familias/familias_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0">Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.familia_id}">${element.descripcion}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de Sucursales
 * @param {string} select
 * @param {string} activo
 */
 function cargaSucursales(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/tablas/sucursales/sucursales_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0">Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.sucursal_id}">${element.descripcion}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Carga el select de Tecnicos
 * @param {string} select
 * @param {string} activo
 */
 function cargaTecnicos(select){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_repa/configuracion/usuarios/usuariosTecnicos_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = '<option value= "0">Seleccionar</option>'
                respuesta.forEach(element => {
                    template += `<option value= "${element.usuario_id}">${element.apellido}, ${element.nombre}</option>`
                })
                select.innerHTML = template
            } else {
                reject()
            }
        })
    })
}

/**
 * Limita cantidad de caractéres de un campo.
 * @param {string} campo
 * @param {number} cant
 */
function limitaCaracteres(campo, cant){
    campo.addEventListener('input',function(){
        if(this.value.length > cant) {
            this.value = this.value.slice(0,cant);
        }
    })
}

/**
 * Convertir a mayúsculas.
 * @param {string} campo
 */
 function todoEnMayusculas(campo){
    campo.addEventListener('input',function(){
        this.value = this.value.toUpperCase();
    })
}

/**
 * Convertir a minúsculas.
 * @param {string} campo
 */
 function todoEnMinusculas(campo){
    campo.addEventListener('input',function(){
        this.value = this.value.toLowerCase();
    })
}

/**
 * Permitir solo números.
 * @param {string} campo
 */
 function soloNumeros(campo){
    campo.addEventListener('keypress', (e) => {
        //let key = window.event ? e.which : e.keyCode;
        let key = e.keyCode;
        if (key < 48 || key > 57) {
          e.preventDefault();
        }
    })
}

/**
 * Permitir solo moneda (Valor decimal con 2 digitos despues de la coma).
 * @param {string} campo
 */
 function soloMoneda(campo){
    campo.addEventListener('keypress', (e) => {

        let key = e.keyCode;
        if (key < 48 || key > 57) {
            if(key != 46){
                e.preventDefault();
            }
        }
    })
}

/**
 * Sweet Alert - Transacción Exitosa
 */
 function msgTransaccionExitosa(){
    swal({
        title   : "Perfecto!!!",
        text    : `El registro fue grabado con éxito!`,
        type    : "success",
    });
}

/**
 * Sweet Alert - Aviso de solicitud
 */
 function msgAvisoOc(){
    swal({
        title   : "Atención:( !",
        text    : `Cliente solicita OC`,
        type    : "warning",
    });
}

/**
 * Sweet Alert - Cliente duplicado
 */
 function msgClienteDuplicado(){
    swal({
        title   : "Atención:( !",
        text    : "Ya existe el código de cliente ingresado.",
        type    : "warning",
    });
}

/**
 * Sweet Alert - Hubo errores en la grabación
 */
function msgAlgoNoFueBien(){
    swal({
        title   : "Hubo errores durante la grabación:( !",
        text    : "Por favor, contáctese con el Dpto. de Sistemas.",
        type    : "error",
    });
}

/**
 * Sweet Alert - Hubo errores en la grabación
 */
 function msgAlgoNoFueBienRecep(error){
    swal({
        title   : "Hubo errores durante la grabación:( !",
        text    : "Por favor, contáctese con el Dpto. de Sistemas." + error,
        type    : "error",
    });
}

/**
 * Sweet Alert - Hubo errores en la grabación
 */
 function msgAlgoNoFueBienReload(msg){
    swal({
        title   : "Hubo errores durante la grabación:( !",
        text    : msg,
        type    : "error",
    });
}

/**
 * Sweet Alert - Usuario no habilitado
 */
function msgUsuarioNoHabilitado(){
    swal({
        title   : "Permisos insuficientes :( !",
        text    : "Tu usuario no tiene permisos para asignar cargo a una orden.",
        type    : "error",
    });
}

/**
 * Sweet Alert - Usuario no es reparador
 */
function msgUsuarioNoEsReparador(){
    swal({
        title   : "Permisos insuficientes :( !",
        text    : "Tu usuario no es un reparador habilitado.",
        type    : "error",
    });
}

/**
 * Sweet Alert - Mensaje Registro Cancelado
 */
function msgCancelado(){
    swal({
        title   : "Cancelado",
        text    : "El registro no fue modificado :)",
        type    : "warning",
    });
}

/**
 * Sweet Alert - Mensaje Registro Eliminado
 */
function msgEliminado(){
    swal({
        title   : "Eliminado!",
        text    : "El registro fue eliminado.",
        type    : "success",
    });
}

/**
 * Sweet Alert - Mensaje Perfil no habilitado
 */
 function msgErrorPerfil(){
    swal({
        title   : "Atención!",
        text    : "Tu usuario no tiene permisos para realizar esta acción.",
        type    : "warning",
    });
}

/**
 * Sweet Alert - Mensaje en uso
 */
 function msgEnUso(){
    swal({
        title   : "Atención!",
        text    : "No se puede eliminar el registro ya que se encuentra en uso.",
        type    : "warning",
    });
}

/**
 * Busca el valor de rep_param según el id dado
 * @param {string} id
 */
function paramValue (id){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/paramValue_search.php?id='+id)
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
            } else {
                reject()
            }
        })
    })
}

/**
 * Verifico si es un reparador válido
 */
 function soyReparador(){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/soyReparador_search.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
            } else {
                reject()
            }
        })
    })
}

/**
 * Verifico la planta del usuario logueado
 */
function plantaUsuario(){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/usuarioPlanta_search.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
            } else {
                reject()
            }
        })
    })
}

/**
 * Completa el desplegable de estantes con los estantes activos
 * @param {string} campo
 */
    function estanteList(campo) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/estantes/estantes_list.php?activo='+'S')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = ''
                respuesta.forEach(element => {
                    template +=`<option value='${element.estante_id}'>${element.nombre}</option>`
                });
                campo.innerHTML = template
            }
        })
    })
}

/**
 * Completa el desplegable de técnicos
 * @param {string} campo
 */
 function tecnicosList(campo) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/tecnicos_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                let template = `<option value='0' selected>N/A</option>`
                respuesta.forEach(element => {
                    template +=`<option value='${element.id_tecnico}'>${element.nombre}</option>`
                });
                campo.innerHTML = template
            }
        })
    })
}

/**
 * Completa el desplegable de fletes
 * @param {string} campo
 */
 function fletes(campo){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_compras/busquedas/fletes_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                //console.log(respuesta.data)
                let template = `<option value='0' selected>Seleccionar</option>`
                respuesta.forEach(element => {
                    template +=`<option value='${element.flete_id}'>${element.descripcion}</option>`
                });
                campo.innerHTML = template
            }
        })
    })
}

/**
 * Completa el desplegable de grupos de equipos
 * @param {string} campo
 */
 function gruposList(campo){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/admin/tablas/grupos/grupos_list.php')
        xhr.send()
        xhr.addEventListener('load', () => {
            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)
                resolve(respuesta)
                //console.log(respuesta.data)
                let template = `<option value selected>Seleccionar</option>`
                respuesta.forEach(element => {
                    template +=`<option value='${element.GRUPO_ID}'>${element.DESCRIPCION}</option>`
                });
                campo.innerHTML = template
            }
        })
    })
}

/**
 * Muestra archivo Adjunto
 * @param {string} archivo
 */
 function verImagenes(archivo, divFotos, urlDelete, eliminar = true){

    let template =`
        <div class="file-box">
            <a target="_blank" href="${archivo}">
                <div class="file">
                    <div class="image" style="display: flex; align-items: center; justify-content: center;">
                        <i class="fa fa-paperclip fa-3x"></i>
                    </div>
                    <div class="file-name" id="${archivo}">
                        <div class="text-center">
    `
    if(eliminar){
        template += `
                            <a href="#" id="btnEliminarFoto">
                                Eliminar
                            </a>
        `
    } else {
        template += `       <small>Click para ampliar</small>`
    }
    template +=`
                        </div>
                    </div>
                </div>
            </a>
        </div>
    `
    divFotos.innerHTML = template

    if(eliminar){

        let btnEliminarFoto = document.querySelectorAll('#btnEliminarFoto')

        btnEliminarFoto.forEach(eliminar => {
            eliminar.addEventListener('click', e => {
                e.preventDefault()
                let nombre = e.target.parentNode.parentNode.id
                //console.log(nombre)
                function eliminarImagen(nameImg){
                    let xhr = new XMLHttpRequest
                    xhr.open('GET', urlDelete)
                    xhr.send()
                    xhr.addEventListener('load', () => {
                        if(xhr.status == 200){
                            $(e.target.parentNode.parentNode.parentNode.parentNode).remove();
                        }
                    })
                }
                swal({
                    title               : "Desea eliminar el archivo definitivamente?",
                    type                : "warning",
                    showCancelButton    : true,
                    confirmButtonColor  : "#DD6B55",
                    confirmButtonText   : "Si, Eliminar!",
                    cancelButtonText    : "No, Cancelar!",
                    closeOnConfirm      : true,
                    closeOnCancel       : true
                    },

                    function (isConfirm) {
                        if (isConfirm) {
                            eliminarImagen(nombre)
                        }
                    }
                )
            })
        })
    }
}

/**
 * Funcionalidad link órdenes para right-sidebar
 */
function linkOrdenFicha(){
    let sideBar             = document.querySelector('#right-sidebar')
    let cerrarSideBar       = document.querySelector('#cerrarSideBar')
    let btnSalirFicha       = document.querySelector('#cancelarFicha')
    let btnDatosClientes    = document.querySelector('#btnDatosClientes')
    let btnHistInterplanta  = document.querySelector('#btnHistorialInterplanta')
    let btnHistCargo        = document.querySelector('#btnHistorialCargo')
    let btnCloseModal       = document.querySelector('#btnCloseModal')
    let btnCerrarModal      = document.querySelector('#btnCerrarModal')
    let formSolapa1         = document.querySelector('#formRetiroFicha')
    let inputsSolapa1       = formSolapa1.querySelectorAll('input, select, textarea')
    let tecnico             = document.querySelector('#tecnico')

    $(document).on('click', '.list-item', (e) => {
        e.preventDefault()
        let num     = e.target.innerText

        tecnicosList(tecnico).then(() =>{
            datosFichaSolapa1(num)
        })

        cargaPlantillaFicha(num, true).then(() =>{
            btnHistInterplanta.value = num
            btnHistCargo.value = num
            datosFichaSolapa2(num)
        })
        sideBar.classList.add("sidebar-open")
        $('#sideBarContainer').scrollTop(0)
        $('#tab-1').addClass("active");
        $('#tab-2').removeClass("active");
        $('#solapa1').addClass("active");
        $('#solapa2').removeClass("active");
    })

    cerrarSideBar.addEventListener('click', e => {
        e.preventDefault()
        sideBar.classList.remove("sidebar-open")
    })

    btnSalirFicha.addEventListener('click', e =>{
        e.preventDefault()
        cleanInputs(inputsSolapa1)
        sideBar.classList.remove("sidebar-open")
    })

    btnDatosClientes.addEventListener('click', e => {
        e.preventDefault()
        $('#bodyRetiro').empty()
        $('#titulo').text('Datos cliente')
        $('#bodyRetiro').load('mod_sirep/admin/tablas/clientes/clientes_abm.php', () => {
            let formClienteModal = document.querySelector('#formClientes')
            let inputsCliente = formClienteModal.querySelectorAll('input, select, textarea')
            let selectZonas = document.querySelector('#clienteZonasDespacho')
            //console.log(inputsCliente)
            let id = e.target.value
            let url = 'mod_sirep/admin/tablas/clientes/clientes_single.php'
            cargaZonasDespacho(selectZonas).then(() => {
                showData(id, url, inputsCliente)
            })
            $('#modal_retiro').show()
            $('#botonesAbmClientes').hide()
            inputsCliente.forEach(element => {
                if(element.type == "radio" || element.type == "checkbox"){
                    element.disabled = true
                } else {
                    element.readOnly = true
                }
            })
            selectZonas.disabled = true
        })
    })

    btnHistInterplanta.addEventListener('click', e => {
        e.preventDefault()
        $('#bodyRetiro').empty()
        $('#titulo').text('')
        $('#bodyRetiro').load('mod_sirep/admin/buscar/generica/histInterplanta.php', () => {
            let id = e.target.value
            let url = 'mod_sirep/admin/buscar/generica/histInterplanta_search.php?id='+id
            let xhr = new XMLHttpRequest
            xhr.open('GET', url)
            xhr.send()
            xhr.addEventListener('load', () => {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    //console.log(respuesta)
                    let template = ''
                    if(respuesta == ''){
                        template += `<tr>
                                        <td colspan="5" class="text-center">No hay registros.</td>
                                    </tr>`
                    } else {
                        respuesta.forEach(element => {
                            template += `<tr>
                                            <td>${element.fecha}</td>
                                            <td>${element.Planta}</td>
                                            <td>${element.prefijo}</td>
                                            <td>${element.numero}</td>
                                            <td>${element.usuario}</td>
                                        </tr>`
                        });
                    }

                    $('#tbodyhistInterplanta').html(template)
                }
            })
        $('#modal_retiro').show()
        })
    })

    btnHistCargo.addEventListener('click', e => {
        e.preventDefault()
        $('#bodyRetiro').empty()
        $('#titulo').text('')
        $('#bodyRetiro').load('mod_sirep/admin/buscar/generica/histCargo.php', () => {
            let id = e.target.value
            let url = 'mod_sirep/admin/buscar/generica/histCargo_search.php?id='+id
            let xhr = new XMLHttpRequest
            xhr.open('GET', url)
            xhr.send()
            xhr.addEventListener('load', () => {
                if(xhr.status == 200){
                    let respuesta = JSON.parse(xhr.response)
                    //console.log(respuesta)
                    let template = ''
                    if(respuesta == ''){
                        template += `<tr>
                                        <td colspan="4" class="text-center">No hay registros.</td>
                                     </tr>`
                    } else {
                        respuesta.forEach(element => {
                            template += `<tr>
                                            <td>${element.fecha}</td>
                                            <td>${element.descripcion}</td>
                                            <td>${element.costo}</td>
                                            <td>${element.reparacion_detalle}</td>
                                        </tr>`
                        });
                    }

                    $('#tbodyhistCargo').html(template)
                }
            })
        $('#modal_retiro').show()
        })
    })

    btnCerrarModal.addEventListener('click', e => {
        e.preventDefault()
        $('#modal_retiro').hide()
    })

    btnCloseModal.addEventListener('click', e => {
        e.preventDefault()
        $('#modal_retiro').hide()
    })

}

/**
 * Funcionalidad btn historial service en ficha retiro para los informes
 */
 function btnHistorialService(){
    let btnCerrarModalServ  = document.querySelector('#btnCerrarModalServce')
    let btnCloseModalServ   = document.querySelector('#btnCloseModalService')
    let btnHistorialService = document.querySelector('#btnHistorialService')
    let selectHistService   = document.querySelector('#selectClienteHistService')
    let tbody_histService   = document.querySelector('#tbody_histService')
    let cantClientesModal   = document.querySelector('#cantidadClientesModal')
    let perfil              = ''

    perfilUsuario().then((respuesta) => {
        perfil = respuesta[0].perfil_id
        if(perfil == '1' || perfil == '2' || perfil == '8' || perfil == '9' || perfil == '13' || perfil == '15') {
            $('#btnHistorialService').show()
        } else {
            $('#btnHistorialService').hide()
        }
    })

    btnCerrarModalServ.addEventListener('click', e => {
        e.preventDefault()
        $('#modal_service').hide()
    })

    btnCloseModalServ.addEventListener('click', e => {
        e.preventDefault()
        $('#modal_service').hide()
    })

    btnHistorialService.addEventListener('click', e => {

        e.preventDefault()
        tbody_histService.innerHTML = ''
        selectHistService.innerHTML = ''

        let serie   = e.target.value
        let codigo  = document.querySelector('#productoCodigo')

        let xhr = new XMLHttpRequest
        xhr.open('GET', 'mod_sirep/busquedas/historialService_search.php?serie='+serie+'&codigo='+codigo.value)
        xhr.send()
        xhr.addEventListener('load', () => {

            if(xhr.status == 200){
                let respuesta = JSON.parse(xhr.response)

                switch (respuesta.estado) {
                    case 'Serie ok':
                        $('#modal_service').show()
                        let template = '<option value="">Seleccionar</option>'
                        respuesta.resultado.forEach(element => {
                            template +=`<option value="${element[0].id_cliente}">${element[0].cliente}</option>`
                        });
                        selectHistService.innerHTML = template

                        selectHistService.addEventListener('change', () => {
                            let templateTable = ''
                            if(selectHistService.value != ''){
                                respuesta.resultado.forEach(element => {
                                    if(element[0].id_cliente == selectHistService.value){
                                        element.forEach(subElement => {
                                            templateTable += `
                                            <tr>
                                                <td>${subElement.pedido}</td>
                                                <td>${subElement.fecha_service}</td>
                                                <td>${subElement.cliente}</td>
                                                <td>${subElement.tecnico}</td>
                                                <td>${subElement.codigo}</td>
                                                <td>${subElement.descripcion}</td>
                                                <td>${subElement.serie}</td>
                                                <td>${subElement.desccargo}</td>
                                                <td>${subElement.producto_observaciones}</td>
                                                <td>${subElement.texto_problemas}</td>
                                                <td>${subElement.texto_soluciones}</td>
                                                <td>${subElement.texto_recomendaciones}</td>
                                            </tr>
                                        `
                                        });
                                    }
                                });
                            } else {
                                templateTable = ''
                            }
                            tbody_histService.innerHTML = templateTable
                        })

                        cantClientesModal.innerHTML = `Cantidad de clientes encontrados: <b>${respuesta.contadorClientes}</b>, click en desplegable para seleccionar`

                        break;
                    case 'Error serie':
                        swal('Atención', 'No hay registros para el número de serie seleccionado', 'warning')
                    default:
                        break;
                }
            }
        })
    })

}

/**
 * Retorna el valor de la cookie según nombre indicado en el parámetro.
 */

function leerCookie(nombre) {
    let micookie = ''
    let lista = document.cookie.split(";");

    for (i in lista) {
        let busca = lista[i].search(nombre);

        if (busca > -1) {
            micookie = lista[i]
        }
    }
    let igual = micookie.indexOf("=");
    let valor = micookie.substring(igual+1);

    return valor;
}

/**
 * Trae datos del stock de adonix de los equipos pasados como parámetros
 * @param {*} destino Indica el div a donde se coloca la información
 * @param {*} codigo Código de reparación
 * @param {*} sinonimo Código de producto nuevo
 */

function stockAdonix(destino, codigo, sinonimo){
    let xhr4 = new XMLHttpRequest
    xhr4.open('GET', 'mod_sirep/busquedas/stockAdonix_search.php?codigo='+codigo+'&sinonimo='+sinonimo)
    xhr4.send()
    xhr4.addEventListener('load', () =>{
        if(xhr4.status == 200){
            let respuesta = JSON.parse(xhr4.response)

            let template = ''
            if(respuesta == ''){
                template += `<tr>
                                <td colspan="9" class="text-center">No hay registros.</td>
                            </tr>`
            } else {
                respuesta.forEach(element => {
                    template += `<tr>
                                    <td>${element.ARTICULO}</td>
                                    <td>${element.DESCRIPCION}</td>
                                    <td>${parseInt(element.CANTIDAD).toFixed(3)}</td>
                                    <td>${element.UNIDAD}</td>
                                    <td>${element.DEPOSITO}</td>
                                    <td>${element.TIPO_UBICACION}</td>
                                    <td>${element.UBICACION}</td>
                                    <td>${element.ESTADO_ARTICULO}</td>
                                    <td>${element.ESTADO_STOCK}</td>
                                </tr>`
                }); 
            }
            destino.innerHTML = template
        }
    })
}

/**
 * Habilita o deshabilita checks dependientes de un check padre.
 * Admite un parametro y es el modelo de la ficha
 * @param {string} modelo
 */
    function cambiaEstadoChecks(modelo){
    switch (modelo) {
        case '2':
            let radios                  = document.querySelectorAll('#plaqueta, #plaquetaInt, #plaquetaRw')
            let radiosPlaqueta          = document.querySelectorAll('#plaquetaInt, #plaquetaRw')
            let hijosPlaqueta           = document.querySelectorAll('#plaquetaQuemada, #plaquetaInutil, #plaquetaDirecta')

            radios.forEach(element => {
                element.addEventListener('click', () => {

                    hijosPlaqueta.forEach(elementP => {
                        if(element.id == 'plaqueta'){
                            elementP.disabled = true
                            elementP.checked = false
                        } else {
                            elementP.disabled = false
                        }
                    });

                })
            });

            radiosPlaqueta.forEach(elementR =>{
                if(elementR.checked == true){
                    hijosPlaqueta.forEach(elementHP => {
                        elementHP.disabled = false
                    })
                }
            })

            let diafragma               = document.querySelector('#diafragmaSupInf')
            let hijosDiafragma          = document.querySelectorAll('#sensorDiafragmaDeformado, #sensorDiafragmaRoto')

            diafragma.addEventListener('click', () => {

                hijosDiafragma.forEach(elementHD => {
                    if(diafragma.checked == true){
                        elementHD.disabled = false
                    } else {
                        elementHD.disabled = true
                        elementHD.checked = false
                    }

                })

            })

            let checkImpulsor           = document.querySelector('#impulsor')
            let hijosCheckImpulsor      = document.querySelectorAll('#impulsorObstruido, #impulsorRoscaSuelta, #impulsorRoto')

            if(checkImpulsor.checked == true){
                hijosCheckImpulsor.forEach(elementCI => {
                    elementCI.disabled = false
                })
            }

            let checkRotor           = document.querySelector('#rotorYEje')
            let hijosCheckRotor      = document.querySelectorAll('#rotorYEjeGastado, #rotorYEjeRayado, #rotorYEjeEncSuelto, #rotorYEjeDistSuelto')

            if(checkRotor.checked == true){
                hijosCheckRotor.forEach(elementCR => {
                    elementCR.disabled = false
                })
            }

            let checkBujeD           = document.querySelector('#bujeD')
            let hijosCheckBujeD      = document.querySelectorAll('#bujeGrafitoD, #bujeBronceD')

            if(checkBujeD.checked == true){
                hijosCheckBujeD.forEach(elementCBD => {
                    elementCBD.disabled = false
                })
            }

            let checkBujeT           = document.querySelector('#bujeT')
            let hijosCheckBujeT      = document.querySelectorAll('#bujeGrafitoT, #bujeBronceT')

            if(checkBujeT.checked == true){
                hijosCheckBujeT.forEach(elementCBT => {
                    elementCBT.disabled = false
                })
            }

            let checkTapaSup         = document.querySelector('#tapaSuperior')
            let hijosCheckTapaSup    = document.querySelectorAll('#tapaSuperiorPerdida, #tapaSuperiorDuroDesplazar, #tapaSuperiorDesalineada')

            if(checkTapaSup.checked == true){
                hijosCheckTapaSup.forEach(elementCTS => {
                    elementCTS.disabled = false
                })
            }

            let bobinadoGral            = document.querySelector('#bobinado')
            let hijosBobinado           = document.querySelectorAll('#bobinadoBajaRigidez, #bobinadoEnCorto, #bobinadoSinContinuidad, #bobinadoPerdidaAislante, #bobinadoReparadoAfuera, #bobinadoAmperajeFueraRango, #bobinadoGiroInvertido, #bobinadoSinKlixon, #bobinadoCuerpoDeteriorado')

            if(bobinadoGral.checked == true){
                hijosBobinado.forEach(elementHB => {
                    elementHB.disabled = false
                })
            }

            let checkDiaf         = document.querySelector('#diafragmaSupInf')
            let hijosCheckDiaf    = document.querySelectorAll('#sensorDiafragmaDeformado, #sensorDiafragmaRoto')

            if(checkDiaf.checked == true){
                hijosCheckDiaf.forEach(elementD => {
                    elementD.disabled = false
                })
            }

            break;

        case '3':
            let diafragma2               = document.querySelector('#diafragmaSupInf')
            let partesDiafragmaPress     = document.querySelectorAll('#presostatoYResorte, #sensorFlujoPress')
            let hijosPresostato2         = document.querySelectorAll('#presostatoDiafragmaDeformado, #presostatoDiafragmaRoto, #presostatoInundada, #presostatoDuroDesplazar')
            let hijosSensor2             = document.querySelectorAll('#sensorDiafragmaDeformado, #sensorDiafragmaRoto')

            diafragma2.addEventListener('click', () => {

                partesDiafragmaPress.forEach(elementPartDiaf => {

                    if(diafragma2.checked == true){
                        elementPartDiaf.disabled = false
                    } else {
                        elementPartDiaf.disabled = true
                        elementPartDiaf.checked = false
                        hijosPresostato2.forEach(elementHP2 => {
                            elementHP2.disabled = true
                            elementHP2.checked = false
                        });
                        hijosSensor2.forEach(elementHS2 => {
                            elementHS2.disabled = true
                            elementHS2.checked = false
                        });
                    }

                    elementPartDiaf.addEventListener('click', () => {
                        if(elementPartDiaf.id == 'presostatoYResorte'){
                            hijosPresostato2.forEach(elementHP3 => {
                                if(elementPartDiaf.checked == true){
                                    elementHP3.disabled = false
                                } else {
                                    elementHP3.disabled = true
                                    elementHP3.checked = false
                                }
                            });
                        } else {
                            hijosSensor2.forEach(elementHS => {
                                if(elementPartDiaf.checked == true){
                                    elementHS.disabled = false
                                } else {
                                    elementHS.disabled = true
                                    elementHS.checked = false
                                }
                            })
                        }
                    })

                });

            })

            let checkImpulsor2           = document.querySelector('#impulsor')
            let hijosCheckImpulsor2      = document.querySelectorAll('#impulsorObstruido, #impulsorRoscaSuelta, #impulsorRoto')

            if(checkImpulsor2.checked == true){
                hijosCheckImpulsor2.forEach(elementCI2 => {
                    elementCI2.disabled = false
                })
            }

            let bobinadoGral2            = document.querySelector('#bobinado')
            let hijosBobinado2           = document.querySelectorAll('#bobinadoBajaRigidez, #bobinadoEnCorto, #bobinadoSinContinuidad, #bobinadoPerdidaAislante, #bobinadoReparadoAfuera, #bobinadoAmperajeFueraRango, #bobinadoGiroInvertido, #bobinadoSinKlixon, #bobinadoCuerpoDeteriorado')

            if(bobinadoGral2.checked == true){
                hijosBobinado2.forEach(elementHB2 => {
                    elementHB2.disabled = false
                })
            }

            let checkRotor2           = document.querySelector('#rotorYEje')
            let hijosCheckRotor2      = document.querySelectorAll('#rotorYEjeGastado, #rotorYEjeRayado, #rotorYEjeEncSuelto, #rotorYEjeDistSuelto')

            if(checkRotor2.checked == true){
                hijosCheckRotor2.forEach(elementCR2 => {
                    elementCR2.disabled = false
                })
            }

            let checkBujeD2           = document.querySelector('#bujeD')
            let hijosCheckBujeD2      = document.querySelectorAll('#bujeGrafitoD, #bujeBronceD')

            if(checkBujeD2.checked == true){
                hijosCheckBujeD2.forEach(elementCBD2 => {
                    elementCBD2.disabled = false
                })
            }

            let checkBujeT2           = document.querySelector('#bujeT')
            let hijosCheckBujeT2      = document.querySelectorAll('#bujeGrafitoT, #bujeBronceT')

            if(checkBujeT2.checked == true){
                hijosCheckBujeT2.forEach(elementCBT2 => {
                    elementCBT2.disabled = false
                })
            }

            let checkTapaSup2         = document.querySelector('#tapaSupConSoporteRPX')
            let hijosCheckTapaSup2    = document.querySelectorAll('#tapaSuperiorPerdida, #tapaSuperiorDuroDesplazar')

            if(checkTapaSup2.checked == true){
                hijosCheckTapaSup2.forEach(elementCTS2 => {
                    elementCTS2.disabled = false
                })
            }

            let checkDiafSupInf        = document.querySelector('#diafragmaSupInf')
            let hijosCheckDiafSupInf   = document.querySelectorAll('#presostatoYResorte, #sensorFlujoPress')

            if(checkDiafSupInf.checked == true){
                hijosCheckDiafSupInf.forEach(elementCDSI => {
                    elementCDSI.disabled = false
                })
            }

            let checkPresRes         = document.querySelector('#presostatoYResorte')
            let hijosCheckPresRes    = document.querySelectorAll('#presostatoDiafragmaDeformado, #presostatoDiafragmaRoto, #presostatoInundada, #presostatoDuroDesplazar')

            if(checkPresRes.checked == true){
                hijosCheckPresRes.forEach(elementCPR2 => {
                    elementCPR2.disabled = false
                })
            }

            let checkDiaf2         = document.querySelector('#sensorFlujoPress')
            let hijosCheckDiaf2    = document.querySelectorAll('#sensorDiafragmaDeformado, #sensorDiafragmaRoto')

            if(checkDiaf2.checked == true){
                hijosCheckDiaf2.forEach(elementD2 => {
                    elementD2.disabled = false
                })
            }



            break;

        default:
            break;
    }

    let checkHijo           = ''
    let arrayPadres         = []
    let arrayHijosFichas    = [ //1-electrobomba, 2-sfl, 3-press, 4-gpr, 5-control
        {
            'idPadre'   : '#impulsor',
            'model'     : '2',
            'subgroup'  : 'impulsor',
            'type'      : 'checkbox',
            'checks'    : ['impulsorObstruido', 'impulsorRoscaSuelta', 'impulsorRoto']
        },
        {
            'idPadre'   : '#impulsor',
            'model'     : '3',
            'subgroup'  : 'impulsor',
            'type'      : 'checkbox',
            'checks'    : ['impulsorObstruido', 'impulsorRoscaSuelta', 'impulsorRoto']
        },
        {
            'idPadre'   : '#bobinado',
            'model'     : '2',
            'subgroup'  : 'bobinado',
            'type'      : 'checkbox',
            'checks'    : ['bobinadoBajaRigidez', 'bobinadoEnCorto', 'bobinadoSinContinuidad', 'bobinadoPerdidaAislante', 'bobinadoReparadoAfuera', 'bobinadoAmperajeFueraRango', 'bobinadoGiroInvertido', 'bobinadoSinKlixon', 'bobinadoCuerpoDeteriorado']
        },
        {
            'idPadre'   : '#bobinado',
            'model'     : '3',
            'subgroup'  : 'bobinado',
            'type'      : 'checkbox',
            'checks'    : ['bobinadoBajaRigidez', 'bobinadoEnCorto', 'bobinadoSinContinuidad', 'bobinadoPerdidaAislante', 'bobinadoReparadoAfuera', 'bobinadoAmperajeFueraRango', 'bobinadoGiroInvertido', 'bobinadoSinKlixon', 'bobinadoCuerpoDeteriorado']
        },
        {
            'idPadre'   : '#rotorYEje',
            'model'     : '2',
            'subgroup'  : 'rotorYEje',
            'type'      : 'checkbox',
            'checks'    : ['rotorYEjeGastado', 'rotorYEjeRayado', 'rotorYEjeEncSuelto', 'rotorYEjeDistSuelto']
        },
        {
            'idPadre'   : '#rotorYEje',
            'model'     : '3',
            'subgroup'  : 'rotorYEje',
            'type'      : 'checkbox',
            'checks'    : ['rotorYEjeGastado', 'rotorYEjeRayado', 'rotorYEjeEncSuelto', 'rotorYEjeDistSuelto']
        },
        {
            'idPadre'   : '#tapaSuperior',
            'model'     : '2',
            'subgroup'  : 'tapaSuperior',
            'type'      : 'checkbox',
            'checks'    : ['tapaSuperiorPerdida', 'tapaSuperiorDuroDesplazar', 'tapaSuperiorDesalineada']
        },
        {
            'idPadre'   : '#tapaSupConSoporteRPX',
            'model'     : '3',
            'subgroup'  : 'tapaSupConSoporteRPX',
            'type'      : 'checkbox',
            'checks'    : ['tapaSuperiorPerdida', 'tapaSuperiorDuroDesplazar']
        },
        {
            'idPadre'   : '#bujeD',
            'model'     : '2',
            'subgroup'  : 'bujeD',
            'type'      : 'checkbox',
            'checks'    : ['bujeGrafitoD', 'bujeBronceD']
        },
        {
            'idPadre'   : '#bujeD',
            'model'     : '3',
            'subgroup'  : 'bujeD',
            'type'      : 'checkbox',
            'checks'    : ['bujeGrafitoD', 'bujeBronceD']
        },
        {
            'idPadre'   : '#bujeT',
            'model'     : '2',
            'subgroup'  : 'bujeT',
            'type'      : 'checkbox',
            'checks'    : ['bujeGrafitoT', 'bujeBronceT']
        },
        {
            'idPadre'   : '#bujeT',
            'model'     : '3',
            'subgroup'  : 'bujeT',
            'type'      : 'checkbox',
            'checks'    : ['bujeGrafitoT', 'bujeBronceT']
        },
    ]

    if(modelo == '2' || modelo == '3') {
        arrayHijosFichas.forEach(element => {
            if(element.model == modelo){
                arrayPadres.push(element.idPadre)
            }
        });
        let strArrayPadres = arrayPadres.toString()
        let padres = document.querySelectorAll(strArrayPadres)

        padres.forEach(padre => {
            padre.addEventListener('click', () => {
                arrayHijosFichas.forEach(element => {
                    if( (element.model == modelo) && (element.subgroup == padre.id) ) {
                        element.checks.forEach(hijo => {
                            checkHijo = document.querySelector('#'+hijo)
                            if(padre.checked == true){
                                checkHijo.disabled = false
                            } else {
                                checkHijo.checked = false
                                checkHijo.disabled = true
                            }
                        });
                    }
                })
            })
        });
    }
}
