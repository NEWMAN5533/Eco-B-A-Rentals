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

















