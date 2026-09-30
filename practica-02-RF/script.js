let filtroActual = 'todas';

function actualizarMetricas() {
  const tareas = document.querySelectorAll('.tarea-item');
  let total = tareas.length;
  let pendientes = 0;
  let completadas = 0;

  tareas.forEach((tarea) => {
    if (tarea.getAttribute('data-estado') === 'completada') {
      completadas++;
    } else {
      pendientes++;
    }
  });

  document.getElementById('cnt-total').innerText = total;
  document.getElementById('cnt-pendientes').innerText = pendientes;
  document.getElementById('cnt-completadas').innerText = completadas;
}

function cambiarEstadoTarea(boton) {
  const tareaCard = boton.closest('.tarea-item');
  const esCompletada = tareaCard.classList.contains('completada');

  if (esCompletada) {
    tareaCard.classList.remove('completada');
    tareaCard.setAttribute('data-estado', 'pendiente');
    boton.className = 'btn-estado btn-completar';
    boton.innerText = 'Marcar Completada';
  } else {
    tareaCard.classList.add('completada');
    tareaCard.setAttribute('data-estado', 'completada');
    boton.className = 'btn-estado btn-deshacer';
    boton.innerText = 'Deshacer';
  }

  actualizarMetricas();
  aplicarFiltroYBusqueda();
}

function filtrarTareas(filtro, boton) {
  filtroActual = filtro;

  document.querySelectorAll('.btn-filtro').forEach((btn) => {
    btn.classList.remove('activo');
  });
  boton.classList.add('activo');

  aplicarFiltroYBusqueda();
}
function buscarTarea() {
  aplicarFiltroYBusqueda();
}

function aplicarFiltroYBusqueda() {
  const tareas = document.querySelectorAll('.tarea-item');
  const textoBusqueda = document
    .getElementById('inputBusqueda')
    .value.toLowerCase();
  let visibles = 0;

  tareas.forEach((tarea) => {
    const estado = tarea.getAttribute('data-estado');
    const textoTarea = tarea.innerText.toLowerCase();

    const coincideFiltro =
      filtroActual === 'todas' || estado === filtroActual;
    const coincideBusqueda = textoTarea.includes(textoBusqueda);

    if (coincideFiltro && coincideBusqueda) {
      tarea.style.display = 'flex';
      visibles++;
    } else {
      tarea.style.display = 'none';
    }
  });

  const estadoVacio = document.getElementById('estadoVacio');
  if (visibles === 0) {
    estadoVacio.style.display = 'block';
  } else {
    estadoVacio.style.display = 'none';
  }
}
document.addEventListener('DOMContentLoaded', () => {
  actualizarMetricas();
});