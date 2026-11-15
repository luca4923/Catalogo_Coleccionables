const Oscuro = document.querySelector("#oscuro");
const header = document.querySelector("#cabecera");
const footer = document.querySelector("#Footer");
const colecciones = document.querySelector("#Colecciones");
const btnCambiarVista = document.querySelector("#btn-cambiar-vista");
const botonesCategoria = document.querySelectorAll(".boton-categoria");

let categoriaActual = "Todas";

// modo oscuro
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