import { Project } from "./project.js";
import { Todo } from "./TodoApp.js";

const TodoCtr = (() => {
    const todo = [
        new Todo(
            'sample title',
            'sample description',
            '2025-11-25',
            '⭐️⭐️⭐️',
            'Project 1'
        ),
    ];

    function setTodo(arr) {
        todo.length = 0; // clear current array
        arr.forEach(obj => {
            const newTodo = new Todo(
                obj.title,
                obj.description,
                obj.date,
                obj.priority,
                obj.project,
                obj.id,
                obj.complete // or whatever you call your complete property
            );
            todo.push(newTodo);
        });
    };

    const getTodo = () => todo;

    function getFormValues (e){
        e.preventDefault()
        return {
            title: document.querySelector('#title').value,
            description: document.querySelector('#description').value,
            date: document.querySelector('#date').value,
            priority: document.querySelector('#priority').value,
            project: document.querySelector('#project').value
        }
    }

    function createTodo(title, description, date, priority, project = Project.get()[0], id = crypto.randomUUID(), complete = false) {
        return new Todo(title, description, date, priority, project, id, complete);
    }

    function pushTodo (arr){
        todo.push (arr)
        console.log(todo)
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
                <select class="editable" data-field= "project">
                </select>
                <p class="editable" data-field= "project" id = "projectSelect">${todo.getProject()}</p> 
                <button class="btn-delete">Delete</button>
                `;

            listTask.appendChild(todoContainer);
        });
    };

    return {
        getTodo,
        pushTodo,
        getFormValues,
        createTodo,
        render,
        setTodo
    }
})();

export { TodoCtr }