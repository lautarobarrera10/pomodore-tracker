// Variables del cronometro
let descanso = false;
let activado = false;
let segundo1 = 0;
let segundo2 = 0;
let minuto1 = 2;
let minuto2 = 5;
document.title = "Pomodoro Tracker " + minuto1 + minuto2 + ":" + segundo1 + segundo2;

// Contenedores de números
const numeroContainer1 = document.querySelector('#numero-container1');
const numeroContainer2 = document.querySelector('#numero-container2');
const numeroContainer3 = document.querySelector('#numero-container3');
const numeroContainer4 = document.querySelector('#numero-container4');

function setearTiempo(m1,m2,s1,s2){
    minuto1 = m1;
    minuto2 = m2;
    segundo1 = s1;
    segundo2 = s2;
    minuto1DOM.textContent = minuto1;
    minuto2DOM.textContent = minuto2;
    segundo1DOM.textContent = segundo1;
    segundo2DOM.textContent = segundo2;
    document.title = "Pomodoro Tracker " + minuto1 + minuto2 + ":" + segundo1 + segundo2;
}

// Timbre de pomodoro completado
const audio = document.querySelector('#audio');

// Botones
const playButton = document.querySelector('#play-button');
const stopButton = document.querySelector('#stop-button');
const playandpauseIcon = document.querySelector('#playandpause-icon');
const checkButton = document.querySelector('#check-button');

// Mensaje de transición
const mensajeContainer = document.querySelector('.mensaje-container');
const mensajeTransicion = document.querySelector('.mensaje');

// Pomodoros completados
let pomodorosCompletados = 0;
const completadosDOM = document.querySelector('.pomodoros-completados');
completadosDOM.textContent = pomodorosCompletados;

playButton.addEventListener('click', () => {
    if (!activado) {
        activarCronometro();
    } else {
        pausarCronometro();
    }
});

// Boton de stop
stopButton.addEventListener('click', () => {
    pausarCronometro();
    playandpauseIcon.textContent = 'play_arrow';
    if (descanso) {
        if (pomodorosCompletados % 4 == 0){
            setearTiempo(1,5,0,0);
        } else {
            setearTiempo(0,5,0,0);
        }
    } else {
        setearTiempo(2,5,0,0);
    }
});

checkButton.addEventListener('click', completarActual);

function sumarUnPomodoro() {
    pomodorosCompletados++;
    completadosDOM.textContent = pomodorosCompletados;
}

function completarActual() {
    if (!descanso) {
        descanso = true;
        pausarCronometro();
        sumarUnPomodoro();
        activarNumerosVerdes();
        if (pomodorosCompletados % 4 == 0 && pomodorosCompletados != 0) {
            setearTiempo(1,5,0,0);
        } else {
            setearTiempo(0,5,0,0);
        }
    } else {
        descanso = false;
        pausarCronometro();
        desactivarNumerosVerdes();
        setearTiempo(2,5,0,0);
    }
}


// Cronometro en el DOM
const segundo1DOM = document.querySelector('#segundo1');
const segundo2DOM = document.querySelector('#segundo2');
const minuto1DOM = document.querySelector('#minuto1');
const minuto2DOM = document.querySelector('#minuto2');
// Cronometro en JS
segundo1DOM.textContent = segundo1;
segundo2DOM.textContent = segundo2;
minuto1DOM.textContent = minuto1;
minuto2DOM.textContent = minuto2;

function activarCronometro() {
    if (!activado) {
        activado = true;
        playandpauseIcon.textContent = 'pause';
        setTimeout(avanzarUnsegundo, 1000);
    }
}

function pausarCronometro() {
    activado = false;
    playandpauseIcon.textContent = 'play_arrow';
}

function avanzarUnsegundo() {
    // Se ejecuta solo si el cronometro está activado
    if (activado) {
        if (segundo2 == 0) {
            if (segundo1 == 0) {
                if (minuto2 == 0) {
                    if (minuto1 == 0) {
                        // En caso de que todo esté en 0
                        activado = false;
                        audio.play();
                        if (!descanso){
                            // Si todo está en 0 y no era un descanso
                            sumarUnPomodoro();
                            pausarCronometro();
                            correrDescanso();
                        } else {
                            // Todo está en 0 pero estabamos descansando
                            pausarCronometro();
                            segundosTransicion = 10;
                            mensajeInicioSiguientePomodoro();
                            descanso = false;
                            setearTiempo(2,5,0,0);
                            setTimeout(() => {
                                activarCronometro();
                                mensajeContainer.classList.remove('activate');
                            }, 10000);
                        }
                    } else {
                        // Todos tienen 0 menos el minuto 1
                        setearTiempo(minuto1-1,9,5,9);
                        setTimeout(avanzarUnsegundo, 1000);
                    }
                } else {
                    // Segundos está en 0 y minuto 2 no
                    setearTiempo(minuto1,minuto2-1,5,9);
                    setTimeout(avanzarUnsegundo, 1000);
                }
            } else {
                // segundo 2 está en 0 pero segundo 1 no
                setearTiempo(minuto1,minuto2,segundo1-1,9);
                setTimeout(avanzarUnsegundo, 1000);
            }
        } else {
            // segundo 2 no está en 0
            setearTiempo(minuto1,minuto2,segundo1,segundo2-1);
            setTimeout(avanzarUnsegundo, 1000);
        }
    }
}

function correrDescanso() {
    mensajeContainer.classList.add('activate');
    segundosTransicion = 10;
    if (pomodorosCompletados % 4 == 0) {
        setearTiempo(1,5,0,0);
    } else {
        setearTiempo(0,5,0,0);
    }
    descanso = true;
    mensajeInicioDescanso();
    setTimeout(() => {
        activarCronometro();
        mensajeContainer.classList.remove('activate');
        activarNumerosVerdes();
    }, 10000);
}

function activarNumerosVerdes() {
    numeroContainer1.classList.add('descanso');
    numeroContainer2.classList.add('descanso');
    numeroContainer3.classList.add('descanso');
    numeroContainer4.classList.add('descanso');
}

function desactivarNumerosVerdes() {
    numeroContainer1.classList.remove('descanso');
    numeroContainer2.classList.remove('descanso');
    numeroContainer3.classList.remove('descanso');
    numeroContainer4.classList.remove('descanso');
}

let segundosTransicion = 10;

function mensajeInicioDescanso() {
    if (segundosTransicion > 0) {
        mensajeTransicion.textContent = 'El descanso comenzará automaticamente en ' + segundosTransicion + ' segundos...';
        segundosTransicion = segundosTransicion - 1;
        setTimeout(mensajeInicioDescanso, 1000);
    }
}

function mensajeInicioSiguientePomodoro() {
    if (segundosTransicion > 0) {
        numeroContainer1.classList.remove('descanso');
        numeroContainer2.classList.remove('descanso');
        numeroContainer3.classList.remove('descanso');
        numeroContainer4.classList.remove('descanso');
        mensajeContainer.classList.add('activate');
        mensajeTransicion.textContent = 'El siguiente pomodoro comenzará automaticamente en ' + segundosTransicion + ' segundos...';
        segundosTransicion = segundosTransicion - 1;
        setTimeout(mensajeInicioSiguientePomodoro, 1000);
    }
}