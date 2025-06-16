import { Task } from "./task";
import { Storage } from "./storage";
// import { renderTasks } from "./ui";

const tasks = [
    new Task ('title', 'description', '06-03-2025', '⭐️⭐️', `${string}-${string}-${string}-${string}-${string}`, false)
]

Storage.save('myTask', tasks);

// const restoredTasks = Storage.load ('myTasks');
// renderTasks(restoredTasks);