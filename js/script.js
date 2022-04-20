const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

// Массив для новых задач:
// let toDoData = [];

// Создаём массив элементов списка и записываем в него данные из хранилища. Если данных нет - массив пуст.
let toDoData = localStorage.getItem("items") // Если в хранилище есть данные, то
  ? JSON.parse(localStorage.getItem("items")) // Мы вернём их в toDoData
  : []; // Иначе - страница будет пуста

// Сохранять данные массива toDoData в localStorage:
localStorage.setItem("items", JSON.stringify(toDoData));
console.log("toDoData", JSON.stringify(toDoData));
// Создаём переменную data, в которую записываем информацию из хранилища по ключу "items"
const data = JSON.parse(localStorage.getItem("items"));
console.log(data);

// Функция-рендер, которая будет отрисовывать все наши toDo:
const render = function () {
  //   //Сохранять данные массива toDoData в localStorage:
  //   localStorage.setItem("items", JSON.stringify(toDoData));
  //   console.log("toDoData", JSON.stringify(toDoData));
  //   // Создаём переменную data, в которую записываем информацию из хранилища по ключу "items"
  //   const data = JSON.parse(localStorage.getItem("items"));
  //   console.log(data);

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
    localStorage.setItem("items", JSON.stringify(toDoData)); // Добавляем в хранилище новое значение с уже обновлённым массивом

    headerInput.value = ""; // очищаем поле ввода

    render(); // render выводит содержимое массива toDoData
  }
});

// Сохраняем информацию на странице при перезагрузке страницы:

data.forEach((item) => {
  render(item); // Делаем список на основе данных из хранилища
});

// \/ Реализовать удаление задач по нажатию на корзину
// \/ Запретить добавлять задачи, пока value пуст
// \/ При каждом добавлении задачи массив todoData сохранять в localStorage
// \/ А при перезагрузке страницы необходимо извлекать эту информацию и заносить её в todoData

// Но у нас пока не сохраняются данные о выполненных планах - и корзина не удаляет item из хранилища
