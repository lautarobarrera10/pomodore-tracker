// Timbre de pomodoro completado
const audio = document.querySelector('#audio');

// Botones
const playButton = document.querySelector('#play-button');
const stopButton = document.querySelector('#stop-button');
const playandpauseIcon = document.querySelector('#playandpause-icon');

playButton.addEventListener('click', () => {
    if (!activado) {
        activarCronometro();
        playandpauseIcon.textContent = 'pause';
    } else {
        pausarCronometro();
        playandpauseIcon.textContent = 'play_arrow';
    }
});
stopButton.addEventListener('click', () => {
    pausarCronometro();
    segundo1 = 0;
    segundo2 = 0;
    minuto1 = 2;
    minuto2 = 5;
    segundo1DOM.textContent = segundo1;
    segundo2DOM.textContent = segundo2;
    minuto1DOM.textContent = minuto1;
    minuto2DOM.textContent = minuto2;
    playandpauseIcon.textContent = 'play_arrow';
});

// Variables del cronometro
let activado = false;
let segundo1 = 0;
let segundo2 = 0;
let minuto1 = 2;
let minuto2 = 5;

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
        setTimeout(avanzarUnsegundo, 1000);
    }
}

function pausarCronometro() {
    activado = false;
}

function avanzarUnsegundo() {
    if (activado) {
        if (segundo2 == 0) {
            if (segundo1 == 0) {
                if (minuto2 == 0) {
                    if (minuto1 == 0) {
                        activado = false;
                        console.log(activado);
                        audio.play();
                    } else {
                        minuto1 = minuto1 - 1;
                        minuto2 = 9;
                        segundo1 = 5;
                        segundo2 = 9;
                        minuto1DOM.textContent = minuto1;
                        minuto2DOM.textContent = minuto2;
                        segundo1DOM.textContent = segundo1;
                        segundo2DOM.textContent = segundo2;
                        setTimeout(avanzarUnsegundo, 1000);
                    }
                } else {
                    minuto2 = minuto2 - 1;
                    segundo1 = 5;
                    segundo2 = 9;
                    minuto2DOM.textContent = minuto2;
                    segundo1DOM.textContent = segundo1;
                    segundo2DOM.textContent = segundo2;
                    setTimeout(avanzarUnsegundo, 1000);
                }
            } else {
                segundo1 = segundo1 - 1;
                segundo2 = 9;
                segundo1DOM.textContent = segundo1;
                segundo2DOM.textContent = segundo2;
                setTimeout(avanzarUnsegundo, 1000);
            }
        } else {
            segundo2 = segundo2 - 1;
            segundo2DOM.textContent = segundo2;
            setTimeout(avanzarUnsegundo, 1000);
        }
    }
}