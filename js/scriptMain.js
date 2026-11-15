/*Figuras de colección*/
var Superman = {
    nombre: "Superman",
    precio: 100,
    genero: "Comics",
    imagen: "imagenes/main/superman.jpg",
    descripcion: "Figura de acción coleccionable inspirada en el icónico Hombre de Acero de DC"
};

var Bartholomew_Kuma = {
    nombre: "Bartholomew Kuma",
    precio: 100,
    genero: "Anime",
    imagen: "imagenes/main/Bartholomew-Kuma.jpg",
    descripcion: "Figura coleccionable del poderoso Shichibukai de One Piece"
};

var Boba_Fett = {
    nombre: "Boba Fett",
    precio: 100,
    genero: "Películas",
    imagen: "imagenes/main/Boba_Fett.jpg",
    descripcion: "Figura de colección del legendario cazarrecompensas de Star Wars"
};

var Clicker = {
    nombre: "Clicker",
    precio: 100,
    genero: "Videjuegos",
    imagen: "imagenes/main/clicker.jpg",
    descripcion: "Escultura hiperdetallada del aterrador infectado de The Last of Us"
};

var Frankenstein = {
    nombre: "Frankenstein",
    precio: 100,
    genero: "Películas",
    imagen: "imagenes/main/frankenstein.jpg",
    descripcion: "Figura clásica del icónico monstruo de la literatura y el cine de terror"
};

var Daredevil = {
    nombre: "Daredevil",
    precio: 100,
    genero: "Comics",
    imagen: "imagenes/main/daredevil.jpg",
    descripcion: "Figura articulada del Diablo de Hell's Kitchen de Marvel Comics"
};

var Darth_Sidious = {
    nombre: "Darth Sidious",
    precio: 100,
    genero: "Películas",
    imagen: "imagenes/main/Darth_Sidious.jpg",
    descripcion: "Figura del malévolo Emperador Palpatine de Star Wars"
};

var Joker = {
    nombre: "Joker",
    precio: 100,
    genero: "Comics",
    imagen: "imagenes/main/Joker.jpg",
    descripcion: "Figura de colección del Príncipe Payaso del Crimen de Batman"
};

var Zoro_Roronoa = {
    nombre: "Zoro Roronoa",
    precio: 100,
    genero: "Anime",
    imagen: "imagenes/main/Zoro_Roronoa.jpg",
    descripcion: "Figura de acción del espadachín de los Sombrero de Paja de One Piece"
};

var Pyramid_Head = {
    nombre: "Pyramid Head",
    precio: 100,
    genero: "Videjuegos",
    imagen: "imagenes/main/Pyramid_Head.jpg",
    descripcion: "Estatua coleccionable del inquietante verdugo de Silent Hill 2"
};

var Ezio_Auditore = {
    nombre: "Ezio Auditore",
    precio: 100,
    genero: "Videjuegos",
    imagen: "imagenes/main/Ezio_Auditore.jpg",
    descripcion: "Figura detallada del legendario Maestro Asesino de Assassin's Creed II"
};

var Raphael = {
    nombre: "Raphael",
    precio: 100,
    genero: "Comics",
    imagen: "imagenes/main/Raphael.jpg",
    descripcion: "Figura de acción del temperamental hermano de las Tortugas Ninja"
};

var ejemplo = {
    nombre: "Ejemplo",
    precio: 100,
    genero: "Steve",
    imagen: "imagenes/steve.jpg",
    descripcion: "Descripción de ejemplo para la figura de colección."
};


/*Array de figuras*/
const productos = [Superman, Bartholomew_Kuma, Boba_Fett, Clicker, Frankenstein, Daredevil, Darth_Sidious, Joker, Zoro_Roronoa, Pyramid_Head, Ezio_Auditore, Raphael, ejemplo];


/*Funcion que se encarga de poner las etiquetas en el HTML*/
function crearTarjeta(producto) {


    /*Se crean las etiquetas que conforman las tarjetas*/
    let Cajas = document.createElement("div");

    let Colecciones = document.querySelector("#Colecciones");
    let tarjeta = document.createElement("div");
    let imagen = document.createElement("img");
    let descripcion = document.createElement("div");
    let nombre = document.createElement("h3");
    let precio = document.createElement("p");
    let descripcionTexto = document.createElement("p");
    let botonCarrito = document.createElement("button");

    /*Se le asignan las clases a las etiquetas*/

    Cajas.classList.add("cajas");
    tarjeta.classList.add("tarjeta");
    imagen.classList.add("figura");
    nombre.classList.add("nombre");
    descripcion.classList.add("descripcion");
    precio.classList.add("precio");
    descripcionTexto.classList.add("descripcion-texto");

    botonCarrito.classList.add("btn-carrito");


    /*Se juntan los nodos*/
    Cajas.appendChild(tarjeta);
    Colecciones.appendChild(Cajas);
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    tarjeta.appendChild(imagen);
    nombre.textContent = producto.nombre;
    tarjeta.appendChild(nombre);
    precio.textContent = `$${producto.precio.toFixed(2)}`; /*no se que significa esto*/
    tarjeta.appendChild(precio);
    descripcionTexto.textContent = producto.descripcion;
    tarjeta.appendChild(descripcionTexto);
    botonCarrito.textContent = "Agregar al Carrito";
    tarjeta.appendChild(botonCarrito);


}




