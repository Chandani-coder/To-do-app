const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const taskCount = document.getElementById("task-count");
const filterButtons = document.querySelectorAll(".filters button");
const themeToggle = document.getElementById("theme-toggle");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";
  let filtered = todos.filter(todo =>
    currentFilter === "all" ? true :
    currentFilter === "active" ? !todo.done :
    todo.done
  );

  filtered.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = todo.done ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.onclick = () => toggleDone(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = () => deleteTodo(index);

    li.append(span, delBtn);
    todoList.appendChild(li);
  });

  taskCount.textContent = `${todos.filter(t => !t.done).length} tasks left`;
}

function addTodo(e) {
  e.preventDefault();
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todos.push({ text: newTask, done: false });
    todoInput.value = "";
    saveTodos();
    renderTodos();
  }
}

function toggleDone(index) {
  todos[index].done = !todos[index].done;
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

todoForm.addEventListener("submit", addTodo);

filterButtons.forEach(btn =>
  btn.addEventListener("click", () => {
    document.querySelector(".filters .active")?.classList.remove("active");
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTodos();
  })
);

themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
};

renderTodos();
