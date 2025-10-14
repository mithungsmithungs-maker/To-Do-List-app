// Select elements
const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const darkModeToggle = document.getElementById("dark-mode-toggle");

// Load tasks & theme on startup
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  loadTheme();
});

// Add new task
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task ❗");

  const dateTime = new Date().toLocaleString();
  const taskItem = createTaskElement(taskText, dateTime);
  taskList.appendChild(taskItem);
  saveTasks();
  taskInput.value = "";
}

function createTaskElement(taskText, dateTime) {
  const li = document.createElement("li");

  const textDiv = document.createElement("div");
  textDiv.classList.add("task-content");
  textDiv.innerHTML = `<strong>${taskText}</strong><br><small>${dateTime}</small>`;

  // Toggle complete
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(textDiv);
  li.appendChild(deleteBtn);
  return li;
}

// Save tasks
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    const text = li.querySelector("strong").textContent;
    const time = li.querySelector("small").textContent;
    tasks.push({
      text,
      time,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach((task) => {
    const li = createTaskElement(task.text, task.time);
    if (task.completed) li.classList.add("completed");
    taskList.appendChild(li);
  });
}

/* 🌙 DARK MODE FUNCTIONALITY */
darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark);
});

function loadTheme() {
  const darkModeEnabled = localStorage.getItem("darkMode") === "true";
  if (darkModeEnabled) {
    document.body.classList.add("dark");
    darkModeToggle.checked = true;
  }
}
