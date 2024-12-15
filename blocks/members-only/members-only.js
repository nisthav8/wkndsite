export default async function decorate(block) {
    const primaryChild = block.children[2];
    primaryChild.classList.add('flex-primary-container');
    const secondaryChild = block.children[3];
    secondaryChild.classList.add('flex-secondary-container')
    const flexContainer = document.createElement('div');
    flexContainer.classList.add('flex-container');
    flexContainer.appendChild(primaryChild);
    flexContainer.appendChild(secondaryChild);
    block.appendChild(flexContainer);
  }
  