// propertyDetail.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAbl6EegtrvgIkoeNiJeC0H6s0LCHLbaHs",
  authDomain: "ecoba-e887f.firebase.com",
  projectId:  "ecoba-e887f",
  storageBucket:  "ecoba-e887f.firebasestorage.app",
  messagingSenderId:  "92601323665",
  appId: "1:92601323665:web:cbf1d2da570eb90237af30"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Get property ID from URL
const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");

async function loadProperty() {
  if (!propertyId) {
    console.error("No property ID provided in URL.");
    return;
  }

  try {
    const docRef = doc(db, "properties", propertyId);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      console.error("❌ Property not found");
      return;
    }

    const data = snapshot.data();

    // 🔹 Populate property details
    document.getElementById("detail-title").textContent = data.title || "No title";
    document.getElementById("detail-price").textContent = data.price || "Price not available";
    document.getElementById("detail-location").textContent = data.location || "Unknown location";
    document.getElementById("detail-bed").textContent = (data.beds || 0) + " Beds";
    document.getElementById("detail-bath").textContent = (data.baths || 0) + " Baths";
    document.getElementById("detail-size").textContent = (data.area || 0) + " sqft";

    // 🔹 Handle images (carousel)
    const carousel = document.getElementById("detail-carousel");
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");

    let index = 0;
    const images = data.images || [];
    
    function renderImages() {
      // remove old images
      carousel.querySelectorAll("img").forEach(img => img.remove());

      images.forEach((src, i) => {
        const img = document.createElement("img");
        img.src = src;
        img.style.display = (i === 0) ? "block" : "none";
        img.style.width = "100%";
        img.style.height = "400px";
        img.style.objectFit = "cover";
        carousel.insertBefore(img, prevBtn);
      });
    }

    function showImage(i) {
      const imgs = carousel.querySelectorAll("img");
      imgs.forEach(img => img.style.display = "none");
      imgs[i].style.display = "block";
    }

    prevBtn.addEventListener("click", () => {
      index = (index - 1 + images.length) % images.length;
      showImage(index);
    });

    nextBtn.addEventListener("click", () => {
      index = (index + 1) % images.length;
      showImage(index);
    });

    renderImages();

  } catch (err) {
    console.error("Error loading property:", err);
  }
}

loadProperty();
