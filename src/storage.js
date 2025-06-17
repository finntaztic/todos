import { Todo } from "./TodoApp.js";

const Storage = (() => {

    function save(key, array) {
        localStorage.setItem(key, JSON.stringify(array));
    }

    function load (key){
        const raw = localStorage.getItem(key);
        if (!raw) return [];

        const parsed = JSON.parse(localStorage.getItem(key));
            return parsed.map (obj =>
                new Todo (obj.title, obj.description, obj.date, obj.priority, obj.project, obj.id, obj.complete)
        );
    }

    function render (todos){

        const listTask = document.querySelector('.put-task');
        listTask.innerHTML = ''; // Clear previous tasks

        todos.forEach(todo => {
            const todoContainer = document.createElement('div');
            todoContainer.classList = 'list-task-content';
            // todoContainer.contentEditable = 'true';

            todoContainer.innerHTML =
                `
                <input class="editable" type="checkbox" id="${todo.getID()}" name="checkbox" ${todo.getComplete() ? 'checked' : ''}/>
                <p class="editable" data-field= "title" contenteditable="true">${todo.getTitle()}</p>

                <p class="editable" data-field= "description" contenteditable="true">${todo.getDescription()}</p>
                <input class="editable" data-field= "date" type="date" value="${todo.getDate()}"/>
                <select class="editable" data-field= "priority">
                    <option value="⭐️" ${todo.getPriority() === '⭐️' ? 'selected' : ''}>⭐️</option>
                    <option value="⭐️⭐️" ${todo.getPriority() === '⭐️⭐️' ? 'selected' : ''}>⭐️⭐️</option>
                    <option value="⭐️⭐️⭐️" ${todo.getPriority() === '⭐️⭐️⭐️' ? 'selected' : ''}>⭐️⭐️⭐️</option>
                </select>
                <p class="editable" data-field= "project" contenteditable="true">${todo.getProject()}</p>
                <button class="btn-delete">Delete</button>
                `;

            listTask.appendChild(todoContainer);
        });
    };

    return {
        save,
        load,
        render
    };
})();

export { Storage }