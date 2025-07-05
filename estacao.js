// Estação do ano baseada no mês (Hemisfério Sul)

// Função que retorna a estação do ano com base no mês
function obterEstacaoDoAno(mes) {
    mes = mes.toLowerCase(); // Converte para minúsculas

    // Mapeia nomes para números
    const meses = {
        "janeiro": 1,
        "fevereiro": 2,
        "março": 3,
        "abril": 4,
        "maio": 5,
        "junho": 6,
        "julho": 7,
        "agosto": 8,
        "setembro": 9,
        "outubro": 10,
        "novembro": 11,
        "dezembro": 12
    };

    // Converte se for nome de mês
    if (isNaN(mes)) {
        mes = meses[mes];
    } else {
        mes = parseInt(mes);
    }

    if (mes < 1 || mes > 12 || isNaN(mes)) {
        return "Mês inválido!";
    }

    let estacao = "";

    switch (mes) {
        case 12:
        case 1:
        case 2:
            estacao = "Verão";
            break;
        case 3:
        case 4:
        case 5:
            estacao = "Outono";
            break;
        case 6:
        case 7:
        case 8:
            estacao = "Inverno";
            break;
        case 9:
        case 10:
        case 11:
            estacao = "Primavera";
            break;
    }

    return `A estação do ano é: ${estacao}`;
}

// Para rodar no terminal do VS Code
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Digite o mês (número ou nome): ", (mes) => {
    console.log(obterEstacaoDoAno(mes));
    readline.close();
});
