const slides = [
    {
        tipo: "imagem",
        categoria: "PADARIA SANT'ANA",
        titulo: "Pão francês saindo do forno",
        descricao: "Sempre quentinho para o seu café da manhã",
        imagem: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600"
    },
    {
        tipo: "imagem",
        categoria: "CAFÉ DA MANHÃ",
        titulo: "Comece bem o seu dia",
        descricao: "Café fresco, pão de queijo e aquele atendimento especial",
        imagem: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600"
    },
    {
        tipo: "imagem",
        categoria: "BOLOS CASEIROS",
        titulo: "Bolos fresquinhos todos os dias",
        descricao: "Diversos sabores para levar para casa",
        imagem: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600"
    },
    {
        tipo: "cafe"
    }
];

let atual = 0;

function mostrarSlide() {

    const slide = slides[atual];

    const slideImagem = document.getElementById("slideImagem");
    const slideCafe = document.getElementById("slideCafe");

    slideImagem.style.display = "none";
    slideCafe.style.display = "none";

    if (slide.tipo === "cafe") {

        slideCafe.style.display = "block";

    } else {

        slideImagem.style.display = "block";

        document.getElementById("imagem").src = slide.imagem;
        document.getElementById("categoria").innerText = slide.categoria;
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

    const horaCompleta = agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    const horaMinuto = agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

    document.getElementById("relogio").innerHTML = horaCompleta;

    const data = document.getElementById("data");

    if (data) {
        data.innerHTML = agora.toLocaleDateString("pt-BR");
    }

    const horaRodape = document.getElementById("horaRodape");

    if (horaRodape) {
        horaRodape.innerHTML = horaMinuto;
    }
}

setInterval(atualizarDataHora, 1000);
atualizarDataHora();
