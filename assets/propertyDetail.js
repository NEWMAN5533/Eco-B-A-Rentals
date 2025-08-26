 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
    import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

    // ✅ Your Firebase config here
    const firebaseConfig = {
      apiKey: "AIzaSyAbl6EegtrvgIkoeNiJeC0H6s0LCHLbaHs",
      authDomain:  "ecoba-e887f.firebase.com",
      projectId: "ecoba-e887f",
      storageBucket: "ecoba-e887f.firebasestorage.app",
      messagingSenderId: "92601323665",
      appId: "1:92601323665:web:cbf1d2da570eb90237af30"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // ✅ Get propertyId from localStorage
    const propertyId = localStorage.getItem("propertyId");

    // ✅ Fetch property details
    async function loadProperty() {
      if (!propertyId) {
        document.getElementById("property-details").innerHTML = "<p>No property selected.</p>";
        return;
      }

      const docRef = doc(db, "properties", propertyId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        document.getElementById("property-details").innerHTML = `
          <img src="${data.imageUrl}" alt="${data.title}" width="300">
          <h2>${data.title}</h2>
          <p><strong>Location:</strong> ${data.location}</p>
          <p><strong>Price:</strong> ${data.price}</p>
          <p><strong>Description:</strong> ${data.description || "No description available"}</p>
          <input type="text" id="chatMessage" placeholder="Type your message to landlord...">
          <button id="startChat">Start Chat on WhatsApp</button>
          <button id="callLandlord">Call Landlord</button>
        `;

        // ✅ WhatsApp button
        document.getElementById("startChat").addEventListener("click", () => {
          const message = document.getElementById("chatMessage").value;
          const phone = data.landlordPhone; // must exist in Firestone
          const url = `https://wa.me/${233535565637}?text=${encodeURIComponent(message)}`;
          window.open(url, "_blank");
        });

        // ✅ Call button
        document.getElementById("callLandlord").addEventListener("click", () => {
          const phone = data.landlordPhone; // must exist in Firestone
          window.location.href = `tel:${phone}`;
        });

      } else {
        document.getElementById("property-details").innerHTML = "<p>Property not found.</p>";
      }
    }

    loadProperty();


// Note: Ensure that each property document in Firestone has a 'landlordPhone' field for the call and WhatsApp functionality to work. //
// Duplicate propertyId declaration removed to prevent redeclaration error.