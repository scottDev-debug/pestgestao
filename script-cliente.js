document.addEventListener("DOMContentLoaded", () => {
    // Simular dados do cliente
    const cliente = {
      
      agendamentos: [
        { servico: "Banho", pet: "Thor", data: "24/05", hora: "10:00" },
        { servico: "Tosa", pet: "Luna", data: "28/05", hora: "14:00" }
      ],
      historico: [
        { servico: "Banho", pet: "Thor", data: "10/05" },
        { servico: "Vacina", pet: "Luna", data: "05/05" }
      ],
      pontos: 6
    };
  
    // Preencher dados do cliente
    document.querySelector(".perfil p:nth-child(1)").innerHTML = `<strong>Nome:</strong> ${cliente.nome}`;
    document.querySelector(".perfil p:nth-child(2)").innerHTML = `<strong>Email:</strong> ${cliente.email}`;
    document.querySelector(".perfil p:nth-child(3)").innerHTML = `<strong>Telefone:</strong> ${cliente.telefone}`;
  
    // Preencher pets
    const listaPets = document.querySelector(".meus-pets ul");
    cliente.pets.forEach(pet => {
      const li = document.createElement("li");
      li.textContent = pet;
      listaPets.appendChild(li);
    });
  
    // Preencher agendamentos
    const listaAgendamentos = document.querySelector(".meus-agendamentos ul");
    cliente.agendamentos.forEach(a => {
      const li = document.createElement("li");
      li.textContent = `${a.servico} - ${a.pet} - ${a.data} às ${a.hora}`;
      listaAgendamentos.appendChild(li);
    });
  
    // Preencher histórico
    const listaHistorico = document.querySelector(".historico ul");
    cliente.historico.forEach(h => {
      const li = document.createElement("li");
      li.textContent = `${h.servico} - ${h.pet} - ${h.data}`;
      listaHistorico.appendChild(li);
    });
  
    // Pontuação
    document.querySelector(".fidelidade p").innerHTML = `Você tem <strong>${cliente.pontos}</strong> pontos. Faltam <strong>${10 - cliente.pontos}</strong> para ganhar um banho grátis! 🧼`;
  
    // Reservar produto
    document.querySelectorAll(".loja button").forEach(btn => {
      btn.addEventListener("click", () => {
        alert("Produto reservado com sucesso! ✅");
      });
    });
  
    // Enviar foto do pet
    document.querySelector(".mural button").addEventListener("click", () => {
      alert("Funcionalidade de envio em breve. 🐶🐱")
    });
  
    // Botão de logout (simples)
    document.getElementById("logout").addEventListener("click", () => {
      alert("Você saiu com sucesso.");
      window.location.href = "index.html";
    });
  });
  
  const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

toggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});

const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
  // Função de logout (Exemplo usando Supabase)
  supabase.auth.signOut();
  window.location.href = 'cliente-login.html';
});

// Abrir e fechar o modal
const btnNovo = document.getElementById("btn-novo-agendamento");
const modal = document.getElementById("modal-agendamento");
const fecharModal = document.getElementById("fechar-modal-agendamento");

btnNovo.onclick = () => modal.style.display = "block";
fecharModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => {
  if (e.target == modal) modal.style.display = "none";
};

// Gerenciar agendamentos
const form = document.getElementById("form-agendamento");
const lista = document.getElementById("lista-agendamentos");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const pet = document.getElementById("pet").value;
  const servico = document.getElementById("servico").value;
  const dataHora = document.getElementById("dataHora").value;
  
  const item = document.createElement("li");
  item.textContent = `${servico} - ${pet} - ${dataHora}`;
  
  lista.appendChild(item);
  
  form.reset();
  modal.style.display = "none";
});

// Horários disponíveis
const horariosDisponiveis = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00"
];

// Elementos
const btnAgendamento = document.getElementById("btn-novo-agendamento");
const modalAgendamento = document.getElementById("modal-agendamento");
const fecharAgendamento = document.getElementById("fechar-modal-agendamento");
const formAgendamento = document.getElementById("form-agendamento");
const listaAgendamentos = document.getElementById("lista-agendamentos");
const gradeHorarios = document.getElementById("grade-horarios");

let agendamentos = [];

// Abrir e fechar modal
btnAgendamento.onclick = () => modalAgendamento.style.display = "flex";
fecharAgendamento.onclick = () => modalAgendamento.style.display = "none";
window.onclick = (e) => {
  if (e.target === modalAgendamento) {
    modalAgendamento.style.display = "none";
  }
};

// Gerar data de hoje com horário
function gerarDataHoraHoje(horaStr) {
  const hoje = new Date().toISOString().split("T")[0];
  return `${hoje}T${horaStr}`;
}

// Renderizar grade de horários
function renderGradeHorarios() {
  gradeHorarios.innerHTML = "<h3>Escolha um horário</h3>";
  const container = document.createElement("div");
  container.className = "container-horarios";

  horariosDisponiveis.forEach(horario => {
    const btn = document.createElement("button");
    btn.textContent = horario;

    const ocupado = agendamentos.some(a => a.dataHora.includes(horario));
    if (ocupado) {
      btn.disabled = true;
      btn.classList.add("ocupado");
    } else {
      btn.classList.add("disponivel");
      btn.addEventListener("click", () => {
        document.getElementById("form-agendamento").reset();
        document.getElementById("dataHora").value = gerarDataHoraHoje(horario);
        modalAgendamento.style.display = "flex";
      });
    }

    container.appendChild(btn);
  });

  gradeHorarios.appendChild(container);
}

// Salvar agendamento
formAgendamento.addEventListener("submit", (e) => {
  e.preventDefault();

  const novo = {
    servico: document.getElementById("servico").value.trim(),
    dataHora: document.getElementById("dataHora").value
  };

  agendamentos.push(novo);
  modalAgendamento.style.display = "none";
  renderAgendamentos();
  renderGradeHorarios();
});

// Renderizar lista de agendamentos
function formatarData(dataHora) {
  const data = new Date(dataHora);
  const dia = data.toLocaleDateString();
  const hora = data.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${dia} ${hora}`;
}

function renderAgendamentos() {
  listaAgendamentos.innerHTML = "";
  agendamentos.forEach(ag => {
    const li = document.createElement("li");
    li.textContent = `${formatarData(ag.dataHora)} - ${ag.servico}`;
    listaAgendamentos.appendChild(li);
  });
}

// Inicialização
renderAgendamentos();
renderGradeHorarios();

const btnEnviarFoto = document.getElementById('btn-enviar-foto');
const inputFoto = document.getElementById('input-foto');
const galeria = document.getElementById('galeria');

// Ao clicar no botão, abre o seletor de arquivos
btnEnviarFoto.addEventListener('click', () => {
  inputFoto.click();
});

// Quando escolhe uma foto, ela é exibida na galeria
inputFoto.addEventListener('change', (e) => {
  const arquivo = e.target.files[0];
  if (arquivo) {
    const leitor = new FileReader();
    leitor.onload = function(evento) {
      const img = document.createElement('img');
      img.src = evento.target.result;
      img.alt = 'Foto do meu pet';
      galeria.appendChild(img);
    };
    leitor.readAsDataURL(arquivo);
  }
});

