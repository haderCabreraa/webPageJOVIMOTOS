import { patchh } from "./03-patch-moto.js";
    //ESCUCHA DE BOTON HAMBURGUESA
    document.querySelector('.menu-btn').addEventListener('click', () => {
        document.querySelector('.nav-menu').classList.toggle("show")
    });

            //ESCUCHAR BOTON INICIO DE SESION 
            document.querySelector('.fa-user-circle').addEventListener('click', () => {
                document.querySelector('.login-wrap').classList.toggle("showLogin")
            });
    
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
                console.log("lei inicio")
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
            }
            
        }catch (error) {
            console.error('Error al leer el archivo JSON:', error);
        }
    }
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
    compara();
    eliminarLogin();