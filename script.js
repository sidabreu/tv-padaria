const slides = [
    {
        tipo:"imagem",
        titulo:"Pão Francês",
        descricao:"Sempre quentinho",
        imagem:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600"
    },
    {
        tipo:"imagem",
        titulo:"Café da Manhã",
        descricao:"Comece bem o seu dia",
        imagem:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600"
    },
    {
        tipo:"imagem",
        titulo:"Bolo Caseiro",
        descricao:"Diversos sabores",
        imagem:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600"
    },
    {
        tipo:"cafe"
    }
];

let atual = 0;

function mostrarSlide(){

    const slide = slides[atual];

    document.getElementById("slideImagem").style.display = "none";
    document.getElementById("slideCafe").style.display = "none";

    if(slide.tipo === "cafe"){
        document.getElementById("slideCafe").style.display = "block";
    }else{
        document.getElementById("slideImagem").style.display = "block";
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

function atualizarRelogio(){

    const agora = new Date();

    const hora = agora.toLocaleTimeString(
        'pt-BR',
        {
            hour:'2-digit',
            minute:'2-digit',
            second:'2-digit'
        }
    );

    document.getElementById("relogio").innerHTML = hora;
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();
