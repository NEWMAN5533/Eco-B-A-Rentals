// index.js - Homepage (Fetch & Display Properties)

// index.js - Homepage (Fetch & Display Properties)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAbl6EegtrvgIkoeNiJeC0H6s0LCHLbaHs",
  authDomain: "ecoba-e887f.firebaseapp.com",
  projectId: "ecoba-e887f",
  storageBucket: "ecoba-e887f.appspot.com",
  messagingSenderId: "92601323665",
  appId: "1:92601323665:web:cbf1d2da570eb90237af30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Grab container
const propertyContainer = document.getElementById("property-container");

// Function to render property cards
async function loadProperties() {
  const querySnapshot = await getDocs(collection(db, "properties"));
  
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const images = data.images || [];

    // Create card
    const card = document.createElement("div");
    card.classList.add("property-card");

    // ✅ Create carousel with multiple images
    let carouselHTML = `
      <div class="carousel">
        ${images.map((img, index) => `
          <img src="${img}" alt="${data.title}" class="${index === 0 ? "active" : ""}">
        `).join("")}
        ${images.length > 1 ? `
          <button class="prev">❮</button>
          <button class="next">❯</button>
        ` : ""}
      </div>
    `;

    card.innerHTML = `
      <div class="card-banner">
        ${carouselHTML}
      </div>

      <div class="card-content">
        <h3 class="h3 card-title">${data.title}</h3>
        <p class="card-text">${data.description}</p>

        <ul class="card-meta-list">
          <li class="card-meta-item"><span>${data.beds || 0} Beds</span></li>
          <li class="card-meta-item"><span>${data.baths || 0} Baths</span></li>
          <li class="card-meta-item"><span>${data.area || 0} sqft</span></li>
        </ul>

        <div class="card-footer">
          <p class="card-author">📍 ${data.location}</p>
          <p class="card-price">${data.price}</p>
        </div>

        <button class="View-detail"
          data-title="${data.title}"
          data-price="${data.price}"
          data-location="${data.location}"
          data-bed="${data.beds || 0}"
          data-bath="${data.baths || 0}"
          data-size="${data.area || 0}"
          data-imgs='${JSON.stringify(images)}'
          data-sale="${data.sale || ""}"
          data-rent="${data.rent || ""}"
          data-posted="${data.posted || ""}"
        >View Details</button>
      </div>
    `;

    // Append card to container
    propertyContainer.appendChild(card);

    // ✅ Setup carousel for this card
    const carousel = card.querySelector(".carousel");
    if (carousel) {
      const imgs = carousel.querySelectorAll("img");
      const prevBtn = carousel.querySelector(".prev");
      const nextBtn = carousel.querySelector(".next");
      let index = 0;

      function showImage(i) {
        imgs.forEach(img => img.classList.remove("active"));
        imgs[i].classList.add("active");
      }

      if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
          index = (index - 1 + imgs.length) % imgs.length;
          showImage(index);
        });

        nextBtn.addEventListener("click", () => {
          index = (index + 1) % imgs.length;
          showImage(index);
        });
      }

      // Auto-slide every 5s
      setInterval(() => {
        index = (index + 1) % imgs.length;
        showImage(index);
      }, 5000);
    }

    // ✅ View Detail click event
    const viewBtn = card.querySelector(".View-detail");
    viewBtn.addEventListener("click", () => {
      const params = new URLSearchParams({
        title: data.title,
        price: data.price,
        location: data.location,
        bed: data.beds || 0,
        bath: data.baths || 0,
        size: data.area || 0,
        imgs: JSON.stringify(images),
        sale: data.sale || "",
        rent: data.rent || "",
        posted: data.posted || ""
      });
      window.location.href = `productDetailPage.html?${params.toString()}`;
    });
  });
}

// Load on page start
loadProperties();


// STRICT //
'use strict';

/**
 * navbar toggle in mobile
 */
const $navbar = document.querySelector("[data-navbar]");
const $navbarToggler = document.querySelector("[data-nav-toggler]");

$navbarToggler.addEventListener("click", () => {
  $navbar.classList.add("active");
});

// to remove the navbar when clicked outside //
window.addEventListener("click", function (e) {
  // ✅ check if click is outside BOTH navbar and toggle button
  if (!$navbar.contains(e.target) && !$navbarToggler.contains(e.target)) {
    $navbar.classList.remove("active"); // better to toggle class instead of display:none
  }
});

/**
 * Header scroll state
 */
const $header = document.querySelector("[data-header]");
window.addEventListener("scroll", () =>
  $header.classList[window.scrollY > 50 ? "add" : "remove"]("active")
);

/**
 * ADDING TOGGLE MODE TO FAVORITE BTN 
 */
const $favoriteBtn = document.querySelectorAll("[favorite-data-btn]");

$favoriteBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active"); // use toggle instead of add (so it can un-favorite too)
  });
});




// Select all view buttons
document.querySelectorAll(".View-detail").forEach(btn => {
  btn.addEventListener("click", () => {
    const title = btn.dataset.title;
    const price = btn.dataset.price;
    const sale = btn.dataset.sale;
    const rent = btn.dataset.rent;
    const posted = btn.dataset.posted;
    const location = btn.dataset.location;
    const bed = btn.dataset.bed;
    const imgs = btn.dataset.imgs;
    const size = btn.dataset.size;
    const  bath = btn.dataset.bath;

     // Redirect to details page with URL params
    window.location.href = `productDetailPage.html?title=${encodeURIComponent(title)}&price= ${encodeURIComponent(price)}&location=${encodeURIComponent(location)}&bed=${bed}&bath=${bath}&size=${size}&imgs=${imgs}&sale=${sale}&rent=${rent}&posted=${posted}`;
  } )
})

















