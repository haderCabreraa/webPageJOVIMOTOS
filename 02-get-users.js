export function get(url) {
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UFT-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.lo);
    
}

//NO LA ESTOY USANDO