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
    const parsed = JSON.parse(localStorage.getItem('myProjects')); // get the item saved in the project local storage


    function initProject (){
        if (savedProjects.length > 0){ //if the local storage array is not empty
            Project.render(parsed); //render the existing content from the local storage array
        } else {
            Storage.save('myProjects', Project.get()); //save the content of the array to the local storage
            Project.render(parsed); //render the saved content to the webpage
        }
    }

    function initTask (){
        const savedTodos = Storage.load('myTodos');

        if (savedTodos.length > 0) {
            // If there are already tasks saved, render them directly
            TodoCtr.render(savedTodos);
        } else {
            // Storage.save('myTodos', TodoCtr.getTodo());
            // TodoCtr.render(Storage.load('myTodos'));

            // If no saved tasks, create one default task
            const pretask = TodoCtr.createTodo('this is title', 'this is description', '2025-11-25', '⭐️⭐️');  
            TodoCtr.pushTodo(pretask); //pushes the task to the todo array
            // // existingTask.push(pretask);
            Storage.save('myTodos', TodoCtr.getTodo()); // save the array to the local storage
            TodoCtr.render(Storage.load('myTodos')); // get the items in the local storage and render them in the webpage 
        }
    }

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
        //     // const existingTask = JSON.parse(localStorage.getItem('myTodos')); // get the current local storage
        //     // existingTask.push(newTask); //pushes new project to the local storage
        //     // Storage.save('myTodos', existingTask) //save the task to the local storage
        //     TodoCtr.pushTodo(newTask);
        //     Storage.save('myTodos', TodoCtr.getTodo());
        //     TodoCtr.render(Storage.load('myTodos'));
        // })

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
            const allTodo = TodoCtr.getTodo();

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
                            console.log(task);
                        }
                    }
                } else return;
            });
        });

        document.addEventListener('click', (e) => {
            const allTasks = TodoCtr.getTodo();
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
            const allTodo = TodoCtr.getTodo();

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
        initTask,
        initProject,
        btnClicks
    }
    
})();

export { UI }