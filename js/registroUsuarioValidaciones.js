document.addEventListener('DOMContentLoaded', function () {

  const form = document.querySelector('form');
  const nombre = document.getElementById('nombre');
  const apellido = document.getElementById('apellido');
  const dni = document.getElementById('dni');
  const telefono = document.getElementById('telefono');
  const fechaNac = document.getElementById('fecha_nac');
  const pais = document.getElementById('pais');
  const provincia = document.getElementById('provincia');
  const email = document.getElementById('email');
  const pass1 = document.getElementById('password');
  const pass2 = document.getElementById('password2');
  const terminos = document.getElementById('terminos');

  function mostrarError(input, mensaje) {
    input.style.border = '2px solid red';
    let help = input.nextElementSibling;
    if (!help || !help.classList || !help.classList.contains('text-danger')) {
      help = document.createElement('div');
      help.className = 'text-danger small mt-1';
      input.insertAdjacentElement('afterend', help);
    }
    help.textContent = mensaje;
  }

  function limpiarError(input) {
    input.style.border = '';
    const help = input.nextElementSibling;
    if (help && help.classList && help.classList.contains('text-danger')) {
      help.textContent = '';
    }
  }

  function validarNombreApellido() {
    let ok = true;

    if (!nombre.value.trim() || nombre.value.trim().length < 2) {
      mostrarError(nombre, 'Ingresá un nombre valido (minimo 2 letras).');
      ok = false;
    } else {
      limpiarError(nombre);
    }

    if (!apellido.value.trim() || apellido.value.trim().length < 2) {
      mostrarError(apellido, 'Ingresá un apellido valido (minimo 2 letras).');
      ok = false;
    } else {
      limpiarError(apellido);
    }

    return ok;
  }

  function validarDocumentoTelefono() {
    let ok = true;

    const rgxDni = /^\d{6,10}$/;
    if (dni.value && !rgxDni.test(dni.value.trim())) {
      mostrarError(dni, 'Documento: solo números (6 a 10 dígitos).');
      ok = false;
    } else {
      limpiarError(dni);
    }

    const rgxTel = /^[\d\s()+-]{6,20}$/;
    if (telefono.value && !rgxTel.test(telefono.value.trim())) {
      mostrarError(telefono, 'Teléfono invalido (usa numeros, espacios o + - ( ) ).');
      ok = false;
    } else {
      limpiarError(telefono);
    }

    return ok;
  }


  function validarUbicacion() {
    let ok = true;

    if (pais.value && pais.value.trim().length < 2 || provincia.value && provincia.value.trim().length < 2) {
      mostrarError(pais, 'Usa al menos 2 caracteres.');
      ok = false;
    } else {
      limpiarError(pais);
      limpiarError(provincia);
    }

    return ok;
  }

  function validarFechaNacimiento() {
    if (!fechaNac.value) {
      return true;
    }
    const hoy = new Date();
    const fn  = new Date(fechaNac.value);
    let ok = true;

    if (fn > hoy) {
      mostrarError(fechaNac, 'La fecha no puede ser futura.');
      ok = false;
    } else {
      const edad = hoy.getFullYear() - fn.getFullYear() - ((hoy.getMonth() < fn.getMonth() || (hoy.getMonth() === fn.getMonth() && hoy.getDate() < fn.getDate())) ? 1 : 0);
      if (edad < 13) {
        mostrarError(fechaNac, 'Debés tener al menos 13 años.');
        ok = false;
      } else {
        limpiarError(fechaNac);
      }
    }
    return ok;
  }

  function validarEmail() {
    if (!email.value.trim() || !email.checkValidity()) {
      mostrarError(email, 'Ingresá un correo valido (ej: nombre@dominio.com).');
      return false;
    }
    limpiarError(email);
    return true;
  }

  function validarPasswords() {
    let ok = true;

    const rgxPass = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!rgxPass.test(pass1.value)) {
      mostrarError(pass1, 'Mínimo 8 caracteres, con letras y números.');
      ok = false;
    } else {
      limpiarError(pass1);
    }

    if (pass2.value !== pass1.value) {
      mostrarError(pass2, 'Las contraseñas no coinciden.');
      ok = false;
    } else {
      limpiarError(pass2);
    }

    return ok;
  }

  function validarTerminos() {
    if (!terminos.checked) {
      terminos.focus();
      alert('Debés aceptar los Términos y Condiciones.');
      return false;
    }
    return true;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault(); 
    try {
      const ok =
        validarNombreApellido() &&
        validarDocumentoTelefono() &&
        validarUbicacion() &&
        validarFechaNacimiento() &&
        validarEmail() &&
        validarPasswords() &&
        validarTerminos();

      if (ok) {
        alert('Registro válido. ¡Cuenta creada!');
        form.submit(); 
      } else {
        console.warn('Hay errores en el formulario.');
      }
    } catch (err) {
      alert('Ocurrio un error inesperado. Intentalo de nuevo.\nDetalle: ' + err.message);
    }
  });

  [nombre, apellido, dni, telefono, fechaNac, pais, provincia, email, pass1, pass2].forEach(ctrl => {
    ctrl.addEventListener('input', () => limpiarError(ctrl));
  });
});