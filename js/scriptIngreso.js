// Precarga de cuentas por defecto (Admin y Usuario)
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const cuentasPorDefecto = [
  {
    nombre: "Admin",
    email: "admin@coleccionables.com",
    password: "Admin123!",
    rol: "admin"
  },
  {
    nombre: "Usuario Prueba",
    email: "usuario@coleccionables.com",
    password: "Usuario123!",
    rol: "usuario"
  }
];

cuentasPorDefecto.forEach((cuenta) => {
  const yaExiste = usuarios.some((u) => u.email === cuenta.email);
  if (!yaExiste) {
    usuarios.push(cuenta);
  }
});

localStorage.setItem("usuarios", JSON.stringify(usuarios));

// Acceso rápido para Admin y Usuario
const btnAdmin = document.getElementById("Admin-rapido");
const btnUsuario = document.getElementById("Usuario-rapido");

function iniciarAccesoRapido(email, destino) {
  const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const encontrado = listaUsuarios.find((u) => u.email === email);

  if (encontrado) {
    const { password, ...sesionSinPassword } = encontrado;
    localStorage.setItem("usuarioLogueado", JSON.stringify(sesionSinPassword));
    sessionStorage.removeItem("vistaIngresoActual");
    window.location.href = destino;
  }
}

btnAdmin.addEventListener("click", () => {
  iniciarAccesoRapido("admin@coleccionables.com", "admin.html");
});

btnUsuario.addEventListener("click", () => {
  iniciarAccesoRapido("usuario@coleccionables.com", "main.html");
});

//registro de usuario
const formRegistro = document.getElementById("form-crear-usuario");
const inputPasswordRegistro = document.getElementById("password-crear");
const listaRequisitos = document.getElementById("requisitos-password");
const errorRegistro = document.getElementById("error-registro");

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

// Mostrar requisitos de contraseña al momento
inputPasswordRegistro.addEventListener("input", () => {
  const pass = inputPasswordRegistro.value;

  if (pass.length > 0) {
    listaRequisitos.classList.add("visible");
  } else {
    listaRequisitos.classList.remove("visible");
  }

  actualizarRequisito("req-largo", pass.length >= 8, "Mínimo 8 caracteres");
  actualizarRequisito("req-mayus", /[A-Z]/.test(pass), "Al menos 1 mayúscula");
  actualizarRequisito("req-num", /\d/.test(pass), "Al menos 1 número");
  actualizarRequisito("req-especial", /[\W_]/.test(pass), "Al menos 1 carácter especial");
});

function actualizarRequisito(idElemento, cumple, texto) {
  const li = document.getElementById(idElemento);
  li.classList.toggle("requisito-valido", cumple);
  li.classList.toggle("requisito-invalido", !cumple);
  li.textContent = (cumple ? "✓ " : "✗ ") + texto;
}

// Validar y guardar al enviar el formulario
formRegistro.addEventListener("submit", (event) => {
  event.preventDefault();
  errorRegistro.textContent = "";

  const nombre = document.getElementById("nombre-completo").value.trim();
  const email = document.getElementById("email-crear").value.trim();
  const password = inputPasswordRegistro.value.trim();

  if (nombre === "" || email === "" || password === "") {
    errorRegistro.textContent = "Por favor, complete todos los campos.";
    return;
  }

  if (!regexEmail.test(email)) {
    errorRegistro.textContent = "Ingresá un correo electrónico válido (ej: usuario@mail.com).";
    return;
  }

  if (!regexPassword.test(password)) {
    errorRegistro.textContent = "La contraseña no cumple con todos los requisitos.";
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const existe = usuarios.some((u) => u.email === email);

  if (existe) {
    errorRegistro.textContent = "Ese correo ya está registrado.";
    return;
  }

  const nuevoUsuario = {
    nombre: nombre,
    email: email,
    password: password,
    rol: "usuario"
  };

  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("usuarioLogueado", JSON.stringify(nuevoUsuario));
  sessionStorage.removeItem("vistaIngresoActual");
  window.location.href = "main.html";
});

// Inicio de sesión
const formLogin = document.getElementById("form-inicio-sesion");
const errorLogin = document.getElementById("error-login");

formLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  errorLogin.textContent = "";

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === "" || password === "") {
    errorLogin.textContent = "Por favor, completá correo y contraseña.";
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioEncontrado = usuarios.find(
    (u) => u.email === email && u.password === password
  );

  if (!usuarioEncontrado) {
    errorLogin.textContent = "Correo o contraseña incorrectos.";
    return;
  }

  localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));
  sessionStorage.removeItem("vistaIngresoActual");

  if (usuarioEncontrado.rol === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "main.html";
  }
});

// Control de vistas (Acceso / Login / Registro) y persistencia al refrescar
const vistaAcceso = document.getElementById("vista-acceso");
const vistaLogin = document.getElementById("form-inicio-sesion");
const vistaRegistro = document.getElementById("form-crear-usuario");

function mostrarVista(vista) {
  vistaAcceso.classList.add("oculto");
  vistaLogin.classList.add("oculto");
  vistaRegistro.classList.add("oculto");

  if (vista === "login") {
    vistaLogin.classList.remove("oculto");
  } else if (vista === "registro") {
    vistaRegistro.classList.remove("oculto");
  } else {
    vistaAcceso.classList.remove("oculto");
  }

  sessionStorage.setItem("vistaIngresoActual", vista);
}

// Eventos de los botones para cambiar de pantalla
document.getElementById("ir-a-login").addEventListener("click", () => mostrarVista("login"));
document.getElementById("ir-a-registro").addEventListener("click", () => mostrarVista("registro"));
document.getElementById("cambiar-a-registro").addEventListener("click", () => mostrarVista("registro"));
document.getElementById("cambiar-a-login").addEventListener("click", () => mostrarVista("login"));


const vistaGuardada = sessionStorage.getItem("vistaIngresoActual") || "acceso";
mostrarVista(vistaGuardada);

// Modo oscuro
const btnOscuroIngreso = document.getElementById("oscuro");
const iconoModoIngreso = document.querySelector(".imagen-modo");

// Lee si el modo oscuro quedó activado desde main.html u otra vista
let esModoOscuro = localStorage.getItem("modo-oscuro") === "true";

function aplicarTemaIngreso(oscuro) {
  if (oscuro) {
    document.body.classList.add("oscuro-ingreso");
    iconoModoIngreso.src = "imagenes/modo-oscuro.png";
  } else {
    document.body.classList.remove("oscuro-ingreso");
    iconoModoIngreso.src = "imagenes/modo-dia.png";
  }
}

aplicarTemaIngreso(esModoOscuro);


btnOscuroIngreso.addEventListener("click", () => {
  esModoOscuro = !esModoOscuro;
  localStorage.setItem("modo-oscuro", esModoOscuro);
  aplicarTemaIngreso(esModoOscuro);
});

