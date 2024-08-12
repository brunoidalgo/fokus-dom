const html = document.querySelector('html');
const foco = document.querySelector('.app__card-button--foco');
const short = document.querySelector('.app__card-button--curto');
const long = document.querySelector('.app__card-button--longo');

const tittle = document.querySelector('.app__title');

const bg = document.querySelector('.app__image');

function alterarContexto(contexto) {
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

foco.addEventListener('click',() => {
    alterarContexto('foco');
})

short.addEventListener('click',() => {
    alterarContexto('descanso-curto');
})

long.addEventListener('click',() => {
    alterarContexto('descanso-longo');
})
