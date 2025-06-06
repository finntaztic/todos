import "./styles.css";
import { btnFunctions } from "./btnFunctions";

//object destructure = the helper functions from the factory function btn functions


    const {dialogControl, buttonControl} = btnFunctions(); 


    const btnOpenAddProject = document.querySelector('.btn-open-add-project');
    const dialogAddProject = document.querySelector('.dialog-add-project');
    // console.log (dialogProject)

    const btnAddProject = buttonControl(btnOpenAddProject)
    const dialogProject = dialogControl(dialogAddProject)

    btnAddProject.onClick(() => {
        dialogProject.open();
    })