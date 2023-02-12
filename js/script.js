// seleção dos elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const CancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");

let oldInputValue;

//funcões

const print = (txt) => {
  console.log(txt);
};

const saveTodo = () => {
  const tarefa = todoInput.value;

  if (tarefa) {
    const toDo = document.createElement("div");
    toDo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = tarefa;
    toDo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    toDo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    toDo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    toDo.appendChild(deleteBtn);

    todoList.appendChild(toDo);

    todoInput.value = "";
    todoInput.focus();
  }
};

const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const atualizaToDo = () => {
  const valorEditado = editInput.value;

  if (valorEditado) {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
      let todoTitle = todo.querySelector("h3");
      if (todoTitle.innerText === oldInputValue) {
        todoTitle.innerText = valorEditado;
      }
    });
  }

  toggleForms();
};

//eventos

document.addEventListener("click", (e) => {
  e.preventDefault();
  const targtEl = e.target;
  const parentEl = targtEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  if (targtEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");
  }

  if (targtEl.classList.contains("remove-todo")) {
    parentEl.remove();
  }

  if (targtEl.classList.contains("edit-todo")) {
    toggleForms();

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

CancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms();
});

document.querySelector("#filter-select").addEventListener("change", (e) => {
  e.preventDefault();

  seletor = document.querySelector("#filter-select").value;
  const listaDeTarefas = document.querySelectorAll(".todo");

  switch (seletor) {
    case "all":
      listaDeTarefas.forEach((tarefa) => {
        tarefa.classList.contains("hide")
          ? tarefa.classList.remove("hide")
          : null;
      });
      break;

    case "done":
      listaDeTarefas.forEach((tarefa) => {
        if (tarefa.classList.contains("hide")) {
          tarefa.classList.remove("hide");
        }

        if (!tarefa.classList.contains("done")) {
          tarefa.classList.add("hide");
        }
      });
      break;

    case "todo":
      listaDeTarefas.forEach((tarefa) => {
        if (tarefa.classList.contains("hide")) {
          tarefa.classList.remove("hide");
        }

        if (tarefa.classList.contains("done")) {
          tarefa.classList.add("hide");
        }
      });
      break;
  }
});

document.querySelector("#search-button").addEventListener("click", (e) => {
  const todos = document.querySelectorAll(".todo");
  const input_pesquisa = document.querySelector("#search-input");
  const todo_desejado = input_pesquisa.value;

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3").innerText;

    if (!(todoTitle === todo_desejado)) {
      todo.classList.add("hide");
    }

    if (todo_desejado === "") {
      input_pesquisa.focus();
      todo.classList.remove("hide");
    }
  });
});
