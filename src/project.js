const Project = (() => {
    const projects = [];

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

        // const projectSelect = document.querySelector('#projectSelect');
        // console.log(projectSelect);


        projects.forEach (project => {
            const li = document.createElement("li"); 
            const btnLi = document.createElement('button');
            btnLi.innerText = project;
            btnLi.classList = 'btn-project';
            btnLi.contentEditable = 'true';
            li.appendChild(btnLi);
            ul.appendChild(li);


            // btnLi.addEventListener('keydown', function(e) {
            //     if (e.key === ' ') {
            //         e.preventDefault();
            //         // Insert space manually
            //         document.execCommand('insertText', false, ' ');
            //     }
            // });
            // let option = document.createElement('option');
            // option.innerText = project;
            // projectLi.appendChild(option);
        })
    }

    //pick up fixing to do project namessss

    // function render (arr){
    //     //reverses the array and get the last entry  in the input and render it
    //     const last = arr.reverse()[0]
    //     const ul = document.querySelector('.list-project');
    //         let li = document.createElement("li");
    //         let btnLi = document.createElement('button');
    //         btnLi.innerText = last;
    //         btnLi.classList = 'btn-project';
    //         li.appendChild(btnLi);
    //         ul.appendChild(li);

    //     //adds to the list option
    //     const projectLi = document.querySelector('#project');
    //         let option = document.createElement('option');
    //         option.innerText = last;
    //         projectLi.appendChild(option);
    // }

    return {
        get,
        push,
        render,
    }
})();

// export {Project}