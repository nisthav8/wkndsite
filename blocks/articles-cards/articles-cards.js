
async function fetchAndDisplayCards() {
    try {
      
      const response1 = await fetch("https://main--wkndsite--nisthav8.aem.page/data.json");
      if (!response1.ok) {
        throw new Error(`Error fetching data1.json: ${response1.status}`);
      }
      const titlesAndDescriptions = await response1.json();
      console.log(titlesAndDescriptions)
  
     
      const response2 = await fetch("https://main--wkndsite--nisthav8.aem.page/query-index.json");
      if (!response2.ok) {
        throw new Error(`Error fetching data2.json: ${response2.status}`);
      }
      const paths = await response2.json();
  
      
      const combinedData = [];

    
      for (const [key, titleDescription] of Object.entries(titlesAndDescriptions.data)) {
        const path = paths.data[key]?.path || "#";  
      
        combinedData.push({
          ...titleDescription,
          path: path,
        });
      }

     
      const container = document.createElement("div");
      container.className = "card-container";
    //   document.body.appendChild(container);
  
     
      combinedData.forEach((item) => {
        const card = document.createElement("div");
        card.className = "card";
  
      
        const title = document.createElement("h3");
        title.textContent = item.title;
  
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = `${item.title} image`;
        img.className = "card-image";

        const description = document.createElement("p");
        description.textContent = item.description;
  
       
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(description);
        
  
       
        card.addEventListener("click", () => {
          window.location.href = item.path;
        });
  
        
        container.appendChild(card);
        document.querySelectorAll('.articles-cards')[0].appendChild(container);
     
      });
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  }
  
  
  fetchAndDisplayCards();

 const flexContainer = document.querySelectorAll('.articles-cards-container .default-content-wrapper');
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
        

const mainContainer = document.querySelectorAll('.articles-cards-container')[0];
    mainContainer.insertBefore(primaryChildContainer.firstChild,mainContainer.firstChild)
 
   
const membersOnlyContainer = document.createElement('div');
membersOnlyContainer.classList.add('flex-container');
const membersOnlyPrimaryChildContainer = document.createElement('div');
membersOnlyPrimaryChildContainer.classList.add('flex-primary-container');
const membersOnlySecondaryChildContainer = document.createElement('div');
membersOnlySecondaryChildContainer.classList.add('flex-secondary-container');

membersOnlyContainer.appendChild(membersOnlyPrimaryChildContainer);
membersOnlyContainer.appendChild(membersOnlySecondaryChildContainer);

const parentContainer = document.querySelectorAll('.articles-cards-container .default-content-wrapper');
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
  
  
 
  