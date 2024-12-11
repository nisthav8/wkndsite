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
