import { TodoCtr } from "./TodoController.js";
import { Storage } from "./storage.js";
import { Project } from "./project.js";


const UI = (() => {
    //add task button
    const btnOpenAddTask = document.querySelector('.btn-open-add-task')
    const btnCloseTask = document.querySelector('.btn-close-task')
    const dialogAddTask = document.querySelector('.dialog-add-task');
    const btnAddTask = document.querySelector('.btn-add-task');

    //project button and dialog
    const btnOpenAddProject = document.querySelector('.btn-open-add-project');
    const btnCloseProject = document.querySelector('.btn-close-project');
    const btnAddProject = document.querySelector('.btn-add-project');
    const dialogAddProject = document.querySelector('.dialog-add-project');

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

    function initTask () {
        if (!localStorage.getItem('myTodos')) {
            const tasks = TodoCtr.getTodo();
            console.log(tasks);
            localStorage.setItem('myTodos', JSON.stringify(tasks));
        }

        
        const savedTasks = JSON.parse(localStorage.getItem('myTodos'));
        console.log(savedTasks);
        TodoCtr.setTodo(savedTasks);  // <-- rehydrate plain objects
        TodoCtr.render(TodoCtr.getTodo());
    }

    function btnClicks (){
        //adding projects listeners
        btnOpenAddProject.addEventListener('click', () => {dialogAddProject.showModal()});
        btnCloseProject.addEventListener('click', () => {dialogAddTask.close()});

        btnAddProject.addEventListener('click', (e) => {

             const allProject = Project.get();

            e.preventDefault();
            const newProject = document.querySelector('#project-input').value;
            allProject.push(newProject);
            const existingProjects = JSON.parse(localStorage.getItem('myProjects')) || []; // <- add fallback to []
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
        });

        //checking edits made in input and updating the array
       document.addEventListener('DOMContentLoaded', () => {
            const listTask = document.querySelector('.put-task');

            listTask.addEventListener('input', function(e) {
                const element = e.target;
                const allTodo = TodoCtr.getTodo();
                // const allTodo = Storage.load('myTodos');

                if (element.classList.contains('editable')) {
                    let value;
                    const id = element.closest('.list-task-content').querySelector('input[type="checkbox"]').id; //this is a st
                    const task = allTodo.find(todo => todo.getID() === id);

                        if (element.dataset.field === 'title'){
                            value = element.innerText;
                            task.newTitle(value);
                            console.log(task);
                            Storage.save('myTodos', allTodo);
                            // Storage.load('myTodos')
                        } else if (element.dataset.field === 'description'){
                            value = element.innerText;
                            task.newDescription (value);
                            console.log(task);
                            Storage.save('myTodos', allTodo);
                        } else if (element.dataset.field === 'date'){
                            value = element.value;
                            task.newDate (value);
                            console.log(task);
                            Storage.save('myTodos', allTodo);
                        } else if (element.dataset.field === 'priority'){
                            value = element.value;
                            task.newPriority (value);
                            console.log(task);
                            Storage.save('myTodos', allTodo);
                        } else if (element.dataset.field === 'project'){
                            value = element.innerText;
                            task.newProject (value);
                            console.log(task);
                            Storage.save('myTodos', allTodo);
                        }
                    }
            });
        });

        document.addEventListener('DOMContentLoaded', () => {
            // const allTodo = Storage.load('myTodos');
            const allTodo = TodoCtr.getTodo();

            document.addEventListener('change', (e) => {
                if (e.target.matches("input[type='checkbox']")) {
                    const task = allTodo.find(todo => todo.getID() === e.target.id);
                    if (task){
                        task.isComplete(e.target.checked);
                        localStorage.setItem('myTodos', JSON.stringify(allTodo));
                        console.log(task);
                    }
                }
            });
        });

        document.addEventListener('click', (e) => {
            // const allTasks = Storage.load('myTodos');
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
            // const allTodo = Storage.load('myTodos');
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

        document.addEventListener('click', (e) => {
            const allTasks = TodoCtr.getTodo();
            // const selectedButton = e.target.innerText;

            if (e.target.matches('.btn-delete')) {
                const parentNode = e.target.parentNode;  // Get the parent element
                const btnID = e.target.id;

                const index = allTasks.findIndex(todo => todo.getID() === btnID);

                if (index !== -1) {
                    allTasks.splice(index, 1);  // Remove from array
                    console.log('Deleted from array:', btnID);
                } else {
                    console.log('Task not found.');
                }
                console.log(index);
                console.log(btnID);
                console.log(parentNode);

                parentNode.remove();
                Storage.save('myTodos', allTasks);
            }
        });

        document.addEventListener('click', (e) => {
            const allProject = Project.get();

            if (e.target.matches('.btn-del-project')) {

                const li = e.target.closest('li'); // find the parent <li>
                const projectBtn = li.querySelector('.btn-project'); // find the button inside this <li>
                const projectName = projectBtn.innerText;

                console.log(projectName);

                li.remove(); // remove the li from DOM

                const index = allProject.findIndex(project => project === projectName);

                console.log(allProject);
                if (index !== -1) {
                    allProject.splice(index, 1);
                    Storage.save('myProjects', allProject);
                }
            }
        });

    }

    return {
        initTask,
        initProject,
        btnClicks
    }

})();

export { UI }