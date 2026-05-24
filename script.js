const slides = [

{
titulo:"Pão Francês",
descricao:"Sempre quentinho",
imagem:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600"
},

{
titulo:"Café da Manhã",
descricao:"Comece bem o seu dia",
imagem:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600"
},

{
titulo:"Bolo Caseiro",
descricao:"Diversos sabores",
imagem:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600"
}

];

let atual=0;

setInterval(() => {

atual=(atual+1)%slides.length;

document.getElementById("imagem").src =
slides[atual].imagem;

document.getElementById("titulo").innerText =
slides[atual].titulo;

document.getElementById("descricao").innerText =
slides[atual].descricao;

},5000);

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

setInterval(atualizarRelogio,1000);

atualizarRelogio();
