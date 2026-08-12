let slides = [];
let atual = 0;
let timerSlide = null;
let noticias = [];
let indiceNoticia = 0;

let climaCache = {
    agora: "--°C",
    descricao: "Atualizando...",
    hoje: "--° / --°",
    amanha: "--° / --°",
    iconeHoje: "🌤️ Hoje",
    iconeAmanha: "🌤️ Amanhã"
};

const frasesClima = [
    "☕ Aproveite o dia com um café fresquinho da Padaria Sant'Ana.",
    "🥖 Pães quentinhos saindo do forno várias vezes ao dia.",
    "🍰 Experimente nossos deliciosos bolos caseiros.",
    "🌤️ Seja bem-vindo! É um prazer receber você.",
    "☕ Tradição, qualidade e sabor em cada detalhe.",
    "🥐 O melhor café da manhã começa aqui.",
    "🍞 Sempre tem uma fornada especial esperando por você.",
    "❤️ Obrigado pela preferência e pela confiança.",
    "🌻 Desejamos um excelente dia para você e sua família.",
    "🧀 Que tal um pão de queijo quentinho agora?",
    "🍩 Doces, salgados e muitas novidades esperando por você.",
    "☕ Faça uma pausa e aproveite nossos produtos fresquinhos.",
    "🏡 Há anos fazendo parte dos melhores momentos da sua família.",
    "😊 Nossa maior receita é atender você bem.",
    "✨ Reinventando sabores, mantendo a tradição."
];

const efeitosMidia = [
    "efeito-zoom-in",
    "efeito-zoom-out",
    "efeito-pan-left",
    "efeito-pan-right",
    "efeito-fade"
];

const efeitosTexto = [
    "anim-subir",
    "anim-esquerda",
    "anim-direita",
    "anim-zoom",
    "anim-fade"
];

const imagemSlide = document.getElementById("imagem-slide");
const videoSlide = document.getElementById("video-slide");

const layouts = {
    abertura: document.getElementById("layout-abertura"),
    produto: document.getElementById("layout-produto"),
    combo: document.getElementById("layout-combo"),
    promocao: document.getElementById("layout-combo"),
    video: document.getElementById("layout-produto"),
    institucional: document.getElementById("layout-institucional"),
    clima: document.getElementById("layout-clima"),
    noticias: document.getElementById("layout-noticias")
};

async function iniciar(){
    atualizarRelogios();
    setInterval(atualizarRelogios, 1000);

    await carregarClima();
    setInterval(carregarClima, 30 * 60 * 1000);

    await carregarNoticias();
    setInterval(carregarNoticias, 30 * 60 * 1000);

    slides = await carregarSlides();
    mostrarSlide();
}

async function carregarSlides(){
    try{
        const resposta = await fetch("slides.json?cache=" + Date.now());
        const dados = await resposta.json();
        // Carrega somente slides que não estejam desativados
        return (dados.slides || []).filter(slide => slide.ativo !== false);
        
    }catch(e){
        console.error("Erro ao carregar slides.json", e);
        return [];
    }
}

function esconderTudo(){
    Object.values(layouts).forEach(layout => {
        if(layout){
            layout.classList.remove("ativo");
        }
    });

    imagemSlide.style.display = "none";
    videoSlide.style.display = "none";
    videoSlide.pause();

    limparClasses(imagemSlide);
    limparClasses(videoSlide);

    document.querySelectorAll(".texto-animado").forEach(el => {
        limparAnimacoesTexto(el);
    });
}

function mostrarSlide(){
    if(!slides.length){
        return;
    }

    clearTimeout(timerSlide);

    const slide = slides[atual];

    esconderTudo();
    aplicarMidia(slide);

    switch(slide.tipo){
        case "abertura":
            mostrarAbertura(slide);
            break;

        case "combo":
        case "promocao":
            mostrarCombo(slide);
            break;

        case "institucional":
            mostrarInstitucional(slide);
            break;

        case "clima":
            mostrarClima();
            break;

        case "noticias":
            mostrarNoticias();
            break;

        default:
            mostrarProduto(slide);
            break;
    }

    const tempo = (slide.tempo || 10) * 1000;

    timerSlide = setTimeout(() => {
        atual = (atual + 1) % slides.length;
        mostrarSlide();
    }, tempo);
}

function aplicarMidia(slide){
    if(slide.video){
        videoSlide.src = slide.video;
        videoSlide.style.display = "block";
        videoSlide.loop = false;
        videoSlide.currentTime = 0;

        videoSlide.play().catch(() => {});

        aplicarClasseMidia(videoSlide, slide);

    }else if(slide.imagem){
        imagemSlide.src = slide.imagem;
        imagemSlide.style.display = "block";

        aplicarClasseMidia(imagemSlide, slide);
    }
}

