import "./styles.css";
import loadHome from './home.js';
import loadAbout from './about.js';
import loadMenu from "./menu.js";
import homepage from "./homepage.js";

homepage()


const homeBtn = document.getElementById('home-btn');

document.addEventListener('DOMContentLoaded', () => {
    homeBtn.addEventListener('click', () => {

        const contentDiv = document.getElementById('contentDiv')
        if (contentDiv){
            contentDiv.remove();
            loadHome()
            homeBtn.disabled = true;
            aboutBtn.disabled = false;
            menuBtn.disabled = false;
        } else {
            loadHome()
            homeBtn.disabled = true;
            aboutBtn.disabled = false;
            menuBtn.disabled = false;
        }
    })
})


const aboutBtn = document.getElementById('about-btn');

document.addEventListener('DOMContentLoaded', () => {
    aboutBtn.addEventListener('click', () => {
        if (contentDiv){
            const contentDiv = document.getElementById('contentDiv')
            contentDiv.remove();
            loadAbout()
            aboutBtn.disabled = true;
            homeBtn.disabled = false;
            menuBtn.disabled = false;
        } else {
            loadAbout()
            aboutBtn.disabled = true;
            homeBtn.disabled = false;
            menuBtn.disabled = false;
        }
    })
})

const menuBtn = document.getElementById('menu-btn');

document.addEventListener('DOMContentLoaded', () => {
    menuBtn.addEventListener('click', () => {
        if (contentDiv){
            const contentDiv = document.getElementById('contentDiv')
            contentDiv.remove();
            loadMenu()
            menuBtn.disabled = true;
            homeBtn.disabled = false;
            aboutBtn.disabled = false;

        } else {
            loadMenu()
            menuBtn.disabled = true;
            homeBtn.disabled = false;
            aboutBtn.disabled = false;
        }
    })
})
