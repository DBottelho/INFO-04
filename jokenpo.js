const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função auxiliar para perguntar
function perguntar(msg) {
    return new Promise((resolve) => {
        readline.question(msg, (resposta) => resolve(resposta.toLowerCase()));
    });
}

// Gera a escolha aleatória da máquina
function escolhaAleatoria() {
    const opcoes = ["pedra", "papel", "tesoura"];
    const index = Math.floor(Math.random() * 3);
    return opcoes[index];
}

// Determina o vencedor
function decidirVencedor(jogador, maquina) {
    if (jogador === maquina) return "empate";

    if (
        (jogador === "pedra" && maquina === "tesoura") ||
        (jogador === "papel" && maquina === "pedra") ||
        (jogador === "tesoura" && maquina === "papel")
    ) {
        return "jogador";
    } else {
        return "maquina";
    }
}

// Interface de resultado com emojis
function mostrarResultado(jogador, maquina, resultado) {
    console.log(`\n🧑 Você jogou: ${jogador}`);
    console.log(`🤖 A máquina jogou: ${maquina}`);

    if (resultado === "empate") {
        console.log("🤝 Empate! Vamos de novo!\n");
    } else if (resultado === "jogador") {
        console.log("🎉 Você venceu esta rodada!\n");
    } else {
        console.log("💀 A máquina venceu! Fim de jogo.\n");
    }
}

async function main() {
    console.log("=== 🪨 JOKENPÔ 🧻 ✂️ ===\n");
    console.log("Escolha: pedra, papel ou tesoura\n");

    let pontos = 0;

    while (true) {
        const jogador = await perguntar("Sua escolha: ");
        const opcoesValidas = ["pedra", "papel", "tesoura"];

        if (!opcoesValidas.includes(jogador)) {
            console.log("❌ Escolha inválida! Tente novamente (pedra, papel ou tesoura).\n");
            continue;
        }

        const maquina = escolhaAleatoria();
        const resultado = decidirVencedor(jogador, maquina);
        mostrarResultado(jogador, maquina, resultado);

        if (resultado === "jogador") {
            pontos++;
            console.log(`🔥 Pontos: ${pontos}\n`);
        } else if (resultado === "maquina") {
            console.log(`☠️ Você fez ${pontos} ponto(s) antes de perder.`);
            break;
        }
        // Se empate, continua o loop
    }

    console.log("\n🎮 Obrigado por jogar!");
    readline.close();
}

main();
