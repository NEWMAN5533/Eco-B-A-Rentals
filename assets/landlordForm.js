// landlordForm.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getFirestore, collection, addDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { 
  getStorage, ref, uploadBytes, getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// 🔹 Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAbl6EegtrvgIkoeNiJeC0H6s0LCHLbaHs",
  authDomain: "ecoba-e887f.firebase.com",
  projectId: "ecoba-e887f",
  storageBucket: "ecoba-e887f.firebasestorage.app",
  messagingSenderId: "92601323665",
  appId: "1:92601323665:web:cbf1d2da570eb90237af30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// 🔹 Handle form submission
document.getElementById("propertyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Collect form values
  const title = document.getElementById("title").value;
  const location = document.getElementById("location").value;
  const price = document.getElementById("price").value;
  const area = document.getElementById("area").value;
  const beds = document.getElementById("beds").value;
  const baths = document.getElementById("baths").value;
  const status = document.getElementById("status").value;
  const description = document.getElementById("description").value;
  const phone = document.getElementById("landlordPhone").value;
  const files = document.getElementById("images").files;

  // Upload up to 4 images
  let imageUrls = [];
  for (let i = 0; i < files.length && i < 4; i++) {
    const file = files[i];
    const storageRef = ref(storage, `propertyImages/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    imageUrls.push(url);
  }

  try {
    await addDoc(collection(db, "properties"), {
      title,
      location,
      price: `GH₵: ${price}/month`, // format like your schema
      area,
      beds,
      baths,
      status,
      description,
      phone,
      landlordId: "IqOjomJNRXJ3uZZeTG2I", // 🔹 Replace with actual auth.uid if using Auth
      images: imageUrls,
      createdAt: new Date().toISOString()
    });

    alert("✅ Property submitted successfully!");
    e.target.reset();
  } catch (err) {
    console.error("❌ Error adding document: ", err);
    alert("Error: " + err.message);
  }
});


// restricting over 4 images uploads //
const fileInput = document.getElementById("images");

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 4) {
    alert("You can only upload up to 4 images.");
    fileInput.value = ""; // reset input
  }
});




