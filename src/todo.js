class Todos {
    #complete
    #title;
    #description;
    #date;
    #priority;
    #project;
    #id;

    constructor (title, description, date, priority, project,  id = crypto.randomUUID(), complete = false){
        this.#title = title;
        this.#description = description;
        this.#date = date;
        this.#priority = priority;
        this.#project = project;
        this.#id = id;
        this.#complete = complete;
    }

    getTitle (){return this.#title;};
    getDescription (){return this.#description;};
    getDate (){return this.#date;};
    getPriority (){return this.#priority;};
    getProject(){return this.#project;};
    getID(){return this.#id};
    getComplete (){return this.#complete;};
    isComplete(value){
        if (typeof value === 'boolean'){
            this.#complete = value;
        }
    }
};

const Todo = (() => {
    const todo = [];

    const getTodo = () => todo;

    function pushTodo (arr){
        todo.push (arr)
        console.log(todo)
    }
    function addTodo (e){
        e.preventDefault()
        const title = document.querySelector('#title').value;
        const description = document.querySelector('#description').value;
        const date = document.querySelector('#date').value;
        const priority = document.querySelector('#priority').value;
        const project = document.querySelector('#project').value;
        console.log(project)

        const todo = new Todos (title, description, date, priority, project);
        Todo.pushTodo(todo) // pushing newly added todo in the array
    }

    function renderTodo (todos) {
        const listTask = document.querySelector('.put-task');
        listTask.innerHTML = ''; // Clear previous tasks

        todos.forEach(todo => {
            const todoContainer = document.createElement('div');
            todoContainer.classList = 'list-task-content';
            todoContainer.contentEditable = 'true';

            todoContainer.innerHTML =
                `
                <input type="checkbox" id="${todo.getID()}" name="checkbox" ${todo.getComplete() ? 'checked' : ''}/>
                <label for="${todo.getID()}">${todo.getTitle()}</label>
                <p>${todo.getDescription()}</p>
                <p>${todo.getDate()}</p>
                <p>${todo.getPriority()}</p>
                <p>${todo.getProject()}</p>
                <button class="btn-delete">Delete</button>`;

            listTask.appendChild(todoContainer);
        });
    }
    return {
        getTodo,
        pushTodo,
        addTodo,
        renderTodo
    }
})();

export { Todos, Todo }