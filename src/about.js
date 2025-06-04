export default function loadAbout() {
    const content = document.getElementById('content');

    const div = document.createElement('div');
    div.id = 'contentDiv';

    const heading = document.createElement('h1');
    heading.textContent = 'Hi, we are restaurant';

    const paragraph = document.createElement('p');
    paragraph.textContent = "we're all about making yummy foods";

    content.appendChild(div);
    div.appendChild(heading);
    div.appendChild(paragraph);
}
