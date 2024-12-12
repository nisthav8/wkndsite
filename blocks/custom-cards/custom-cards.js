export default async function decorate(block) {
  try {
    // Extract JSON URL from the block
    const url = block.firstElementChild.firstElementChild.firstElementChild.firstElementChild.textContent;

    // Fetch JSON data
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching the data: ${response.status}`);
    }

    const data = await response.json();

    // Group data by template type
    const groupedData = Object.entries(data.data).reduce((acc, [key, item]) => {
      const template = item.template || "default";
      if (!acc[template]) acc[template] = [];
      acc[template].push({ ...item, path: item.path || "#" });
      return acc;
    }, {});

    // Render grouped data dynamically
    Object.entries(groupedData).forEach(([template, items]) => {
      // Find the block corresponding to the template class
      const templateBlock = block.querySelector(`.${template}`) || document.createElement("div");

      if (!templateBlock.className.includes(template)) {
        templateBlock.className = template;
        block.appendChild(templateBlock);
      }

      // Clear the template block before appending new content
      templateBlock.innerHTML = "";

      // Add content dynamically
      items.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        // Add image
        if (item.image) {
          const img = document.createElement("img");
          img.src = item.image;
          img.alt = `${item.title || "image"} image`;
          img.className = "card-image";
          card.appendChild(img);
        }

        // Add title
        if (item.title) {
          const titleElement = document.createElement("h3");
          titleElement.textContent = item.title;
          card.appendChild(titleElement);
        }

        // Add description
        if (item.description) {
          const descriptionElement = document.createElement("p");
          descriptionElement.textContent = item.description;
          card.appendChild(descriptionElement);
        }

        // Add click event for navigation
        card.addEventListener("click", () => {
          window.location.href = item.path;
        });

        // Append card to the template block
        templateBlock.appendChild(card);
      });
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
  
  
