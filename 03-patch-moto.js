export function patchh(url,productos) {
    alert("COMPRA EXITOSA, EN POCOS DIAS RECIBIRAS TU MOTO, LARGA VIDA A LOS MOTEROS!!!")
    //const enviar = JSON.stringify(productos);
    const urll = 'http://localhost:3000/usuarios/'+ url
    fetch(urll, {
        method: 'PATCH',
        body: JSON.stringify({
            "carrito" : productos
        }),
        headers: {
            'Content-type': 'application/json; charset=UFT-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch(error => console.error("Error!!!:" + error))
    //AGREGA A LO QUE YA ESTA
}