/*--------------------Filtrar----------------*/

const filtroTodos = document.querySelector("#boton-todas");
var Todos = false;

const filtroAnime = document.querySelector("#boton-anime");
var Anime = false;

const filtroVideojuegos = document.querySelector("#boton-videjuegos");
var Videojuego = false;

const filtroPeliculas = document.querySelector("#boton-peliculas");
var Peliculas = false;

const filtroComics = document.querySelector("#boton-comics");
var Comics = false;


/*----------Eventos en los Botones de filtro----------------*/
filtroTodos.addEventListener("click", () => {
    filtroTodos.classList.toggle("boton-activo");
});

filtroAnime.addEventListener("click", () => {
    filtroAnime.classList.toggle("boton-activo");
});

filtroVideojuegos.addEventListener("click", () => {
    filtroVideojuegos.classList.toggle("boton-activo");
});

filtroPeliculas.addEventListener("click", () => {
    filtroPeliculas.classList.toggle("boton-activo");
});

filtroComics.addEventListener("click", () => {
    filtroComics.classList.toggle("boton-activo");
});



filtroAnime.addEventListener("click", () => {
    if (Anime) {
        Anime = false;
    } else {
        Anime = true;
    }
    Todos = false;
    filtrarProductos();

});

filtroVideojuegos.addEventListener("click", () => {
    if (Videojuego) {
        Videojuego = false;
    } else {
        Videojuego = true;
    }
    Todos = false;
    filtrarProductos();
});

filtroPeliculas.addEventListener("click", () => {
    if (Peliculas) {
        Peliculas = false;
    } else {
        Peliculas = true;
    }
    Todos = false;
    filtrarProductos();
});

filtroComics.addEventListener("click", () => {
    if (Comics) {
        Comics = false;
    } else {
        Comics = true;
    }
    Todos = false;
    filtrarProductos();
});


filtroTodos.addEventListener("click", () => {
    Todos = true;
    filtrarProductos();
    Todos = false;
});



/*productos.forEach(crearTarjeta);*/


function filtrarProductos() {
    const productosFiltrados = productos.filter(producto => producto.genero === "Anime");
    const Colecciones = document.querySelector("#Colecciones");
    Colecciones.replaceChildren();

    if (Anime) {
        for (let i = 0; i < productosFiltrados.length; i++) {
            crearTarjeta(productosFiltrados[i]);
        }
    } if (Videojuego) {
        const productosFiltrados = productos.filter(producto => producto.genero === "Videjuegos");
        for (let i = 0; i < productosFiltrados.length; i++) {
            crearTarjeta(productosFiltrados[i]);
        }
    } if (Peliculas) {
        const productosFiltrados = productos.filter(producto => producto.genero === "Películas");
        for (let i = 0; i < productosFiltrados.length; i++) {
            crearTarjeta(productosFiltrados[i]);
        }
    } if (Comics) {
        const productosFiltrados = productos.filter(producto => producto.genero === "Comics");
        for (let i = 0; i < productosFiltrados.length; i++) {
            crearTarjeta(productosFiltrados[i]);
        }
    } if (Todos) {
        for (let i = 0; i < productos.length; i++) {
            crearTarjeta(productos[i]);
        }
    }

}




function removerTarjetas(String) {
}


window.addEventListener("load", () => {
  console.log("La página cargó completamente");
});


/*Modo oscuro*/

const Oscuro = document.body.querySelector("#oscuro");
const header = document.body.querySelector("#cabecera");
const footer = document.body.querySelector("#Footer");
const colecciones = document.body.querySelector("#Colecciones");
const Texto = document.body.querySelectorAll(".cajas");
const precio = document.body.querySelectorAll(".precio");

Oscuro.addEventListener("click", () => {
    if (!document.body.classList.contains("oscuroBody")) {
        document.body.classList.add("oscuroBody");
        header.classList.add("oscuroHeader");
        footer.classList.add("oscuroHeader");
        colecciones.classList.add("coleccionesOscuro");

        for (let i = 0; i < Texto.length; i++) {
            Texto[i].classList.add("oscuroTexto");
            precio[i].classList.add("oscuroPrecio");
            precio[i].classList.remove("precio");
        }

    } else {
        document.body.classList.remove("oscuroBody")
        header.classList.remove("oscuroHeader")
        footer.classList.remove("oscuroHeader");
        colecciones.classList.remove("coleccionesOscuro");

        for (let i = 0; i < Texto.length; i++) {
            Texto[i].classList.remove("oscuroTexto");
            precio[i].classList.remove("oscuroPrecio");
            precio[i].classList.add("precio");
        }

    }

});


