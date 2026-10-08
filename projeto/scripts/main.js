
const botaoMenu = document.querySelector('#menu-botao');
const menuPrincipal = document.querySelector('#menu-principal');
const anoAtual = document.querySelector('#ano-atual');

function alternarMenu() {
    const menuEstaAberto = menuPrincipal.classList.toggle('aberto');

    botaoMenu.setAttribute('aria-expanded', String(menuEstaAberto));
    botaoMenu.textContent = menuEstaAberto ? 'Fechar menu' : 'Menu';
}

function atualizarAno() {
    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }
}

function fecharMenuAoNavegar() {
    menuPrincipal.classList.remove('aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.textContent = 'Menu';
}

if (botaoMenu && menuPrincipal) {
    botaoMenu.addEventListener('click', alternarMenu);

    menuPrincipal.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', fecharMenuAoNavegar);
    });
}

atualizarAno();
