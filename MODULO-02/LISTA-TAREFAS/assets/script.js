//FACTORY COM OS MÉTODOS SOLICITADOS NO PROJETO
//CLOUSURE PARA MANTER O ESTADO DO ARRAY E ID
function toDoList() {
  const array = [];
  let id = 0;

  function listaTarefas() {
    return {
      tarefas: array,
      //adicionar uma tarefa
      addTarefa: (_tarefa, _prioridade) => {
        array.push({
          id: id++,
          tarefa: _tarefa,
          prioridade: _prioridade,
        });
      },
      //editar uma tarefa
      editTarefa: (_id, _tarefa, _prioridade) => {
        array.forEach((element) => {
          if (element.id == _id) {
            element.tarefa = _tarefa;
            element.prioridade = _prioridade;
          }
        });
      },
      //Apagar uma tarefa
      removeTarefa(_id) {
        array.forEach((el, ind) => {
          if (el.id == _id) {
            array.splice(ind, 1);
          }
        });
      },

      //Busca tarefa com base no ID
      getTarefa: (_id) => {
        const result = array.filter((el) => {
          return el.id === _id;
        });

        return result.length > 0 ? result : "Tarefa não localizada";
      },

      //Busca todas as tarefas cadastradas e ordena por prioridade
      getAllTarefas: () => {
        const result = array
          .filter((el) => {
            return el;
          })
          .sort((a, b) => a.prioridade - b.prioridade);
        return result;
      },
    };
  }

  return listaTarefas();
}

const lista = toDoList();
