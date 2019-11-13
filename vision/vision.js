const form = document.querySelector("#task-form");
const list = document.querySelector(".collection");
const clear = document.querySelector(".clear-task");
const filter = document.querySelector("#filter");
const input = document.querySelector("#task");

loadEventListeners();

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getTask);
  form.addEventListener("submit", addTask);
  list.addEventListener("click", removeTask);
  clear.addEventListener("click", clearTask);
  filter.addEventListener("keyup", filterTask);
}

function getTask(task) {
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    const li = document.createElement("li");

    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class= "fa fa-remove"> </i>';

    li.appendChild(link);
    list.appendChild(li);
  });
}

function addTask(e) {
  if (input.value === "") {
    return alert("Add a goal");
  }

  const li = document.createElement("li");

  li.className = "collection-item";
  li.appendChild(document.createTextNode(input.value));

  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = '<i class= "fa fa-remove"> </i>';

  li.appendChild(link);
  list.appendChild(li);

  storeGoalsInLocalStorage(input.value);

  input.value = "";

  e.preventDefault();
}

function storeGoalsInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    console.log("clicked");
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task, index) {
    console.log(task, "???", taskItem.textContent);
    if (taskItem.textContent.includes(task)) {
      console.log("here");
      tasks.splice(index, 1);
    }
  });
  console.log(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTask() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTask(e) {
  text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
