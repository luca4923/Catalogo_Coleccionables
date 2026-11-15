const PRODUCTOS_INICIALES = [
    {
        id: 1,
        nombre: "Superman",
        categoria: "Comics",
        detalle: "Figura Escala 1/6 - Superman",
        precio: 100,
        imagen: "imagenes/main/sideshow-collectibles-dc-comics-superman-premium-format-figure-gallery-68f12395967dd.jpg"
    },
    {
        id: 2,
        nombre: "Bartholomew Kuma",
        categoria: "Anime",
        detalle: "Figura Escala 1/6 - One Piece",
        precio: 100,
        imagen: "imagenes/main/-bartholomew-kuma.jpg"
    },
    {
        id: 3,
        nombre: "Boba Fett",
        categoria: "Películas",
        detalle: "Figura Escala 1/6 - Star Wars",
        precio: 100,
        imagen: "imagenes/main/boba-fett_star-wars_gallery_632b970602726.jpg"
    },
    {
        id: 4,
        nombre: "Clicker",
        categoria: "Videojuegos",
        detalle: "Figura Escala 1/6 - The Last of Us",
        precio: 100,
        imagen: "imagenes/main/clicker.jpg"
    },
    {
        id: 5,
        nombre: "Frankenstein",
        categoria: "Películas",
        detalle: "Figura Escala 1/6 - Frankenstein",
        precio: 100,
        imagen: "imagenes/main/frankenstein.jpg"
    },
    {
        id: 6,
        nombre: "Daredevil",
        categoria: "Comics",
        detalle: "Figura Escala 1/6 - Marvel",
        precio: 100,
        imagen: "imagenes/main/daredevil.jpg"
    },
    {
        id: 7,
        nombre: "Darth Sidious",
        categoria: "Películas",
        detalle: "Figura Escala 1/6 - Star Wars",
        precio: 100,
        imagen: "imagenes/main/darth-sidious.jpg"
    },
    {
        id: 8,
        nombre: "Joker",
        categoria: "Comics",
        detalle: "Figura Escala 1/6 - DC Comics",
        precio: 100,
        imagen: "imagenes/main/joker.jpg"
    },
    {
        id: 9,
        nombre: "Zoro Roronoa",
        categoria: "Anime",
        detalle: "Figura Escala 1/6 - One Piece",
        precio: 100,
        imagen: "imagenes/main/zoro.jpg"
    },
    {
        id: 10,
        nombre: "Pyramid Head",
        categoria: "Videojuegos",
        detalle: "Figura Escala 1/6 - Silent Hill",
        precio: 100,
        imagen: "imagenes/main/red-pyramid-thing_silent-hill_gallery_6493285bbfdc3.jpg"
    },
    {
        id: 11,
        nombre: "Ezio Auditore",
        categoria: "Videojuegos",
        detalle: "Figura Escala 1/6 - Assassin's Creed",
        precio: 100,
        imagen: "imagenes/main/purearts-assassins-creed-animus-ezio-statue-gallery-67e6c1c13a997.jpg"
    },
    {
        id: 12,
        nombre: "Raphael",
        categoria: "Figuras de accion",
        detalle: "Figura Escala 1/6 - Tortugas Ninja",
        precio: 100,
        imagen: "imagenes/main/pcs-teenage-mutant-ninja-turtles-tmnt-raphael-statue-gallery-68a65488e7db6.jpg"
    }
];

// lee productos del localStorage 
function obtenerProductos() {
    const guardados = localStorage.getItem("productos");

    if (guardados === null) {
        localStorage.setItem("productos", JSON.stringify(PRODUCTOS_INICIALES));
        return PRODUCTOS_INICIALES;
    }

    return JSON.parse(guardados);
}

function guardarProductos(lista) {
    localStorage.setItem("productos", JSON.stringify(lista));
}

function obtenerSesion() {
    return JSON.parse(localStorage.getItem("sesion"));
}