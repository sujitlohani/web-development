const loginPage = document.getElementById("login-page");
const todoPage = document.getElementById("todo-page");
const loginBtn = document.getElementById("login-btn");
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

let currentUser = null;

loginBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username) {
        currentUser = username; 
        loginPage.style.display = "none";
        todoPage.style.display = "block";
        loadTasks(); 
    } else {
        alert("Please enter a username.");
    }
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem(currentUser)) || [];
    taskList.innerHTML = ""; 
    tasks.forEach(addTaskToDOM);
}

function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.textContent = task;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click", () => {
        removeTask(task);
        li.remove();
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);
}

addTaskBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    if (task) {
        saveTask(task);
        addTaskToDOM(task);
        taskInput.value = ""; 
    }
});

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem(currentUser)) || [];
    tasks.push(task);
    localStorage.setItem(currentUser, JSON.stringify(tasks));
}

function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem(currentUser)) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem(currentUser, JSON.stringify(tasks));
}
