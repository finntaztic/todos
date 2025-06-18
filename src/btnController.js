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

    function initTask (){
        const pretask = TodoCtr.createTodo('this is title', 'this is description', '2025-11-25', '⭐️⭐️');  
        TodoCtr.pushTodo(pretask)
        Storage.save('myTodos', TodoCtr.getTodo());
        TodoCtr.render (Storage.load('myTodos'));
    }
    
     function initProject (){
        const preProject = "Project 1";
        Project.render(preProject)
        Project.push(preProject);
        Storage.save('myProjects', Project.get());
        const parsed = JSON.parse(localStorage.getItem('myProjects'));
        Project.render(parsed);
    }

    function btnClicks (){
        //adding projects listeners
        btnOpenAddProject.addEventListener('click', () => {dialogAddProject.showModal()});
        btnCloseProject.addEventListener('click', () => {dialogAddTask.close()});

        btnAddProject.addEventListener('click', (e) => {
            e.preventDefault();
            const newProject = document.querySelector('#project-input').value;
            Project.push(newProject);
            Storage.save('myProjects', Project.get());
            const parsed = JSON.parse(localStorage.getItem('myProjects'));
            Project.render(parsed);
            dialogAddProject.close();
        });


        //adding task event listeners 
        btnCloseTask.addEventListener('click', () => {dialogAddTask.close()})
        //open add task dialog
        btnOpenAddTask.addEventListener('click', () => {dialogAddTask.showModal()});

        //add task
        btnAddTask.addEventListener('click', (e) => {
            const values = TodoCtr.getFormValues(e); // no argument
            const newTask = TodoCtr.createTodo(
                values.title,
                values.description,
                values.date,
                values.priority,
                values.project
            );
            TodoCtr.pushTodo(newTask);
            Storage.save('myTodos', TodoCtr.getTodo());
            TodoCtr.render(Storage.load('myTodos'));
        })

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
                        }
                        // } else if (element.dataset.field === 'project'){
                        //     value = element.innerText;
                        //     task.newProject (value);
                        //     console.log(task);
                        // } 
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
    }

    return {
        initTask,
        initProject,
        btnClicks
    }
    
})();

export { UI }