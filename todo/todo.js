const todoForm = document.getElementById("todo-form");
const todoInputTitle = document.getElementById("todo-title");
const todoInputTag = document.getElementById("todo-tag");
const todoInputPriority = document.getElementById("todo-priority");
const todoList = document.getElementById("todo-list");

let todos = [];

const generateUniqueId = () => Math.floor(Math.random() * 1000000);

const addTodo = (text, tag, priority) => {
  todos.push({ id: generateUniqueId(), name: text, tag, priority });
  renderTodoList();
  todoInputTitle.value = todoInputTag.value = "";
  todoInputPriority.selectedIndex = 0;
};

const renderTodoList = (filteredTodos = todos) => {
  todoList.innerHTML = "";
  filteredTodos
    .sort((a, b) => {
      const order = { high: 3, medium: 2, low: 1 };
      return order[b.priority] - order[a.priority];
    })
    .forEach((todo) => {
      const todoItem = createTodoItem(todo);
      todoList.appendChild(todoItem);
    });
};

const createTodoItem = (todo) => {
  const todoItem = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("form-checkbox", "mr-2");
  checkbox.addEventListener("change", () => {
    todoItem.classList.toggle("completed", checkbox.checked);
  });
  const label = document.createElement("label");
  label.textContent = todo.name;
  label.classList.add("text-lg", "ml-4");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("bg-red-500", "text-white", "py-1", "px-2", "rounded", "ml-4");
  deleteBtn.addEventListener("click", () => deleteTodoItem(todo.id));

  todoItem.appendChild(checkbox);
  todoItem.appendChild(label);
  todoItem.appendChild(deleteBtn);

  return todoItem;
};

const deleteTodoItem = (id) => {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    renderTodoList();
  }
};

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInputTitle.value.trim();
  const tag = todoInputTag.value.trim();
  const priority = todoInputPriority.value;
  if (text) {
    addTodo(text, tag, priority);
  } else {
    alert("Please enter a task!");
  }
});
