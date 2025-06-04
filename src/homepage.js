
export default function loadHomePage() {
const content = document.getElementById('content');
const div = document.createElement('div');
div.id = 'contentDiv';

const heading = document.createElement('h1');
heading.textContent = 'Welcome';

const paragraph = document.createElement('p');
paragraph.textContent = 'This is the homepage.';

content.appendChild(div);
div.appendChild(heading);
div.appendChild(paragraph);
}
