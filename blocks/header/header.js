import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    navDrops.forEach((drop) => {
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }

  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
    // collapse menu on focus lost
    nav.addEventListener('focusout', closeOnFocusLost);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
    nav.removeEventListener('focusout', closeOnFocusLost);
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      if (navSection.querySelector('ul')) navSection.classList.add('nav-drop');
      navSection.addEventListener('click', () => {
        if (isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
      });
    });
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
    // <img src="https://cdn-icons-png.flaticon.com/128/9091/9091429.png"></img>
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  // prevent mobile nav behavior on window resize
  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}


// Create a style tag for CSS
const style = document.createElement("style");
style.textContent = `
  .search-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 20px;
    width:auto; /* Adjust width as needed */
   background-color: #ebebeb8a;
    z-index:10;
    position:fixed;
     margin-right:24px;
     right:5px;
      top:22px;
      font-size:14px;
      max-width:10rem;
      box-sizing: border-box;
  }
      
   .search-container:focus-within{
   background-color:white;
 border: 1px solid black;
}
  .search-icon {
    background-color:#ebebeb8a;
    padding: 8px 0px 8px 3px;
    box-sizing: border-box;
    
     z-index:11;
  }
  .search-input {
  box-sizing:border-box;
    padding: 8px;
    border:none;
    flex: 1;
  outline: none;
     z-index:10;
    //  width:2%;
     background-color:#ebebeb8a;
     max-width:8rem;
      box-sizing: border-box;
  }
       .clear-icon {
    
    cursor: pointer;
    z-index:11;
    margin-right:4px;
    color: black;
    width:30px;
font-size:20px;
 box-sizing: border-box;
    display: none; /* Hidden by default */
  }
  
`;
document.head.appendChild(style);

// Create search container dynamically
const searchContainer = document.createElement("div");
searchContainer.className = "search-container";

// Create search icon
const searchIcon = document.createElement("div");
searchIcon.className = "search-icon";
searchIcon.innerHTML = "&#x1F50E;&#xFE0E;";

// Create search input
const input = document.createElement("input");
input.type = "text";
input.placeholder = "SEARCH";
input.className = "search-input";


// Create clear icon
const clearIcon = document.createElement("span");
clearIcon.className = "clear-icon";
clearIcon.innerHTML = "✖"; // Cross symbol

// Show or hide the clear icon based on input value
input.addEventListener("input", function () {
  clearIcon.style.display = input.value ? "block" : "none";
  if(clearIcon.style.display==="block")
  input.style.maxWidth="5.9rem";

});

// Clear the input field when clear icon is clicked
clearIcon.addEventListener("click", function () {
  input.value = "";
  clearIcon.style.display = "none";
  input.focus(); // Focus back on the input
  input.style.maxWidth="8rem";
});

// Add functionality to redirect to Google on pressing Enter
function handleSearch() {
  const query = input.value.trim();
  if (query) {
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  } 
}

// Add keydown event listener for the input field
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleSearch(); // Call the function to handle the search
  }
});

// Add click event listener for the search icon
searchIcon.addEventListener("click", handleSearch);

// Append elements to the search container and then to the body
searchContainer.appendChild(searchIcon);

searchContainer.appendChild(input);
searchContainer.appendChild(clearIcon);
const navTools=document.querySelector('header');
navTools.appendChild(searchContainer);

input.addEventListener('click', function () {
  // Change the background color of container2
  input.style.backgroundColor = 'white';
  searchIcon.style.backgroundColor = 'white';
   // Change color (you can use any color)
});

document.addEventListener('click', function (event) {
  if (!searchContainer.contains(event.target)) {
    input.style.backgroundColor = '';  // Reset to default color
    searchIcon.style.backgroundColor = ''; // Reset to default color
  }
});



const header = document.querySelector('.header-wrapper');

// Listen to the scroll event
window.addEventListener('scroll', function () {
  if (window.scrollY >0) {  // Trigger when scrolled more than 20px
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

function openNav() {
  document.querySelectorAll("header nav .nav-sections ul")[0].style.width = "250px";
  // document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}
searchIcon.addEventListener("click",openNav);