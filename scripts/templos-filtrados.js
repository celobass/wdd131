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
const templos = [
    {
        nomeDoTemplo: 'Aba Nigeria',
        localizacao: 'Aba, Nigéria',
        consagracao: '2005, 7 de agosto',
        area: 11500,
        urlDaImagem: 'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg'
    },
    {
        nomeDoTemplo: 'Manti Utah',
        localizacao: 'Manti, Utah, Estados Unidos',
        consagracao: '1888, 21 de maio',
        area: 74792,
        urlDaImagem: 'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg'
    },
    {
        nomeDoTemplo: 'Payson Utah',
        localizacao: 'Payson, Utah, Estados Unidos',
        consagracao: '2015, 7 de junho',
        area: 96630,
        urlDaImagem: 'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg'
    },
    {
        nomeDoTemplo: 'Yigo Guam',
        localizacao: 'Yigo, Guam',
        consagracao: '2020, 2 de maio',
        area: 6861,
        urlDaImagem: 'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg'
    },
    {
        nomeDoTemplo: 'Washington D.C.',
        localizacao: 'Kensington, Maryland, Estados Unidos',
        consagracao: '1974, 19 de novembro',
        area: 156558,
        urlDaImagem: 'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg'
    },
    {
        nomeDoTemplo: 'Lima Peru',
        localizacao: 'Lima, Peru',
        consagracao: '1986, 10 de janeiro',
        area: 9600,
        urlDaImagem: 'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg'
    },
    {
        nomeDoTemplo: 'Cidade do México, México',
        localizacao: 'Cidade do México, México',
        consagracao: '1983, 2 de dezembro',
        area: 116642,
        urlDaImagem: 'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg'
    },
    {
        nomeDoTemplo: 'São Paulo Brasil',
        localizacao: 'São Paulo, Brasil',
        consagracao: '1978, 30 de outubro',
        area: 59000,
        urlDaImagem: 'imagens/sao-paulo.jpg'
    },
    {
        nomeDoTemplo: 'Curitiba Brasil',
        localizacao: 'Curitiba, Paraná, Brasil',
        consagracao: '2008, 1 de junho',
        area: 32600,
        urlDaImagem: 'imagens/curitiba.jpg'
    },
    {
        nomeDoTemplo: 'Recife Brasil',
        localizacao: 'Recife, Pernambuco, Brasil',
        consagracao: '2000, 15 de dezembro',
        area: 29600,
        urlDaImagem: 'imagens/recife.jpg'
    }
];
function exibirTemplos(listaTemplos) {
    const galeria = document.querySelector('.galeria');

    galeria.innerHTML = '';

    listaTemplos.forEach((templo) => {
        const cartao = document.createElement('figure');

        const imagem = document.createElement('img');
        imagem.src = templo.urlDaImagem;
        imagem.alt = templo.nomeDoTemplo;
        imagem.loading = 'lazy';

        const titulo = document.createElement('h2');
        titulo.textContent = templo.nomeDoTemplo;

        const localizacao = document.createElement('p');
        localizacao.innerHTML = `<strong>Localização:</strong> ${templo.localizacao}`;

        const consagracao = document.createElement('p');
        consagracao.innerHTML = `<strong>Consagração:</strong> ${templo.consagracao}`;

        const area = document.createElement('p');
        area.innerHTML = `<strong>Área:</strong> ${templo.area.toLocaleString('pt-BR')} pés²`;

        cartao.appendChild(imagem);
        cartao.appendChild(titulo);
        cartao.appendChild(localizacao);
        cartao.appendChild(consagracao);
        cartao.appendChild(area);

        galeria.appendChild(cartao);
    });
}

function filtrarTemplos(filtro) {
    let templosFiltrados = templos;

    if (filtro === 'todos') {
        templosFiltrados = templos;
    }

    if (filtro === 'antigo') {
        templosFiltrados = templos.filter((templo) => {
            return parseInt(templo.consagracao) < 1900;
        });
    }

    if (filtro === 'novo') {
        templosFiltrados = templos.filter((templo) => {
            return parseInt(templo.consagracao) > 2000;
        });
    }

    if (filtro === 'grande') {
        templosFiltrados = templos.filter((templo) => {
            return templo.area > 90000;
        });
    }

    if (filtro === 'pequeno') {
        templosFiltrados = templos.filter((templo) => {
            return templo.area < 10000;
        });
    }

    exibirTemplos(templosFiltrados);
}

filtrarTemplos('todos');
document.querySelectorAll('.navigation a').forEach((link) => {
    link.addEventListener('click', function (evento) {
        evento.preventDefault();

        const filtro = this.textContent.toLowerCase();

        if (filtro === 'página inicial') {
            filtrarTemplos('todos');
        }

        if (filtro === 'antigo') {
            filtrarTemplos('antigo');
        }

        if (filtro === 'novo') {
            filtrarTemplos('novo');
        }

        if (filtro === 'grande') {
            filtrarTemplos('grande');
        }

        if (filtro === 'pequeno') {
            filtrarTemplos('pequeno');
        }
    });
});