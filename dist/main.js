/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ (() => {

eval("\r\n\r\n// DOM Elements\r\nconst userInput = document.getElementById(\"user-input\");\r\nconst list = document.getElementById(\"list\");\r\nconst addItem = document.querySelector(\".add-item\");\r\nconst priority = document.querySelector(\".priority\");\r\nconst btnClearAll = document.querySelector(\".clear__all\");\r\nconst btnClearSome = document.querySelector(\".clear__some\");\r\n\r\nclass Todo {\r\n  constructor(title, priority) {\r\n    this.title = title;\r\n    this.priority = priority;\r\n    this.id = Date.now();\r\n    this.isDone = false;\r\n  }\r\n}\r\n\r\nclass DOM {\r\n  constructor() {\r\n    // Add activity to list on form submit\r\n    addItem.addEventListener(\"submit\", app.addToDo.bind(app));\r\n\r\n    // Handler for delete & complete events\r\n    list.addEventListener(\"click\", this.updateList.bind(this));\r\n\r\n    // Clear all todos\r\n    btnClearAll.addEventListener(\"click\", this.clearAll.bind(this));\r\n\r\n    // clear completed todos\r\n    btnClearSome.addEventListener(\"click\", this.clearCompleted.bind(this));\r\n  }\r\n\r\n  getUserInput(form) {\r\n    const text = form.querySelector(\"#user-input\").value;\r\n    const priority = form.querySelector(\".priority\").value;\r\n\r\n    return [text, priority];\r\n  }\r\n\r\n  renderListElement(activity) {\r\n    const markup = `\r\n      <li data-id=\"${activity.id}\" class=\"todo-item ${activity.priority} ${\r\n      activity.isDone ? \"done\" : \"\"\r\n    }\">\r\n        <span>${activity.title}</span>\r\n        <div class=\"edit\">\r\n          <label class=\"priority__label \">${activity.priority} Priority</label>\r\n          <button class=\"btn btn-delete\"> &times;</button>\r\n        </div>\r\n      </li>`;\r\n\r\n    list.insertAdjacentHTML(\"afterbegin\", markup);\r\n  }\r\n\r\n  updateList(e) {\r\n    if (e.target.classList.contains(\"todo-item\")) {\r\n      // Mark the activity as done\r\n      e.target.classList.toggle(\"done\");\r\n\r\n      const task = app.toDoList.find(\r\n        (todo) => todo.id === +e.target.dataset.id\r\n      );\r\n\r\n      task.isDone = !task.isDone;\r\n\r\n      storage.setLocalStorage();\r\n    }\r\n\r\n    if (e.target.classList.contains(\"btn-delete\")) {\r\n      // Get id of the activity\r\n      const itemID = +e.target.closest(\".todo-item\").dataset.id;\r\n      // Find the index of the activity with given id\r\n      e.target.closest(\".todo-item\").classList.toggle(\"delete\");\r\n      // Remove acitivity from the array\r\n      app.removeToDo(itemID);\r\n    }\r\n  }\r\n\r\n  clearAll() {\r\n    app.emptyList();\r\n\r\n    list.innerHTML = \"\";\r\n\r\n    storage.setLocalStorage();\r\n  }\r\n\r\n  clearCompleted() {\r\n    app.toDoList = app.toDoList.filter((todo) => !todo.isDone);\r\n\r\n    [...document.querySelectorAll(\".todo-item\")]\r\n      .filter((item) => item.classList.contains(\"done\"))\r\n      .forEach((item) => item.classList.add(\"delete\"));\r\n\r\n    storage.setLocalStorage();\r\n  }\r\n}\r\n\r\nclass App {\r\n  constructor() {\r\n    this.toDoList = [];\r\n  }\r\n\r\n  addToDo(e) {\r\n    e.preventDefault();\r\n\r\n    const [text, priority] = dom.getUserInput(e.target);\r\n\r\n    const todo = new Todo(text, priority);\r\n\r\n    this.toDoList.push(todo);\r\n\r\n    dom.renderListElement(todo);\r\n\r\n    e.target.reset();\r\n\r\n    storage.setLocalStorage();\r\n  }\r\n\r\n  removeToDo(id) {\r\n    const index = this.toDoList.findIndex((item) => item.id == id);\r\n\r\n    this.toDoList.splice(index, 1);\r\n\r\n    storage.setLocalStorage();\r\n  }\r\n\r\n  emptyList() {\r\n    app.toDoList.length = 0;\r\n  }\r\n}\r\n\r\nclass Storage {\r\n  constructor() {\r\n    this.getLocalStorage();\r\n  }\r\n\r\n  setLocalStorage() {\r\n    localStorage.setItem(\"todo-list\", JSON.stringify(app.toDoList));\r\n  }\r\n\r\n  getLocalStorage() {\r\n    const data = JSON.parse(localStorage.getItem(\"todo-list\"));\r\n\r\n    if (!data) return;\r\n\r\n    app.toDoList = data;\r\n    app.toDoList.forEach((item) => dom.renderListElement(item));\r\n  }\r\n\r\n  clearStorage() {\r\n    localStorage.removeItem(\"todo-list\");\r\n  }\r\n}\r\n\r\nconst app = new App();\r\nconst dom = new DOM();\r\nconst storage = new Storage();\r\n\n\n//# sourceURL=webpack://To-Do-List/./src/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/script.js"]();
/******/ 	
/******/ })()
;