const carritoSuperposicion = document.createElement("div");
carritoSuperposicion.className = "carrito-superposicion";
carritoSuperposicion.innerHTML = `
    <aside class="carrito-panel" role="dialog" aria-modal="true" aria-label="Carrito de compra">
        <div class="carrito-cabecera">
            <h2>MI CARRITO <span class="carrito-contador">0</span></h2>
            <button type="button" class="carrito-cerrar" aria-label="Cerrar carrito">&times;</button>
        </div>
        <div class="carrito-envio">🚚 Tenes envío gratis</div>
        <div class="carrito-lista"></div>
        <button type="button" class="carrito-vaciar">Vaciar carrito</button>
        <div class="carrito-pie">
            <div class="carrito-total"><span>Total</span><span class="carrito-total-valor">$0</span></div>
            <button type="button" class="carrito-finalizar">Continuar al carrito</button>
        </div>
    </aside>
`;
document.body.appendChild(carritoSuperposicion);

function obtenerCarrito() {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

function abrirCarrito() {
    renderizarCarrito();
    carritoSuperposicion.classList.add("abierto");
}

function cerrarCarrito() {
    carritoSuperposicion.classList.remove("abierto");
}

function renderizarCarrito() {
    const carrito = obtenerCarrito();
    const lista = carritoSuperposicion.querySelector(".carrito-lista");
    const contador = carritoSuperposicion.querySelector(".carrito-contador");
    const totalElemento = carritoSuperposicion.querySelector(".carrito-total-valor");
    let cantidadTotal = 0;
    let total = 0;

    lista.innerHTML = "";

    if (carrito.length === 0) {
        lista.innerHTML = '<p class="carrito-vacio">El carrito está vacío.</p>';
    } else {
        carrito.forEach((producto, indice) => {
            const cantidad = producto.cantidad || 1;
            cantidadTotal += cantidad;
            total += Number(producto.precio) * cantidad;

            const item = document.createElement("article");
            item.className = "carrito-item";
            item.innerHTML = `
                <img class="carrito-item-imagen" src="${producto.imagen}" alt="${producto.nombre}">
                <div class="carrito-item-info">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.detalle || producto.categoria}</p>
                </div>
                <button type="button" class="carrito-eliminar" aria-label="Eliminar ${producto.nombre}" data-indice="${indice}">&times;</button>
                <div class="carrito-item-precio">$${producto.precio}</div>
                <div class="carrito-cantidad">
                    <button type="button" data-indice="${indice}" data-cambio="-1" aria-label="Quitar una unidad">−</button>
                    <span>${cantidad}</span>
                    <button type="button" data-indice="${indice}" data-cambio="1" aria-label="Agregar una unidad">+</button>
                </div>
            `;
            lista.appendChild(item);
        });
    }

    contador.textContent = cantidadTotal;
    totalElemento.textContent = `$${total}`;
}

document.querySelectorAll(".carrito-imagen").forEach((icono) => {
    const enlace = icono.closest("a");
    if (enlace) {
        enlace.addEventListener("click", (evento) => {
            evento.preventDefault();
            abrirCarrito();
        });
    } else {
        icono.addEventListener("click", abrirCarrito);
    }
});

carritoSuperposicion.querySelector(".carrito-cerrar").addEventListener("click", cerrarCarrito);
carritoSuperposicion.addEventListener("click", (evento) => {
    if (evento.target === carritoSuperposicion) cerrarCarrito();
});

carritoSuperposicion.querySelector(".carrito-vaciar").addEventListener("click", () => {
    guardarCarrito([]);
});

carritoSuperposicion.querySelector(".carrito-lista").addEventListener("click", (evento) => {
    const boton = evento.target.closest("button");
    if (!boton) return;

    const carrito = obtenerCarrito();
    const indice = Number(boton.dataset.indice);

    if (boton.classList.contains("carrito-eliminar")) {
        carrito.splice(indice, 1);
        guardarCarrito(carrito);
        return;
    }

    if (boton.dataset.cambio) {
        const cantidad = (carrito[indice].cantidad || 1) + Number(boton.dataset.cambio);

        if (cantidad <= 0) {
            carrito.splice(indice, 1);
        } else {
            carrito[indice].cantidad = cantidad;
        }
        guardarCarrito(carrito);
    }
});

window.addEventListener("carritoActualizado", renderizarCarrito);
renderizarCarrito();
