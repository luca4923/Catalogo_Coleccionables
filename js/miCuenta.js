document.addEventListener("DOMContentLoaded", () => {
  // 1. Verificar sesión activa
  const sesionActiva = JSON.parse(localStorage.getItem("usuarioLogueado"));
  if (!sesionActiva) {
    window.location.href = "Ingreso.html";
    return;
  }

  // 2. Buscar al usuario completo en el array "usuarios"
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  let indiceUsuario = usuarios.findIndex((u) => u.email === sesionActiva.email);

  // Si entró por algún motivo y no estaba en el array, lo tomamos de la sesión
  let usuarioActual = indiceUsuario !== -1 ? usuarios[indiceUsuario] : sesionActiva;

  // Función para guardar cambios en ambos lugares de localStorage
  function guardarCambiosUsuario() {
    if (indiceUsuario !== -1) {
      usuarios[indiceUsuario] = usuarioActual;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
    const { password, ...sesionLimpia } = usuarioActual;
    localStorage.setItem("usuarioLogueado", JSON.stringify(sesionLimpia));
  }

  // 3. Cargar datos en el HTML
  function renderizarDatos() {
    // Detalles
    document.getElementById("dato-nombre").textContent = usuarioActual.nombre || "Sin nombre";
    document.getElementById("dato-nacimiento").textContent = usuarioActual.nacimiento || "Sin fecha de nacimiento";
    document.getElementById("dato-genero").textContent = usuarioActual.genero || "Sin género";
    document.getElementById("dato-dni").textContent = usuarioActual.dni || "Sin DNI";

    // Acceso
    document.getElementById("dato-email").textContent = usuarioActual.email || "-";
    document.getElementById("dato-password").textContent = usuarioActual.password
      ? "*".repeat(usuarioActual.password.length)
      : "***********";

    // Envío
    document.getElementById("dato-direccion").textContent = usuarioActual.direccion || "Sin dirección";
    document.getElementById("dato-localidad").textContent = usuarioActual.localidad || "Sin localidad";
    document.getElementById("dato-cp").textContent = usuarioActual.cp || "Sin código postal";
    document.getElementById("dato-telefono").textContent = usuarioActual.telefono || "Sin teléfono";
  }

  renderizarDatos();

  // 4. Edición de Detalles
  const btnDetalles = document.getElementById("btn-editar-detalles");
  let editandoDetalles = false;

  btnDetalles.addEventListener("click", () => {
    if (!editandoDetalles) {
      editandoDetalles = true;
      btnDetalles.innerHTML = `<img src="imagenes/lapiz.png" alt="guardar" class="imagen-editar"> GUARDAR`;

      document.getElementById("dato-nombre").innerHTML = `<input type="text" id="inp-nombre" value="${usuarioActual.nombre || ""}" placeholder="Nombre completo">`;
      document.getElementById("dato-nacimiento").innerHTML = `<input type="date" id="inp-nacimiento" value="${usuarioActual.nacimiento || ""}">`;
      document.getElementById("dato-genero").innerHTML = `
        <select id="inp-genero">
            <option value="" disabled ${!usuarioActual.genero ? "selected" : ""}>Seleccionar género</option>
            <option value="Masculino" ${usuarioActual.genero === "Masculino" ? "selected" : ""}>Masculino</option>
            <option value="Femenino" ${usuarioActual.genero === "Femenino" ? "selected" : ""}>Femenino</option>
        </select>
        `;
      document.getElementById("dato-dni").innerHTML = `<input type="text" id="inp-dni" value="${usuarioActual.dni || ""}" placeholder="DNI">`;
    } else {
      usuarioActual.nombre = document.getElementById("inp-nombre").value.trim() || usuarioActual.nombre;
      usuarioActual.nacimiento = document.getElementById("inp-nacimiento").value;
      usuarioActual.genero = document.getElementById("inp-genero").value.trim();
      usuarioActual.dni = document.getElementById("inp-dni").value.trim();

      guardarCambiosUsuario();
      editandoDetalles = false;
      btnDetalles.innerHTML = `<img src="imagenes/lapiz.png" alt="editar" class="imagen-editar"> EDITAR`;
      renderizarDatos();
    }
  });

  // 5. Edición de Datos de Acceso
  const btnAcceso = document.getElementById("btn-editar-acceso");
  let editandoAcceso = false;

  btnAcceso.addEventListener("click", () => {
    if (!editandoAcceso) {
      editandoAcceso = true;
      btnAcceso.innerHTML = `<img src="imagenes/lapiz.png" alt="guardar" class="imagen-editar"> GUARDAR`;

      document.getElementById("dato-email").innerHTML = `<input type="email" id="inp-email" value="${usuarioActual.email || ""}">`;
      document.getElementById("dato-password").innerHTML = `<input type="password" id="inp-password" value="${usuarioActual.password || ""}" placeholder="Nueva contraseña">`;
    } else {
      const nuevoEmail = document.getElementById("inp-email").value.trim();
      const nuevaPass = document.getElementById("inp-password").value;

      if (nuevoEmail) usuarioActual.email = nuevoEmail;
      if (nuevaPass) usuarioActual.password = nuevaPass;

      guardarCambiosUsuario();
      editandoAcceso = false;
      btnAcceso.innerHTML = `<img src="imagenes/lapiz.png" alt="editar" class="imagen-editar"> EDITAR`;
      renderizarDatos();
    }
  });

  // 6. Edición de Datos de Envío
  const btnEnvio = document.getElementById("btn-editar-envio");
  let editandoEnvio = false;

  btnEnvio.addEventListener("click", () => {
    if (!editandoEnvio) {
      editandoEnvio = true;
      btnEnvio.innerHTML = `<img src="imagenes/lapiz.png" alt="guardar" class="imagen-editar"> GUARDAR`;

      document.getElementById("dato-direccion").innerHTML = `<input type="text" id="inp-direccion" value="${usuarioActual.direccion || ""}" placeholder="Calle y altura">`;
      document.getElementById("dato-localidad").innerHTML = `<input type="text" id="inp-localidad" value="${usuarioActual.localidad || ""}" placeholder="Localidad / Partido">`;
      document.getElementById("dato-cp").innerHTML = `<input type="text" id="inp-cp" value="${usuarioActual.cp || ""}" placeholder="Código Postal">`;
      document.getElementById("dato-telefono").innerHTML = `<input type="text" id="inp-telefono" value="${usuarioActual.telefono || ""}" placeholder="Teléfono">`;
    } else {
      usuarioActual.direccion = document.getElementById("inp-direccion").value.trim();
      usuarioActual.localidad = document.getElementById("inp-localidad").value.trim();
      usuarioActual.cp = document.getElementById("inp-cp").value.trim();
      usuarioActual.telefono = document.getElementById("inp-telefono").value.trim();

      guardarCambiosUsuario();
      editandoEnvio = false;
      btnEnvio.innerHTML = `<img src="imagenes/lapiz.png" alt="editar" class="imagen-editar"> EDITAR`;
      renderizarDatos();
    }
  });

  // 7. Cerrar sesión
  const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("usuarioLogueado");
      window.location.href = "Ingreso.html";
    });
  }
});