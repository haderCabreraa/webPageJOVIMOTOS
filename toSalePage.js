const inventario = [
    {
        "marca": "Bajaj",
        "nombre": "boxer",
        "modelo": 1997, 
        "referencia": "DT175", 
        "cilindraje": 171, 
        "foto": "img/moto1.jpeg",
        "precio": 2300000,
        "kilometraje": 53000,
    },
    {
        "marca": "Akt",
        "nombre": "dynamic", 
        "modelo": 2022, 
        "referencia": "fazer", 
        "cilindraje": 150, 
        "foto": "img/moto2.jpeg",
        "precio": 4300000,
        "kilometraje": 23000,
    },
    {
        "marca": "Yamaha",
        "nombre": "crypton",
        "modelo": 2022, 
        "referencia": "03", 
        "cilindraje": 299, 
        "foto": "img/moto3.jpeg",
        "precio": 8300000,
        "kilometraje": 23000,
    },
    {
        "marca": "Susuki",
        "nombre": "VIVA-R", 
        "modelo": 2020, 
        "referencia": "VANI MIX", 
        "cilindraje": 110,      
        "foto":"img/moto4.jpeg",
        "precio": 2800000,
        "kilometraje": 28000,
        "color":"azul",
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
        "precio": 4200000,
        "kilometraje": 23000,
    }
]

//IMPRIMIR FACTURA
const factura = function(){
    const loquecompre = JSON.parse(window.localStorage.getItem('id')).productos;
    const eliminarHijos = document.querySelector("#factura");
    while (eliminarHijos.firstChild) {
        console.log("estoy eliminando")
        eliminarHijos.removeChild(eliminarHijos.firstChild);
    }
    console.log(loquecompre)
    loquecompre.forEach(element => {
        const div = document.createElement("div");
        div.innerHTML = `<div><img src="${element.foto}" alt="moto"></div><div>Producto:<br>${element.nombre}</div><div>Precio:<br>${element.precio}</div><hr>`;
        const deposito =  document.querySelector('.probando');
        deposito.appendChild(div) 
    });
}
//HABILITAR CARRITO
const compara = function(){
    if(JSON.parse(window.localStorage.getItem('id')).productos.length > 0){
        const carrito = document.getElementById("getFacture");
        carrito.classList.remove('esconderCarrito')
    }
    factura();
}             

//BUSCAR PRODUCTO QUE ACABO DE COMPRAR
const buscarProducto = function(producto) {
    const cadena = window.localStorage.getItem("id")
    const usuario = JSON.parse(cadena);  
    inventario.forEach(element => {
        if (producto === element.nombre ) {
            usuario.productos.push(element)
        }
    });
    window.localStorage.setItem('id',JSON.stringify(usuario))
    compara();
}

//EVENTOS PARA EL CARRITO
const carrito = document.querySelector(".fa-shopping-cart");
carrito.addEventListener("click", (e) => {
    console.log("lei carrito")
    e.preventDefault();
    const producto = JSON.parse(window.localStorage.getItem('id')).productos;
    //document.querySelector("#factura").classList.toggle('ocultarr')
    document.querySelector("#containerFacture").classList.toggle('ocultarr')
    factura();
    compara();
    console.log(producto)
    e.stopPropagation();
    e.preventDefault();
});
//ELIMINAR PRODUCTOS DEL LOCAL STORAGE CUANDO REALIZO COMPRA
const eliminarProductoLocales = function(){
    const cadena = window.localStorage.getItem("id")
    const usuario = JSON.parse(cadena); 
    usuario.productos = [];
    window.localStorage.setItem('id',JSON.stringify(usuario))
    compara();
}
//EVENTO DE COMPRA --> AGREGAR A DB Y CONFIRMAR AL CLIENTE COMPRA
const mellevoEsta = document.querySelector("#containerFacture");
mellevoEsta.addEventListener("click", (e) => {
    console.log("ya compre")
    e.preventDefault();
    const url =  JSON.parse(window.localStorage.getItem('id')).id;
    const productos = JSON.parse(window.localStorage.getItem('id')).productos;
    console.log(typeof productos)
    patchh(url,productos)
    eliminarProductoLocales();
    e.stopPropagation();
});

