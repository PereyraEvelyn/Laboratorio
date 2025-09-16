
document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('form');
    const fechaInput = document.getElementById('fecha');
    const horaInput = document.getElementById('hora');
    const cantidadInput = document.getElementById('cantidad');
    const telefonoInput = document.getElementById('telefono');

    form.addEventListener('submit', (event) => {

        event.preventDefault();

        clearAllValidation(form);

        let isValid = true;

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const fechaSeleccionada = new Date(fechaInput.value + 'T00:00:00');

        if (!fechaInput.value) {
            isValid = false;
            showError(fechaInput, 'La fecha es obligatoria.');
        } else if (fechaSeleccionada < hoy) {
            isValid = false;
            showError(fechaInput, 'La fecha no puede ser anterior a hoy.');
        } else {
            showSuccess(fechaInput);
        }

        const ahora = new Date();
        const [horaSeleccionada, minutoSeleccionado] = horaInput.value.split(':');

        if (!horaInput.value) {
            isValid = false;
            showError(horaInput, 'La hora es obligatoria.');
        } else if (fechaSeleccionada.getTime() === hoy.getTime()) {
            if (horaSeleccionada < ahora.getHours() || (horaSeleccionada == ahora.getHours() && minutoSeleccionado <= ahora.getMinutes())) {
                isValid = false;
                showError(horaInput, 'La hora no puede ser anterior a la actual.');
            } else {
                showSuccess(horaInput);
            }
        } else {
            showSuccess(horaInput);
        }

        const cantidadPersonas = parseInt(cantidadInput.value, 10);
        if (!cantidadInput.value) {
             isValid = false;
             showError(cantidadInput, 'La cantidad es obligatoria.');
        } else if (cantidadPersonas < 1) {
            isValid = false;
            showError(cantidadInput, 'Debe reservar para al menos 1 persona.');
        } else {
            showSuccess(cantidadInput);
        }

        const telefonoValue = telefonoInput.value.trim();
        if (telefonoValue && !/^\d+$/.test(telefonoValue)) {
          isValid = false;
            showError(telefonoInput, 'El teléfono solo debe contener números.');
        } else if (telefonoValue) {
            showSuccess(telefonoInput);
        }

        // 3. ACCIÓN FINAL
        if (isValid) {
            alert('¡Reserva enviada con éxito!');
            form.submit();
        }
    });

    function showError(input, message) {

        input.classList.add('is-invalid');

        let errorDiv = input.parentElement.querySelector('.invalid-feedback');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            input.parentElement.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    function showSuccess(input) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    }

    function clearAllValidation(form) {
        form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
        form.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
    }
});