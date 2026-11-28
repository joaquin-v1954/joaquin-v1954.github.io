// Menú hamburguesa (todas las páginas)
var btnMenu = document.getElementById('btn-menu');
var navegacion = document.getElementById('navegacion');
var menuAbierto = false;

function actualizarMenu(abrir) {
  menuAbierto = abrir;
  navegacion.className = menuAbierto ? 'abierto' : '';
  btnMenu.setAttribute('aria-expanded', String(menuAbierto));
  btnMenu.setAttribute('aria-label', menuAbierto ? 'Cerrar menú' : 'Abrir menú');
  btnMenu.innerHTML = menuAbierto ? '&#10005; Cerrar' : '&#9776; Menú';
}

if (btnMenu && navegacion) {
  var enlacesMenu = navegacion.getElementsByTagName('a');
  btnMenu.addEventListener('click', function () {
    actualizarMenu(!menuAbierto);
  });

  for (var i = 0; i < enlacesMenu.length; i++) {
    enlacesMenu[i].addEventListener('click', function () {
      actualizarMenu(false);
    });
  }
}

// Módulo: Sesión en vivo (pages/index.html)
var btnValidarInicio = document.getElementById('btn-validar-inicio');
if (btnValidarInicio) {
  var sesionValidada = false;
  var sesionPausada = false;
  var modoPractica = false;
  var repeticiones = 0;

  var chkEspacio = document.getElementById('chk-espacio');
  var chkPrivacidad = document.getElementById('chk-privacidad');
  var selectRutina = document.getElementById('select-rutina');
  var estadoPrevio = document.getElementById('estado-previo');
  var tituloEjercicio = document.getElementById('titulo-ejercicio');
  var badgeModo = document.getElementById('badge-modo');
  var kpiReps = document.getElementById('kpi-reps');
  var kpiAngulo = document.getElementById('kpi-angulo');
  var kpiEstado = document.getElementById('kpi-estado');
  var alertaVivo = document.getElementById('alerta-vivo');

  selectRutina.addEventListener('change', function () {
    tituloEjercicio.textContent = selectRutina.value;
  });

  btnValidarInicio.addEventListener('click', function () {
    estadoPrevio.style.display = 'block';
    if (!chkEspacio.checked || !chkPrivacidad.checked) {
      sesionValidada = false;
      estadoPrevio.className = 'caja-estado caja-riesgo';
      estadoPrevio.textContent = '⚠ Debes confirmar el espacio seguro y el consentimiento de cámara antes de empezar.';
    } else {
      sesionValidada = true;
      modoPractica = false;
      badgeModo.textContent = 'MODO SESIÓN OFICIAL · CÁMARA CALIBRADA';
      estadoPrevio.className = 'caja-estado';
      estadoPrevio.textContent = '✓ Cámara calibrada y postura inicial validada. Ya puedes iniciar.';
      kpiEstado.textContent = 'Activo';
    }
  });

  document.getElementById('btn-modo-practica').addEventListener('click', function () {
    modoPractica = true;
    sesionValidada = true;
    badgeModo.textContent = 'MODO PRÁCTICA · NO REGISTRA PROGRESO';
    kpiEstado.textContent = 'Práctica';
  });

  document.getElementById('btn-sim-ok').addEventListener('click', function () {
    alertaVivo.style.display = 'block';
    if (!sesionValidada || sesionPausada) {
      alertaVivo.className = 'caja-estado caja-riesgo';
      alertaVivo.textContent = '⚠ Valida tu postura inicial o reanuda la sesión primero.';
      return;
    }
    if (!modoPractica && repeticiones < 12) {
      repeticiones++;
      kpiReps.textContent = repeticiones + ' / 12';
    }
    kpiAngulo.textContent = '142°';
    kpiEstado.textContent = 'Correcto';
    alertaVivo.className = 'caja-estado';
    alertaVivo.textContent = '✓ Postura correcta (142°). Rango articular dentro del límite seguro.';
  });

  document.getElementById('btn-sim-riesgo').addEventListener('click', function () {
    alertaVivo.style.display = 'block';
    kpiAngulo.textContent = '105°';
    kpiEstado.textContent = 'Riesgo';
    alertaVivo.className = 'caja-estado caja-riesgo';
    alertaVivo.textContent = '⚠ Riesgo postural detectado (105°, -25°). Detén el movimiento y ajusta tu posición.';
  });

  document.getElementById('btn-pausar').addEventListener('click', function () {
    sesionPausada = !sesionPausada;
    kpiEstado.textContent = sesionPausada ? 'Pausado' : 'Activo';
  });
}

