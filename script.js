"use script";

// VARIABLES

const userInput = document.getElementById("user-input");
const list = document.getElementById("list");
// Array to store activity object
let listItems = [];
getLocalStorage();

// EVENT LISTENERS

// Add activity to list on form submit
document.querySelector(".add-item").addEventListener("submit", addListElement);

// Handler for delete & complete events
list.addEventListener("click", updateList);

// FUNCTIONS

// function to create & push activity object in list array
function addListElement(e) {
  e.preventDefault();

  const activity = {
    text,
    id: Date.now(),
    done: false,
  };

  listItems.push(activity);
  setLocalStorage();
  renderListElement(activity);
  this.reset();
}

// Function to render the list item
function renderListElement(activity) {
  // List parent element
  const list = document.getElementById("list");
  // Create a new list node
  const node = document.createElement("li");
  // Set class & id attribute
  node.setAttribute("class", "todo-item");
  node.setAttribute("data-key", activity.id);

  node.innerHTML = `
    <label for="${activity.id}" class="tick ${
    activity.done ? "done" : ""
  }"></label>
    <span>${activity.text}</span>
    <button class="btn-delete">X</button>`;

  // Append list node to the list
  list.append(node);
}

function updateList(e) {
  if (e.target.classList.contains("todo-item")) {
    // Mark the activity as done
    e.target.classList.toggle("done");
  }

  if (e.target.classList.contains("btn-delete")) {
    // Get id of the activity
    const itemKey = e.target.parentNode.dataset.key;
    // Find the index of the activity with given id
    const index = listItems.findIndex((item) => item.id === Number(itemKey));
    e.target.parentNode.classList.toggle("delete");
    // Remove acitivity from the array
    listItems.splice(index, 1);
  }

  setLocalStorage();
}

// To persist data even after reload
function setLocalStorage() {
  localStorage.setItem("todolist", JSON.stringify(listItems));
}

function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem("todolist"));
  if (!data) return;

  listItems = data;
  listItems.forEach((item) => {
    renderListElement(item);
  });
}

// CLear local storage data
function clearList() {
  localStorage.clear("todolist");
}
