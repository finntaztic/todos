function renderTasks(taskArray) {
    const container = document.querySelector('#task-container');
    container.innerHTML = ''; // Clear

    taskArray.forEach(task => {
        const div = document.createElement('div');
        div.textContent = `${task.title} - ${task.dueDate} [${task.priority}] ${task.isDone ? '✔️' : '❌'}`;
        container.appendChild(div);
    });
}

export { renderTasks };