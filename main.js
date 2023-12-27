
//BARRA DE NAVEGACION
    let probando = function() {
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


