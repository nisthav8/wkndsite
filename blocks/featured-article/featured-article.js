export default async function decorate(block) {
    const primaryChild = block.children[1].children[0];
    console.log(primaryChild)
    primaryChild.classList.add('primary-container');
    const secondaryChild = block.children[1].children[1];
    secondaryChild.classList.add('secondary-container')
    const flexContainer = document.createElement('div');
    flexContainer.classList.add('flex-parent-container');
    flexContainer.appendChild(primaryChild);
    flexContainer.appendChild(secondaryChild);
    block.appendChild(flexContainer);
  }
  