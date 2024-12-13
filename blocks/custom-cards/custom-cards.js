export default async function decorate(block) {
  try {
    const url = getURLFromBlock(block);
    const data = await fetchData(url);
    const groupedData = groupDataByTemplate(data);
    renderTemplates(groupedData);
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

function renderTemplates(groupedData) {
  Object.entries(groupedData).forEach(([template, items]) => {
    const templateContainer = document.createElement("div");
    templateContainer.className = `container-${template}`;

    items.forEach(item => {
      const card = createCard(template, item);
      templateContainer.appendChild(card);
    });

    const targetBlock = block.querySelectorAll(`.${template}`);
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
