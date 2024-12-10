const carouselItem=document.querySelectorAll('.carousel > div');
carouselItem.forEach(child => {
  child.classList.add('carousel-item');
  


  const innerChild = child.querySelectorAll('div');
  

    innerChild[0].classList.add('carousel-image');
     innerChild[1].classList.add('carousel-text')

});
carouselItem[0].classList.add('active');

const prevButton = document.createElement('button');
prevButton.classList.add('carousel-control', 'prev');
prevButton.innerHTML = '&#8592;';


const nextButton = document.createElement('button');
nextButton.classList.add('carousel-control', 'next');
nextButton.innerHTML = '&#8594;';

const dotsContainer = document.createElement('div');
dotsContainer.classList.add('carousel-dots');


for (let i = 0; i < 3; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) {
    dot.classList.add('active');
  }
 
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}


let currentIndex = 0;
const slides = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".dot");



const flexContainer=document.createElement('div');
flexContainer.classList.add('flex-container');


const flexChildContainer=document.createElement('div');
flexChildContainer.classList.add('flex-child-container');

flexChildContainer.appendChild(prevButton);
flexChildContainer.appendChild(nextButton);


const carouselContainer=document.querySelectorAll('.carousel-wrapper')[0] ;
carouselContainer.appendChild(flexContainer);
flexContainer.appendChild(flexChildContainer);
flexContainer.appendChild(dotsContainer);



prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}


function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}


function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}


function goToSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
}



/* new code */
const featuredArticleContainer = document.querySelectorAll('.section:nth-of-type(2) .default-content-wrapper');
featuredArticleContainer[0].classList.add('flex-parent-container');
const primaryChildContainer = document.createElement('div');
const secondaryChildContainer = document.createElement('div');
primaryChildContainer.classList.add('primary-container');
secondaryChildContainer.classList.add('secondary-container');

if (featuredArticleContainer[0].lastChild) {
  secondaryChildContainer.appendChild(featuredArticleContainer[0].lastChild);
}

while (featuredArticleContainer[0].firstChild) {
  primaryChildContainer.appendChild(featuredArticleContainer[0].firstChild);
}


featuredArticleContainer[0].insertBefore(secondaryChildContainer,featuredArticleContainer[0].firstChild);
featuredArticleContainer[0].insertBefore(primaryChildContainer,secondaryChildContainer);
      


async function fetchAndDisplayCards() {
  try {
    
    const response1 = await fetch("https://main--wkndsite--nisthav8.aem.page/data.json");
    if (!response1.ok) {
      throw new Error(`Error fetching data1.json: ${response1.status}`);
    }
    const titlesAndDescriptions = await response1.json();

    
    const response2 = await fetch("https://main--wkndsite--nisthav8.aem.page/query-index.json");
    if (!response2.ok) {
      throw new Error(`Error fetching data2.json: ${response2.status}`);
    }
    const paths = await response2.json();

    
    const customOrder = [3, 2, 0, 1];

  
    const pathsArray = Object.entries(paths.data);
    const reorderedPaths = customOrder.map(index => pathsArray[index]);

   
    const combinedData = reorderedPaths.map(([key, pathData]) => {
      const titleDescription = titlesAndDescriptions.data[key] || { title: "Untitled", description: "No description", image: "" };
      return {
        ...titleDescription,
        path: pathData.path || "#",
      };
    });

  
    const container = document.createElement("div");
    container.className = "card-container";

  
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
    });

   
    document.querySelectorAll(".section:nth-of-type(3)")[0].appendChild(container);
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}


fetchAndDisplayCards();




async function fetchAndDisplayTripsCards() {
  try {
   
    const response1 = await fetch("https://main--wkndsite--nisthav8.aem.page/trips.json");
    if (!response1.ok) {
      throw new Error(`Error fetching data1.json: ${response1.status}`);
    }
    const titlesAndDescriptions = await response1.json();

    const combinedData = [];
    
    for (const [key, titleDescription] of Object.entries(titlesAndDescriptions.data)) {
    
    
      
      combinedData.push ({
        ...titleDescription
      });
    }
   
    const container = document.createElement("div");
    container.className = "card-container";

   
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

      
      container.appendChild(card);
    });

   
    document.querySelectorAll(".section:nth-of-type(6)")[0].appendChild(container);
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}



fetchAndDisplayTripsCards();