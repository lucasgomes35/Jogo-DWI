
const personagem = document.querySelector("#personagem");
const cereja = document.querySelector("#cereja");

let posicaoX = 250;
let posicaoY = 180;

let velocidade = 10;

let contador = 0;


// Movimentação do personagem
document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowUp") {
        posicaoY -= velocidade;

        personagem.style.transform = "rotate(-90deg)";
    }

    if (event.key === "ArrowDown") {
        posicaoY += velocidade;

        personagem.style.transform = "rotate(90deg)";
    }

    if (event.key === "ArrowLeft") {
        posicaoX -= velocidade;

        personagem.style.transform = "rotate(180deg)";
    }

    if (event.key === "ArrowRight") {
        posicaoX += velocidade;

        personagem.style.transform = "rotate(0deg)";
    }

    // Impedir que saia da área
    posicaoX = Math.max(0, Math.min(500, posicaoX));
    posicaoY = Math.max(0, Math.min(325, posicaoY));

    // Atualizar posição
    personagem.style.left = posicaoX + "px";
    personagem.style.top = posicaoY + "px";

    // Verificar se comeu a cereja
    verificarColisao();

});


// Verificar colisão
function verificarColisao() {

    // Posição do Pac-Man
    const pacmanEsquerda = posicaoX;
    const pacmanDireita = posicaoX + 100;

    const pacmanTopo = posicaoY;
    const pacmanBase = posicaoY + 75;

    // Posição da cereja
    const frutaEsquerda = cereja.offsetLeft;
    const frutaDireita = frutaEsquerda + 30;

    const frutaTopo = cereja.offsetTop;
    const frutaBase = frutaTopo + 35;

    // Verificar se passou completamente pela cereja
    if (
        pacmanEsquerda <= frutaEsquerda &&
        pacmanDireita >= frutaDireita &&
        pacmanTopo <= frutaTopo &&
        pacmanBase >= frutaBase
    ) {

        // Aumentar contador
        contador++;

        document.querySelector("#contador").textContent = contador;

        // Mudar a cereja de lugar
        posicionarCereja();

    }

}


// Posicionar cereja em outro lugar aleatório
function posicionarCereja() {

    let novaX;
    let novaY;

    do {

        novaX = Math.floor(Math.random() * 570);
        novaY = Math.floor(Math.random() * 365);

    } while (

        // Evitar que a cereja apareça em cima do Pac-Man
        novaX < posicaoX + 130 &&
        novaX + 30 > posicaoX - 30 &&
        novaY < posicaoY + 105 &&
        novaY + 35 > posicaoY - 30

    );

    cereja.style.left = novaX + "px";
    cereja.style.top = novaY + "px";

}
