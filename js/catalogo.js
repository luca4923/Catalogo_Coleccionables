const productoGuardado = sessionStorage.getItem("productoSeleccionado");
const producto = productoGuardado ? JSON.parse(productoGuardado) : null;

if (producto) {
    const imagen = document.querySelector("#producto-imagen");
    const nombre = document.querySelector("#producto-nombre");
    const detalle = document.querySelector("#producto-detalle");
    const precio = document.querySelector("#producto-precio");
    const informacion = document.querySelector("#producto-informacion");

    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    nombre.textContent = producto.nombre;
    detalle.textContent = producto.detalle;
    precio.textContent = `$${producto.precio}`;
    informacion.textContent = producto.detalle;
    document.title = producto.nombre;
}
