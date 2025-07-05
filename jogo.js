const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntar(msg) {
    return new Promise((resolve) => {
        readline.question(msg, (resposta) => resolve(resposta));
    });
}

function calcularArea(forma, medidas) {
    switch (forma) {
        case "1": // Quadrado
            return medidas.lado ** 2;
        case "2": // Retângulo
            return medidas.base * medidas.altura;
        case "3": // Círculo
            return Math.PI * (medidas.raio ** 2);
        default:
            return null;
    }
}

function verificarParOuImpar(valor) {
    const inteiro = Math.floor(valor);
    if (inteiro % 2 === 0) {
        console.log("🎉 Parabéns! Você acertou, a área é par!");
    } else {
        console.log("😢 Que pena! A área é ímpar. Você perdeu o jogo.");
    }
}

async function main() {
    console.log("=== Jogo das Formas Geométricas ===");
    console.log("1 - Quadrado");
    console.log("2 - Retângulo");
    console.log("3 - Círculo");

    const forma = await perguntar("Escolha uma forma (1, 2 ou 3): ");

    let medidas = {};

    if (forma === "1") {
        medidas.lado = parseFloat(await perguntar("Informe o lado do quadrado: "));
    } else if (forma === "2") {
        medidas.base = parseFloat(await perguntar("Informe a base do retângulo: "));
        medidas.altura = parseFloat(await perguntar("Informe a altura do retângulo: "));
    } else if (forma === "3") {
        medidas.raio = parseFloat(await perguntar("Informe o raio do círculo: "));
    } else {
        console.log("Forma inválida. Encerrando...");
        readline.close();
        return;
    }

    const area = calcularArea(forma, medidas);

    if (area === null || isNaN(area)) {
        console.log("Erro ao calcular a área.");
        readline.close();
        return;
    }

    const areaFinal = parseFloat(area.toFixed(2));
    console.log(`🧮 A área calculada é: ${areaFinal}`);

    verificarParOuImpar(areaFinal);

    readline.close();
}

main();
