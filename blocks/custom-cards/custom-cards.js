export default async function decorate(block) {
  try {

    const links = [
      block.firstElementChild.firstElementChild.firstElementChild.firstElementChild.textContent,
      block.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.textContent
    ];

 
    const [dataResponse, queryIndexResponse] = await Promise.all(links.map(url => fetch(url)));

    
    if (!dataResponse.ok || !queryIndexResponse.ok) {
      throw new Error(`Error fetching the data: ${dataResponse.status} | ${queryIndexResponse.status}`);
    }

    
    const data = await dataResponse.json();
    const queryIndexData = await queryIndexResponse.json();

   
    const combinedData = Object.entries(data.data)
      .slice(0, 5)
      .map(([key, item]) => ({
        ...item,
        path: queryIndexData.data[key]?.path || "#", 
      }));

    
    const cardsContainer = document.createElement("div");
    cardsContainer.className = "card-container";
   
    const headingElement = document.createElement("h2");
    const heading = combinedData[0]?.heading || "Default Heading";
    headingElement.textContent = heading;
    block.appendChild(headingElement);
    
    combinedData.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";

      
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = `${item.title || "image"} image`;
      img.className = "card-image";
      card.appendChild(img);

     
      const titleElement = document.createElement("h3");
      titleElement.textContent = item.title;
      card.appendChild(titleElement); 

      
      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = item.description;
      card.appendChild(descriptionElement); 

      card.addEventListener("click", () => {
        window.location.href = item.path;
      });

     
      cardsContainer.appendChild(card);
    });

   
    block.appendChild(cardsContainer);
  } catch (error) {

    console.error("Error fetching or processing data:", error);
  }
}


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
  
  