//ESCUCHA DE AGREGAR COMPRA CON LOS BOTONES DE COMPRA
const agregarCompra = function(){
    const boton = document.querySelectorAll(".mostrando");
    console.log(boton)
    boton.forEach(element => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            //element.classList.value.split(' ')[1] ID LOGADO
            buscarProducto(element.classList.value.split(' ')[1]);
            e.stopPropagation();
        });
    });
}
//Generar datos para luego llamar a imprimir
const generarDatos = function(toPrint) {
    //eliminar los articulos actuales
    const element = document.querySelector(".newsCards");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    toPrint.forEach(element => {
        const article = document.createElement("article");
        article.innerHTML = `<div class="card"><img src="${element.foto}"alt="cards"><h3>${element.marca}<span>${element.nombre.toUpperCase()}</span></h3><ul><li>Modelo: ${element.modelo}</li><li>Cilindraje: ${element.cilindraje}cc</li><li>Kilometraje: ${element.kilometraje}</li></ul><br><p>Precio: ${element.precio.toLocaleString('es-ES')} COP</p><hr><a href="#">Mas información<i class="fas fa-angle-double-right"></i></a><div id="addShop"><button class="mostrando ${element.nombre} " id="addShop"><i class="fa fa-shopping-bag" aria-hidden="true"></i>Agregar al carrito</button ></div></div>`;
        const deposito =  document.querySelector('.newsCards');
        deposito.appendChild(article)
    });
    agregarCompra();//ESCUCHAR BOTONES DE COMPRA AL ACTUALIZAR PROUDCTOS
}
//ADAPTANDO PAGINACION
    //LECTURA DE BOTONES
        const botonAtrasDOM = document.querySelector(".atras");
        const botonSiguienteDOM = document.querySelector(".siguiente");
        const botonAtrasDOM1 = document.querySelector(".atras1");
        const botonSiguienteDOM1 = document.querySelector(".siguiente1");
        const elementosPorPagina = 3;
        let paginaActual = 1;

    //PAGINACION
        function avanzarPagina() {
            paginaActual++;
            window.scrollTo(0, 0)
            renderizar(inventario);
        }
        function retrocederPagina() {
            paginaActual--;
            window.scrollTo(0, 0)
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
            botonAtrasDOM.classList.add('buttonOff');
            botonAtrasDOM1.classList.add('buttonOff');
            } else {
            botonAtrasDOM.removeAttribute("disabled");
            botonAtrasDOM1.removeAttribute("disabled");
            botonAtrasDOM.classList.remove('buttonOff');
            botonAtrasDOM1.classList.remove('buttonOff');
            }
            // Comprobar que no se pueda avanzar
            if (paginaActual === obtenerPaginasTotales()) {
            botonSiguienteDOM.setAttribute("disabled", true);
            botonSiguienteDOM1.setAttribute("disabled", true);
            botonSiguienteDOM.classList.add('buttonOff')
            botonSiguienteDOM1.classList.add('buttonOff')
            } else {
            botonSiguienteDOM.removeAttribute("disabled");
            botonSiguienteDOM1.removeAttribute("disabled");
            botonSiguienteDOM.classList.remove('buttonOff')
            botonSiguienteDOM1.classList.remove('buttonOff')
        
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
            let input = letter.value.toLowerCase();
            let arrInput = input.split(' ');
            arrInput.forEach(inputs => {
                inventario.forEach(element => {
                    JSON.stringify(element).toLowerCase().includes(inputs)?toCut.push(element):console.log("rechace")
                });
                generarDatos(toCut); 
            });

        }
        let buttonFilter = document.querySelector('#callToSearch'); 
        buttonFilter.addEventListener('click', callToSearch)

//BARRA DE BUSQUEDA
    //FILTRADO LEFT
    function filtrar(e) {
        //PARA LOS PRECIOS
        if (e.target.innerText.length >= 15) {
            let motosPrice = new Array(); //array de motos que estan en el rango de precio
            let numero = new Array();
            let arrPrice = e.target.innerText.split(' - ');
            arrPrice.forEach(valor => {
                numero.push(valor.replace("'","").replace(".",""));
            });
            console.log(numero)
            inventario.forEach(element => {
                if (element.precio >= Number(numero[0]) && element.precio <= Number(numero[1])) {
                   motosPrice.push(element); 
                }
            });
            console.log(motosPrice) 
            generarDatos(motosPrice)
        } else {
            //RESTO DE FILTRADO
            let toCut = new Array();
            let letter = e.target.innerText;
            let input = letter.toLowerCase();
                inventario.forEach(element => {
                    JSON.stringify(element).toLowerCase().includes(input)?toCut.push(element):console.log("rechace")
                });
            window.scrollTo(0, 100)
            generarDatos(toCut)  
        }
    }
    const marcas = document.querySelector('.filterMarcas');
    const colores = document.querySelector('.filterColor');
    const precios = document.querySelector('.filterPrice');
    marcas.addEventListener("click", filtrar, false);
    colores.addEventListener("click", filtrar, false);
    precios.addEventListener("click", filtrar, false);

        //ESCUCHA DE BOTON HAMBURGUESA
        document.querySelector('.menu-btn').addEventListener('click', () => {
            document.querySelector('.nav-menu').classList.toggle("show")
        });
        //ESCUCHAR BOTON INICIO DE SESION 
        document.querySelector('.fa-user-circle').addEventListener('click', () => {
            document.querySelector('.login-wrap').classList.toggle("showLogin")
        });