function aplicarClasseMidia(elemento, slide){
    const efeito = slide.efeito || efeitosMidia[atual % efeitosMidia.length];
    elemento.classList.add(efeito);
}

function mostrarAbertura(slide){
    layouts.abertura.classList.add("ativo");

    document.getElementById("abertura-categoria").innerText =
        slide.categoria || "PADARIA SANT'ANA";

    document.getElementById("abertura-titulo").innerText =
        slide.titulo || "";

    document.getElementById("abertura-descricao").innerText =
        slide.descricao || "";

    animarTexto(
        document.querySelector("#layout-abertura .texto-animado")
    );
}

function mostrarProduto(slide){
    layouts.produto.classList.add("ativo");

    document.getElementById("produto-titulo").innerText =
        slide.titulo || "";

    document.getElementById("produto-descricao").innerText =
        slide.descricao || "";

    animarTexto(
        document.querySelector("#layout-produto .texto-animado")
    );
}

function mostrarCombo(slide){
    layouts.combo.classList.add("ativo");

    document.getElementById("combo-tag").innerText =
        slide.tag || "COMBO ESPECIAL";

    document.getElementById("combo-titulo").innerText =
        slide.titulo || "";

    document.getElementById("combo-preco").innerText =
        slide.preco || "Confira";

    document.getElementById("combo-descricao").innerText =
        slide.descricao || "";

    animarTexto(
        document.querySelector("#layout-combo .texto-animado")
    );
}

function mostrarInstitucional(slide){
    layouts.institucional.classList.add("ativo");

    document.getElementById("inst-categoria").innerText =
        slide.categoria || "PADARIA SANT'ANA";

    document.getElementById("inst-titulo").innerText =
        slide.titulo || "";

    document.getElementById("inst-descricao").innerText =
        slide.descricao || "";

    animarTexto(
        document.querySelector("#layout-institucional .texto-animado")
    );
}

function mostrarClima(){
    layouts.clima.classList.add("ativo");

    const climaAgora = document.getElementById("clima-agora");
    const climaDescricao = document.getElementById("clima-descricao");
    const iconeHoje = document.getElementById("icone-hoje");
    const climaHoje = document.getElementById("clima-hoje");
    const iconeAmanha = document.getElementById("icone-amanha");
    const climaAmanha = document.getElementById("clima-amanha");
    const fraseClima = document.getElementById("frase-clima");

    if(climaAgora){
        climaAgora.innerText = climaCache.agora;
    }

    if(climaDescricao){
        climaDescricao.innerText = climaCache.descricao;
    }

    if(iconeHoje){
        iconeHoje.innerText = climaCache.iconeHoje;
    }

    if(climaHoje){
        climaHoje.innerText = climaCache.hoje;
    }

    if(iconeAmanha){
        iconeAmanha.innerText = climaCache.iconeAmanha;
    }

    if(climaAmanha){
        climaAmanha.innerText = climaCache.amanha;
    }

    if(fraseClima){
        fraseClima.innerText = fraseAleatoriaClima();
    }

    animarTexto(
        document.querySelector("#layout-clima .texto-animado")
    );
}

function mostrarNoticias(){
    layouts.noticias.classList.add("ativo");

    const noticia = noticias[indiceNoticia] || {
        titulo: "Notícias do Sul de Minas",
        descricao: "Aguarde a atualização das principais manchetes.",
        imagem: "assets/fundos/fundo-noticia.png"
    };

    const titulo = document.getElementById("noticia-titulo");
    const descricao = document.getElementById("noticia-descricao");
    const layoutNoticias = document.getElementById("layout-noticias");

    if(titulo){
        titulo.innerText = noticia.titulo;
    }

    if(descricao){
        descricao.innerText = noticia.descricao;
    }

    if(layoutNoticias){
        layoutNoticias.style.background =
            `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.82)), url('${noticia.imagem}')`;

        layoutNoticias.style.backgroundSize = "cover";
        layoutNoticias.style.backgroundPosition = "center";
    }

    indiceNoticia =
        (indiceNoticia + 1) % Math.max(noticias.length, 1);

    animarTexto(
        document.querySelector("#layout-noticias .texto-animado")
    );
}

function animarTexto(el){
    if(!el){
        return;
    }

    limparAnimacoesTexto(el);

    const anim = efeitosTexto[atual % efeitosTexto.length];

    el.classList.add(anim);
}

function limparClasses(el){
    el.classList.remove(
        "midia-contain",
        ...efeitosMidia
    );
}

function limparAnimacoesTexto(el){
    el.classList.remove(...efeitosTexto);
}

