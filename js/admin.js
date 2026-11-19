const contenedorColecciones = document.querySelector("#Colecciones");
const contadorProductos = document.querySelector("#contador-productos");
const formAlta = document.querySelector("#form-alta-producto");
const mensajeAlta = document.querySelector("#mensaje-alta");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
const btnCambiarVista = document.querySelector("#btn-cambiar-vista");

btnCambiarVista.addEventListener("click", () => {
    window.location.href = "main.html";
});

let categoriaActual = "Todas";

// muestra tarjetas
function renderizarCatalogo() {
    const productos = obtenerProductos();
    const filtrados = [];

    for (let i = 0; i < productos.length; i++) {
        if (categoriaActual === "Todas" || productos[i].categoria === categoriaActual) {
            filtrados.push(productos[i]);
        }
    }

    contadorProductos.textContent = filtrados.length;
    contenedorColecciones.innerHTML = "";

    for (let i = 0; i < filtrados.length; i++) {
        const producto = filtrados[i];
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjetas");

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h5 class="titulo-figura">${producto.nombre}</h5>
            <p>${producto.detalle}</p>
            <h3>$${producto.precio}</h3>
            <button type="button" class="btn-editar-item">Editar</button>
            <button type="button" class="btn-eliminar-item">Eliminar figura</button>
        `;

        contenedorColecciones.appendChild(tarjeta);
    }
}

// agrega un producto
formAlta.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.querySelector("#prod-nombre").value;
    const categoria = document.querySelector("#prod-categoria").value;
    const precio = Number(document.querySelector("#prod-precio").value);
    const detalle = document.querySelector("#prod-detalle").value;
    const archivoRuta = document.querySelector("#prod-imagen-archivo").value;

    let imagen = "imagenes/logoMain.png";

    if (archivoRuta !== "") {
        const nombreArchivo = archivoRuta.split("\\").pop();
        imagen = "imagenes/main/" + nombreArchivo;
    }

    const productos = obtenerProductos();

    const nuevoProducto = {
        id: Date.now(),
        nombre: nombre,
        categoria: categoria,
        detalle: detalle,
        precio: precio,
        imagen: imagen
    };

    productos.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(productos));

    formAlta.reset();
    renderizarCatalogo();
    mensajeAlta.textContent = "Figura agregada correctamente.";
});

// filtra por categoria
for (let i = 0; i < botonesCategoria.length; i++) {
    botonesCategoria[i].addEventListener("click", () => {
        for (let j = 0; j < botonesCategoria.length; j++) {
            botonesCategoria[j].classList.remove("activa");
        }
        botonesCategoria[i].classList.add("activa");
        categoriaActual = botonesCategoria[i].getAttribute("data-categoria");
        renderizarCatalogo();
    });
}

renderizarCatalogo();


// Modo oscuro
const btnOscuro = document.querySelector("#oscuro");
const iconoTema = document.querySelector(".imagen-modo");
const cabecera = document.querySelector("#cabecera");
const footer = document.querySelector("#Footer");

if (localStorage.getItem("modo-oscuro") === "true") {
    document.body.classList.add("body-oscuro");
    cabecera.classList.add("cabecera-oscuro");
    footer.classList.add("footer-oscuro");
    iconoTema.src = "imagenes/modo-oscuro.png";
}

btnOscuro.addEventListener("click", () => {
    document.body.classList.toggle("body-oscuro");
    cabecera.classList.toggle("cabecera-oscuro");
    footer.classList.toggle("footer-oscuro");

    const estaOscuro = document.body.classList.contains("body-oscuro");
    localStorage.setItem("modo-oscuro", estaOscuro);

    if (estaOscuro) {
        iconoTema.src = "imagenes/modo-oscuro.png";
    } else {
        iconoTema.src = "imagenes/modo-dia.png";
    }
});

