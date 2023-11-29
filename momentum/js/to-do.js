const toDoIcon = document.querySelector('.to-do__icon')
const toDoWrap = document.querySelector('.to-do__list-wrap')
const toDoInput = document.querySelector('.to-do__input');
const toDoEmpty = document.querySelector('.to-do__empty');

// отоброжение блока списка дел
toDoIcon.addEventListener('click', () => {
    toDoWrap.classList.toggle('to-do__list-wrap_visible')
})

// проверка пуст ли список дел
const checkToDoListIsEmpty = () => {
    if (document.querySelectorAll('.to-do__item').length === 0) toDoEmpty.classList.add('to-do__empty_visible');
    else toDoEmpty.classList.remove('to-do__empty_visible');
}
// перевод списка дел 
const translateToDo = () => {
    if (localStorage.lang === 'en') {
        toDoEmpty.textContent = 'Your to-do list is empty. Add first task...';
        toDoInput.setAttribute('placeholder', 'add task...')
    } else if (localStorage.lang === 'ru') {
        toDoEmpty.textContent = 'Твой список дел пуст. Добавь первую задачу...';
        toDoInput.setAttribute('placeholder', 'добавь задачу...')
    }
}

translateToDo()

// добавление дел
const createTask = (taskText, taskCompleted = 0) => {
    const li = document.createElement('li');
    li.className = 'to-do__item';
    
    const task = document.createElement('span');
    task.className = 'to-do__title';
    if (taskCompleted !== 0) task.classList.add('to-do__title_completed')
    task.textContent = taskText;

    const close = document.createElement('span');
    close.className = 'to-do__close';

    li.prepend(task);
    li.append(close);

    document.querySelector('.to-do__list').append(li);

    checkToDoListIsEmpty() //проверка при добавлении
}

toDoInput.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        createTask(toDoInput.value);
        toDoInput.value = '';
    }
})
document.querySelector('.to-do__add').addEventListener('click', () => {
    createTask(toDoInput.value);
    toDoInput.value = '';
})

// отметка о выполнении и удаление дел
toDoWrap.addEventListener('click', (event) => {
    if (event.target.classList.contains('to-do__title')) event.target.classList.toggle('to-do__title_completed');
    if (event.target.classList.contains('to-do__close')) event.target.parentElement.remove();

    checkToDoListIsEmpty() //проверка при удалении
})

// сохранеие дел в локалсторедж добавлено в настройках
// востановление списка дел из локалсторадж
let toDoList = [];

if (localStorage.toDo) toDoList = JSON.parse(localStorage.toDo);

toDoList.forEach(item => {
    if (item.completed === 'not-completed') createTask(item.title);
    if (item.completed === 'completed') createTask(item.title, 'completed')
})

checkToDoListIsEmpty() //проверка при запуске


