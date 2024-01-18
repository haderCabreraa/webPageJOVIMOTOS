
//BARRA DE NAVEGACION
    let probando = function() {
        window.scrollTo(0, 0);
        //HACER APARECER TARJETA
        const templateNav = document.getElementById("navTemplate");
        const clonTemplateNav = templateNav.content.cloneNode(true);
        console.log(clonTemplateNav)

        //agregar nav
        const contenedorNav = document.querySelector('#contenedorNav');
        contenedorNav.insertBefore(clonTemplateNav, null);
        
            //INHABILITAR LUPA DE BUSQUEDA
            const miBoton = document.querySelector('#buttonNav');
            console.log(miBoton)    
            miBoton.toggleAttribute('disabled');
    }
    //ESCONDER NAV
    let closeNav = function() {
        const element = document.querySelector("#contenedorNav");
        const navegador = document.querySelector(".container-search");
        element.removeChild(navegador);
        console.log("PASE POR ACA")
            //HABILITAR LUPA DE BUSQUEDA
            const miBoton = document.querySelector('#buttonNav');
            console.log(miBoton)    
            miBoton.toggleAttribute('disabled');
    }
    //BOTON BORRAR
    let mostrarAlgo = function() {
        const mensaje = document.querySelector("#textNav");
        mensaje.value = '';
    }

    //ESCUCHA DE BOTON HAMBURGUESA
    document.querySelector('.menu-btn').addEventListener('click', () => {
        document.querySelector('.nav-menu').classList.toggle("show")
    });
    //ESCUCHAR BOTON INICIO DE SESION 
    document.querySelector('.fa-user-circle').addEventListener('click', () => {
        document.querySelector('.login-wrap').classList.toggle("showLogin")
    });

///////////////////////////////////////////////////////////
    // //LLAMAR AL METODO DE CONTROLADOR PARA REGISTRO
    import { controlador } from "./controllers/controlador.js";

    const formu = document.querySelector("#singUp");   
    formu.addEventListener("submit", (e) => {
        console.log("lei registro")
        e.preventDefault();
        controlador(formu, e, "usuarios");
        e.stopPropagation();
        e.preventDefault();
    });
    // //LLAMAR AL METODO DE CONTROLADOR PARA INICIO DE SESION
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
    //TOMAR BOTON DE SIGNOUT  ELIMINAR ATRIBUTO "LOGADO"
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
//     //HABILITAR/DESHABILITAR BOTON DE INICIO DE SESION
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
                    div.innerHTML = `<div><i class="fa fa-user-secret fa-4x" aria-hidden="true"></i></div><div><h1>USUARIO:</h1>${usuario.user}</div><div><h1>CORREO</h1>${usuario.correo}</div><div><h1>STATUS</h1>${usuario.logado}</div>`;
                    const deposito =  document.querySelector('.login-wrap');
                    deposito.appendChild(div)
                    break
                }
            }
            
        }catch (error) {
            console.error('Error al leer el archivo JSON:', error);
        }
    }
eliminarLogin();