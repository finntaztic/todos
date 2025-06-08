const Project = (() => {
    const projects = [];

    const getProject = () => projects;

    function pushProject (project){
        projects.push(project);
        console.log(projects);
    }

    //add the project in the webpage
    function renderProject (arr){
        //reverses the array and get the last entry  in the input and render it
        const last = arr.reverse()[0]
        const ul = document.querySelector('.list-project');
            let li = document.createElement("li");
            let btnLi = document.createElement('button');
            btnLi.innerText = last;
            li.appendChild(btnLi);
            ul.appendChild(li);

        //adds to the list option
        const projectLi = document.querySelector('#project');
            let option = document.createElement('option');
            option.innerText = last;
            projectLi.appendChild(option);
    }
    return {
        getProject,
        pushProject,
        renderProject
    }
})();

export {Project}