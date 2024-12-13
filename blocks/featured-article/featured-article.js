export default async function decorate(block) {
    const thirdDiv = block.children[1];
    thirdDiv.classList.add('primary-container');
    const fourthDiv = block.children[2];
    fourthDiv.classList.add('secondary-container')
    const flexContainer = document.createElement('div');
    flexContainer.classList.add('flex-parent-container');
    flexContainer.appendChild(thirdDiv);
    flexContainer.appendChild(fourthDiv);
    block.appendChild(flexContainer);
  }
  