function atualizarRelogios(){
    const h = new Date().toLocaleTimeString("pt-BR", {
        hour:"2-digit",
        minute:"2-digit"
    });

    const horaNoticias = document.getElementById("hora-noticias");

    if(horaNoticias){
        horaNoticias.innerText = "🕒 " + h;
    }
}

function iconeClima(codigo){
    if(codigo === 0){
        return "☀️";
    }

    if(codigo === 1 || codigo === 2){
        return "🌤️";
    }

    if(codigo === 3){
        return "☁️";
    }

    if([45, 48].includes(codigo)){
        return "🌫️";
    }

    if([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(codigo)){
        return "🌧️";
    }

    if([95, 96, 99].includes(codigo)){
        return "⛈️";
    }

    return "🌤️";
}

function descricaoClima(codigo){
    if(codigo === 0){
        return "Céu limpo";
    }

    if(codigo === 1){
        return "Predomínio de sol";
    }

    if(codigo === 2){
        return "Parcialmente nublado";
    }

    if(codigo === 3){
        return "Nublado";
    }

    if([45, 48].includes(codigo)){
        return "Neblina";
    }

    if([51, 53, 55].includes(codigo)){
        return "Garoa";
    }

    if([61, 63, 65, 80, 81, 82].includes(codigo)){
        return "Possibilidade de chuva";
    }

    if([95, 96, 99].includes(codigo)){
        return "Risco de temporal";
    }

    return "Condição variável";
}

async function carregarClima(){
    try{
        const url =
            "https://api.open-meteo.com/v1/forecast?latitude=-21.235&longitude=-45.758&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=America%2FSao_Paulo";

        const resposta = await fetch(url);
        const dados = await resposta.json();

        const tempAtual = Math.round(dados.current.temperature_2m);
        const codigoAtual = dados.current.weather_code;

        const hojeMax = Math.round(dados.daily.temperature_2m_max[0]);
        const hojeMin = Math.round(dados.daily.temperature_2m_min[0]);

        const amanhaMax = Math.round(dados.daily.temperature_2m_max[1]);
        const amanhaMin = Math.round(dados.daily.temperature_2m_min[1]);

        const codigoHoje = dados.daily.weather_code[0];
        const codigoAmanha = dados.daily.weather_code[1];

        climaCache.agora =
            `${tempAtual}°C`;

        climaCache.descricao =
            descricaoClima(codigoAtual);

        climaCache.hoje =
            `${hojeMin}° / ${hojeMax}°`;

        climaCache.amanha =
            `${amanhaMin}° / ${amanhaMax}°`;

        climaCache.iconeHoje =
            `${iconeClima(codigoHoje)} Hoje`;

        climaCache.iconeAmanha =
            `${iconeClima(codigoAmanha)} Amanhã`;

    }catch(e){
        climaCache.agora = "--°C";
        climaCache.descricao = "Clima indisponível";
        climaCache.hoje = "--° / --°";
        climaCache.amanha = "--° / --°";
        climaCache.iconeHoje = "🌤️ Hoje";
        climaCache.iconeAmanha = "🌤️ Amanhã";
    }
}

function fraseAleatoriaClima(){
    return frasesClima[
        Math.floor(Math.random() * frasesClima.length)
    ];
}

function limparHtml(texto){
    const div = document.createElement("div");
    div.innerHTML = texto;
    return div.innerText || "";
}
function limitarTexto(texto, limite){
    if(!texto){
        return "";
    }

    if(texto.length <= limite){
        return texto;
    }

    return texto.substring(0, limite) + "...";
}

async function carregarNoticias(){
   const rss = "https://news.google.com/rss/search?q=Minas+Gerais&hl=pt-BR&gl=BR&ceid=BR:pt-419";

    const url =
        "https://api.rss2json.com/v1/api.json?rss_url=" +
        encodeURIComponent(rss);

    try{
        const resposta = await fetch(url);
        const dados = await resposta.json();

        noticias = (dados.items || [])
            .slice(0, 3)
            .map(item => ({
                titulo: item.title || "Notícias",
             descricao: limitarTexto(
    limparHtml(item.description || "Veja os principais acontecimentos do Brasil."),
    140
),
                imagem: item.thumbnail || "assets/fundos/fundo-noticia.png"
            }));

        if(noticias.length === 0){
            noticias = [{
                titulo: "Notícias",
                descricao: "Aguarde a atualização das principais manchetes.",
                imagem: "assets/fundos/fundo-noticia.png"
            }];
        }

        console.log("Notícias carregadas:", noticias);

    }catch(e){
        console.error("Erro ao carregar notícias:", e);

        noticias = [{
            titulo: "Notícias",
            descricao: "Aguarde a atualização das principais manchetes.",
            imagem: "assets/fundos/fundo-noticia.png"
        }];
    }
}

iniciar();
