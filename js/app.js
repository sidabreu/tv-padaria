let slides = [];
let indiceAtual = 0;
let timerSlide = null;

const imagemSlide = document.getElementById("imagem-slide");
const videoSlide = document.getElementById("video-slide");

const layoutProduto = document.getElementById("layout-produto");
const layoutPromocao = document.getElementById("layout-promocao");
const layoutInfo = document.getElementById("layout-info");
const layoutInst = document.getElementById("layout-inst");

async function carregarConteudo() {

    try {

        const resposta = await fetch("/tv-padaria/dados/conteudo.json");

        const dados = await resposta.json();

        slides = dados.slides;

        mostrarSlide(0);

    } catch (erro) {

        console.error("Erro ao carregar conteúdo:", erro);

    }
}

function esconderLayouts() {

    layoutProduto.classList.remove("ativo");
    layoutPromocao.classList.remove("ativo");
    layoutInfo.classList.remove("ativo");
    layoutInst.classList.remove("ativo");
}

function mostrarSlide(indice) {

    if (!slides.length) return;

    clearTimeout(timerSlide);

    const slide = slides[indice];

    esconderLayouts();

    imagemSlide.hidden = true;
    videoSlide.hidden = true;

    if (slide.imagem) {

        imagemSlide.src = slide.imagem;
        imagemSlide.hidden = false;
        imagemSlide.classList.add("fade-in");
    }

    switch (slide.tipo) {

        case "produto":

            layoutProduto.classList.add("ativo");

            document.getElementById("produto-titulo").textContent =
                slide.titulo || "";

            document.getElementById("produto-descricao").textContent =
                slide.descricao || "";

            break;

        case "promocao":

            layoutPromocao.classList.add("ativo");

            document.getElementById("promo-titulo").textContent =
                slide.titulo || "";

            document.getElementById("promo-preco").textContent =
                slide.preco || "";

            document.getElementById("promo-descricao").textContent =
                slide.descricao || "";

            break;

        case "informativo":

            layoutInfo.classList.add("ativo");

            document.getElementById("info-categoria").textContent =
                slide.categoria || "";

            document.getElementById("info-titulo").textContent =
                slide.titulo || "";

            document.getElementById("info-descricao").textContent =
                slide.descricao || "";

            break;

        case "institucional":

            layoutInst.classList.add("ativo");

            document.getElementById("inst-categoria").textContent =
                slide.categoria || "";

            document.getElementById("inst-titulo").textContent =
                slide.titulo || "";

            document.getElementById("inst-descricao").textContent =
                slide.descricao || "";

            break;
    }

    const tempo = (slide.tempo || 10) * 1000;

    timerSlide = setTimeout(proximoSlide, tempo);
}

function proximoSlide() {

    indiceAtual++;

    if (indiceAtual >= slides.length) {
        indiceAtual = 0;
    }

    mostrarSlide(indiceAtual);
}

function atualizarRelogio() {

    const agora = new Date();

    document.getElementById("hora").textContent =
        agora.toLocaleTimeString(
            "pt-BR",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );
}

setInterval(atualizarRelogio, 1000);

atualizarRelogio();

carregarConteudo();
