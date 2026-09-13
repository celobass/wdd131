const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', function () {
    navigation.classList.toggle('responsive');
    hamButton.classList.toggle('open');

    if (hamButton.classList.contains('open')) {
        hamButton.textContent = '✕';
        hamButton.setAttribute('aria-label', 'Fechar menu');
    } else {
        hamButton.textContent = '☰';
        hamButton.setAttribute('aria-label', 'Abrir menu');
    }
});

const anoAtual = new Date().getFullYear();
document.querySelector('#anoatual').textContent = anoAtual;

const ultimaModificacao = document.lastModified;
document.querySelector('#ultimaModificacao').textContent = ultimaModificacao;