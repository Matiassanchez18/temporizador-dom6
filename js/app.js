let intervalo;  
let totalSegundos; 
let esPausado = false; 

function Temp(e) {
    e.preventDefault();

    const input = document.querySelector('#input');
    let tiempo = input.value.trim();

    if (tiempo.includes(':')) {
        let [minutos, segundos] = tiempo.split(':').map(Number);

        totalSegundos = minutos * 60 + segundos;

        if (!intervalo) { 
            intervalo = setInterval(function() {

                if (totalSegundos >= 0) {
                    let min = Math.floor(totalSegundos / 60);
                    let sec = totalSegundos % 60;
                    input.value = `${min}:${sec < 10 ? '0' + sec : sec}`;
                    totalSegundos--;

                } else {
                    clearInterval(intervalo);
                    intervalo = null;  
                }

            }, 1000);
        }
    } else {
        alert('Formato incorrecto. Usa mm:ss.');
    }
}

function PausarCuenta() {
    const botonPausar = document.querySelector('.btn-secondary'); 

    if (esPausado) {
       
        intervalo = setInterval(function() {

            if (totalSegundos >= 0) {
                const input = document.querySelector('#input');
                let min = Math.floor(totalSegundos / 60);
                let sec = totalSegundos % 60;
                input.value = `${min}:${sec < 10 ? '0' + sec : sec}`;
                totalSegundos--;

            } else {
                clearInterval(intervalo);
                intervalo = null; 
            }

        }, 1000);

        esPausado = false;  
        botonPausar.textContent = "Pausar"; 
    } else {
        // Pausa el temporizador
        clearInterval(intervalo);
        intervalo = null;
        esPausado = true;  
        botonPausar.textContent = "Reanudar"; 
    }
}

const BotonIniciar = document.querySelector('form');
BotonIniciar.addEventListener('submit', Temp);

const BotonPausar = document.querySelector('.btn-secondary');
BotonPausar.addEventListener('click', PausarCuenta);

