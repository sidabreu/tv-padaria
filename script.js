let slides=[],atual=0,timerSlide=null,noticias=[];
let climaCache={hoje:"--° / --°",amanha:"--° / --°"};
const efeitosMidia=["efeito-zoom-in","efeito-zoom-out","efeito-pan-left","efeito-pan-right","efeito-fade"];
const efeitosTexto=["anim-subir","anim-esquerda","anim-direita","anim-zoom","anim-fade"];
const imagemSlide=document.getElementById("imagem-slide");
const videoSlide=document.getElementById("video-slide");
const layouts={
  abertura:document.getElementById("layout-abertura"),
 produto:document.getElementById("layout-produto"),
 combo:document.getElementById("layout-combo"),
 promocao:document.getElementById("layout-combo"),
 video:document.getElementById("layout-produto"),
 institucional:document.getElementById("layout-institucional"),
 cafe:document.getElementById("layout-cafe"),
 clima:document.getElementById("layout-clima"),
 noticias:document.getElementById("layout-noticias"),
 mensagem:document.getElementById("layout-mensagem")
};
async function iniciar(){
 atualizarRelogios();setInterval(atualizarRelogios,1000);
 carregarClima();setInterval(carregarClima,30*60*1000);
 carregarNoticias();setInterval(carregarNoticias,30*60*1000);
 slides=await carregarSlides();mostrarSlide();
}
async function carregarSlides(){
 try{const r=await fetch("slides.json?cache="+Date.now());const d=await r.json();return d.slides||[]}catch(e){console.error(e);return []}
}
function esconderTudo(){
 Object.values(layouts).forEach(l=>{if(l)l.classList.remove("ativo")});
 imagemSlide.style.display="none";videoSlide.style.display="none";videoSlide.pause();
 limparClasses(imagemSlide);limparClasses(videoSlide);
 document.querySelectorAll(".texto-animado").forEach(el=>limparAnimacoesTexto(el));
}
function mostrarSlide(){
 if(!slides.length)return;clearTimeout(timerSlide);
 const slide=slides[atual];esconderTudo();aplicarMidia(slide);
 switch(slide.tipo){
  case"abertura":mostrarAbertura(slide);break;
  case"combo":case"promocao":mostrarCombo(slide);break;
  case"institucional":mostrarInstitucional(slide);break;
  case"cafe":mostrarCafe(slide);break;
  case"noticias":mostrarNoticias();break;
  case"mensagem":mostrarMensagem(slide);break;
  default:mostrarProduto(slide);
 }
 timerSlide=setTimeout(()=>{atual=(atual+1)%slides.length;mostrarSlide()},(slide.tempo||10)*1000);
}
function aplicarMidia(slide){
 if(slide.video){videoSlide.src=slide.video;videoSlide.style.display="block";videoSlide.loop=false;videoSlide.currentTime=0;videoSlide.play().catch(()=>{});aplicarClasseMidia(videoSlide,slide)}
 else if(slide.imagem){imagemSlide.src=slide.imagem;imagemSlide.style.display="block";aplicarClasseMidia(imagemSlide,slide)}
}
function aplicarClasseMidia(el,slide){
 if(slide.tipo==="abertura"||slide.tipo==="institucional")el.classList.add("midia-contain");
 el.classList.add(slide.efeito||efeitosMidia[atual%efeitosMidia.length]);
}
function mostrarAbertura(slide){
 layouts.abertura.classList.add("ativo");
 document.getElementById("abertura-categoria").innerText=slide.categoria||"PADARIA SANT'ANA";
 document.getElementById("abertura-titulo").innerText=slide.titulo||"";
 document.getElementById("abertura-descricao").innerText=slide.descricao||"";
 animarTexto(document.querySelector("#layout-abertura .texto-animado"));
}
function mostrarProduto(slide){
 layouts.produto.classList.add("ativo");
 document.getElementById("produto-titulo").innerText=slide.titulo||"";
 document.getElementById("produto-descricao").innerText=slide.descricao||"";
 animarTexto(document.querySelector("#layout-produto .texto-animado"));
}
function mostrarCombo(slide){
 layouts.combo.classList.add("ativo");
 document.getElementById("combo-tag").innerText=slide.tag||"COMBO ESPECIAL";
 document.getElementById("combo-titulo").innerText=slide.titulo||"";
 document.getElementById("combo-preco").innerText=slide.preco||"Confira";
 document.getElementById("combo-descricao").innerText=slide.descricao||"";
 animarTexto(document.querySelector("#layout-combo .texto-animado"));
}
function mostrarInstitucional(slide){
 layouts.institucional.classList.add("ativo");
 document.getElementById("inst-categoria").innerText=slide.categoria||"PADARIA SANT'ANA";
 document.getElementById("inst-titulo").innerText=slide.titulo||"";
 document.getElementById("inst-descricao").innerText=slide.descricao||"";
 animarTexto(document.querySelector("#layout-institucional .texto-animado"));
}
function mostrarCafe(slide){
 layouts.cafe.classList.add("ativo");
 fetch("cotacao.json?cache="+Date.now()).then(r=>r.json()).then(c=>{
  const alta=Number(c.variacaoNumero||0)>=0,seta=alta?"▲":"▼",classe=alta?"alta":"baixa";
  document.getElementById("cafe-nome").innerText=c.nome||"NY Arábica Futuro";
  document.getElementById("cafe-preco").innerText=`${seta} ${c.preco||"--"} US¢/lb`;
  document.getElementById("cafe-variacao").innerText=c.variacao||"0,00%";
  document.getElementById("cafe-atualizado").innerText="Atualizado: "+(c.atualizado||"--/--/----");
  document.getElementById("cafe-preco").className="cafe-preco "+classe;
  document.getElementById("cafe-variacao").className="cafe-variacao "+classe;
 }).catch(()=>{});
 document.getElementById("clima-cafe-hoje").innerText=climaCache.hoje;
 document.getElementById("clima-cafe-amanha").innerText=climaCache.amanha;
 animarTexto(document.querySelector("#layout-cafe .texto-animado"));
}
function mostrarNoticias(){
 layouts.noticias.classList.add("ativo");
 const ul=document.getElementById("lista-noticias");ul.innerHTML="";
 const lista=noticias.length?noticias.slice(0,4):["Notícias do Sul de Minas aparecerão aqui.","A atualização depende da disponibilidade do RSS.","A Padaria Sant'Ana deseja um ótimo dia."];
 lista.forEach(t=>{const li=document.createElement("li");li.innerText=t;ul.appendChild(li)});
 animarTexto(document.querySelector("#layout-noticias .texto-animado"));
}
function mostrarMensagem(slide){
 layouts.mensagem.classList.add("ativo");
 let titulo=slide.titulo,descricao=slide.descricao;
 if(slide.automatica){const h=new Date().getHours();if(h>=5&&h<12){titulo="Bom dia!";descricao="Café fresquinho, pão quentinho e um excelente dia para você."}else if(h>=12&&h<18){titulo="Boa tarde!";descricao="Que tal uma pausa especial com sabor de Padaria Sant'Ana?"}else{titulo="Boa noite!";descricao="Obrigado pela visita. É sempre um prazer receber você."}}
 document.getElementById("mensagem-titulo").innerText=titulo||"Seja bem-vindo";
 document.getElementById("mensagem-texto").innerText=descricao||"Padaria Sant'Ana";
 animarTexto(document.querySelector("#layout-mensagem .texto-animado"));
}
function animarTexto(el){if(!el)return;limparAnimacoesTexto(el);el.classList.add(efeitosTexto[atual%efeitosTexto.length])}
function limparClasses(el){el.classList.remove("midia-contain",...efeitosMidia)}
function limparAnimacoesTexto(el){el.classList.remove(...efeitosTexto)}
function atualizarRelogios(){const h=new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});document.getElementById("hora-cafe").innerText=h;document.getElementById("hora-noticias").innerText="🕒 "+h}
async function carregarClima(){
 try{const url="https://api.open-meteo.com/v1/forecast?latitude=-21.235&longitude=-45.758&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FSao_Paulo";const r=await fetch(url);const d=await r.json();const hmax=Math.round(d.daily.temperature_2m_max[0]),hmin=Math.round(d.daily.temperature_2m_min[0]),amax=Math.round(d.daily.temperature_2m_max[1]),amin=Math.round(d.daily.temperature_2m_min[1]);climaCache.hoje=`${hmin}° / ${hmax}°`;climaCache.amanha=`${amin}° / ${amax}°`}catch(e){}
}
async function carregarNoticias(){
 const rss="https://g1.globo.com/rss/g1/sul-de-minas/";
 const url="https://api.rss2json.com/v1/api.json?rss_url="+encodeURIComponent(rss);
 try{const r=await fetch(url);const d=await r.json();noticias=(d.items||[]).slice(0,6).map(i=>i.title)}catch(e){noticias=[]}
}
iniciar();

