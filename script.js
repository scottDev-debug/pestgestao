document.addEventListener("DOMContentLoaded", () => {
  // Seleciona os elementos que terão animação de entrada
  const elementos = document.querySelectorAll(
    ".hero-text, .hero-img, .servico-card, #sobre, #contato form"
  );

  // Função que ativa animação se o elemento estiver visível na tela
  const ativarElemento = (elemento) => {
    const topo = elemento.getBoundingClientRect().top;
    const altura = window.innerHeight;

    if (topo < altura - 100) {
      elemento.style.opacity = 1;
    }
  };

  // Dispara animações ao rolar
  function animarScroll() {
    elementos.forEach(ativarElemento);
  }

  // Eventos para scroll e carregamento da página
  window.addEventListener("scroll", animarScroll);
  window.addEventListener("load", animarScroll);

  // Menu hamburguer responsivo
  const toggleBtn = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (toggleBtn && menu) {
    toggleBtn.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  // Modal: abrir
  window.abrirModal = () => {
    const modal = document.getElementById("modal-teste");
    if (modal) modal.style.display = "flex";
  };

  // Modal: fechar
  window.fecharModal = () => {
    const modal = document.getElementById("modal-teste");
    if (modal) modal.style.display = "none";
  };

  // Simular envio do formulário
  window.enviarFormulario = (event) => {
    event.preventDefault();
    alert("Cadastro enviado! Nosso time entrará em contato.");
    fecharModal();
  };
});
