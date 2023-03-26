function agregarCerosNecesarios(numero) {
    if (numero < 10) {
		return "0" + numero;
	} else {
		return numero;
	}
}

function formatearCuentaRegresiva(milisegundos) {
    let minutos = parseInt(milisegundos / 1000 / 60);
    milisegundos -= minutos * 60 * 1000;
    let segundos = parseInt(milisegundos / 1000);
    return agregarCerosNecesarios(minutos) + ":" + agregarCerosNecesarios(segundos);
}

function activarCuentaRegresiva() {
    const horaDeActivacion = Date.now();
    consultarTiempo(horaDeActivacion);
}

function consultarTiempo(horaDeActivacion) {
    tiempoTranscurrido = Date.now() - horaDeActivacion;
    let cuentaRegresiva = pomodoroEnMilisegundos - tiempoTranscurrido;
    let cuentaRegresivaFormateada = formatearCuentaRegresiva(cuentaRegresiva);
    console.log(cuentaRegresivaFormateada);
    setTimeout(()=>{
        if (cronometroActivado) {
            consultarTiempo(horaDeActivacion);
        }
    }, 500);
}

const pomodoroEnMilisegundos = 25 * 60 * 1000;
let tiempoTranscurrido = 0;
let cronometroActivado = true;



