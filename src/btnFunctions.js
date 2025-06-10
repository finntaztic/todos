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
            onClick: (handler) => button.addEventListener("click", handler)
        };
    }

    return {
        dialogControl,
        buttonControl
    };
}

export { btnFunctions };