class Todo {
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

    toJSON() {
        return {
            title: this.#title,
            description: this.#description,
            date: this.#date,
            priority: this.#priority,
            project: this.#project,
            id: this.#id,
            complete: this.#complete
        }
    };

    getTitle() { return this.#title; }
    newTitle(newTitle) { newTitle.length > 0 ? this.#title = newTitle : null; }

    getDescription() { return this.#description; }
    newDescription(newDescription) { newDescription.length > 0 ? this.#description = newDescription : null; }

    getDate() { return this.#date; }
    newDate(newDate){
        if (newDate) {
            this.#date = newDate;
        }
    }

    getPriority() { return this.#priority; }
    newPriority(newPriority) { newPriority ? this.#priority = newPriority : null; }

    getProject() { return this.#project; }
    newProject(newProject) { newProject.length > 0 ? this.#project = newProject : null; }

    getID() { return this.#id; }

    getComplete() { return this.#complete; }
    isComplete(value) { typeof value === 'boolean' ? this.#complete = value : null; }

};

export { Todo }