// Módulo: Registro de molestias (pages/index.html)
var formMolestia = document.getElementById('form-molestia');
if (formMolestia) {
  var nivelMolestia = document.getElementById('nivel-molestia');
  var errMolestia = document.getElementById('err-molestia');
  var statusMolestia = document.getElementById('status-molestia');

  formMolestia.addEventListener('submit', function (event) {
    event.preventDefault();
    var valido = nivelMolestia.checkValidity();
    nivelMolestia.setAttribute('aria-invalid', String(!valido));
    errMolestia.textContent = valido ? '' : 'Ingresa un valor entre 0 y 10.';
    if (valido) {
      var zona = document.getElementById('zona-molestia').value;
      statusMolestia.textContent = '✓ Molestia registrada: ' + zona + ' (nivel ' + nivelMolestia.value + '/10).';
    }
  });
}

// Módulo: Progreso y Gamificación (pages/index.html)
var btnSumarRacha = document.getElementById('btn-sumar-racha');
if (btnSumarRacha) {
  var rachaDias = 6;
  var metaActual = 3;

  btnSumarRacha.addEventListener('click', function () {
    rachaDias++;
    if (metaActual < 4) {
      metaActual++;
    }
    document.getElementById('texto-racha').textContent = rachaDias + ' días consecutivos (¡Insignia desbloqueada!)';
    document.getElementById('texto-meta').textContent = metaActual + ' de 4 sesiones';
    var pct = (metaActual / 4) * 100;
    var barra = document.getElementById('barra-meta');
    barra.style.width = pct + '%';
    barra.textContent = pct + '%';
  });
}

var formExperiencia = document.getElementById('form-experiencia');
if (formExperiencia) {
  formExperiencia.addEventListener('submit', function (event) {
    event.preventDefault();
    var nota = document.getElementById('calificacion-sesion').value;
    document.getElementById('status-exp').textContent = '✓ Gracias. Calificación guardada: ' + nota + '/5.';
  });
}

// Módulo: Panel Clínico - Fisioterapeutas (pages/fisioterapeutas.html)
var tablaPacientes = document.getElementById('tabla-pacientes');
var filtroRiesgo = document.getElementById('filtro-riesgo');

function exportarPDF(nombre) {
  var statusPdf = document.getElementById('status-pdf');
  if (statusPdf) {
    statusPdf.textContent = '✓ Reporte clínico en PDF generado para ' + nombre + '.';
  }
}

if (tablaPacientes && filtroRiesgo) {
  var pacientes = [
    { nombre: 'María González', cumplimiento: '82%', riesgo: 'Bajo', rom: '142°' },
    { nombre: 'Carlos Mendez', cumplimiento: '23%', riesgo: 'Alto', rom: '108°' },
    { nombre: 'Ana Jiménez', cumplimiento: '61%', riesgo: 'Medio', rom: '128°' },
    { nombre: 'Laura Vásquez', cumplimiento: '18%', riesgo: 'Alto', rom: '102°' }
  ];

  function renderizarPacientes(filtro) {
    tablaPacientes.innerHTML = '';
    for (var i = 0; i < pacientes.length; i++) {
      var p = pacientes[i];
      if (filtro === 'Todos' || p.riesgo === filtro) {
        tablaPacientes.innerHTML +=
          '<tr>' +
          '<td>' + p.nombre + '</td>' +
          '<td>' + p.cumplimiento + '</td>' +
          '<td>' + p.riesgo + '</td>' +
          '<td>' + p.rom + '</td>' +
          '<td><button type="button" class="boton" onclick="exportarPDF(\'' + p.nombre + '\')">Descargar PDF</button></td>' +
          '</tr>';
      }
    }
  }

  filtroRiesgo.addEventListener('change', function () {
    renderizarPacientes(filtroRiesgo.value);
  });
  renderizarPacientes('Todos');
}

