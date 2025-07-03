const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const anoAtual = new Date().getFullYear();

rl.question('Digite seu ano de nascimento: ', function(anoNascimento) {
  const idade = anoAtual - parseInt(anoNascimento);

  let faixaEtaria = '';

  if (idade >= 0 && idade <= 12) {
    faixaEtaria = 'Criança';
  } else if (idade >= 13 && idade <= 17) {
    faixaEtaria = 'Jovem';
  } else if (idade >= 18 && idade <= 59) {
    faixaEtaria = 'Adulto';
  } else if (idade >= 60) {
    faixaEtaria = 'Idoso';
  } else {
    faixaEtaria = 'Ano de nascimento inválido.';
  }

  console.log(`Você tem ${idade} anos e é classificado como: ${faixaEtaria}`);
  rl.close();
});
