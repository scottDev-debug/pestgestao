document.addEventListener("DOMContentLoaded", () => {
  
    const clientes = [];
    const lista = document.getElementById("lista-clientes");
    const filtro = document.getElementById("filtro-clientes");
  
    const modalCliente = document.getElementById("modal-cliente");
    const fecharModal = document.getElementById("fechar-modal-cliente");
    const formCliente = document.getElementById("form-cliente");
  
    const campos = {
      nome: document.getElementById("nome-cliente"),
      email: document.getElementById("email-cliente"),
      telefone: document.getElementById("telefone-cliente"),
      pet: document.getElementById("pet-cliente"),
      id: document.getElementById("id-cliente")
    };
    
    document.addEventListener("DOMContentLoaded", () => {
      const nome = localStorage.getItem("nomeCliente");
    
      if (nome) {
        document.getElementById("titulo-cliente").innerText = `🐾 Olá, ${nome}! Bem-vinda à sua área`;
      }
    });
  
    // Abrir modal vazio (novo cliente)
    document.getElementById("btn-novo-cliente").addEventListener("click", () => {

      formCliente.reset();
      campos.id.value = "";
      document.getElementById("titulo-modal-cliente").textContent = "Novo Cliente";
      modalCliente.style.display = "flex";
    });
  
    // Fechar modal
    fecharModal.addEventListener("click", () => modalCliente.style.display = "none");
    window.addEventListener("click", (e) => {
      if (e.target === modalCliente) modalCliente.style.display = "none";
    });
  
    // Salvar cliente
    formCliente.addEventListener("submit", (e) => {
      e.preventDefault();
      const novo = {
        nome: campos.nome.value.trim(),
        email: campos.email.value.trim(),
        telefone: campos.telefone.value.trim(),
        pet: campos.pet.value.trim()
      };
  
      const id = campos.id.value;
      if (id) {
        clientes[id] = novo;
      } else {
        clientes.push(novo);
      }
  
      modalCliente.style.display = "none";
      renderClientes();
    });
  
    function renderClientes() {
      lista.innerHTML = "";
      clientes.forEach((c, i) => {
        if (filtro.value && !c.nome.toLowerCase().includes(filtro.value.toLowerCase()) && !c.email.toLowerCase().includes(filtro.value.toLowerCase())) return;
  
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${c.nome}</td>
          <td>${c.email}</td>
          <td>${c.telefone}</td>
          <td>${c.pet}</td>
          <td>
            <button onclick="verCliente(${i})">Ver</button>
            <button onclick="editarCliente(${i})">Editar</button>
            <button onclick="excluirCliente(${i})">Excluir</button>
          </td>
        `;
        lista.appendChild(tr);
      });
    }
  
    window.verCliente = (i) => {
      const c = clientes[i];
      campos.nome.value = c.nome;
      campos.email.value = c.email;
      campos.telefone.value = c.telefone;
      campos.pet.value = c.pet;
      campos.id.value = "";
      document.getElementById("titulo-modal-cliente").textContent = "Visualizar Cliente";
      modalCliente.style.display = "flex";
    };
  
    window.editarCliente = (i) => {
      const c = clientes[i];
      campos.nome.value = c.nome;
      campos.email.value = c.email;
      campos.telefone.value = c.telefone;
      campos.pet.value = c.pet;
      campos.id.value = i;
      document.getElementById("titulo-modal-cliente").textContent = "Editar Cliente";
      modalCliente.style.display = "flex";
    };
  
    window.excluirCliente = (i) => {
      if (confirm("Tem certeza que deseja excluir este cliente?")) {
        clientes.splice(i, 1);
        renderClientes();
      }
    };
  
    filtro.addEventListener("input", renderClientes);
  });
  
  // Produto - Modal
  const btnNovo = document.getElementById("btn-novo-produto");
  const modal = document.getElementById("modal-produto");
  const fechar = document.getElementById("fechar-modal");

  if (btnNovo && modal && fechar) {
    btnNovo.addEventListener("click", () => {
      document.getElementById("form-produto").reset();
      document.getElementById("titulo-modal").textContent = "Novo Produto";
      document.getElementById("id-produto").value = "";
      modal.style.display = "flex";
    });

    fechar.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // Agendamento - Modal e lógica
  const btnAgendamento = document.getElementById("btn-novo-agendamento");
  const modalAgendamento = document.getElementById("modal-agendamento");
  const fecharAgendamento = document.getElementById("fechar-modal-agendamento");
  const formAgendamento = document.getElementById("form-agendamento");
  const listaAgendamentos = document.getElementById("lista-agendamentos");
  const gradeHorarios = document.getElementById("grade-horarios");

  let agendamentos = [];

  const horariosDisponiveis = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00"
  ];

  // Abertura padrão
  btnAgendamento.addEventListener("click", () => {
    formAgendamento.reset();
    modalAgendamento.style.display = "flex";
  });

  fecharAgendamento.addEventListener("click", () => {
    modalAgendamento.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modalAgendamento) {
      modalAgendamento.style.display = "none";
    }
  });

  formAgendamento.addEventListener("submit", (e) => {
    e.preventDefault();

    const novo = {
      cliente: document.getElementById("cliente").value.trim(),
      pet: document.getElementById("pet").value.trim(),
      servico: document.getElementById("servico").value.trim(),
      dataHora: document.getElementById("dataHora").value
    };

    agendamentos.push(novo);
    modalAgendamento.style.display = "none";
    renderAgendamentos();
    renderGradeHorarios();
  });

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
      li.textContent = `${formatarData(ag.dataHora)} - ${ag.pet} (${ag.cliente}) - ${ag.servico}`;
      listaAgendamentos.appendChild(li);
    });
  }

  function gerarDataHoraHoje(horaStr) {
    const hoje = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
    return `${hoje}T${horaStr}`;
  }

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

  // Inicialização
  renderAgendamentos();
  renderGradeHorarios();
