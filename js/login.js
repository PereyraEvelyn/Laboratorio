
document.addEventListener('DOMContentLoaded', function() {

  const loginForm = document.querySelector('form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    clearErrors();

    let isValid = true;

    const emailValue = emailInput.value.trim();
     if (emailValue === '') {
      showError(emailInput, 'El correo electrónico es obligatorio.');
      isValid = false;
    } else if (!isValidEmail(emailValue)) {
      showError(emailInput, 'Por favor, ingresa un correo electrónico válido.');
      isValid = false;
    } else {
      showSuccess(emailInput);
    }

    //  Validación de la contraseña
    const passwordValue = passwordInput.value.trim();
    if (passwordValue === '') {
      showError(passwordInput, 'La contraseña es obligatoria.');
      isValid = false;
    } else if (passwordValue.length < 6) {
      showError(passwordInput, 'La contraseña debe tener al menos 6 caracteres.');
      isValid = false;
    } else {
      showSuccess(passwordInput);
    }

    if (isValid) {
      console.log('Formulario válido. Enviando datos...');
      alert('¡Inicio de sesión exitoso! Redirigiendo a la página principal.');

      // En una aplicación real, aquí enviarías los datos a un servidor.
      // Para este ejemplo, te redirigimos a la página de inicio.
      window.location.href = 'index.html';
    }
  });

  // --- FUNCIONES AUXILIARES ---

  function showError(input, message) {

    input.classList.add('is-invalid');

    const formControl = input.parentElement;

    let error = formControl.querySelector('.invalid-feedback');
    if (!error) {
      error = document.createElement('div');
      error.className = 'invalid-feedback';
      formControl.appendChild(error);
    }
    error.innerText = message;
  }

  function showSuccess(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid'); // Clase de Bootstrap para campos válidos.
  }

  function clearErrors() {

    const formInputs = loginForm.querySelectorAll('.form-control');
    formInputs.forEach(input => {
      input.classList.remove('is-invalid');
      input.classList.remove('is-valid');
    });

    const errorMessages = loginForm.querySelectorAll('.invalid-feedback');
    errorMessages.forEach(error => {
      error.remove();
    });
  }

  function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
});