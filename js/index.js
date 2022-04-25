/* Open and close menu hamburguer */

const toggleButton = document.getElementById("button-menu");
const navWrapper = document.getElementById("nav");

toggleButton.addEventListener("click", () => {
  toggleButton.classList.toggle("close");
  navWrapper.classList.toggle("show");
});

navWrapper.addEventListener("click", (e) => {
  if (e.target.id === "nav") {
    navWrapper.classList.remove("show");
    toggleButton.classList.remove("close");
  }
});

/* Logic Tasks */

const taskName = document.querySelector(".task-name");
const btnAddTask = document.querySelector(".btnAdd");
const taskList = document.querySelector(".tasks-ul");
const filterOption = document.querySelector(".filter-todo");


document.addEventListener("DOMContentLoaded", getTask);

btnAddTask.addEventListener("click", addTask);
taskList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

function addTask(e) {
  e.preventDefault();
  if (taskName.value === "") {
    alert("Please enter a task");
  } else {
  const div = document.createElement("div");
  div.classList.add("todo");

  const li = document.createElement("li");
  li.innerText = taskName.value;
  li.classList.add("todo-item");
  div.appendChild(li);

  saveTask(taskName.value);

  const completeTaskBtn = document.createElement("button");
  completeTaskBtn.innerHTML = '<i class="fas fa-check"></i>';
  completeTaskBtn.classList.add("complete-btn");
  div.appendChild(completeTaskBtn);

  const deleteTaskBtn = document.createElement("button");
  deleteTaskBtn.innerHTML = '<i class="fas fa-trash-can"></i>';
  deleteTaskBtn.classList.add("delete-btn");
  div.appendChild(deleteTaskBtn);

  taskList.appendChild(div);
  taskName.value = "";

  }

}



function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    deleteTask(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

/* status filter */

function filterTodo(e) {
  const todos = taskList.childNodes;
  todos.forEach(function (todo) {
    const mStyle = todo.style;
    if (mStyle != undefined && mStyle != null) {
      switch (e.target.value) {
        case "all":
          mStyle.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            mStyle.display = "flex";
          } else {
            mStyle.display = "none";
          }
          break;
        case "uncompleted":
          if (todo.classList.contains("completed")) {
            mStyle.display = "none";
          } else {
            mStyle.display = "flex";
          }
          break;
      }
    }
  });
}

/*Save tasks */

function saveTask(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

/* Show Tasks */

function getTask() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const div = document.createElement("div");
    div.classList.add("todo");

    const li = document.createElement("li");
    li.innerText = todo;
    li.classList.add("todo-item");
    div.appendChild(li);

    const completeTaskBtn = document.createElement("button");
    completeTaskBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeTaskBtn.classList.add("complete-btn");
    div.appendChild(completeTaskBtn);

    const deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.innerHTML = '<i class="fas fa-trash-can"></i>';
    deleteTaskBtn.classList.add("delete-btn");
    div.appendChild(deleteTaskBtn);

    taskList.appendChild(div);
  });
}


/* Delete tasks */

function deleteTask(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo, index) {
    if (todo === todo) {
      todos.splice(index, 1);
    }
  }); 
  localStorage.setItem("todos", JSON.stringify(todos));
}

/* send data from tasks to tasks.html */

function sendData() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));

  }
  return todos;
}