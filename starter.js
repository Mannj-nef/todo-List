const form = document.querySelector(".form-control");
const workList = document.querySelector(".work-list");
const add = document.querySelector(".add");
const clear = document.querySelector(".clear");
const input = document.querySelector("input");

const arrList = localStorage.getItem("todo-list")
  ? JSON.parse(localStorage.getItem("todo-list"))
  : [];
let value = "";

arrList.forEach((item) => creatNewTodo(item));

function creatNewTodo(value) {
  const todo = `
    <p class="todo-item"> <span class="todo-value">${value}</span><span class="todo-delete">Delete</span></p>
    `;

  workList.insertAdjacentHTML("afterbegin", todo);
}

add.addEventListener("click", function (e) {
  value = input.value;
  if (value.length > 0) {
    arrList.push(value);

    creatNewTodo(value);

    localStorage.setItem("todo-list", JSON.stringify(arrList));
  }
});

clear.addEventListener("click", function () {
  input.value = null;
});

workList.addEventListener("click", function (e) {
  const clicked = e.target;
  if (clicked.matches(".todo-delete")) {
    const todoItem = clicked.parentNode;
    const value = todoItem.firstElementChild.textContent;
    const index = arrList.indexOf(value);

    clicked.parentNode.parentNode.removeChild(todoItem);
    arrList.splice(index, 1);
    localStorage.setItem("todo-list", JSON.stringify(arrList));
  }
});
