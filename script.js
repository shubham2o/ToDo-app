const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUl = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem('todos'));
if (todos) {
    todos.forEach(todo => addToDo(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addToDo();
});

function addToDo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement('li');

        if (todo && todo.completed) {
            todoEl.classList.add('completed');
        }

        todoEl.innerHTML = todoText;

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLS();
        });

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoEl.remove();
            updateLS();
        });

        todosUl.appendChild(todoEl);
        input.value = "";
        updateLS();
    }
}

function updateLS() {
    const notesEl = document.querySelectorAll('li');
    const notes = [];

    notesEl.forEach((noteEl) => {
        notes.push({
            Task: noteEl.innerText, Completed: noteEl.classList.contains('completed')
        });
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}