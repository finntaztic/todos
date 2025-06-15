import { btnFunctions } from "./btnFunctions";
import { Project } from "./project";
import { Todo } from "./todo";
import { Todos } from "./todo";


const UI = (() => {
    const {dialogControl, buttonControl} = btnFunctions();
    //project button and dialog
    const btnOpenAddProject = document.querySelector('.btn-open-add-project');
    const btnCloseProject = document.querySelector('.btn-close-project');
    const btnAddProject = document.querySelector('.btn-add-project');
    const dialogAddProject = document.querySelector('.dialog-add-project');
    //add task button
    const btnOpenAddTask = document.querySelector('.btn-open-add-task')
    const btnCloseTask = document.querySelector('.btn-close-task')
    const dialogAddTask = document.querySelector('.dialog-add-task');
    const btnAddTask = document.querySelector('.btn-add-task');
    //all buttons


    function btnClicks (){
        //open dialog project
        buttonControl(btnOpenAddProject).onClick(() => {
            dialogControl(dialogAddProject).open();
        });
        //add project
        buttonControl(btnAddProject).onClick(Project.addProject);

        //close dialog project
        buttonControl(btnCloseProject).onClick(() => {
            dialogControl(dialogAddProject).close();
        });
        //open dialog task
        buttonControl(btnOpenAddTask).onClick(() => {
            dialogControl(dialogAddTask).open();
        });

        //close dialog task
        buttonControl(btnCloseTask).onClick(() => {
            dialogControl(dialogAddTask).close();
        });

        //add to do in the array and webpage
        buttonControl(btnAddTask).onClick(Todo.addTodo);


        document.addEventListener('click', (e) => {
            const allTasks = Todo.getTodo();
            const selectedProject = e.target.innerText;

            if (e.target.matches('.btn-project') && e.target.innerText !== 'All Tasks') {
                const matchingTasks = allTasks.filter(task => task.getProject() == selectedProject);
                Todo.renderTodo(matchingTasks);
            } else if (e.target.matches('.btn-project') && e.target.innerText == 'All Tasks') {
                Todo.renderTodo(allTasks);
            } else if (e.target.matches('.btn-add-task')){
                Todo.renderTodo(allTasks);
            }
        });

        document.addEventListener('DOMContentLoaded', () => {
            const allTodo = Todo.getTodo();

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
        btnClicks
    };
})();

export { UI }