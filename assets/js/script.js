import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAbl6EegtrvgIkoeNiJeC0H6s0LCHLbaHs",
  authDomain: "ecoba-e887f.firebase.com",
  projectId: "ecoba-e887f",
  storageBucket: "ecoba-e887f.firebasestorage.app",
  messagingSenderId: "92601323665",
  appId: "1:92601323665:web:cbf1d2da570eb90237af30"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load properties from Firestore
async function loadProperties() {
  const querySnapshot = await getDocs(collection(db, "properties"));
  const container = document.querySelector("#property-list"); 

  container.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const images = data.images || [];

    const card = document.createElement("div");
    card.classList.add("property-card");

    // Carousel HTML
    let carousel = `
      <div class="carousel">
        ${images.map((url, i) => `
          <img src="${url}" class="${i === 0 ? "active" : ""}" alt="Property image" />
        `).join("")}
        <button class="prev">‹</button>
        <button class="next">›</button>
      </div>
    `;

    // Card inner content
    card.innerHTML = `
      ${carousel}
      <h3>${data.title}</h3>
      <p>Location: ${data.location}</p>
      <p>Price: ${data.price}</p>
      <button class="view-detail">View Details</button>
    `;

    // ✅ Button to go to details
    card.querySelector(".view-detail").addEventListener("click", () => {
      // Option 1: Use localStorage
      localStorage.setItem("propertyId", doc.id);
      window.location.href = "productDetailPage.html";

      // OR Option 2: Pass via URL
      // window.location.href = `productDetailPage.html?id=${doc.id}`;
    });

    container.appendChild(card);

    // Carousel logic
    const imgs = card.querySelectorAll("img");
    const prevBtn = card.querySelector(".prev");
    const nextBtn = card.querySelector(".next");
    let index = 0;

    function showImage(i) {
      imgs.forEach(img => img.classList.remove("active"));
      imgs[i].classList.add("active");
    }

    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      index = (index - 1 + imgs.length) % imgs.length;
      showImage(index);
    });

    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      index = (index + 1) % imgs.length;
      showImage(index);
    });
  });
}

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


// Carousel logic for each card
document.querySelectorAll(".carousel").forEach(carousel => {
  const images = carousel.querySelectorAll("img");
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  let index = 0;

  function showImage(i) {
    images.forEach(img => img.classList.remove("active"));
    images[i].classList.add("active");
  }

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    showImage(index);
  });

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % images.length;
    showImage(index);
  });

  // Auto-slide (optional)
  setInterval(() => {
    index = (index + 1) % images.length;
    showImage(index);
  }, 10000); // every 3s
});

















