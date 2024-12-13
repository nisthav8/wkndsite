export default async function decorate(block) {
    const thirdDiv = block.children[2];
    thirdDiv.classList.add('flex-primary-container');
    const fourthDiv = block.children[3];
    fourthDiv.classList.add('flex-secondary-container')
    const flexContainer = document.createElement('div');
    flexContainer.classList.add('flex-container');
    flexContainer.appendChild(thirdDiv);
    flexContainer.appendChild(fourthDiv);
    block.appendChild(flexContainer);
  }
  