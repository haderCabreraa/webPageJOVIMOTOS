
const inventario = {
    "yamaha" : [
        {
            "nombre": "DT", 
            "modelo": 1997, 
            "referencia": "DT175", 
            "cilindraje": 171, 
            "foto": "img/moto1.jpeg",
            "precio": 2300000,
            "kilometraje": 23000,
            nombreCompleto: function () {
                return this.nombre + " " + this.apellido
            }
        },
        {
            "nombre": "FZ", 
            "modelo": 2022, 
            "referencia": "FZ-FAZER", 
            "cilindraje": 150, 
            "foto": "img/moto2.jpeg",
            "precio": 2300000,
            "kilometraje": 23000,
            nombreCompleto: function () {
                return this.nombre + " " + this.apellido
            }
        },
        {
            "nombre": "FZ", 
            "modelo": 2022, 
            "referencia": "FZ-FAZER", 
            "cilindraje": 150, 
            "foto": "img/moto2.jpeg",
            "precio": 2300000,
            "kilometraje": 23000,
            nombreCompleto: function () {
                return this.nombre + " " + this.apellido
            }
        },
        {
            "nombre": "MT", 
            "modelo": 2022, 
            "referencia": "MT-03", 
            "cilindraje": 299, 
            "foto": "img/moto3.jpeg",
            "precio": 2300000,
            "kilometraje": 23000,
            nombreCompleto: function () {
                return this.nombre + " " + this.apellido
            }
        }
    ],

    "honda" : [
        {
            "nombre": "NAVI", 
            "modelo": 2020, 
            "referencia": "VANI MIX", 
            "cilindraje": 110,      
            "foto":"img/moto4.jpeg",
            "precio": 2300000,
            "kilometraje": 23000,
            nombreCompleto: function () {
                return this.nombre + " " + this.apellido
            }
        },
        {
            "nombre": "CBX", 
            "modelo": 2023, 
            "referencia": "TWISTER", 
            "cilindraje": 250, 
            "foto":"img/moto3.jpeg",
            "precio": 2300000,
            "kilometraje": 23000,
            nombreCompleto: function () {
                return this.nombre + " " + this.apellido
            }
        },
        {
            "nombre": "CB", 
            "modelo": 2022, 
            "referencia": "CB-660", 
            "cilindraje": 660, 
            "foto":"img/moto3.jpeg",
            "precio": 2300000,
            "kilometraje": 23000,
            nombreCompleto: function () {
                return this.nombre + " " + this.apellido
            }
        }
    ]
};
        //Insertar un DIV como hijo de un PADRE
            const datos = new Array();
            const datosMarca = new Array();
            let cantidadMotos = 0;
            const element = document.querySelector(".newsCards");

            const botonAtrasDOM = document.querySelector(".atras");
            const botonSiguienteDOM = document.querySelector(".siguiente");
            const botonAtrasDOM1 = document.querySelector(".atras1");
            const botonSiguienteDOM1 = document.querySelector(".siguiente1");
            const elementosPorPagina = 6;
            let paginaActual = 1;

                //recorrer MARCAS
                Object.entries(inventario).forEach((value) => {
                    //recorrer modelos de cada marca
                    for (i = 0; i < value[1].length; i++){
                        //console.log(value[1][i])//DATOS
                        //console.log(value[0]) //MARCA
                        //pasar datos a un array
                        datos.push(Object.values(value[1][i]))
                        datosMarca.push(value[0])
                        cantidadMotos++;
                    }
                })

            //PAGINACION

                function avanzarPagina() {
                    paginaActual++;
                    renderizar();
                }
                function retrocederPagina() {
                    paginaActual--;
                    renderizar();
                }
                function obtenerRebanadaDeBaseDeDatos(pagina) {
                    rebanadaMotos = new Array();
                    const corteDeInicio = (pagina - 1) * elementosPorPagina;
                    const corteDeFinal = corteDeInicio + elementosPorPagina;
                    if(corteDeFinal < datos.length) { //para no pifiar la ultima impresion.
                        for (i = corteDeInicio; i < corteDeFinal; i++) {
                            rebanadaMotos.push(datos[i])
                        }
                        return rebanadaMotos;
                    } else {
                        for (i = corteDeInicio; i < datos.length; i++) {
                            rebanadaMotos.push(datos[i])
                        }
                        return rebanadaMotos;
                    }
                }

                function gestionarBotones() {
                    // Comprobar que no se pueda retroceder
                    if (paginaActual === 1) {
                    botonAtrasDOM.setAttribute("disabled", true);
                    botonAtrasDOM1.setAttribute("disabled", true);
                    } else {
                    botonAtrasDOM.removeAttribute("disabled");
                    botonAtrasDOM1.removeAttribute("disabled");
                    }
                    // Comprobar que no se pueda avanzar
                    if (paginaActual === obtenerPaginasTotales()) {
                    botonSiguienteDOM.setAttribute("disabled", true);
                    botonSiguienteDOM1.setAttribute("disabled", true);
                    } else {
                    botonSiguienteDOM.removeAttribute("disabled");
                    botonSiguienteDOM1.removeAttribute("disabled");
                    }
                }

                function obtenerPaginasTotales() {
                    return Math.ceil(datos.length / elementosPorPagina);
                }

                function renderizar() {
                    document.querySelector('.newsCards').innerHTML = '';
                    const rebanadaDatos = obtenerRebanadaDeBaseDeDatos(paginaActual);
                    gestionarBotones();
                    // Crear un artículo para cada elemento que se encuentre en la página actual
                    for (k = 0; k < rebanadaDatos.length; k++){
                        const div = document.createElement("div");
                        div.innerHTML = `<div><img src="${rebanadaDatos[k][4]}"alt="cards"><h3>${datosMarca[k]}<span>${rebanadaDatos[k][2]}</span></h3><ul><li>Modelo: ${datos[k][1]}</li><li>Cilindraje: ${rebanadaDatos[k][3]}cc</li><li>Kilometraje: ${rebanadaDatos[k][5]}</li></ul><br><p>Precio: ${rebanadaDatos[k][5].toLocaleString('es-ES')} COP</p><a href="#">Mas información<i class="fas fa-angle-double-right"></i></a></div>`;
                        element.appendChild(div);
                    }
                }

                botonAtrasDOM.addEventListener("click", retrocederPagina);
                botonSiguienteDOM.addEventListener("click", avanzarPagina);
                botonAtrasDOM1.addEventListener("click", retrocederPagina);
                botonSiguienteDOM1.addEventListener("click", avanzarPagina);
                renderizar();
                console.log(paginaActual)

        //NAVEGACION
            //borrar caja de texto
            let mostrarAlgo = function() {
                const mensaje = document.querySelector("#textNav");
                mensaje.value = '';
            }
            //Funciona para volver a inicio con lupa
            function toTop() {
                window.scrollTo(0, 0)
            }
