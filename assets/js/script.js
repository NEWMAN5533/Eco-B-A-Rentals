'use strict';

/**
 * navbar toggle in mobile
 */

const /** {nodeElement} */ $navbar = document.querySelector("[data-navbar]");
const /** {nodeElement} */ $navbarToggler = document.querySelector("[data-nav-toggler]");

$navbarToggler.addEventListener("click", ()=> $navbar.classList.add("active"));

/**
 * Header scroll state
 */

const /** {NodeElement} */ $header = document.querySelector("[data-header]");
/**
 * Header scroll state
 */
window.addEventListener("scroll", (e)=>
$header.classList[window.scrollY > 50 ? "add" : "remove"]("active"));



/**
 * ADDING TOGGLE MODE TO FAVORITE BTN 
 */

const /** {NodeList} */ $favoriteBtn = document.querySelectorAll("[favorite-data-btn]");

$favoriteBtn.forEach($favoriteBtn => {
  $favoriteBtn.addEventListener("click" , () => {
    $favoriteBtn.classList.add("active");
  })
}
)