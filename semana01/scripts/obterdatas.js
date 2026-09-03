const anoAtual = new Date().getFullYear();

document.querySelector('#anoatual').textContent = anoAtual;

document.querySelector('#ultimaModificacao').textContent =
    `Última modificação: ${document.lastModified}`;