const Project = (() => {
    const projects = [];

    const getProject = () => projects;

    function pushProject (project){
        projects.push(project);
        console.log(projects);
    }

    //add the project in the webpage
    function renderProject (arr){
        //reverses the array and get the last entry and render it
        const last = arr.reverse()[0]
        const ul = document.querySelector('.list-project');
            let li = document.createElement("li");
            li.innerText = last;
            ul.appendChild(li);
    }
    return {
        getProject,
        pushProject,
        renderProject
    }
})();

export {Project}