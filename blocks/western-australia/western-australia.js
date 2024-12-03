
// const container = document.createElement('div');
// container.classList.add('photo-social-link-container');
// const parentContainer = document.querySelectorAll('.western-australia-container > div:nth-of-type(3)');
// parentContainer[0].insertBefore(container,parentContainer[0].firstChild);
// container.appendChild(parentContainer[0].secondChild);
// container.appendChild(parentContainer[0].thirdChild);
const container = document.createElement('div');
container.classList.add('flex-parent-container');
const childContainer = document.querySelectorAll('main .section');
const main = document.querySelector('main');
main.appendChild(container);
container.appendChild(childContainer[1]);
container.appendChild(childContainer[2]);