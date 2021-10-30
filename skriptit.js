// Luodaan todo-lista, todo-tekstin lisäys ja napit, sekä näkymä.

let todoInput = document.querySelector(".todo-input");
let todoList = document.querySelector(".todo-list");
const todoBtn = document.querySelector(".todo-btn");
const filterOption = document.querySelector(".filter-todo");

// Eventit aktivoidaan käyttäen "addEventListener" toimintoa,
// eli funktiot saadaan toimimaan käytännön tasolla.
document.addEventListener("DOMContentLoaded", getTodos);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Luodaan funktioiden avulla valmis pohja, eli lisättäessä tehtävän
//  sekä nappien, "Local Storage"en tallentaminen.
function addTodo(event) {
  // Ehkäistään perinteistä muotoa.
  event.preventDefault();
  // Lisätään Todo Div toiminto
  let todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Luodaan li
  let newTodo = document.createElement("li");
  newTodo.textContent = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // Tallennetaan "Local Storage"n osioon meidän "input", eli lisätty tehtävä.
  saveInLocalStorage(todoInput.value);
  // Tarkistetaan, että onko nappi painettu eli tehty "checkkaus".
  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = '<i class="fas fa-check"></i>';
  completedBtn.classList.add("complete-btn");
  todoDiv.appendChild(completedBtn);
  // Tarkistetaan, että onko nappi painettu, eli sitä "roska-nappia".
  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
  trashBtn.classList.add("trash-btn");
  todoDiv.appendChild(trashBtn);
  // liitetään luettelon mukaan listaus.
  todoList.appendChild(todoDiv);
  // Pyyhitään "input" arvot.
  todoInput.value = "";
}
//Tähän kirjataan kokonainen funktio, jolla poistetaan listalta tehtävä, painamalla "roskanappia".
function deleteCheck(e) {
  let item = e.target;
  // Poistetaan todo
  if (item.classList[0] == "trash-btn") {
    let todo = item.parentElement;
    // Luodaan Animaatio, jolla tehtävä ikään kuin tipahtaa listalta alas.
    todo.classList.add("fall");
    removeFromLocalStorage(todo);
    todo.addEventListener("transitionend", function () {
      this.remove();
    });
  }
  // Trakistetaan, että "complete-nappi" aktivoituu.
  if (item.classList[0] == "complete-btn") {
    let todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
//tähän tulee filter toiminto, eli mahdollisuus vaihtaa näkymiä valmiiden ja
//keskeneräisten tehtävien kanssa.
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//
// Lisätään mahdollisuus lisätä listalle painamalla "Enter" nappia
// ja ylipäätään lisätään tekstin mukaan.
document.addEventListener("input", () => {
  if (event.keyCode == 13) {
    // Ehkäistään perinteinen muoto.
    event.preventDefault();
    // Lisätään Todo Div toiminto.
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Luodaan li.
    let newTodo = document.createElement("li");
    newTodo.textContent = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Tarkistetaan, että "complete" nappi on painettu.
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn);
    // Tarkistetaan, että "trash" nappi on painettu.
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);
    // liitetään luettelon mukaan listaus.
    todoList.appendChild(todoDiv);
    // Pyyhitään "input" arvot.
    todoInput.value = "";
  }
});

//lisätään funktio, jolla todo-lista tallennetaan "Local Storage"en, jos lista on tyhjä, niin se täytetään "Push"aamalla.
//JSON.parsella saadaan "Local Storagelta" tallenettu info takaisin.
function saveInLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
//Funktiolla haetaan todo-listan tehtävän alkuperäinen näkymä.
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Annetaan function hoitaa Todo Div toiminto.
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Luodaan li.
    let newTodo = document.createElement("li");
    newTodo.textContent = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Tässä varmistetaan "complete" napin painallusta.
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn);
    // Tässä varmistetaan "trash" napin painallusta.
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);
    // Append To List
    todoList.appendChild(todoDiv);
  });
}

//Jos haluamme poistaa "Local Storage"lta tieto, niin se poistetaan yhdellä "splice" toiminnolla
//merkataan indexille 1kpl, joka poistuu listalta.
function removeFromLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].textContent;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
