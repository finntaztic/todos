//this is for btn functions
function dialogControl (dialog){
    return {
        open: () => dialog.showModal(),
        close: () => dialog.close()
    }
}

function buttonControl (button){
    return {
        onClick: (handler) => button.addEventListener("click", handler),
    };
}

const btnOpenAddProject = document.querySelector('.btn-open-add-project');
const dialogAddProject = document.querySelector('.dialog_add-project');

btnOpenAddProject.onclick(() => {
    dialogAddProject.open();
})