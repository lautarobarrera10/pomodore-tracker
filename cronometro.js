// Variable para guardar el tiempo del crónometro en milisegundos
let timeInMillisSeconds = 25 * 60 * 1000;

// ¿El crónometro está activado?
let activado = false;

// Variable para guardar tiempo transcurrido al dar play
let tiempoTranscurrido;

// Cronometro en el DOM
const CHRONOMETER_IN_DOM = document.querySelector('.cronometro');

// Formateamos el tiempo y lo incrustamos en el cronometro
CHRONOMETER_IN_DOM.textContent = formatTime(timeInMillisSeconds);

// Botón para activar y pausar el crónometro
const TOGGLE_BUTTON = document.querySelector('#play-button');
// Escuchador del botón de activar/pausar
TOGGLE_BUTTON.addEventListener('click', togglePlay);

// Icono de reproducir y pausar
const PLAY_AND_PAUSE_ICON = document.querySelector('#playandpause-icon');


// Función para formatear el tiempo para el DOM (Recibe milisegundos. Retorna en formato mm:ss)
function formatTime(time) {
    // Convertimos los milisegundos en minutos y segundos
    let minutes = Math.trunc(time / 60 / 1000);
    let seconds = Math.trunc(time / 1000 - minutes * 60);

    // En caso de que minutos o segundos sean menores a 10 agregar un cero adelante
    if (seconds < 10) seconds = '0' + seconds;
    if (minutes < 10) minutes = '0' + minutes;

    // Retorna en formato mm:ss.
    return minutes + ':' + seconds;
}

// Función para intercalar entre activar y pausar el crónometro
function togglePlay() {
    // Si el crónometro ya está activado
    if (activado) {
        pauseChronometer();
    } else {
        // Si el crónometro está desactivado, lo activamos.
        ActivateChronometer()
    }
}

// Función que activa el crónometro
function ActivateChronometer(){
    // Lo activamos
    activado = true;
    // Actualizamos el icono por el de pause
    PLAY_AND_PAUSE_ICON.textContent = 'pause';
    // Variable para guardar el la hora en la que se activó
    let horaInicio = Date.now();
    // Iniciamos un intervalo de 0.5 segundos
    let interval = setInterval(()=> {
        // Si el crónometro está activado
        if (activado) {
            // El tiempo transcurrido es igual la hora actual menos la hora de inicio
            tiempoTranscurrido = Date.now() - horaInicio;
            // Actualizamos en el DOM con el tiempo inicial de milisegundos menos el tiempo transcurrido
            CHRONOMETER_IN_DOM.textContent = formatTime(timeInMillisSeconds - tiempoTranscurrido);
        } else {
            // Si el crónometro está desactivado terminamos el intervalo
            clearInterval(interval);
        }
    }, 500);
}

// Función que desactiva el crónometro
function pauseChronometer(){
    // Pausamos el cronometro
    activado = false;
    // Actualizamos el icono por el de play
    PLAY_AND_PAUSE_ICON.textContent = 'play_arrow';
    // Al tiempo inicial le descontamos el tiempo transcurrido
    timeInMillisSeconds -= tiempoTranscurrido;
}