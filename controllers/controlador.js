import { post } from "../01-post-users.js";

export function controlador(formu, event, entidad) {
    const URL = "http://localhost:3000/";
    let url = "";

    const datos = formu !== null ? Object.fromEntries(new FormData(formu)) : null;
    const value = event.target.value;
    console.log(value)
    switch (value) {
        case "registrarme":
            url = URL + entidad;
            post(url, datos);
            formu.reset();
            break;
    }
}