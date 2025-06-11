class Todos {
    #title;
    #description;
    #date;
    #priority;
    #project;
    #id;

    constructor (title, description, date, priority, project,  id = crypto.randomUUID()){
        this.#title = title;
        this.#description = description;
        this.#date = date;
        this.#priority = priority;
        this.#project = project;
        this.#id = id;
    }

    getTitle (){return this.#title;};
    getDescription (){return this.#description;};
    getDate (){return this.#date;};
    getPriority (){return this.#priority;};
    getProject(){return this.#project;};
    getID(){return this.#id};

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
        // Todo.renderTodo(todo)
    }
    function renderTodo (todos) {
        const listTask = document.querySelector('.list-task');
        listTask.innerHTML = ''; // Clear previous tasks

        todos.forEach(todo => {
            const todoContainer = document.createElement('div');
            todoContainer.classList = 'list-task-content';
            const checkboxID = `checkbox-${todo.getID()}`; // ✅ No space

            todoContainer.innerHTML = 
                `
                <input type="checkbox" id="checkbox" name="checkbox" />
                <label for="checkbox">${todo.getTitle()}</label>
                <p>${todo.getDescription()}</p>
                <p>${todo.getDate()}</p>
                <p>${todo.getPriority()}</p>
                <p>${todo.getProject()}</p>
                <button class="btn-delete">Delete</button>`;

        // const checkbox = todoContainer.querySelector(`#${checkboxID}`);
        // checkbox.addEventListener('change', (e) => {
        //     console.log (e.target.innerHTML)
        //     // if (e.target.checked) {
        //     //     todoContainer.classList.add('completed'); // You can style this class in CSS
        //     // } else {
        //     //     todoContainer.classList.remove('completed');
        //     // }
        // });
            listTask.appendChild(todoContainer);
        });
    }
    return {
        getTodo,
        pushTodo,
        addTodo,
        renderTodo,
    }
})();

export { Todos, Todo }