let modoOscuro = localStorage.getItem("modo-oscuro") == "true";

const boton = document.querySelector(".modo-oscuro-boton");
let iconoTema = document.querySelector(".imagen-modo");

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

// Mis favoritos
const interfazFavoritos = document.querySelectorAll(".interfaz-favoritos");
const tarjetas = document.querySelectorAll(".tarjeta-producto");
const botonesEliminar = document.querySelectorAll(".eliminar");

// Mi Cuenta
const miCuenta = document.querySelector(".mi-cuenta");
const tituloMiCuenta = document.querySelector(".titulo-mi-cuenta");
const tarjetasCuenta = document.querySelectorAll(".cajas-con-sombras");
// Carrito
    const carritoCompleto = document.querySelector(".carrito")
    const bodyCarrito = document.querySelector(".body-carrito")
// Catalogo
    const carrito = document.querySelector(".boton_carrito")

// Admin
const tarjetaAdmin = document.querySelector(".tarjeta-alta")
const campForms = document.querySelectorAll(".campo-form")
const botonCategoria = document.querySelectorAll(".boton-categoria")
const botonEliminarProducto = document.querySelectorAll(".btn-eliminar-item")
// Footer
const footer = document.querySelectorAll(".footer");
const textosFooter = document.querySelectorAll(".texto_del_footer");

boton.addEventListener("click", function () {
    modoOscuro = !modoOscuro;
    localStorage.setItem("modo-oscuro", modoOscuro);
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

    // Mis favoritos
    interfazFavoritos.forEach(function (el) { el.classList.toggle("interfaz-favoritos-oscuro"); });
    tarjetas.forEach(function (el) { el.classList.toggle("tarjeta-producto-oscuro"); });
    botonesEliminar.forEach(function (el) { el.classList.toggle("eliminar-oscuro"); });

    // Mi cuenta
    if (miCuenta) { miCuenta.classList.toggle("mi-cuenta-oscuro"); }
    if (tituloMiCuenta) { tituloMiCuenta.classList.toggle("titulo-oscuro"); }
    tarjetasCuenta.forEach(function (tarjeta) {
        tarjeta.classList.toggle("tarjeta-oscuro");
    });
    // Carrito
    if (carritoCompleto){ carritoCompleto.classList.toggle("carrito-oscuro")}
    if (bodyCarrito){ carritoCompleto.classList.toggle("body-carrito-oscuro")}

    // Catalogo
    if (carrito){carrito.classList.toggle("boton-carrito-oscuro")}
    //Admin
    if(tarjetaAdmin){tarjetaAdmin.classList.toggle("tarjeta-alta-oscuro")}
    if(campForms){campForms.forEach(campo => {campo.classList.toggle("campo-form-oscuro")})}
    if(botonCategoria){botonCategoria.forEach(boton => {boton.classList.toggle("boton-categoria-oscuro")})}
    if(botonEliminarProducto){botonEliminarProducto.forEach(boton => {boton.classList.toggle("btn-eliminar-item-oscuro")})}


    // Footer
    footer.forEach(function (el) { el.classList.toggle("footer-oscuro"); });
    textosFooter.forEach(function (el) { el.classList.toggle("texto-footer-oscuro"); });

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