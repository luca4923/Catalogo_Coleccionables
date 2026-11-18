

let modoOscuro = localStorage.getItem("modo-oscuro")=="true";
let iconoTema = document.querySelector(".imagen-modo")

const Oscuro = document.querySelector("#oscuro");
const colecciones = document.querySelector("#Colecciones");
const btnCambiarVista = document.querySelector("#btn-cambiar-vista");
const botonesCategoria = document.querySelectorAll(".boton-categoria");

    // Header
const cabecera = document.querySelector(".cabecera");
const subNav = document.querySelectorAll(".sub-navegacion"); // 3
const buscadorInput = document.querySelector(".buscador-input");
const iconoBuscador = document.querySelector(".buscador-icono");
const iconoFavoritos = document.querySelector(".favoritos");
const iconoCarrito = document.querySelector(".carrito-imagen");
// Footer
const footer = document.querySelector(".footer");
const textosFooter = document.querySelectorAll(".texto_del_footer"); // 2


let categoriaActual = "Todas";

// modo oscuro
Oscuro.addEventListener("click", () => {
    modoOscuro=!modoOscuro;
    localStorage.setItem("modo-oscuro",modoOscuro)

    if (!document.body.classList.contains("oscuroBody")) {
        document.body.classList.add("oscuroBody");

        colecciones.classList.add("coleccionesOscuro");
    }else{
        document.body.classList.remove("oscuroBody")
        
        colecciones.classList.remove("coleccionesOscuro");
    }
    // Header
    cabecera.classList.toggle("cabecera-oscuro");
    subNav[0].classList.toggle("sub-navegacion-oscuro");
    subNav[1].classList.toggle("sub-navegacion-oscuro");
    subNav[2].classList.toggle("sub-navegacion-oscuro");
    buscadorInput.classList.toggle("buscador-input-oscuro");
    iconoBuscador.classList.toggle("icono-oscuro");
    iconoFavoritos.classList.toggle("icono-oscuro");
    iconoCarrito.classList.toggle("icono-oscuro");

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


// vista admin
btnCambiarVista.addEventListener("click", () => {
    window.location.href = "admin.html";
});


// mostrar productos 
function renderizarProductos() {
    const productos = obtenerProductos();
    colecciones.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];

        if (categoriaActual === "Todas" || producto.categoria === categoriaActual) {
            const caja = document.createElement("div");
            caja.classList.add("cajas");

            caja.innerHTML = `
                <a href="catalogo.html">
                    <img class="figura" src="${producto.imagen}" alt="${producto.nombre}">
                    <img class="figura-corazon" src="imagenes/boton_corazon.png" alt="">
                </a>
                <div class="descripcion">${producto.nombre} <br>
                    <p class="detalle-item">${producto.detalle}</p>
                    <p class="precio">${producto.precio}$</p>
                </div>
            `;

            colecciones.appendChild(caja);
        }
    }
}

// filtro por categoria
for (let i = 0; i < botonesCategoria.length; i++) {
    botonesCategoria[i].addEventListener("click", () => {
        for (let j = 0; j < botonesCategoria.length; j++) {
            botonesCategoria[j].classList.remove("activa");
        }
        botonesCategoria[i].classList.add("activa");
        categoriaActual = botonesCategoria[i].getAttribute("data-categoria");
        renderizarProductos();
    });
}

renderizarProductos();
if (modoOscuro) {
    modoOscuro = false;
    Oscuro.click();
}
