export default async function decorate(block) {
  try {
    const url = block.firstElementChild.firstElementChild.firstElementChild.firstElementChild.textContent;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching the data: ${response.status}`);
    }

    const data = await response.json();

    const groupedData = Object.entries(data.data).reduce((acc, [key, item]) => {
      const template = item.template;

      if (!template || template.trim() === "") return acc;

      if (!acc[template]) acc[template] = [];
      acc[template].push({ ...item, path: item.path || "#" });
      return acc;
    }, {});

    Object.entries(groupedData).forEach(([template, items]) => {
      const templateContainer = document.createElement("div");
      templateContainer.className = `container-${template}`;

      items.forEach(item => {
        const card = document.createElement("div");
        card.className = `card-${template}`;

        if (item.image) {
          const img = document.createElement("img");
          img.src = item.image;
          img.alt = `${item.title || "image"} image`;
          img.className = `image-${template}`;
          card.appendChild(img);
        }

        if (item.title) {
          const titleElement = document.createElement("h3");
          titleElement.textContent = item.title;
          titleElement.className = `title-${template}`;
          card.appendChild(titleElement);
        }

        if (item.description) {
          const descriptionElement = document.createElement("p");
          descriptionElement.textContent = item.description;
          descriptionElement.className = `description-${template}`;
          card.appendChild(descriptionElement);
        }

        card.addEventListener("click", () => {
          window.location.href = item.path;
        });

        templateContainer.appendChild(card);
      });

      const targetBlock = document.querySelectorAll(`.${template}`)[0];
      if (targetBlock) {
        const existingContainer = targetBlock.querySelectorAll(`.container-${template}`)[0];
        if (!existingContainer) {
          targetBlock.appendChild(templateContainer);
        }
      } else {
        console.warn(`No block found for template: ${template}`);
      }
    });
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}


const flexContainer = document.querySelectorAll('.custom-cards-container .default-content-wrapper');
flexContainer[0].classList.add('flex-parent-container');
const primaryChildContainer = document.createElement('div');
const secondaryChildContainer = document.createElement('div');
primaryChildContainer.classList.add('primary-container');
secondaryChildContainer.classList.add('secondary-container');

if (flexContainer[0].lastChild) {
    secondaryChildContainer.appendChild(flexContainer[0].lastChild);
  }
  
while (flexContainer[0].firstChild) {
    primaryChildContainer.appendChild(flexContainer[0].firstChild);
}


flexContainer[0].insertBefore(secondaryChildContainer,flexContainer[0].firstChild);
flexContainer[0].insertBefore(primaryChildContainer,secondaryChildContainer);
        

const mainContainer = document.querySelectorAll('.custom-cards-container')[0];
    mainContainer.insertBefore(primaryChildContainer.firstChild,mainContainer.firstChild)

const membersOnlyContainer = document.createElement('div');
membersOnlyContainer.classList.add('flex-container');
const membersOnlyPrimaryChildContainer = document.createElement('div');
membersOnlyPrimaryChildContainer.classList.add('flex-primary-container');
const membersOnlySecondaryChildContainer = document.createElement('div');
membersOnlySecondaryChildContainer.classList.add('flex-secondary-container');

membersOnlyContainer.appendChild(membersOnlyPrimaryChildContainer);
membersOnlyContainer.appendChild(membersOnlySecondaryChildContainer);

const parentContainer = document.querySelectorAll('.custom-cards-container .default-content-wrapper');
 parentContainer[1].appendChild(membersOnlyContainer);
  
//  for (let i = 2; i <= 5; i++) {
//     membersOnlyPrimaryChildContainer.appendChild(parentContainer[1].children[i]);
//     }
  
const childElements = Array.from(parentContainer[1].children);
function moveGroup(startIndex, endIndex, destination) {
    for (let i = startIndex; i <= endIndex; i++) {
      if (childElements[i]) {
        destination.appendChild(childElements[i]);
      }
    }
  }
  
 
  moveGroup(2, 5, membersOnlyPrimaryChildContainer);
  
  
  moveGroup(6, 9, membersOnlySecondaryChildContainer);
  
  
