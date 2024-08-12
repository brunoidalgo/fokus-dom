const html = document.querySelector('html');
const foco = document.querySelector('.app__card-button--foco');
const short = document.querySelector('.app__card-button--curto');
const long = document.querySelector('.app__card-button--longo');

const tittle = document.querySelector('.app__title');

const bg = document.querySelector('.app__image');

const botoes = document.querySelectorAll('.app__card-button');

const musicaInput = document.querySelector('.toggle-checkbox');
const musica = new Audio('sons/luna-rise-part-one.mp3');

const botaoComecar = document.querySelector('#start-pause');

let tempoDecorridoSeg = 5;
let intervaloId = 1;

function alterarContexto(contexto) {

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
    alterarContexto('foco');
    foco.classList.add('active');
})

short.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    short.classList.add('active');
})

long.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    long.classList.add('active');
})

function iniciarTempo() {
    intervaloId = setInterval(contagemRgressiva, 1000);
}

const contagemRgressiva = () => {
    // iniciarTempo();
    console.log('Temporizador: ' + tempoDecorridoSeg);
}

botaoComecar.addEventListener('click', contagemRgressiva);
