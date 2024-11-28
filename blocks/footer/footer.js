import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */

export default async function decorate(block) {

  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);

  const paras = document.querySelectorAll('.footer-wrapper p');
  const firstPara = paras[0];
  firstPara.classList.add('footer-logo');

  const lists = document.querySelectorAll(".footer-wrapper ul");
  const firstList = lists[0];
  const logoList = document.createElement("div");
    logoList.className = "logo-list";
    logoList.appendChild(firstPara);
    logoList.appendChild(firstList);
    const parent=document.querySelectorAll('.footer-wrapper');
    parent[0].querySelectorAll('.default-content-wrapper')[0].prepend(logoList);
   
   const socialLogos=document.querySelectorAll(".footer-wrapper picture");
   const socialLogosContainer = document.createElement("div");
   socialLogosContainer.classList.add('social-logos-container');
   socialLogosContainer.appendChild(socialLogos[1]);
   socialLogosContainer.appendChild(socialLogos[2]);
   socialLogosContainer.appendChild(socialLogos[3]);
   const parentCont=document.querySelectorAll('.footer-wrapper')[0].querySelectorAll('.default-content-wrapper')[0];


   const flexContainer = document.createElement("div");
   flexContainer.classList.add('flex-social-logo-container');
   flexContainer.appendChild(paras[1]);
   flexContainer.appendChild(socialLogosContainer);
   parentCont.insertBefore(flexContainer,parentCont.children[1]);

}


