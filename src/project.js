const Project = (() => {
    const projects = ['Project 1'];

    const get = () => projects;

    function push (project){
        projects.push(project);
        console.log(projects);
    }
    //add the project in the webpage
    function render (projects){
        const ul = document.querySelector('.list-project');
        ul.innerHTML = '';

        const projectLi = document.querySelector('#project');
        projectLi.innerHTML = ''; 

        projects.forEach (project => {
            const li = document.createElement("li"); 
            const btnLi = document.createElement('button');
            const btnDelProject = document.createElement('button');
            btnDelProject.classList = 'btn-del-project';
            btnDelProject.innerText = 'delete';

            btnLi.innerText = project;
            btnLi.classList = 'btn-project';
            btnLi.contentEditable = 'true';
            li.appendChild(btnLi);
            li.appendChild(btnDelProject);
            ul.appendChild(li);


        let option = document.createElement('option');
        console.log(project);
        option.innerText = project;
        projectLi.appendChild(option);
        })
    }

    return {
        get,
        push,
        render
    }
})();

export {Project}