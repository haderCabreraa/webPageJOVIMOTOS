
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
        ( function agregarElement() {
            const datos = new Array();
            const datosMarca = new Array();
            const element = document.querySelector(".newsCards");
                //recorrer MARCAS
                Object.entries(inventario).forEach((value,clave) => {
                    //recorrer modelos de cada marca
                    for (i = 0; i < value[1].length; i++){
                        //console.log(value[1][i])//DATOS
                        //console.log(value[0]) //MARCA
                        //pasar datos a un array
                        datos.push(Object.values(value[1][i]))
                        datosMarca.push(value[0]    )
                    }
                })
                    //creo cada HIJO
                    for (k = 0; k < datos.length; k++){
                        const div = document.createElement("div");
                        div.innerHTML = `<div><img src="${datos[k][4]}"alt="cards"><h3>${datosMarca[k]}<span>${datos[k][2]}</span></h3><ul><li>Modelo: ${datos[k][1]}</li><li>Cilindraje: ${datos[k][3]}cc</li><li>Kilometraje: ${datos[k][5]}</li></ul><br><p>Precio: ${datos[k][5].toLocaleString('es-ES')} COP</p><a href="#">Mas información<i class="fas fa-angle-double-right"></i></a></div>`;
                        element.appendChild(div);
                    //ver array de datos de motos
                    console.log(datos[k][5].toLocaleString('es-ES'));
                }
        })()

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