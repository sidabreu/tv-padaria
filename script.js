const slides = [
    {
        tipo: "imagem",
        titulo: "Pão Francês",
        descricao: "Sempre quentinho",
        imagem: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600"
    },
    {
        tipo: "imagem",
        titulo: "Café da Manhã",
        descricao: "Comece bem o seu dia",
        imagem: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600"
    },
    {
        tipo: "imagem",
        titulo: "Bolo Caseiro",
        descricao: "Diversos sabores",
        imagem: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600"
    },
    {
        tipo: "cafe"
    }
];

const promocoes = [
    "☕ Café + Pão de Queijo por R$ 8,99",
    "🥖 10 Pães Franceses por R$ 7,50",
    "🎂 Bolos Caseiros todos os dias"
];

let atual = 0;
let promoAtual = 0;

function mostrarSlide() {

    const slide = slides[atual];

    const slideImagem = document.getElementById("slideImagem");
    const slideCafe = document.getElementById("slideCafe");

    slideImagem.style.display = "none";
    slideCafe.style.display = "none";

    if (slide.tipo === "cafe") {

        slideCafe.style.display = "flex";

    } else {

        slideImagem.style.display = "flex";

        document.getElementById("imagem").src = slide.imagem;
        document.getElementById("titulo").innerText = slide.titulo;
        document.getElementById("descricao").innerText = slide.descricao;
    }
}

setInterval(() => {
    atual = (atual + 1) % slides.length;
    mostrarSlide();
}, 10000);

mostrarSlide();

function atualizarDataHora() {

    const agora = new Date();

    document.getElementById("relogio").innerHTML =
        agora.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

    const data = document.getElementById("data");

    if (data) {
        data.innerHTML = agora.toLocaleDateString("pt-BR");
    }
}

setInterval(atualizarDataHora, 1000);
atualizarDataHora();

function atualizarPromocao() {

    const elemento = document.getElementById("promocao");

    if (!elemento) return;

    elemento.innerHTML = promocoes[promoAtual];

    promoAtual = (promoAtual + 1) % promocoes.length;
}

setInterval(atualizarPromocao, 8000);
atualizarPromocao();
