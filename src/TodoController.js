import { Todo } from "./TodoApp.js";

const TodoCtr = (() => {
    const todo = [];
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

    function createTodo(title, description, date, priority, project = 'default', id = crypto.randomUUID(), complete = false) {
        return new Todo(title, description, date, priority, project, id, complete);
    }

    function pushTodo (arr){
        todo.push (arr)
        console.log(todo)
    }

    function saveEdit (input){
        console.log(input.innerHTML);
    }
    return {
        getTodo,
        pushTodo,
        getFormValues,
        createTodo,
        saveEdit
    }
})();

export { TodoCtr }