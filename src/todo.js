class Todos {
    #title;
    #description;
    #project;

    constructor (title, description, project){
        this.#title = title;
        this.#description = description;
        this.#project = project;
    }

    getTitle (){
        return this.#title;
    };

    getDescription (){
        return this.#description;
    }

    getProject(){
        return this.#project;
    }

};

const Todo = (() => {
    const todo = [];

    function pushTodo (arr){
        todo.push (arr)
        console.log(todo)
    }
    function addTodo (e){
        e.preventDefault()
        const title = document.querySelector('#title').value;
        const description = document.querySelector('#description').value;
        const project = document.querySelector('#project').value;
        console.log(project)

        const todo = new Todos (title, description, project);
        Todo.pushTodo(todo) // pushing newly added todo in the array
        Todo.renderTodo(todo)
    }
    function renderTodo (todo){
        const listTask = document.querySelector('.list-task');
        const tr = document.createElement('tr');

        listTask.appendChild(tr);
        tr.innerHTML =`
            <td><p>${todo.getTitle()}</p></td>
            <td><p>${todo.getDescription()}</p></td>
            <td><p>${todo.getProject()}</p></td>`
    }
    return {
        pushTodo,
        addTodo,
        renderTodo
    }
    
})();

export { Todos, Todo }