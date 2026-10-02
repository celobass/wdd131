const input = document.querySelector('#capfav');
const botao = document.querySelector('button');
const lista = document.querySelector('#list');

let arrayCapitulos = obterListaDeCapitulos() || [];

arrayCapitulos.forEach(capitulo => {
    exibirLista(capitulo);
});

botao.addEventListener('click', function () {
    if (input.value.trim() !== '') {
        exibirLista(input.value);
        arrayCapitulos.push(input.value);
        definirListaDeCapitulos();
        input.value = '';
        input.focus();
    }
});

input.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        botao.click();
    }
});

function exibirLista(item) {
    const li = document.createElement('li');
    const botaoExcluir = document.createElement('button');

    li.textContent = item;

    botaoExcluir.textContent = '❌';
    botaoExcluir.setAttribute('aria-label', `Excluir ${item}`);

    li.append(botaoExcluir);
    lista.append(li);

    botaoExcluir.addEventListener('click', function () {
        lista.removeChild(li);
        excluirCapitulo(li.textContent);
        input.focus();
    });
}

function definirListaDeCapitulos() {
    localStorage.setItem(
        'minhaListaFavoritosLDM',
        JSON.stringify(arrayCapitulos)
    );
}

function obterListaDeCapitulos() {
    return JSON.parse(
        localStorage.getItem('minhaListaFavoritosLDM')
    );
}

function excluirCapitulo(capitulo) {
    capitulo = capitulo.slice(0, capitulo.length - 1);
    arrayCapitulos = arrayCapitulos.filter(
        item => item !== capitulo
    );
    definirListaDeCapitulos();
}