//this is for btn functions
function btnFunctions (){
    function dialogControl (dialog){
        return {
            open: () => dialog.showModal(),
            close: () => dialog.close()
        };
    }

    function buttonControl (button){
        return {
            onClick: (handler) => button.addEventListener("click", handler),
        };
    }


    // function renderProject (array){

    //     const projectList = document.querySelector('project-list');
    //     const projectInput = document.querySelector('#project-input').value;
    //     projectList.appendChild(projectInput)
    // }

    return {
        dialogControl,
        buttonControl
    };
}

export { btnFunctions };