var formObs = document.getElementById('form-observacion');
if (formObs) {
  var textoObs = document.getElementById('texto-obs');
  var errObs = document.getElementById('err-obs');

  formObs.addEventListener('submit', function (event) {
    event.preventDefault();
    var valido = textoObs.value.trim().length > 0;
    textoObs.setAttribute('aria-invalid', String(!valido));
    errObs.textContent = valido ? '' : 'Escribe una observación antes de guardar.';
    if (valido) {
      document.getElementById('status-obs').textContent = '✓ Observación guardada en el historial del paciente.';
      textoObs.value = '';
    }
  });
}

var inputBuscar = document.getElementById('buscar-ejercicio');
var listaBiblio = document.getElementById('lista-biblioteca');
if (inputBuscar && listaBiblio) {
  var ejercicios = [
    'Flexión de rodilla · Básico · 3x12',
    'Extensión de cadera · Intermedio · 3x10',
    'Abducción glútea · Básico · 2x15',
    'Rotación de hombro · Avanzado · 3x8'
  ];

  function renderizarBiblioteca(termino) {
    listaBiblio.innerHTML = '';
    var t = termino.toLowerCase();
    for (var i = 0; i < ejercicios.length; i++) {
      if (ejercicios[i].toLowerCase().indexOf(t) !== -1) {
        listaBiblio.innerHTML += '<li>' + ejercicios[i] + '</li>';
      }
    }
  }

  inputBuscar.addEventListener('input', function () {
    renderizarBiblioteca(inputBuscar.value);
  });
  renderizarBiblioteca('');
}

// Módulo: Ajustes y Accesibilidad (pages/ajustes.html)
var contrasteActivo = false;
var textoGrandeActivo = false;

var btnContraste = document.getElementById('btn-contraste');
var btnTextoGrande = document.getElementById('btn-texto-grande');

if (btnContraste && btnTextoGrande) {
  btnContraste.addEventListener('click', function () {
    contrasteActivo = !contrasteActivo;
    document.body.className = (contrasteActivo ? 'alto-contraste ' : '') + (textoGrandeActivo ? 'texto-grande' : '');
    document.getElementById('status-accesibilidad').textContent = contrasteActivo
      ? 'Alto contraste activado.'
      : 'Alto contraste desactivado.';
  });

  btnTextoGrande.addEventListener('click', function () {
    textoGrandeActivo = !textoGrandeActivo;
    document.body.className = (contrasteActivo ? 'alto-contraste ' : '') + (textoGrandeActivo ? 'texto-grande' : '');
    document.getElementById('status-accesibilidad').textContent = textoGrandeActivo
      ? 'Texto ampliado activado.'
      : 'Tamaño de texto normal.';
  });
}

var btnGuardarAjustes = document.getElementById('btn-guardar-ajustes');
if (btnGuardarAjustes) {
  btnGuardarAjustes.addEventListener('click', function () {
    var hora = document.getElementById('hora-recordatorio').value;
    document.getElementById('status-ajustes').textContent =
      '✓ Preferencias guardadas. Recordatorio diario a las ' + hora + '.';
  });
}

// Módulo: Acceso por perfil (pages/index.html)
var formAcceso = document.getElementById('form-acceso');
if (formAcceso) {
  var correoUsuario = document.getElementById('correo-usuario');
  var claveUsuario = document.getElementById('clave-usuario');
  var errCorreo = document.getElementById('err-correo');
  var errClave = document.getElementById('err-clave');
  var statusAcceso = document.getElementById('status-acceso');

  formAcceso.addEventListener('submit', function (event) {
    event.preventDefault();
    var correoValido = correoUsuario.checkValidity();
    var claveValida = claveUsuario.checkValidity();

    correoUsuario.setAttribute('aria-invalid', String(!correoValido));
    errCorreo.textContent = correoValido ? '' : 'Ingresa un correo electrónico válido.';

    claveUsuario.setAttribute('aria-invalid', String(!claveValida));
    errClave.textContent = claveValida ? '' : 'La contraseña debe tener al menos 8 caracteres.';

    if (correoValido && claveValida) {
      var perfil = document.getElementById('perfil-usuario').value;
      statusAcceso.style.display = 'block';
      statusAcceso.textContent = '✓ Sesión iniciada correctamente como ' + perfil + '.';
    }
  });
}