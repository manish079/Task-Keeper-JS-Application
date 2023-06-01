const clear = document.querySelector(".clear");
const dateElement = document.querySelector(".date");
const input = document.querySelector("#input");
const list = document.querySelector("#list");

// Classes for list
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

let List = [];
let id;

//get data from local storage
let data = localStorage.getItem("TODO");

//If data available
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; //set id to the last one in the list

  loadList(LIST); //show todo list to UI
} else {
  LIST = [];
  id = 0;
}

//load todo items to the UI
function loadList(todoArr) {
  todoArr.forEach((item) => {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

//Clear data from local Storage

clear.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

//Show todays date

const options = {
  weekday: "long",
  month: "short",
  day: "numeric",
};

const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// ======================
function addToDo(toDo, id, done, trash) {
  if (trash) return;

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const todoItem = `
            <li class="item">
            <i class="circle fa fa-regular ${DONE}"
            job="completed" id="${id}"></i>
            <p class="text ${LINE}">${toDo}</p>
            <i class="delete fa fa-light fa-trash-can" job="delete" id="${id}"></i>
            </li>
          `;

  list.insertAdjacentHTML("beforeend", todoItem);
}

document.addEventListener("change", function (e) {
  const toDo = input.value;

  if (toDo) {
    addToDo(toDo, id, false, false);

    LIST.push({
      name: toDo,
      id: id,
      done: false,
      trash: false,
    });

    localStorage.setItem("TODO", JSON.stringify(LIST));
    id++;
  }
  input.value = "";
});

function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

list.addEventListener("click", (event) => {
  const element = event.target;

  const elementJob = element.attributes.job.value;

  if (elementJob == "completed") completeToDo(element);
  else if (elementJob == "delete") removeToDo(element);

  localStorage.setItem("TODO", JSON.stringify(LIST));
});
