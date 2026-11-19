

let modoOscuro = localStorage.getItem("modo-oscuro")=="true";
let iconoTema = document.querySelector(".imagen-modo")

const body = document.body;
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

//       modo oscuro

Oscuro.addEventListener("click", () => {

    //Textos
const descripcion = document.querySelectorAll(".descripcion");
const detalleItem = document.querySelectorAll(".detalle-item")
const precio = document.querySelectorAll(".precio")



    modoOscuro=!modoOscuro;
    localStorage.setItem("modo-oscuro",modoOscuro)

    if (!document.body.classList.contains("oscuroBody")) {
        document.body.classList.add("oscuroBody");

        colecciones.classList.add("coleccionesOscuro");
    }else{
        document.body.classList.remove("oscuroBody")
        
        colecciones.classList.remove("coleccionesOscuro");
    }


    // Body
        body.classList.toggle("body-oscuro")
        botonesCategoria.forEach(boton =>{
            boton.classList.toggle("botones-oscuro")
        })
    // Tarjetas textos
    descripcion.forEach(descripcion =>{
        descripcion.classList.toggle("descripcion-oscuro")
    })
    detalleItem.forEach(detalle => {
        detalle.classList.toggle("detalle-item-oscuro")
    })
    precio.forEach(precio => {
        precio.classList.toggle("precio-oscuro")
    })



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

const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
if (!usuarioLogueado || usuarioLogueado.rol !== "admin") {
    btnCambiarVista.classList.add("oculto");
}

// vista admin
btnCambiarVista.addEventListener("click", () => {
    window.location.href = "admin.html";
});

const btnVistaTarjetas = document.querySelector("#btn-vista-tarjetas");
const btnVistaLista = document.querySelector("#btn-vista-lista");
let tipoVista = localStorage.getItem("vistaCatalogo") || "tarjetas";

function actualizarVistaCatalogo() {
    colecciones.classList.toggle("vista-lista", tipoVista === "lista");
    btnVistaLista.classList.toggle("activa", tipoVista === "lista");
    btnVistaTarjetas.classList.toggle("activa", tipoVista === "tarjetas");
}

btnVistaTarjetas.addEventListener("click", () => {
    tipoVista = "tarjetas";
    localStorage.setItem("vistaCatalogo", tipoVista);
    actualizarVistaCatalogo();
});

btnVistaLista.addEventListener("click", () => {
    tipoVista = "lista";
    localStorage.setItem("vistaCatalogo", tipoVista);
    actualizarVistaCatalogo();
});

// mostrar productos 
function renderizarProductos() {
    const productos = obtenerProductos();
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    colecciones.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];

        if (categoriaActual === "Todas" || producto.categoria === categoriaActual) {
            const caja = document.createElement("div");
            caja.classList.add("cajas");

            // Verifica si el producto ya está en favoritos
            let claseCorazon = "figura-corazon";
            for (let j = 0; j < favoritos.length; j++) {
                if (favoritos[j] === producto.id) {
                    claseCorazon = "figura-corazon favorito-activo";
                }
            }

            caja.innerHTML = `
                <a href="catalogo.html">
                    <img class="figura" src="${producto.imagen}" alt="${producto.nombre}">
                    <svg class="${claseCorazon}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#056C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </a>
                <div class="descripcion">${producto.nombre} <br>
                    <p class="detalle-item">${producto.detalle}</p>
                </div>
                <p class="precio">$${producto.precio}</p>
            `;
            
            // Marcar o desmarcar favorito
            const btnCorazon = caja.querySelector(".figura-corazon");
            btnCorazon.addEventListener("click", (e) => {
                e.preventDefault();
                const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
                let posicion = -1;

                for (let k = 0; k < favs.length; k++) {
                    if (favs[k] === producto.id) {
                        posicion = k;
                    }
                }

                if (posicion !== -1) {
                    favs.splice(posicion, 1);
                } else {
                    favs.push(producto.id);
                }

                localStorage.setItem("favoritos", JSON.stringify(favs));
                renderizarProductos();
            });

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

actualizarVistaCatalogo();
renderizarProductos();
