const contenedorFavoritos = document.querySelector(".productos-favoritos");

function renderizarFavoritos() {
    const idsFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const productos = obtenerProductos();
    const listaFavoritos = [];

    for (let i = 0; i < productos.length; i++) {
        for (let j = 0; j < idsFavoritos.length; j++) {
            if (productos[i].id === idsFavoritos[j]) {
                listaFavoritos.push(productos[i]);
            }
        }
    }

    contenedorFavoritos.innerHTML = `
        <div class="sub-encabezado">
            <h1 class="titulo-favoritos">MIS FAVORITOS</h1>
            <p class="descripcion-cantidad">(${listaFavoritos.length} productos)</p>
        </div>
    `;

    if (listaFavoritos.length === 0) {
        contenedorFavoritos.innerHTML += `
            <p style="margin: 30px 40px; color: #666;">Todavía no agregaste figuras a favoritos.</p>
        `;
        return;
    }

    const grilla = document.createElement("div");
    grilla.classList.add("grilla-favoritos");

    for (let i = 0; i < listaFavoritos.length; i++) {
        const prod = listaFavoritos[i];
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-fav");

        tarjeta.innerHTML = `
            <div class="contenedor-img-fav">
                <img class="img-fav" src="${prod.imagen}" alt="${prod.nombre}">
                <svg class="btn-quitar-fav" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" title="Quitar de favoritos">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" fill="#056C5C" stroke="#056C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </div>
            <div class="descripcion-fav">${prod.nombre} <br>
                <p class="detalle-fav">${prod.detalle}</p>
                <p class="precio-fav">$${prod.precio}</p>
            </div>
        `;

        const btnQuitar = tarjeta.querySelector(".btn-quitar-fav");
        btnQuitar.addEventListener("click", () => {
            const favsActuales = JSON.parse(localStorage.getItem("favoritos")) || [];
            let posicion = -1;

            for (let k = 0; k < favsActuales.length; k++) {
                if (favsActuales[k] === prod.id) {
                    posicion = k;
                }
            }

            if (posicion !== -1) {
                favsActuales.splice(posicion, 1);
            }

            localStorage.setItem("favoritos", JSON.stringify(favsActuales));
            renderizarFavoritos();
        });

        grilla.appendChild(tarjeta);
    }

    contenedorFavoritos.appendChild(grilla);
}

renderizarFavoritos();