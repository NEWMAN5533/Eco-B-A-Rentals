import { db, storage } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

const form = document.getElementById("propertyForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const location = document.getElementById("location").value;
  const imageFile = document.getElementById("propertyImage").files[0];

  if (!imageFile) {
    alert("Please select an image");
    return;
  }

  try {
    // 🔹 Upload image to Firebase Storage
    const storagePath = `propertyImages/${Date.now()}_${imageFile.name}`;
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, imageFile);

    const downloadURL = await getDownloadURL(storageRef);

    // 🔹 Save property details + image URL to Firestore
    await addDoc(collection(db, "properties"), {
      title,
      price,
      location,
      imageUrl: downloadURL,
      createdAt: new Date()
    });

    alert("✅ Property uploaded successfully!");
    form.reset();
  } catch (error) {
    console.error("❌ Error uploading property: ", error);
    alert("Error: " + error.message);
}
});
