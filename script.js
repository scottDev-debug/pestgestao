const elementos = document.querySelectorAll(
    ".hero-text, .hero-img, .servico-card, #sobre, #contato form"
  );
  
  const ativarElemento = (elemento) => {
    const topoElemento = elemento.getBoundingClientRect().top;
    const alturaTela = window.innerHeight;
  
    if (topoElemento < alturaTela - 100) {
      elemento.style.opacity = 1;
    }
  };
  
  function animarScroll() {
    elementos.forEach(ativarElemento);
  }
  
  window.addEventListener("scroll", animarScroll);
  window.addEventListener("load", animarScroll);
  
  // Menu hambúrguer
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

toggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// Abrir modal
function abrirModal() {
  document.getElementById('modal-teste').style.display = 'flex';
}

// Fechar modal
function fecharModal() {
  document.getElementById('modal-teste').style.display = 'none';
}

// Simular envio
function enviarFormulario(event) {
  event.preventDefault();
  alert("Cadastro enviado! Nosso time entrará em contato.");
  fecharModal();
}
