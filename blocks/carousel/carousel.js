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

// Create the next button
const nextButton = document.createElement('button');
nextButton.classList.add('carousel-control', 'next');
nextButton.innerHTML = '&#8594;';

const dotsContainer = document.createElement('div');
dotsContainer.classList.add('carousel-dots');

// Create individual dots
for (let i = 0; i < 3; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) {
    dot.classList.add('active'); // Make the first dot active by default
  }
  // Add click event to each dot to go to a specific slide
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}


let currentIndex = 0;
const slides = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".dot");

// Function to show the slide


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

// Next slide function
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

// Previous slide function
function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

// Jump to specific slide
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
    // Fetch titles and descriptions from data1.json
    const response1 = await fetch("http://localhost:3000/data.json");
    if (!response1.ok) {
      throw new Error(`Error fetching data1.json: ${response1.status}`);
    }
    const titlesAndDescriptions = await response1.json();

    // Fetch paths from data2.json
    const response2 = await fetch("http://localhost:3000/query-index.json");
    if (!response2.ok) {
      throw new Error(`Error fetching data2.json: ${response2.status}`);
    }
    const paths = await response2.json();

    // Custom order for reordering paths
    const customOrder = [3, 2, 0, 1];

    // Convert paths.data to an array and reorder using custom indices
    const pathsArray = Object.entries(paths.data);
    const reorderedPaths = customOrder.map(index => pathsArray[index]);

    // Combine the reordered paths with titlesAndDescriptions
    const combinedData = reorderedPaths.map(([key, pathData]) => {
      const titleDescription = titlesAndDescriptions.data[key] || { title: "Untitled", description: "No description", image: "" };
      return {
        ...titleDescription,
        path: pathData.path || "#", // Use the path from reorderedPaths
      };
    });

    // Create container dynamically
    const container = document.createElement("div");
    container.className = "card-container";

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
    });

    // Append container to the specific section
    document.querySelectorAll(".section:nth-of-type(3)")[0].appendChild(container);
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}


// Call the function
fetchAndDisplayCards();




async function fetchAndDisplayTripsCards() {
  try {
    // Fetch titles and descriptions from data1.json
    const response1 = await fetch("http://localhost:3000/trips.json");
    if (!response1.ok) {
      throw new Error(`Error fetching data1.json: ${response1.status}`);
    }
    const titlesAndDescriptions = await response1.json();

    const combinedData = [];
    // Combine the reordered paths with titlesAndDescriptions
    for (const [key, titleDescription] of Object.entries(titlesAndDescriptions.data)) {
    
    
      // Combine the title/description with the path and push to the combinedData array
      combinedData.push ({
        ...titleDescription
      });
    }
    // Create container dynamically
    const container = document.createElement("div");
    container.className = "card-container";

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
      // card.addEventListener("click", () => {
      //   window.location.href = item.path;
      // });

      // Append card to the container
      container.appendChild(card);
    });

    // Append container to the specific section
    document.querySelectorAll(".section:nth-of-type(6)")[0].appendChild(container);
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}


// Call the function
fetchAndDisplayTripsCards();