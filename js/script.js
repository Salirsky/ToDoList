const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");
//const todoRemove = document.querySelector(".todo-remove");

// Массив для новых задач:
let toDoData = [];

// Функция-рендер, которая будет отрисовывать все наши toDo:
const render = function () {
  // Сохранять данные массива toDoData в localStorage:
  localStorage.setItem("toDoData", JSON.stringify(toDoData));
  console.log("toDoData", JSON.stringify(toDoData));
  // Получаем массив обратно:
  toDoData = JSON.parse(localStorage.getItem("toDoData"));
  console.log(toDoData);
  // Здесь хотя бы галочки "выполнено" отрабатывают, но тоже при обновлении страницы инфа на странице не сохраняется.
  // Сейчас я не могу удалить из хранилища один элемент списка

  todoList.innerHTML = ""; // Обнуляем список невыполненных задач
  todoCompleted.innerHTML = ""; // Обнуляем список выполненных задач

  toDoData.forEach(function (item) {
    const li = document.createElement("li"); // создаём новый элемент li.
    li.classList.add("todo-item");

    // получаем пустые теги, и вставляем в них вёрстку:
    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons">' +
      ' <button class="todo-remove"></button>' +
      ' <button class="todo-complete"></button></div>';

    // Делаем проверку - относится ли дело к выполненным:
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li); // Вставляем список
    }

    // Теперь делаем задачи выполненными
    // Вешаем обработчик события прямо на поиск элемента, чтобы не создавать новые переменные:
    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed; // Меняем свойство на противоположное
      render();
    });

    // Удаляем элемент по клику на корзину:
    li.querySelector(".todo-remove").addEventListener("click", function () {
      li.remove();
      localStorage.removeItem("toDoData"); // Нужно передавать "key", по которому будет удаляться значение из хранилища. Сейчас наш "key" -весь массив со всеми данными. Для отдельных элементов списка у нас нет ключа.
    });
  });
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault(); // Запретили "submit" стандартное поведение, теперь страница не перезагружается

  // создаём новый объект:

  const newToDo = {
    text: headerInput.value,
    completed: false,
  };
  //console.log(headerInput.value);
  // Проверяем, содержит ли headerInput.value данные
  if (headerInput.value !== "") {
    // Отправляем новый объект в массив toDoData:
    toDoData.push(newToDo);

    // В localStorage данные есть, но при перезагрузке страницы они не появляются на странице и не реагируют на кнопку "выполнено"
    headerInput.value = ""; // очищаем поле ввода

    render(); // render выводит содержимое массива toDoData
  }
});

// const storageArr = function () {
//   // Сохранять данные массива toDoData в localStorage:
//   localStorage.setItem("toDoData", JSON.stringify(toDoData));
//   console.log("toDoData", JSON.stringify(toDoData));
//   // Получаем массив обратно:
//   toDoData = JSON.parse(localStorage.getItem("toDoData"));
//   console.log(toDoData);
// };

// // Через строку работать не будет
// const storageStr = function () {
//   // Сохранять данные массива toDoData в localStorage:
//   localStorage.setItem("newToDo", JSON.stringify(newToDo));
//   console.log("newToDo", JSON.stringify(newToDo));
//   // Получаем массив обратно:
//   newToDo = JSON.parse(localStorage.getItem("newToDo"));
//   console.log(newToDo);
// };
// ДЗ:
// \/ Реализовать удаление задач по нажатию на корзину
// \/ Запретить добавлять задачи, пока value пуст
// При каждом добавлении задачи массив todoData сохранять в localStorage
// А при перезагрузке страницы необходимо извлекать эту информацию и заносить её в todoData
