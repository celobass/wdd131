// Ano atual
const anoAtual = new Date().getFullYear();
document.querySelector('#anoatual').textContent = anoAtual;

// Data da última modificação
document.querySelector('#ultimaModificacao').textContent =
    `Última modificação: ${document.lastModified}`;

// Valores estáticos do clima
const temperatura = 8;
const vento = 12;

// Calcula a sensação térmica usando temperatura em °C
// e velocidade do vento em km/h.
function calcularSensacaoTermica(temperatura, vento) {
    return 13.12 +
        0.6215 * temperatura -
        11.37 * Math.pow(vento, 0.16) +
        0.3965 * temperatura * Math.pow(vento, 0.16);
}

// Exibe a sensação térmica somente quando
// as condições necessárias são atendidas.
const elementoSensacao = document.querySelector('#sensacao-termica');

if (temperatura <= 10 && vento > 4.8) {
    const sensacao = calcularSensacaoTermica(temperatura, vento);

    elementoSensacao.textContent = `${sensacao.toFixed(1)} °C`;
} else {
    elementoSensacao.textContent = 'N/A';
}