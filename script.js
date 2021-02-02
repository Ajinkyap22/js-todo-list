"use script";

const btnEnter = document.getElementById("enter");
const userInput = document.getElementById("user-input");
// Array to store activity object
const listItems = [];

// function to create & push activity object in list array
const addListElement = function (text) {
  const activity = {
    text,
    id: Date.now(),
  };

  listItems.push(activity);
  renderListElement(activity);
};

// Function to render the list item
const renderListElement = function (activity) {
  // List parent element
  const list = document.getElementById("list");
  // Create a new list node
  const node = document.createElement("li");
  // Set class & id attribute
  node.setAttribute("class", "todo-item");
  node.setAttribute("data-key", activity.id);

  node.innerHTML = `
    <label for="${activity.id}" class="tick"></label>
    <span>${activity.text}</span>
    <button class="btn-delete">X</button>`;

  // Append list node to the list
  list.append(node);
};

// Function to display the rendered list
const displayList = function () {
  // Trim any whitespaces
  const activityText = userInput.value.trim();
  // Empty input
  if (!activityText) return;
  addListElement(activityText);
  // Clear input field
  userInput.value = "";
  userInput.focus();
};

// Add activity to list on clicking enter button
btnEnter.addEventListener("click", displayList);

// Add activity to list on pressing enter
userInput.addEventListener("keydown", function (e) {
  // 13 = keycode for enter
  if (e.keyCode !== 13) return;
  displayList();
});

const list = document.getElementById("list");
// Handler for delete & complete events
list.addEventListener("click", function (e) {
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
});
