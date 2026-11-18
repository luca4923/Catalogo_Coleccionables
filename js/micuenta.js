
let modoOscuro = localStorage.getItem("modo-oscuro")=="true";

const boton = document.querySelector(".modo-oscuro-boton");
let iconoTema = document.querySelector(".imagen-modo")

// Header
const cabecera = document.querySelector(".cabecera");
const subNav = document.querySelectorAll(".sub-navegacion"); // 3
const buscadorInput = document.querySelector(".buscador-input");
const iconoBuscador = document.querySelector(".buscador-icono");
const iconoFavoritos = document.querySelector(".favoritos");
const iconoCarrito = document.querySelector(".carrito-imagen");

// Menú lateral
const campoNav = document.querySelector(".campo-nav");
const seleccion = document.querySelector(".seleccion");
const secciones = document.querySelectorAll(".secciones"); // 5
const enlacesNav = document.querySelectorAll(".enlaces-nav"); // 6
const imagenesNav = document.querySelectorAll(".imagen-nav"); // 6
const separador = document.querySelector(".separador");

// Contenido
const miCuenta = document.querySelector(".mi-cuenta");
const tituloMiCuenta = document.querySelector(".titulo-mi-cuenta");
const textoTitulo = document.querySelector(".texto-titulo");
const subtitulos = document.querySelectorAll(".subtitulo"); // 3
const tarjetas = document.querySelectorAll(".cajas-con-sombras"); // 3
const separadoresCaja = document.querySelectorAll(".separador-caja"); // 3

// Footer
const footer = document.querySelector(".footer");
const textosFooter = document.querySelectorAll(".texto_del_footer"); // 2

boton.addEventListener("click", function () {

    modoOscuro=!modoOscuro;
    localStorage.setItem("modo-oscuro",modoOscuro)

    document.body.classList.toggle("body-oscuro");

    // Header
    cabecera.classList.toggle("cabecera-oscuro");
    subNav[0].classList.toggle("sub-navegacion-oscuro");
    subNav[1].classList.toggle("sub-navegacion-oscuro");
    subNav[2].classList.toggle("sub-navegacion-oscuro");
    buscadorInput.classList.toggle("buscador-input-oscuro");
    iconoBuscador.classList.toggle("icono-oscuro");
    iconoFavoritos.classList.toggle("icono-oscuro");
    iconoCarrito.classList.toggle("icono-oscuro");

    // Menú lateral
    campoNav.classList.toggle("campo-nav-oscuro");
    seleccion.classList.toggle("seleccion-oscuro");
    secciones.forEach(seccion => {
        seccion.classList.toggle("secciones-oscuro");
    })
    enlacesNav.forEach(enlace =>{
    enlace.classList.toggle("enlaces-nav-oscuro");
    })


    // Contenido
    miCuenta.classList.toggle("mi-cuenta-oscuro");
    tituloMiCuenta.classList.toggle("titulo-oscuro");
    tarjetas.forEach(tarjeta => {
    tarjeta.classList.toggle("tarjeta-oscuro");
    })

    // Footer
    footer.classList.toggle("footer-oscuro");
    textosFooter.forEach(texto => {
        texto.classList.toggle("texto-footer-oscuro");
})

    if (modoOscuro) {
        iconoTema.src = "imagenes/modo-oscuro.png";
    } else {
        iconoTema.src = "imagenes/modo-dia.png";
    }

});
if (modoOscuro) {
    modoOscuro = false;
    boton.click();
}
