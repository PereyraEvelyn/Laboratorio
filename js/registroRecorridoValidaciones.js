document.addEventListener('DOMContentLoaded', function () {
    
  const form = document.querySelector('form');

  const nombreRec    = document.getElementById('nombre-recorrido');
  const puntoPartida = document.getElementById('punto-partida');
  const direccion    = document.getElementById('direccion');
  const descripcion  = document.getElementById('descripcion');

  function error(campo, msj) {
    campo.style.border = '2px solid red';
    let help = campo.nextElementSibling;
    if (!help || !help.classList || !help.classList.contains('text-danger')) {
      help = document.createElement('div');
      help.className = 'text-danger small mt-1';
      campo.insertAdjacentElement('afterend', help);
    }
    help.textContent = msj;
  }

  function ok(campo) {
    campo.style.border = '';
    const help = campo.nextElementSibling;
    if (help && help.classList && help.classList.contains('text-danger')) {
      help.textContent = '';
    }
  }

  // Validaciones básicas
  function validarRecorrido() {
    let valido = true;

    if (!nombreRec.value.trim() || nombreRec.value.trim().length < 3) {
      error(nombreRec, 'El nombre debe tener mínimo 3 caracteres.');
      valido = false;
    } else { ok(nombreRec); }

    if (!puntoPartida.value.trim()) {
      error(puntoPartida, 'Indicá un punto de partida.');
      valido = false;
    } else { ok(puntoPartida); }

    if (!direccion.value.trim() || direccion.value.trim().length < 5) {
      error(direccion, 'La dirección debe tener al menos 5 caracteres.');
      valido = false;
    } else { ok(direccion); }

    if (descripcion.value && descripcion.value.trim().length > 0 && descripcion.value.trim().length < 20) {
      error(descripcion, 'Si agregás descripción, que sea de al menos 20 caracteres.');
      valido = false;
    } else { ok(descripcion); }

    return valido;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault(); 
    const esValido = validarRecorrido();

    if (esValido) {
      alert('Recorrido guardado correctamente.');
      form.submit(); 
    } else {
      alert('Revisá los campos marcados en rojo.');
    }
  });

  [nombreRec, puntoPartida, direccion, descripcion].forEach(ctrl => {
    ctrl.addEventListener('input', () => ok(ctrl));
  });
});
