"use strict";

// DOM Elements
const list = document.getElementById("list");
const addItem = document.querySelector(".add-item");
const btnClearAll = document.querySelector(".clear__all");
const btnClearSome = document.querySelector(".clear__some");

class Todo {
  constructor(title, priority) {
    this.title = title;
    this.priority = priority;
    this.id = Date.now();
    this.isDone = false;
  }
}

class DOM {
  constructor() {
    // Add activity to list on form submit
    addItem.addEventListener("submit", app.addToDo.bind(app));

    // Handler for delete & complete events
    list.addEventListener("click", this.updateList.bind(this));

    // Clear all todos
    btnClearAll.addEventListener("click", this.clearAll.bind(this));

    // clear completed todos
    btnClearSome.addEventListener("click", this.clearCompleted.bind(this));
  }

  getUserInput(form) {
    const text = form.querySelector("#user-input").value;
    const priority = form.querySelector(".priority").value;

    return [text, priority];
  }

  renderListElement(activity) {
    const markup = `
      <li data-id="${activity.id}" class="todo-item ${activity.priority} ${
      activity.isDone ? "done" : ""
    }">
        <span>${activity.title}</span>
        <div class="edit">
          <label class="priority__label ">${activity.priority} Priority</label>
          <button class="btn btn-delete"> &times;</button>
        </div>
      </li>`;

    list.insertAdjacentHTML("afterbegin", markup);
  }

  updateList(e) {
    if (e.target.classList.contains("todo-item")) {
      // Mark the activity as done
      e.target.classList.toggle("done");

      const task = app.toDoList.find(
        (todo) => todo.id === +e.target.dataset.id
      );

      task.isDone = !task.isDone;

      storage.setLocalStorage();
    }

    if (e.target.classList.contains("btn-delete")) {
      // Get id of the activity
      const itemID = +e.target.closest(".todo-item").dataset.id;
      // Find the index of the activity with given id
      e.target.closest(".todo-item").classList.toggle("delete");
      // Remove acitivity from the array
      app.removeToDo(itemID);
    }
  }

  clearAll() {
    app.emptyList();

    list.innerHTML = "";

    storage.setLocalStorage();
  }

  clearCompleted() {
    app.toDoList = app.toDoList.filter((todo) => !todo.isDone);

    [...document.querySelectorAll(".todo-item")]
      .filter((item) => item.classList.contains("done"))
      .forEach((item) => item.classList.add("delete"));

    storage.setLocalStorage();
  }
}

class App {
  constructor() {
    this.toDoList = [];
  }

  addToDo(e) {
    e.preventDefault();

    const [text, priority] = dom.getUserInput(e.target);

    const todo = new Todo(text, priority);

    this.toDoList.push(todo);

    dom.renderListElement(todo);

    e.target.reset();

    storage.setLocalStorage();
  }

  removeToDo(id) {
    const index = this.toDoList.findIndex((item) => item.id == id);

    this.toDoList.splice(index, 1);

    storage.setLocalStorage();
  }

  emptyList() {
    app.toDoList.length = 0;
  }
}

class Storage {
  constructor() {
    this.getLocalStorage();
  }

  setLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(app.toDoList));
  }

  getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("todo-list"));

    if (!data) return;

    app.toDoList = data;
    app.toDoList.forEach((item) => dom.renderListElement(item));
  }

  clearStorage() {
    localStorage.removeItem("todo-list");
  }
}

const app = new App();
const dom = new DOM();
const storage = new Storage();
