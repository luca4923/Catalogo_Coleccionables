let modoOscuro = localStorage.getItem("modo-oscuro")=="true";

const boton = document.querySelector(".modo-oscuro-boton");
let iconoTema = document.querySelector(".imagen-modo")

// Header
const cabecera = document.querySelectorAll(".cabecera");
const subNav = document.querySelectorAll(".sub-navegacion");
const buscadorInput = document.querySelectorAll(".buscador-input");
const iconos = document.querySelectorAll(".buscador-icono, .favoritos, .carrito-imagen, .imagen-nav");

// Menú lateral
const campoNav = document.querySelectorAll(".campo-nav");
const seleccion = document.querySelectorAll(".seleccion");
const secciones = document.querySelectorAll(".secciones");
const enlacesNav = document.querySelectorAll(".enlaces-nav");

// Contenido
const interfazFavoritos = document.querySelectorAll(".interfaz-favoritos");
const tarjetas = document.querySelectorAll(".cajas-favoritos");
const botonesEliminar = document.querySelectorAll(".eliminar");

// Footer
const footer = document.querySelectorAll(".footer");
const textosFooter = document.querySelectorAll(".texto_del_footer");

boton.addEventListener("click", function () {
        modoOscuro = !modoOscuro;
        localStorage.setItem("modo-oscuro",modoOscuro)
    document.body.classList.toggle("body-oscuro");
    
    // Header
    cabecera.forEach(function (el) { el.classList.toggle("cabecera-oscuro"); });
    subNav.forEach(function (el) { el.classList.toggle("sub-navegacion-oscuro"); });
    buscadorInput.forEach(function (el) { el.classList.toggle("buscador-input-oscuro"); });
    iconos.forEach(function (el) { el.classList.toggle("icono-oscuro"); });

    // Menú lateral
    campoNav.forEach(function (el) { el.classList.toggle("campo-nav-oscuro"); });
    seleccion.forEach(function (el) { el.classList.toggle("seleccion-oscuro"); });
    secciones.forEach(function (el) { el.classList.toggle("secciones-oscuro"); });
    enlacesNav.forEach(function (el) { el.classList.toggle("enlaces-nav-oscuro"); });


    // Contenido
    interfazFavoritos.forEach(function (el) { el.classList.toggle("interfaz-favoritos-oscuro"); });
    tarjetas.forEach(function (el) { el.classList.toggle("tarjeta-oscuro"); });
    botonesEliminar.forEach(function (el) { el.classList.toggle("eliminar-oscuro"); });


    // Footer
    footer.forEach(function (el) { el.classList.toggle("footer-oscuro"); });
    textosFooter.forEach(function (el) { el.classList.toggle("texto-footer-oscuro"); });

        if (modoOscuro) {
        iconoTema.src = "imagenes/modo-oscuro.png";
    } else {
        iconoTema.src = "imagenes/modo-dia.png";
    }

})
if (modoOscuro) {
    modoOscuro = false;
    boton.click();
};