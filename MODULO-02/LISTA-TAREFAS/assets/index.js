const btnGetTarefa = document.querySelector("#getTarefa");
const inputGetTarefa = document.querySelector("#findId");
const btnAddTarefa = document.querySelector("#addTarefa");
const btnSubmmitTarefa = document.querySelector("#btnSubmmitTarefa");
const formTarefa = document.querySelector(".edit");
const formFindTarefa = document.querySelector(".find");

btnGetTarefa.addEventListener("click", async () => {
  let tarefas = [];
  if (inputGetTarefa.value === "") {
    tarefas = lista.getAllTarefas();
    preencheTabela(tarefas);
  } else {
    tarefas = lista.getTarefa(Number(inputGetTarefa.value));
    preencheTabela(tarefas);
  }
});

btnAddTarefa.addEventListener("click", () => {
  formTarefa.elements["tarefa"].value = "";
  formTarefa.elements["prioridade"].value = "";
  document.querySelector(".id").textContent = "";
  mudaDisplay("formTarefa");
});

btnSubmmitTarefa.addEventListener("click", (event) => {
  event.preventDefault();
  const tarefa = formTarefa.elements["tarefa"].value;
  const prioridade = formTarefa.elements["prioridade"].value;
  const id = document.querySelector(".id").textContent;

  if (tarefa === "") {
    alert("É necessário informar uma descrição!");
  } else if (id != "") {
    lista.editTarefa(id, tarefa, prioridade);
    const tarefas = lista.getAllTarefas();
    preencheTabela(tarefas);
    mudaDisplay();
  } else {
    lista.addTarefa(tarefa, prioridade);
    const tarefas = lista.getAllTarefas();
    preencheTabela(tarefas);
    mudaDisplay();
  }
});

function insertButtonEdit(tarefaButtons, id) {
  const button = document.createElement("button");
  button.className = "add";
  button.id = id;
  const icon = document.createElement("i");
  icon.className = "fas fa-pencil-alt";
  button.appendChild(icon);
  tarefaButtons.appendChild(button);

  button.addEventListener("click", () => {
    const result = lista.getTarefa(id);
    formTarefa.elements["tarefa"].value = result[0].tarefa;
    formTarefa.elements["prioridade"].value = result[0].prioridade;
    document.querySelector(".id").textContent = result[0].id;

    mudaDisplay("formTarefa");
  });
}

function insertButtonDelete(tarefaButtons, id) {
  const button = document.createElement("button");
  button.className = "delete";
  button.id = id;

  const icon = document.createElement("i");
  icon.className = "fas fa-trash";
  button.appendChild(icon);
  tarefaButtons.appendChild(button);

  button.addEventListener("click", () => {
    lista.removeTarefa(Number(button.id));

    const tarefas = lista.getAllTarefas();
    preencheTabela(tarefas);
  });
}

function preencheTabela(tarefa) {
  const tabela = document.querySelector(".bodyTable");
  tabela.innerHTML = "";
  if (typeof tarefa == "string") {
    alert(tarefa);
  } else {
    for (let index = 0; index < tarefa.length; index++) {
      let row = tabela.insertRow(0);

      let tarefaId = row.insertCell(0);
      tarefaId.innerHTML = tarefa[index].id;

      let tarefaDescricao = row.insertCell(1);
      tarefaDescricao.innerHTML = tarefa[index].tarefa;

      let tarefaPrioridade = row.insertCell(2);
      tarefaPrioridade.innerHTML = tarefa[index].prioridade;

      let tarefaButtons = row.insertCell(3);
      insertButtonEdit(tarefaButtons, tarefa[index].id);
      insertButtonDelete(tarefaButtons, tarefa[index].id);
    }
  }
}

function mudaDisplay(exibir) {
  if (exibir === "formTarefa") {
    formFindTarefa.style.display = "none";
    formTarefa.style.display = "grid";
  } else {
    formFindTarefa.style.display = "flex";
    formTarefa.style.display = "none";
  }
}
