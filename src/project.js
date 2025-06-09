const Project = (() => {
    const projects = [];

    const getProject = () => projects;

    function pushProject (project){
        projects.push(project);
        console.log(projects);
    }
    function addProject (){
        const projectInput = document.querySelector('#project-input').value;
        pushProject(projectInput);
        renderProject(getProject())
    }
    //add the project in the webpage
    function renderProject (arr){
        //reverses the array and get the last entry  in the input and render it
        const last = arr.reverse()[0]
        const ul = document.querySelector('.list-project');
            let li = document.createElement("li");
            let btnLi = document.createElement('button');
            btnLi.innerText = last;
            btnLi.classList = 'btn-task';
            li.appendChild(btnLi);
            ul.appendChild(li);

        //adds to the list option
        const projectLi = document.querySelector('#project');
            let option = document.createElement('option');
            option.innerText = last;
            projectLi.appendChild(option);
    }
    // //
    function loadProject (){
        const navBtns = document.querySelectorAll('.btn-task');

        navBtns.forEach((item) => {
            if (item.innerText = 'All Tasks'){
                console.log ('hello');
        }
        })

    }
    loadProject();

    return {
        addProject,
        getProject,
        pushProject,
        loadProject
    }
})();

export {Project}