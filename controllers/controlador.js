import { post } from "../01-post-users.js";
import { patch } from "../03-patch-users.js";

export function controlador(formu, event, entidad) {
    const URL = "http://localhost:3000/";
    let url = "";
    const datos = formu !== null ? Object.fromEntries(new FormData(formu)) : null;
    const value = event.target.attributes[1].nodeValue;
    console.log(datos)
    switch (value) {
        case "registrarme":
            url = URL + entidad;
            //tomar la lectura de los usuarios registrados YA para discriminar
            async function register() {
                try {
                 let   bandera = true;
                  const respuesta = await fetch('http://localhost:3000/usuarios'); 
                  const datosJSON = await respuesta.json();
                  // verificar que no exista el usuario o el correo
                  for (const usuario of datosJSON) {
                    console.log(datos)
                    if(datos.user.length === 0 || datos.correo.length === 0 || datos.contraseña.length === 0) {
                        alert("Complete todos los campos.")
                        break;
                    } else {
                        console.log(usuario.user,datos.user)
                        if (usuario.user === datos.user || usuario.correo === datos.correo){
                            alert("Datos en uso.");
                            bandera= true;
                            break;
                        } else {
                            console.log("entre aca")
                            bandera = false;
                        }
                    }
                }
                if(bandera === false){
                    bandera = true;
                    post(post(url, datos));
                    alert("Registro exitoso.")
                    formu.reset();
                }                   
                } catch (error) {
                  // Maneja errores
                  console.error('Error al leer el archivo JSON:', error);
                }
              }
              register() //AÑADIR REGISTRO DE USUSARIO HACIENDO VALIDACIONES
              break;
        case "iniciarSesion":
            url = URL + entidad; 
            console.log("entre aca")
            async function loginIn() {
                try {
                    const respuesta = await fetch('http://localhost:3000/usuarios');
                    const datosJSON = await respuesta.json();
                    let bandera = true;
                    for (const usuario of datosJSON) {
                        console.log(datosJSON)
                        if (datos.user === usuario.user && datos.contraseña === usuario.contraseña) {
                            bandera = true;
                            alert("Logado correctamente")
                            const valor = {
                                "id": usuario.id,
                                "productos": []
                            }
                            window.localStorage.setItem('id',JSON.stringify(valor));
                            patch(url + '/' + usuario.id)
                            console.log("PASEEEEEE CON:",url + '/' + usuario.id)
                            break
                        } else {
                            bandera = false;
                        }
                    }
                    if(bandera === false) {
                        alert("Datos incorrectos,Try again")
                    }
                } catch (error) {
                    // Maneja errores
                    console.error('Error al leer el archivo JSON:', error);
                }
            }
        loginIn(); 
    };
     
}