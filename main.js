const html = document.querySelector('html');
const foco = document.querySelector('.app__card-button--foco');
const short = document.querySelector('.app__card-button--curto');
const long = document.querySelector('.app__card-button--longo');

const tittle = document.querySelector('.app__title');

const bg = document.querySelector('.app__image');

const botoes = document.querySelectorAll('.app__card-button');

const musicaInput = document.querySelector('.toggle-checkbox');
const musica = new Audio('sons/luna-rise-part-one.mp3');

const beep = new Audio('sons/beep.mp3');
const pause = new Audio('sons/pause.mp3');

const play = new Audio('sons/play.wav');

const botaoComecar = document.querySelector('#start-pause');

const iniciarBt = document.querySelector('#start-pause span');

const imgPause = document.querySelector('#start-pause img');

const tempoNaTela = document.querySelector('#timer');

let tempoDecorridoSeg = 1500;
let intervaloId = 1;

function alterarContexto(contexto) {
    exibeTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    });

    html.setAttribute('data-contexto', contexto);
    bg.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
            tittle.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            tittle.innerHTML = `Que tal uma respirada ?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            tittle.innerHTML = `Hora de voltar à superfície<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

musica.loop = true;

musicaInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
        musica.volume = 0.3;
    }
    else {
        musica.pause();
    }
})

foco.addEventListener('click', () => {
    tempoDecorridoSeg = 1500;
    alterarContexto('foco');
    foco.classList.add('active');
})

short.addEventListener('click', () => {
    tempoDecorridoSeg = 300;
    alterarContexto('descanso-curto');
    short.classList.add('active');
})

long.addEventListener('click', () => {
    tempoDecorridoSeg = 900;
    alterarContexto('descanso-longo');
    long.classList.add('active');
})

const contagemRegressiva = () => {
    if(tempoDecorridoSeg <= 0) {
        beep.play(); // Tempo Finalizado
        alert('Tempo Finalizado');
        zerar();
        return
    }
    tempoDecorridoSeg -= 1;
    exibeTempo();
}

botaoComecar.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId) {
        pause.play(); // Tempo Pausado
        zerar();
        return
    }
    play.play(); // Tempo Despausado
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarBt.textContent = 'Pausar';
    imgPause.setAttribute('src', `/imagens/pause.png`);
}


function zerar() {
    clearInterval(intervaloId);
    iniciarBt.textContent = 'Começar';
    imgPause.setAttribute('src', `/imagens/play_arrow.png`);
    intervaloId = null;
}

function exibeTempo() {
    const tempo = new Date(tempoDecorridoSeg * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

exibeTempo();