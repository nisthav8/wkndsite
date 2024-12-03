const container = document.createElement('div');
container.classList.add('flex-parent-container');
const childContainer = document.querySelectorAll('main .section');
const main = document.querySelector('main');
main.appendChild(container);
container.appendChild(childContainer[1]);
container.appendChild(childContainer[2]);