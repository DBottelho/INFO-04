const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função principal
async function gerenciarTarefas(listaDeTarefas, acao) {
    if (acao === "adicionar") {
        const descricao = await perguntar("Digite a descrição da nova tarefa: ");
        listaDeTarefas.push({ descricao: descricao, concluida: false });
        console.log("✅ Tarefa adicionada com sucesso!\n");

    } else if (acao === "remover") {
        const tarefasAntes = listaDeTarefas.length;
        listaDeTarefas = listaDeTarefas.filter(tarefa => !tarefa.concluida);
        const removidas = tarefasAntes - listaDeTarefas.length;
        console.log(`🗑️ ${removidas} tarefa(s) concluída(s) removida(s).\n`);

    } else if (acao === "listar") {
        console.log("\n📋 Tarefas pendentes:");
        const pendentes = listaDeTarefas.filter(t => !t.concluida);

        if (pendentes.length === 0) {
            console.log("🥳 Nenhuma tarefa pendente!");
        } else {
            pendentes.forEach((t, i) => {
                console.log(`${i + 1}. ${t.descricao}`);
            });
        }
        console.log();
    } else {
        console.log("❌ Ação inválida!");
    }

    return listaDeTarefas;
}

// Função auxiliar para fazer perguntas no terminal
function perguntar(msg) {
    return new Promise(resolve => {
        rl.question(msg, resposta => resolve(resposta));
    });
}

// Execução em loop até o usuário digitar "sair"
async function iniciar() {
    let tarefas = [
        { descricao: "Estudar", concluida: false },
        { descricao: "Fazer exercícios", concluida: false },
        { descricao: "Trabalhar", concluida: false },
    ];

    console.log("📝 Gerenciador de Tarefas\n");

    while (true) {
        console.log("Ações disponíveis: adicionar | remover | listar | concluir | sair");
        const acao = await perguntar("O que deseja fazer? ");

        if (acao === "sair") {
            console.log("👋 Encerrando...");
            break;
        }

        if (acao === "concluir") {
            // Listar tarefas e marcar uma como concluída
            const pendentes = tarefas.filter(t => !t.concluida);
            if (pendentes.length === 0) {
                console.log("✅ Nenhuma tarefa pendente para concluir.\n");
                continue;
            }

            console.log("\nPendentes:");
            pendentes.forEach((t, i) => {
                console.log(`${i + 1}. ${t.descricao}`);
            });

            const num = await perguntar("Digite o número da tarefa que deseja concluir: ");
            const index = parseInt(num) - 1;

            if (!isNaN(index) && pendentes[index]) {
                const originalIndex = tarefas.indexOf(pendentes[index]);
                tarefas[originalIndex].concluida = true;
                console.log("✔️ Tarefa marcada como concluída.\n");
            } else {
                console.log("❌ Número inválido.\n");
            }

        } else {
            tarefas = await gerenciarTarefas(tarefas, acao);
        }
    }

    rl.close();
}

iniciar();
