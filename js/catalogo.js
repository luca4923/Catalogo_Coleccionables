const productoGuardado = sessionStorage.getItem("productoSeleccionado");
const producto = productoGuardado ? JSON.parse(productoGuardado) : null;

if (producto) {
    const imagen = document.querySelector("#producto-imagen");
    const nombre = document.querySelector("#producto-nombre");
    const detalle = document.querySelector("#producto-detalle");
    const precio = document.querySelector("#producto-precio");
    const informacion = document.querySelector("#producto-informacion");
    const botonCarrito = document.querySelector("#agregar-carrito");

    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    nombre.textContent = producto.nombre;
    detalle.textContent = producto.detalle;
    precio.textContent = `$${producto.precio}`;
    informacion.textContent = producto.detalle;
    document.title = producto.nombre;
}

///agregar al carrito

botonCarrito.addEventListener("click", () => {

    const carritoGuardado = localStorage.getItem("carrito");
    let carrito;

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    } else {
        carrito = [];
    }

    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
});


