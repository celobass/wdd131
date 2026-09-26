let umCurso = {
    codigo: 'WDD131',
    nome: 'Fundamentos da Web Dinâmica',
    creditos: 2,
    secoes: [
        {
            secao: '001',
            matriculado: 95,
            instrutor: 'Leonidas Yopan'
        },
        {
            secao: '002',
            matriculado: 80,
            instrutor: 'Sarah Gobble'
        }
    ]
};

function definirInformacoesCurso(curso) {
    document.querySelector('#nomeCurso').innerHTML =
        `${curso.codigo} – ${curso.nome}`;
}

function exibirSecoes(curso) {
    const tbody = document.querySelector('#secoes tbody');
    let linhas = '';

    for (const secao of curso.secoes) {
        linhas += `<tr>
            <td>${secao.secao}</td>
            <td>${secao.matriculado}</td>
            <td>${secao.instrutor}</td>
        </tr>`;
    }

    tbody.innerHTML = linhas;
}

definirInformacoesCurso(umCurso);
exibirSecoes(umCurso);


// Exercícios com arrays

let nomes = ['Nancy', 'Blessing', 'Jorge', 'Svetlana', 'Bob'];

let nomesB = nomes.filter(nome => nome.charAt(0) === 'B');

let tamanhoNomes = nomes.map(nome => nome.length);

let tamanhoMedio = nomes.reduce(
    (total, nome) => total + nome.length,
    0
) / nomes.length;

console.log('Nomes com B:', nomesB);
console.log('Tamanho dos nomes:', tamanhoNomes);
console.log('Tamanho médio:', tamanhoMedio);
