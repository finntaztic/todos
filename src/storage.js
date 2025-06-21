import { Todo } from "./TodoApp.js";

const Storage = (() => {

    function save(key, array) {
        localStorage.setItem(key, JSON.stringify(array));
    }

    function load (key){
        const raw = localStorage.getItem(key);
        if (!raw) return [];

        const parsed = JSON.parse(localStorage.getItem(key));
            return parsed.map (obj =>
                new Todo (obj.title, obj.description, obj.date, obj.priority, obj.project, obj.id, obj.complete)
        );
    }

    return {
        save,
        load
    };
})();

export { Storage }