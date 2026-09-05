const anoAtual = new Date().getFullYear();

document.querySelector('#anoatual').textContent = anoAtual;

const ultimaModificacao = new Date(document.lastModified);

document.querySelector('#ultimaModificacao').textContent =
    `Última modificação: ${ultimaModificacao.toLocaleString('pt-BR')}`;