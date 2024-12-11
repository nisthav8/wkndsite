export default async function decorate(block) {

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
      // document.querySelectorAll('.articles-cards')[0].appendChild(container);
   
    });
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
  block.append(container);
}


