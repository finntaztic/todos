export default function loadMenu() {
    const content = document.getElementById('content');

    const div = document.createElement('div');
    div.id = 'contentDiv';

    const heading = document.createElement('h1');
    heading.textContent = 'This is our Menu';

    const paragraph = document.createElement('p');
    paragraph.textContent = "Super yummy, you'd love it";

    content.appendChild(div);
    div.appendChild(heading);
    div.appendChild(paragraph);
}
