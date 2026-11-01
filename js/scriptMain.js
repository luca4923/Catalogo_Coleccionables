const Oscuro = document.body.querySelector("#oscuro");
const header = document.body.querySelector("#cabecera");
const footer = document.body.querySelector("#Footer");
const colecciones = document.body.querySelector("#Colecciones");


Oscuro.addEventListener("click", () => {
    if (!document.body.classList.contains("oscuroBody")) {
        document.body.classList.add("oscuroBody");
        header.classList.add("oscuroHeader");
        footer.classList.add("oscuroHeader");
        colecciones.classList.add("coleccionesOscuro");
    }else{
        document.body.classList.remove("oscuroBody")
        header.classList.remove("oscuroHeader")
        footer.classList.remove("oscuroHeader");
        colecciones.classList.remove("coleccionesOscuro");
    }

});