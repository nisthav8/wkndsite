export default async function decorate(block) {
  try {
    console.log("abc");
    const url = getURLFromBlock(block);
    const data = await fetchData(url);
    const groupedData = groupDataByTemplate(data);
    renderTemplates(groupedData,block);
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching the data: ${response.status}`);
  }
  return await response.json();
}

function getURLFromBlock(block) {
  return block.firstElementChild.firstElementChild.firstElementChild.firstElementChild.textContent;
}

function groupDataByTemplate(data) {
  return Object.entries(data.data).reduce((acc, [key, item]) => {
    const template = item.template;

    if (!template || template.trim() === "") return acc;

    if (!acc[template]) acc[template] = [];
    acc[template].push({ ...item, path: item.path || "#" });
    return acc;
  }, {});
}

function renderTemplates(groupedData,block) {
  Object.entries(groupedData).forEach(([template, items]) => {
    const templateContainer = document.createElement("div");
    templateContainer.className = `container-${template}`;

    items.forEach(item => {
      const card = createCard(template, item);
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
}

function createCard(template, item) {
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

  return card;
}

// async function organizeFlexContainers() {
//   const flexContainer = document.querySelectorAll('.custom-cards-container .default-content-wrapper');
//   if (flexContainer.length === 0) return;

//   flexContainer[0].classList.add('flex-parent-container');
//   const primaryChildContainer = createChildContainer('primary-container');
//   const secondaryChildContainer = createChildContainer('secondary-container');

//   moveChildren(flexContainer[0], primaryChildContainer);
//   flexContainer[0].insertBefore(secondaryChildContainer, flexContainer[0].firstChild);
//   flexContainer[0].insertBefore(primaryChildContainer, secondaryChildContainer);

//   const mainContainer = document.querySelector('.custom-cards-container');
//   if (mainContainer) {
//     mainContainer.insertBefore(primaryChildContainer.firstChild, mainContainer.firstChild);
//   }
// }

// async function organizeMembersOnlyContainer() {
//   const parentContainer = document.querySelectorAll('.custom-cards-container .default-content-wrapper');
//   if (parentContainer.length < 2) return;

//   const membersOnlyContainer = createChildContainer('flex-container');
//   const membersOnlyPrimaryChildContainer = createChildContainer('flex-primary-container');
//   const membersOnlySecondaryChildContainer = createChildContainer('flex-secondary-container');

//   membersOnlyContainer.appendChild(membersOnlyPrimaryChildContainer);
//   membersOnlyContainer.appendChild(membersOnlySecondaryChildContainer);
//   parentContainer[1].appendChild(membersOnlyContainer);

//   const childElements = Array.from(parentContainer[1].children);
//   moveGroup(childElements, 2, 5, membersOnlyPrimaryChildContainer);
//   moveGroup(childElements, 6, 9, membersOnlySecondaryChildContainer);
// }

// function createChildContainer(className) {
//   const container = document.createElement('div');
//   container.classList.add(className);
//   return container;
// }

// function moveChildren(source, destination) {
//   while (source.firstChild) {
//     destination.appendChild(source.firstChild);
//   }
// }

// function moveGroup(childElements, startIndex, endIndex, destination) {
//   for (let i = startIndex; i <= endIndex; i++) {
//     if (childElements[i]) {
//       destination.appendChild(childElements[i]);
//     }
//   }
// }

// (async function main() {
//   await organizeFlexContainers();
//   await organizeMembersOnlyContainer();
// })();
