const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

// Массив для новых задач:
const toDoData = [];

// Функция-рендер, которая будет отрисовывать все наши toDo:
const render = function () {
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
  });
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault(); // Запретили "submit" стандартное поведение, теперь страница не перезагружается

  // создаём новый объект:

  const newToDo = {
    text: headerInput.value,
    completed: false,
  }; // Отправляем новый объект в массив toDoData:
  toDoData.push(newToDo);
  headerInput.value = ""; // очищаем поле ввода
  render(); // render выводит содержимое массива toDoData
});
