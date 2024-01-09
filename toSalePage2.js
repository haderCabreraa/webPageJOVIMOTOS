const inventario = [
        {
            "marca": "yamaha",
            "nombre": "dt",
            "modelo": 1997, 
            "referencia": "DT175", 
            "cilindraje": 171, 
            "foto": "img/moto1.jpeg",
            "precio": 2300000,
            "kilometraje": 23000,
        },
        {
            "marca": "yamaha",
            "nombre": "fz", 
            "modelo": 2022, 
            "referencia": "fazer", 
            "cilindraje": 150, 
            "foto": "img/moto2.jpeg",
            "precio": 2300000,
            "kilometraje": 23000,
        },
        {
            "marca": "yamaha",
            "nombre": "fz", 
            "modelo": 2022, 
            "referencia": "fazer", 
            "cilindraje": 150, 
            "foto": "img/moto2.jpeg",
            "precio": 2300000,
            "kilometraje": 23000,
        },
        {
            "marca": "yamaha",
            "nombre": "mt", 
            "modelo": 2022, 
            "referencia": "03", 
            "cilindraje": 299, 
            "foto": "img/moto3.jpeg",
            "precio": 2300000,
            "kilometraje": 23000,
        },
        {
            "marca": "honda",
            "nombre": "NAVI", 
            "modelo": 2020, 
            "referencia": "VANI MIX", 
            "cilindraje": 110,      
            "foto":"img/moto4.jpeg",
            "precio": 2300000,
            "kilometraje": 23000,
        },
        {
            "marca": "honda",
            "nombre": "CBX", 
            "modelo": 2023, 
            "referencia": "TWISTER", 
            "cilindraje": 250, 
            "foto":"img/moto3.jpeg",
            "precio": 2300000,
            "kilometraje": 23000,
        },
        {
            "marca": "honda",
            "nombre": "CB", 
            "modelo": 2022, 
            "referencia": "CB-660", 
            "cilindraje": 660, 
            "foto":"img/moto3.jpeg",
            "precio": 2300000,
            "kilometraje": 23000,
        }
]

//Generar datos para luego llamar a imprimir
const generarDatos = function(toPrint) {
    //eliminar los articulos actuales
    const element = document.querySelector(".cards");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    toPrint.forEach(element => {
        const article = document.createElement("article");
        article.innerHTML = `<div class="card"><img src="${element.foto}"alt="cards"><h3>${element.marca}<span>${element.nombre}</span></h3><ul><li>Modelo: ${element.modelo}</li><li>Cilindraje: ${element.cilindraje}cc</li><li>Kilometraje: ${element.kilometraje}</li></ul><br><p>Precio: ${element.precio.toLocaleString('es-ES')} COP</p><hr><a href="#">Mas información<i class="fas fa-angle-double-right"></i></a></div>`;
        const deposito =  document.querySelector('.newsCards');
        deposito.appendChild(article)
    });
}
//ADAPTANDO PAGINACION
    //LECTURA DE BOTONES
        const botonAtrasDOM = document.querySelector(".atras");
        const botonSiguienteDOM = document.querySelector(".siguiente");
        const botonAtrasDOM1 = document.querySelector(".atras1");
        const botonSiguienteDOM1 = document.querySelector(".siguiente1");
        const elementosPorPagina = 5;
        let paginaActual = 1;

    //PAGINACION
        function avanzarPagina() {
            paginaActual++;
            renderizar(inventario);
        }
        function retrocederPagina() {
            paginaActual--;
            renderizar(inventario);
        }
        function obtenerRebanadaDeBaseDeDatos(pagina) {
            const corteDeInicio = (pagina - 1) * elementosPorPagina;
            let corteDeFinal = corteDeInicio + elementosPorPagina;
            if (corteDeFinal > inventario.length) corteDeFinal = inventario.length;
            return [corteDeInicio,corteDeFinal];
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
            return Math.ceil(inventario.length / elementosPorPagina);
        }
        //FUNCION PRINCIPAL DE PAGINACION ->> CREACION DE ARTICULOS
        function renderizar(toCut) {
            let toPrint = new Array();
            let [elementInicio,elementFin] = obtenerRebanadaDeBaseDeDatos(paginaActual);
            gestionarBotones();
            console.log(elementInicio,elementFin)
            console.log(toCut)
            // Crear un artículo para cada elemento que se encuentre en la página actual
            for (let index = elementInicio; index < elementFin; index++) {
                toPrint.push(toCut[index])
            }
            generarDatos(toPrint);
        }
        botonAtrasDOM.addEventListener("click", retrocederPagina);
        botonSiguienteDOM.addEventListener("click", avanzarPagina);
        botonAtrasDOM1.addEventListener("click", retrocederPagina);
        botonSiguienteDOM1.addEventListener("click", avanzarPagina);
        //LLAMADO INICIAL A LA FUNCIONA DE PAGINACION, RECIBE EL ARREGLO QUE VOY A RECORRER
        renderizar(inventario);


    //callToSearch Button NAVEGACION
        //llamado con el boton de busqueda
        const callToSearch = () => {
            let toCut = new Array();
            let letter = document.querySelector('#textNav');
            inventario.forEach(element => {
                JSON.stringify(element).toLowerCase().includes(letter.value.toLowerCase())?toCut.push(element):console.log("rechace")
            });
            generarDatos(toCut)
        }
        let buttonFilter = document.querySelector('#callToSearch'); 
        buttonFilter.addEventListener('click', callToSearch)