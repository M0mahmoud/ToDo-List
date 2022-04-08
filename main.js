//1-Use Sweet Alert If Input Is Empty ✔
//2-Check if task is exist
//3-Delete All Tasks ✔
//4-Finishe  All Tasks ✔
//5-Local Storage✔

//Set Variables
let theInput = document.querySelector(".add-task input");
let add = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(" .tasks-content");
let tasksCount = document.querySelector(" .tasks-count span");
let tasksCompleted = document.querySelector(" .tasks-completed span");
let finishAll = document.getElementsByClassName(".tasks-finish");
let deleteAll = document.getElementsByClassName(".tasks-delete");

window.onload = function () {
  theInput.focus();
};

//Empty to store tasks
let arr = [];

//ckech three is tasks in local
if (localStorage.getItem("tasks")) {
  arr = JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocal();
//Add task
add.onclick = function () {
  //IF Input is Empty
  if (theInput.value === "") {
    Swal.fire("Add Something!");
  } else {
    addTaskToArr(theInput.value);
    //Empty
    theInput.value = "";
    //Number of tasks
    clac();
  }
};

document.addEventListener("click", function (e) {
  //Delete
  if (e.target.className === "delete") {
    //remove from local
    delWithId(e.target.parentElement.getAttribute("data-id"));
    //remove from page
    e.target.parentElement.remove();
    //number tasks
    if (tasksContainer.childElementCount == 0) {
      createNoTasks();
    }
  }
  //Toggle Class 'finished'
  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("finished");
  }
  //
  clac();
});

function addTaskToArr(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  //push tasks
  arr.push(task);
  //add to page
  addelements(arr);
  addDateToLocal(arr);
}

function addelements(arr) {
  tasksContainer.innerHTML = "";
  arr.forEach((task) => {
    let noTaskMsg = document.querySelector(".no-task");
    if (document.body.contains(document.querySelector(".no-task"))) {
      //Remove No Tasks Msg
      noTaskMsg.remove();
    }
    //Create Span & delete & text
    let mainSpan = document.createElement("span");
    let deleteSpan = document.createElement("span");
    let text = document.createTextNode(task.title);
    deleteSpan.textContent = "Delete";
    //Add class
    mainSpan.className = "task-box";
    deleteSpan.className = "delete";
    mainSpan.setAttribute("data-id", task.id);
    //Add
    mainSpan.appendChild(text);
    mainSpan.appendChild(deleteSpan);
    tasksContainer.appendChild(mainSpan);
  });
}

function addDateToLocal(arr) {
  window.localStorage.setItem("tasks", JSON.stringify(arr));
}

function getDataFromLocal() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addelements(tasks);
  }
}

function delWithId(taskId) {
  //explain
  // for(let i =0 ; i<arr.length;i++){
  //   console.log(arr[i].id)
  //   console.log(taskId)
  // }
  arr = arr.filter((task) => {
    task.id != taskId;
  });
  addDateToLocal(arr);
}

//Function NO Tasks Msg
function createNoTasks() {
  let msgSapn = document.createElement("span");
  msgSapn.textContent = "No Tasks To Show";
  msgSapn.className = "no-task";
  tasksContainer.appendChild(msgSapn);
}

//Function To Calc Tasks
function clac() {
  //clac all
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;
  //clac  all  Completed
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}

//deleta all & completed all
document.onclick = function (e) {
  if (e.target.className === "tasks-finish") {
    document.querySelectorAll(".task-box").forEach((e) => {
      e.classList.toggle("finished");
    });
  }
  //Delete All
  if (e.target.className === "tasks-delete") {
    document.querySelectorAll(" .task-box").forEach((e) => {
      delWithId(e);
      e.remove();
    });
  }
};

// Execute a function when the user releases a key on the keyboard
theInput.addEventListener("keyup", function (e) {
  // Number 13 is the "Enter" key on the keyboard
  if (e.keyCode === 13) {
    // Cancel the default action, if needed
    e.preventDefault();
    // Trigger the button element with a click
    add.click();
  }
});
