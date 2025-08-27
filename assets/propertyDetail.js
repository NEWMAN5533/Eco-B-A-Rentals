// Get URL params
const urlParams = new URLSearchParams(window.location.search);

document.getElementById("detail-title").innerText = urlParams.get("title");
document.getElementById("detail-price").innerText = "GH₵: " + urlParams.get("price");
document.getElementById("detail-location").innerText = urlParams.get("location");
document.getElementById("detail-bed").innerText = urlParams.get("bed") + " Beds";
document.getElementById("detail-bath").innerText = urlParams.get("bath") + " Baths";
document.getElementById("detail-size").innerText = urlParams.get("size");

// Handle carousel images
const imgList = urlParams.get("imgs").split(",");
const carousel = document.getElementById("detail-carousel");
let index = 0;

// Insert images dynamically
imgList.forEach((src, i) => {
  const img = document.createElement("img");
  img.src = src;
  if (i === 0) img.classList.add("active");
  carousel.appendChild(img);
});

// Select images + nav buttons
const images = carousel.querySelectorAll("img");
const prevBtn = carousel.querySelector(".prev");
const nextBtn = carousel.querySelector(".next");

function showImage(i) {
  images.forEach(img => img.classList.remove("active"));
  images[i].classList.add("active");
}

// Navigation
prevBtn.addEventListener("click", () => {
  index = (index - 1 + images.length) % images.length;
  showImage(index);
});

nextBtn.addEventListener("click", () => {
  index = (index + 1) % images.length;
  showImage(index);
});

// Optional auto-slide
setInterval(() => {
  index = (index + 1) % images.length;
  showImage(index);
}, 8000);