import { patch } from "./03-patch-users.js";
import { patchh } from "./03-patch-moto.js";
    //LLAMAR AL METODO DE CONTROLADOR PARA REGISTRO
        import { controlador } from "./controllers/controlador.js";
        const formu = document.querySelector("#singUp");   
        formu.addEventListener("submit", (e) => {
            console.log("lei registro")
            e.preventDefault();
            controlador(formu, e, "usuarios");
            e.stopPropagation();
            e.preventDefault();
        });
    //LLAMAR AL METODO DE CONTROLADOR PARA INICIO DE SESION
        const sesion = document.querySelector("#singIn");   
        sesion.addEventListener("submit", (e) => {
            e.preventDefault();
            controlador(sesion, e, "usuarios");
            e.stopPropagation();
            e.preventDefault();
        });

    //SIGNOUT
        const deslogar = function(element) {
            delete element.logado
            const url = 'http://localhost:3000/usuarios' + '/' + `${element.id}` ;
            alert("has salido de tu cuenta.")
            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(
                    {
                        "id": `${element.id}`,
                        "user": `${element.user}`,
                        "contraseña": `${element.contraseña}`,
                        "correo": `${element.correo}`
                    }
                ),
                headers: {
                    'Content-type': 'application/json; charset=UFT-8',
                },
            })
            console.log(compro)
        }
        //TOMAR BOTON DE SIGNOUT PARA ELIMINAR ATRIBUTO "LOGADO"
        const singOut = document.querySelector('.fa-sign-out');
        //recorrer usuarios buscando quien esta logado para eliminar el atributo
        singOut.addEventListener("click", (e) => {
            e.preventDefault();
            async function eliminarLogin() {
                let bandera = true;
                try {
                    const respuesta = await fetch('http://localhost:3000/usuarios');
                    const datosJSON = await respuesta.json();
                    for (const usuario of datosJSON) {
                        if(usuario.logado){
                            deslogar(usuario)
                            break
                        }
                    }

                } catch (error) {
                    console.error('Error al leer el archivo JSON:', error);
                }
            }
            eliminarLogin();
            e.stopPropagation();    
        });
//HABILITA/DESHANILITA BOTON DE COMPRA
const desabilitar = function() {
    console.log("entre")
    const elementos = document.querySelectorAll('.mostrando')
    elementos.forEach(element => {
        element.disabled = true;
    });
}


//HABILITAR/DESHABILITAR BOTON DE INICIO DE SESION
async function eliminarLogin() {
    const buttonSignOut =document.querySelector('.fa-sign-out');
    const ocultarRegistros =document.querySelector('.login-html');
    try {
        const respuesta = await fetch('http://localhost:3000/usuarios');
        const datosJSON = await respuesta.json();
        for(const usuario of datosJSON){
            if(usuario.hasOwnProperty('logado')){
                buttonSignOut.classList.remove('ocultarBoton')
                ocultarRegistros.classList.add('ocultarRegistro')
                //Crear nueva presentacion de loginIN
                const div = document.createElement("div");
                div.classList.add('pintarLogin')
                div.innerHTML = `<div><i class="fa fa-user-secret fa-4x" aria-hidden="true"></i></div><div><h1>USUARIO</h1>${usuario.user}</div><div><h1>CORREO</h1>${usuario.correo}</div><div><h1>STATUS</h1>${usuario.logado}</div>`;
                const deposito =  document.querySelector('.login-wrap');
                deposito.appendChild(div)
                break
            }
            else{
                desabilitar();  
            }
        }
        
    }catch (error) {
        console.error('Error al leer el archivo JSON:', error);
    }
}
eliminarLogin();
compara();
//Funciona para volver a inicio con lupa
const toTop = document.querySelector("#buttonNav");   
toTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scroll(0,0);
    e.stopPropagation();
});
    //borrar caja de texto


const deleteSmg = document.querySelector("#ssddaa");   
    deleteSmg.addEventListener("click", (e) => {
        e.preventDefault();
        const mensaje = document.querySelector("#textNav");
        mensaje.value = '';
        e.stopPropagation();
    });