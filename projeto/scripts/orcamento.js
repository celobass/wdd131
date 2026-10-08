
const formulario = document.querySelector('#form-orcamento');
const resultadoOrcamento = document.querySelector('#resultado-orcamento');
const detalhesResultado = document.querySelector('#detalhes-resultado');
const mensagemFormulario = document.querySelector('#mensagem-formulario');
const botaoSalvar = document.querySelector('#salvar-orcamento');
const mensagemSalvamento = document.querySelector('#mensagem-salvamento');

const materiais = [
    { id: 'pla', nome: 'PLA' },
    { id: 'petg', nome: 'PETG' },
    { id: 'abs', nome: 'ABS' },
    { id: 'tpu', nome: 'TPU' }
];

let ultimoOrcamento = null;

function obterNumero(id) {
    return Number(document.querySelector(`#${id}`).value);
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function obterNomeMaterial(id) {
    const materialEncontrado = materiais.find((material) => material.id === id);

    return materialEncontrado ? materialEncontrado.nome : 'Material não identificado';
}

function calcularOrcamento(dados) {
    const custoMaterial = (dados.peso / 1000) * dados.precoKg;
    const custoEnergia = (dados.potencia / 1000) * dados.tempo * dados.energia;
    const custoMaquina = dados.tempo * dados.custoHora;

    const custoBase = custoMaterial + custoEnergia + custoMaquina;
    const custoPerdas = custoBase * (dados.perdas / 100);
    const custoUnitario = custoBase + custoPerdas;
    const custoTotal = custoUnitario * dados.quantidade;

    const precoUnitario = custoUnitario / (1 - dados.margem / 100);
    const precoTotal = precoUnitario * dados.quantidade;
    const lucroTotal = precoTotal - custoTotal;
    const margemReal = precoTotal > 0 ? (lucroTotal / precoTotal) * 100 : 0;

    return {
        ...dados,
        custoMaterial,
        custoEnergia,
        custoMaquina,
        custoPerdas,
        custoUnitario,
        custoTotal,
        precoUnitario,
        precoTotal,
        lucroTotal,
        margemReal
    };
}

function obterDadosFormulario() {
    return {
        nomePeca: document.querySelector('#nome-peca').value.trim(),
        material: document.querySelector('#material').value,
        precoKg: obterNumero('preco-kg'),
        peso: obterNumero('peso'),
        tempo: obterNumero('tempo'),
        potencia: obterNumero('potencia'),
        energia: obterNumero('energia'),
        custoHora: obterNumero('custo-hora'),
        perdas: obterNumero('perdas'),
        quantidade: obterNumero('quantidade'),
        margem: obterNumero('margem')
    };
}

function exibirResultado(orcamento) {
    const nomeMaterial = obterNomeMaterial(orcamento.material);

    detalhesResultado.innerHTML = `
        <p><strong>Peça:</strong> ${orcamento.nomePeca}</p>
        <p><strong>Material:</strong> ${nomeMaterial}</p>
        <p><strong>Custo de material por peça:</strong> ${formatarMoeda(orcamento.custoMaterial)}</p>
        <p><strong>Custo de energia por peça:</strong> ${formatarMoeda(orcamento.custoEnergia)}</p>
        <p><strong>Custo de máquina por peça:</strong> ${formatarMoeda(orcamento.custoMaquina)}</p>
        <p><strong>Provisão para perdas por peça:</strong> ${formatarMoeda(orcamento.custoPerdas)}</p>
        <hr>
        <p><strong>Custo unitário estimado:</strong> ${formatarMoeda(orcamento.custoUnitario)}</p>
        <p><strong>Custo total (${orcamento.quantidade} peça(s)):</strong> ${formatarMoeda(orcamento.custoTotal)}</p>
        <p><strong>Preço sugerido por peça:</strong> ${formatarMoeda(orcamento.precoUnitario)}</p>
        <p><strong>Preço total sugerido:</strong> ${formatarMoeda(orcamento.precoTotal)}</p>
        <p><strong>Lucro estimado total:</strong> ${formatarMoeda(orcamento.lucroTotal)}</p>
        <p><strong>Margem sobre a venda:</strong> ${orcamento.margemReal.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%</p>
        <p><small>Estimativa demonstrativa: não inclui necessariamente todos os custos de uma operação real.</small></p>
    `;

    resultadoOrcamento.hidden = false;
    mensagemSalvamento.textContent = '';
}

function processarFormulario(evento) {
    evento.preventDefault();

    mensagemFormulario.textContent = '';
    mensagemSalvamento.textContent = '';

    if (!formulario.reportValidity()) {
        return;
    }

    const dados = obterDadosFormulario();

    if (!dados.nomePeca || !materiais.some((material) => material.id === dados.material)) {
        mensagemFormulario.textContent = 'Informe o nome da peça e selecione um material válido.';
        return;
    }

    if (
        dados.precoKg <= 0 ||
        dados.peso <= 0 ||
        dados.tempo <= 0 ||
        dados.potencia <= 0 ||
        dados.energia <= 0 ||
        dados.custoHora < 0 ||
        dados.perdas < 0 ||
        dados.perdas > 100 ||
        dados.quantidade < 1 ||
        !Number.isInteger(dados.quantidade) ||
        dados.margem < 0 ||
        dados.margem > 90
    ) {
        mensagemFormulario.textContent = 'Confira os valores informados antes de calcular.';
        return;
    }

    ultimoOrcamento = calcularOrcamento(dados);
    exibirResultado(ultimoOrcamento);

    resultadoOrcamento.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function salvarOrcamento() {
    if (!ultimoOrcamento) {
        mensagemSalvamento.textContent = 'Calcule um orçamento antes de salvá-lo.';
        return;
    }

    try {
        const orcamentosSalvos = JSON.parse(
            localStorage.getItem('vyxelcore-orcamentos') || '[]'
        );

        orcamentosSalvos.push({
            ...ultimoOrcamento,
            data: new Date().toISOString()
        });

        localStorage.setItem(
            'vyxelcore-orcamentos',
            JSON.stringify(orcamentosSalvos)
        );

        mensagemSalvamento.textContent = 'Orçamento salvo neste dispositivo com sucesso.';
    } catch (erro) {
        mensagemSalvamento.textContent =
            'Não foi possível salvar. Verifique se o armazenamento do navegador está disponível.';
    }
}

formulario.addEventListener('submit', processarFormulario);
botaoSalvar.addEventListener('click', salvarOrcamento);
