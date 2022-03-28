const todosList = JSON.parse(localStorage.getItem("todoList")) ?? [];
const unorderedList = document.getElementById("todoList");
console.log(todosList);
const addToTodoList = () => {
  const todoInput = document.getElementById("todoInput");
  const newTodo = { name: todoInput.value, completed: false };
  todosList.push(newTodo);
  addTodoElement(newTodo);
};

const createElementWithAttr = (tag, options) => {
  return Object.assign(document.createElement(tag), options);
};

const addTodoElement = (newTodo) => {
  const todoItem = createElementWithAttr("div", {
    classList: "flex flex-between todo",
  });
  const todoCheckbox = createElementWithAttr("input", {
    type: "checkbox",
    checked: newTodo.completed,
    onclick: completeTodo,
  });
  const todoItemNameSpan = createElementWithAttr("span", {
    innerText: newTodo.name,
    classList: newTodo.completed ? "completed" : "",
  });
  const todoDeleteButton = createElementWithAttr("button", {
    innerText: "X",
    classList: "delete-btn",
    onclick: removeTodo,
  });
  todoItem.append(todoCheckbox, todoItemNameSpan, todoDeleteButton);
  unorderedList.appendChild(todoItem);
  changeTasksLeftSpan();
};

const completeTodo = (e) => {
  const todoName = e.target.parentElement.childNodes[1];
  let todo =
    todosList[todosList.findIndex((todo) => todo.name === todoName.innerText)];
  todo.completed = !todo.completed;
  todoName.classList.toggle("completed");
  changeTasksLeftSpan();
};
const removeTodo = (e) => {
  const todoName = e.target.parentElement.childNodes[1];
  todosList.splice(
    todosList.findIndex((todo) => todo.name === todoName.innerText),
    1
  );
  e.target.parentElement.remove();
  changeTasksLeftSpan();
};

const changeTasksLeftSpan = () => {
  const tasksLeft = document.getElementById("tasks-left");
  tasksLeft.innerText = `${
    todosList.filter((todo) => !todo.completed).length
  } tasks left`;
};
const removeTodos = () => {
  while (unorderedList.firstChild) {
    unorderedList.removeChild(unorderedList.firstChild);
  }
};

const getTodos = (todos = todosList) => {
  todos.map((todo) => {
    addTodoElement(todo);
  });
};

const filter = (type) => {
  removeTodos();
  if (type === "all") {
    getTodos();
  } else if (type === "active") {
    getTodos(todosList.filter((todo) => !todo.completed));
  } else if (type === "completed") {
    getTodos(todosList.filter((todo) => todo.completed));
  }
  document
    .querySelectorAll(".filterItem")
    .forEach((filter) => filter.classList.remove("selected"));
  event.target.classList.add("selected");
};

window.onbeforeunload = () => {
  if (todosList) localStorage.setItem("todoList", JSON.stringify(todosList));
};
window.onclose = () => {
  if (todosList) localStorage.setItem("todoList", JSON.stringify(todosList));
};
getTodos();
changeTasksLeftSpan();
