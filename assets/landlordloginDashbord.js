import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, addDoc, collection } 
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { app } from "./firebase-config.js";

const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("propertyForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  if (!user) return alert("Please log in as landlord");

  const title = document.getElementById("title").value;
  const location = document.getElementById("location").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;

  await addDoc(collection(db, "properties"), {
    title, location, price, description,
    landlordId: user.uid,
    createdAt: new Date()
  });

  alert("Property added!");
});
