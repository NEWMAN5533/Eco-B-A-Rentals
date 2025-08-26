import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
    import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";


// Your web app's Firebase configuration //

        const firebaseConfig = {
      apiKey: "AIzaSyAbl6EegtrvgIkoeNiJeC0H6s0LCHLbaHs",
      authDomain: "ecoba-e887f.firebase.com",
      projectId: "ecoba-e887f",
      storageBucket:  "ecoba-e887f.firebasestorage.app",
      messagingSenderId: "92601323665",
      appId: "1:92601323665:web:cbf1d2da570eb90237af30"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Load properties from Firestore
    async function loadProperties() {
      const querySnapshot = await getDocs(collection(db, "properties"));
      const container = document.querySelector("property-list");

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const card = document.createElement("div");
        card.classList.add("property-card");

        card.innerHTML = `
          <img src="${data.imageUrl}" alt="${data.title}" />
          <h3>${data.title}</h3>
          <p>Location: ${data.location}</p>
          <p>price: ${data.price}</p>
          <button onclick="viewDetails('${doc.id}')">View Details</button>
        `;

        //  Navigate to detail page on button click //
        function goToDetailPage() {
          localStorage.setItem("propertyId", doc.id);
          window.location.href = "detail.html";
        }

        // Click event for the button //
        card.addEventListener("click", (e) => {
          if (! e.target.classList.contains("view-detail")){
            goToDetailPage();
          }
        });

        card.querySelector(".view-detail").addEventListener("click", goToDetailPage);

        container.appendChild(card);
      });
    }

    loadProperties();

    // Save ID to localStorage and redirect
    window.viewDetails = function(id) {
      localStorage.setItem("propertyId", id);
      window.location.href = "detail.html";
    }






// STRICT //
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
);



// Select all view buttons
document.querySelectorAll(".View-detail").forEach(button => {
  button.addEventListener("click", (e) => {
    const card = e.target.closest(".card"); // find the parent card
    const propertyId = card.getAttribute("data-id"); // get property id

    // Save ID to localStorage
    localStorage.setItem("propertyId", propertyId);

    // Redirect to details page
    window.location.href = "detail.html";
});
});



















