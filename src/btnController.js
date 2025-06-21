import { Todo } from "./TodoApp.js";
import { TodoCtr } from "./TodoController.js";
import { Storage } from "./storage.js";
import { Project } from "./project.js";


const UI = (() => {
    //add task button
    const btnOpenAddTask = document.querySelector('.btn-open-add-task')
    const btnCloseTask = document.querySelector('.btn-close-task')
    const dialogAddTask = document.querySelector('.dialog-add-task');
    const btnAddTask = document.querySelector('.btn-add-task');

    //projects

    //project button and dialog
    const btnOpenAddProject = document.querySelector('.btn-open-add-project');
    const btnCloseProject = document.querySelector('.btn-close-project');
    const btnAddProject = document.querySelector('.btn-add-project');
    const dialogAddProject = document.querySelector('.dialog-add-project');

    const savedProjects = JSON.parse(localStorage.getItem('myProjects'));

    function initProject (){
        if (!localStorage.getItem('myProjects')) {
            // If localStorage is empty, we initialize it
            const projects = Project.get();
            localStorage.setItem('myProjects', JSON.stringify(projects));
        }
        // Regardless of whether it was empty or not, we now safely load it
        const savedProjects = JSON.parse(localStorage.getItem('myProjects'));
        Project.render(savedProjects);
    };

    // const savedTask = JSON.parse(localStorage.getItem('myTodos'));

    // function initTask (){
    //     if (savedTask.length > 0){
    //         TodoCtr.render(JSON.parse(localStorage.getItem('myTodos'))); //render the existing content from the local storage array
    //     } else {
    //         const tasks = TodoCtr.getTodo();
    //         localStorage.setItem('myTodos', JSON.stringify(tasks));
    //         TodoCtr.render()
    //     }
    // }
    // function initTask() {
    //     localStorage.setItem('myTodos', TodoCtr.getTodo());
    //     const saved = localStorage.getItem('myTodos');
    //     const savedTodos = saved ? JSON.parse(saved) : [];

    //     if (savedTodos.length > 0) {
    //         console.log(savedTodos);
    //         TodoCtr.render(savedTodos);
    //     } else {
    //         const pretask = TodoCtr.createTodo('this is title', 'this is description', '2025-11-25', '⭐️⭐️');
    //         console.log(pretask);
    //         // You can uncomment below if you want to save the pretask
    //         TodoCtr.pushTodo(pretask);
    //         localStorage.setItem('myTodos', JSON.stringify(TodoCtr.getTodo()));
    //         TodoCtr.render(TodoCtr.getTodo());
    //     }
    // }
    

    function btnClicks (){
        //adding projects listeners
        btnOpenAddProject.addEventListener('click', () => {dialogAddProject.showModal()});
        btnCloseProject.addEventListener('click', () => {dialogAddTask.close()});

        btnAddProject.addEventListener('click', (e) => {
            e.preventDefault();
            const newProject = document.querySelector('#project-input').value;
            const existingProjects = JSON.parse(localStorage.getItem('myProjects'));// || []; //get the current local storage
            existingProjects.push(newProject); //pushes new project to the local storage
            localStorage.setItem("myProjects", JSON.stringify(existingProjects)); // save it in local  storage again with new array
            Project.render(JSON.parse(localStorage.getItem('myProjects'))); // renders the content of local storage to the webpage
            dialogAddProject.close();
        });


        //adding task event listeners
        btnCloseTask.addEventListener('click', () => {dialogAddTask.close()})
        //open add task dialog
        btnOpenAddTask.addEventListener('click', () => {dialogAddTask.showModal()});

        //add task
        // btnAddTask.addEventListener('click', (e) => {
        //     const values = TodoCtr.getFormValues(e); // no argument
        //     const newTask = TodoCtr.createTodo(
        //         values.title,
        //         values.description,
        //         values.date,
        //         values.priority,
        //         values.project
        //     );

        //     TodoCtr.pushTodo(newTask);
        //     Storage.save('myTodos', TodoCtr.getTodo());

        //     // console.log(TodoCtr.getTodo());
        //     // const existingTodos = JSON.parse(localStorage.getItem('myTodos'));
        //     // console.log(existingTodos);
        //     // Storage.save('myTodos', TodoCtr.getTodo());
        //     // TodoCtr.render(existingTodos)
        // });

        //checking edits made in input and updating the array
       document.addEventListener('DOMContentLoaded', () => {
            const listTask = document.querySelector('.put-task');

            listTask.addEventListener('input', function(e) {
                const element = e.target;
                const allTodo = TodoCtr.getTodo();

                if (element.classList.contains('editable')) {
                    let value;
                    const id = element.closest('.list-task-content').querySelector('input[type="checkbox"]').id; //this is a st
                    const task = allTodo.find(todo => todo.getID() === id);

                        if (element.dataset.field === 'title'){
                            value = element.innerText;
                            task.newTitle(value);
                            console.log(task);
                            Storage.save('myTodos', task);
                            // Storage.load('myTodos')
                        } else if (element.dataset.field === 'description'){
                            value = element.innerText;
                            task.newDescription (value);
                            console.log(task);
                        } else if (element.dataset.field === 'date'){
                            value = element.value;
                            task.newDate (value);
                            console.log(task);
                        } else if (element.dataset.field === 'priority'){
                            value = element.value;
                            task.newPriority (value);
                            console.log(task);
                        } else if (element.dataset.field === 'project'){
                            value = element.innerText;
                            task.newProject (value);
                            console.log(task);
                        }
                    }
            });
        });

        document.addEventListener('DOMContentLoaded', () => {
            // const allTodo = TodoCtr.getTodo();
            const allTodo = Storage.load('myTodos');

            document.addEventListener('change', (e) => {
                if (e.target.matches("input[type='checkbox']")) {
                    if (e.target.checked){
                        const task = allTodo.find(todo => todo.getID() === e.target.id);
                        console.log(task);
                        if (task){
                            task.isComplete(e.target.checked);
                            localStorage.setItem('myTodos', JSON.stringify(allTodo));
                            console.log(task);
                        }
                    } else if (!e.target.checked){
                        const task = allTodo.find(todo => todo.getID() === e.target.id);
                        console.log(task);
                        if (task){
                            task.isComplete(e.target.checked);
                            console.log(task);
                            localStorage.setItem('myTodos', JSON.stringify(allTodo));
                        }
                    }
                } else return;
            });
        });

        document.addEventListener('click', (e) => {
            const allTasks = Storage.load('myTodos');
            const selectedProject = e.target.innerText;

            if (e.target.matches('.btn-project') && e.target.innerText !== 'All Tasks') {
                const matchingTasks = allTasks.filter(task => task.getProject() == selectedProject);
                TodoCtr.render(matchingTasks);
            } else if (e.target.matches('.btn-project') && e.target.innerText == 'All Tasks') {
                TodoCtr.render(allTasks);
            } else if (e.target.matches('.btn-add-task')){
                TodoCtr.render(allTasks);
            }
        });

        document.addEventListener('DOMContentLoaded', () => {
            const allTodo = Storage.load('myTodos');

            document.addEventListener('change', (e) => {
                if (e.target.matches("input[type='checkbox']")) {
                    if (e.target.checked){
                        const task = allTodo.find(todo => todo.getID() === e.target.id);
                        console.log(task);
                        if (task){
                            task.isComplete(e.target.checked);
                            console.log(task);
                        }
                    } else if (!e.target.checked){
                        const task = allTodo.find(todo => todo.getID() === e.target.id);
                        console.log(task);
                        if (task){
                            task.isComplete(e.target.checked);
                        }
                    }
                } else return;
            });
        });
    }

    return {
        // initTask,
        initProject,
        btnClicks
    }

})();

export { UI }