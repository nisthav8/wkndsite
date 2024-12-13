export default async function decorate(block) {
  try {
    const url = block.querySelector("div > div > div > div").textContent;
    const data = await fetchData(url);

    const groupedData = groupDataByTemplate(data);

    renderGroupedData(groupedData);
    organizeContainers();
  } catch (error) {
    console.error("Error in decorate function:", error);
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.status}`);
  }
  return response.json();
}

function groupDataByTemplate(data) {
  return Object.values(data.data).reduce((acc, item) => {
    const template = item.template?.trim();
    if (!template) return acc;
    if (!acc[template]) acc[template] = [];
    acc[template].push({ ...item, path: item.path || "#" });
    return acc;
  }, {});
}

function renderGroupedData(groupedData) {
  Object.entries(groupedData).forEach(([template, items]) => {
    const container = createTemplateContainer(template, items);
    const targetBlock = document.querySelector(`.${template}`);

    if (targetBlock && !targetBlock.querySelector(`.container-${template}`)) {
      targetBlock.appendChild(container);
    } else {
      console.warn(`No block found for template: ${template}`);
    }
  });
}

function createTemplateContainer(template, items) {
  const container = document.createElement("div");
  container.className = `container-${template}`;

  items.forEach((item) => {
    const card = createCard(template, item);
    container.appendChild(card);
  });

  return container;
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
    const title = document.createElement("h3");
    title.textContent = item.title;
    title.className = `title-${template}`;
    card.appendChild(title);
  }

  if (item.description) {
    const description = document.createElement("p");
    description.textContent = item.description;
    description.className = `description-${template}`;
    card.appendChild(description);
  }

  card.addEventListener("click", () => {
    window.location.href = item.path;
  });

  return card;
}

function organizeContainers() {
  const containers = document.querySelectorAll(
    ".custom-cards-container .default-content-wrapper"
  );
  if (containers.length === 0) return;

  setupPrimarySecondaryContainers(containers[0]);
  if (containers[1]) setupMembersOnlyContainer(containers[1]);
}

function setupPrimarySecondaryContainers(container) {
  container.classList.add("flex-parent-container");

  const primary = document.createElement("div");
  const secondary = document.createElement("div");
  primary.className = "primary-container";
  secondary.className = "secondary-container";

  if (container.lastChild) secondary.appendChild(container.lastChild);

  while (container.firstChild) {
    primary.appendChild(container.firstChild);
  }

  container.append(primary, secondary);

  const mainContainer = document.querySelector(".custom-cards-container");
  if (mainContainer) mainContainer.prepend(primary.firstChild);
}

function setupMembersOnlyContainer(container) {
  const membersOnly = document.createElement("div");
  membersOnly.className = "flex-container";

  const primary = document.createElement("div");
  const secondary = document.createElement("div");
  primary.className = "flex-primary-container";
  secondary.className = "flex-secondary-container";

  membersOnly.append(primary, secondary);
  container.appendChild(membersOnly);

  moveChildren(container.children, 2, 5, primary);
  moveChildren(container.children, 6, 9, secondary);
}

function moveChildren(elements, start, end, destination) {
  Array.from(elements)
    .slice(start, end + 1)
    .forEach((el) => destination.appendChild(el));
}
