// const container = document.createElement('div');
// container.classList.add('flex-parent-container');




// Function to fetch data from both files and generate cards
async function fetchAndDisplayCards() {
    try {
      // Fetch titles and descriptions from data1.json
      const response1 = await fetch("http://localhost:3000/data.json");
      if (!response1.ok) {
        throw new Error(`Error fetching data1.json: ${response1.status}`);
      }
      const titlesAndDescriptions = await response1.json();
      console.log(titlesAndDescriptions)
  
      // Fetch paths from data2.json
      const response2 = await fetch("http://localhost:3000/query-index.json");
      if (!response2.ok) {
        throw new Error(`Error fetching data2.json: ${response2.status}`);
      }
      const paths = await response2.json();
  
      // Combine the two datasets
      const combinedData = [];

      // Use Object.entries() to get key-value pairs from titlesAndDescriptions.data
      for (const [key, titleDescription] of Object.entries(titlesAndDescriptions.data)) {
        const path = paths.data[key]?.path || "#";  // Use the same key to get the path
      
        // Combine the title/description with the path and push to the combinedData array
        combinedData.push({
          ...titleDescription,
          path: path,
        });
      }

      // Create container dynamically
      const container = document.createElement("div");
      container.className = "card-container";
    //   document.body.appendChild(container);
  
      // Generate cards dynamically
      combinedData.forEach((item) => {
        const card = document.createElement("div");
        card.className = "card";
  
        // Add content
        const title = document.createElement("h3");
        title.textContent = item.title;
  
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = `${item.title} image`;
        img.className = "card-image";

        const description = document.createElement("p");
        description.textContent = item.description;
  
        // Append elements to the card
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(description);
        
  
        // Add click event to navigate to the path
        card.addEventListener("click", () => {
          window.location.href = item.path;
        });
  
        // Append card to the container
        container.appendChild(card);
        document.querySelectorAll('.articles-cards')[0].appendChild(container);
     
      });
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  }
  
  // Call the function
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
  
  // Move the first group (h2, p, p, p) to the first destination container
  moveGroup(2, 5, membersOnlyPrimaryChildContainer);
  
  // Move the second group (h2, p, p, p) to the second destination container
  moveGroup(6, 9, membersOnlySecondaryChildContainer);
  
  
 
  