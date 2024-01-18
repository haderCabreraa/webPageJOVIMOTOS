export function patch(url) {
    fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({
            "carrito" : LOQUEVOYAAGREGAR
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