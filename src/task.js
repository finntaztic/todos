class Task {
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

    getTitle (){return this.#title;};
    getDescription (){return this.#description;};
    getDate (){return this.#date;};
    getPriority (){return this.#priority;};
    getProject(){return this.#project;};
    getID(){return this.#id};
    getComplete (){return this.#complete;};
    isComplete(value){
        if (typeof value === 'boolean'){
            this.#complete = value;
        } else return;
    }
};

export { Task }