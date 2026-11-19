// Verifica si existe al menos un administrador registrado
function hayAdmin() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  return usuarios.some((u) => u.rol === "admin");
}

// Acceso rápido para Admin y Usuario
const btnAdmin = document.getElementById("Admin-rapido");
const btnUsuario = document.getElementById("Usuario-rapido");

btnAdmin.addEventListener("click", () => {
  const admin = {
    nombre: "Admin",
    email: "admin@coleccionables.com",
    rol: "admin"
  };

  localStorage.setItem("usuarioLogueado", JSON.stringify(admin));
  window.location.href = "main.html";
});

btnUsuario.addEventListener("click", () => {
    const usuario = {
        nombre: "Usuario",
        email: "usuario@coleccionables.com",
        rol: "usuario"
    };

    localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
    window.location.href = "main.html";
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
    rol: hayAdmin() ? "usuario" : "admin"
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
  window.location.href = "main.html";
});

// Control de vistas (Acceso / Login / Registro) y persistencia al refrescar
const vistaAcceso = document.getElementById("vista-acceso");
const vistaLogin = document.getElementById("form-inicio-sesion");
const vistaRegistro = document.getElementById("form-crear-usuario");

function mostrarVista(vista) {
  vistaAcceso.classList.add("oculto");
  vistaLogin.classList.add("oculto");
  vistaRegistro.classList.add("oculto");

  if (!hayAdmin()) {
    vistaRegistro.classList.remove("oculto");
    document.getElementById("titulo-registro").textContent = "Crear Primer Administrador";
    document.getElementById("subtitulo-registro").textContent = "Creá el primer perfil Administrador para comenzar.";
    document.getElementById("cambiar-a-login").classList.add("oculto");
    return;
  }

  document.getElementById("titulo-registro").textContent = "Crear Cuenta";
  document.getElementById("subtitulo-registro").textContent = "";
  document.getElementById("cambiar-a-login").classList.remove("oculto");

  if (vista === "login") {
    vistaLogin.classList.remove("oculto");
  } else if (vista === "registro") {
    vistaRegistro.classList.remove("oculto");
  } else {
    vistaAcceso.classList.remove("oculto");
  }

  sessionStorage.setItem("vistaIngresoActual", vista);
}


const vistaGuardada = sessionStorage.getItem("vistaIngresoActual") || "acceso";
mostrarVista(vistaGuardada);

// Eventos de los botones para cambiar de pantalla
document.getElementById("ir-a-login").addEventListener("click", () => mostrarVista("login"));
document.getElementById("ir-a-registro").addEventListener("click", () => mostrarVista("registro"));
document.getElementById("cambiar-a-registro").addEventListener("click", () => mostrarVista("registro"));
document.getElementById("cambiar-a-login").addEventListener("click", () => mostrarVista("login"));