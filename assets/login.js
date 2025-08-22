// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// 🔹 Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAbl6EegtrvgIkoeNiJeC0H6s0LCHLbaHs",
  authDomain: "ecoba-e887f.firebase.com",
  projectId:  "ecoba-e887f",
  storageBucket:  "ecoba-e887f.firebasestorage.app",
  messagingSenderId:  "92601323665",
  appId: "1:92601323665:web:cbf1d2da570eb90237af30"
};













// variables //
const loginSection = document.querySelector(".login-form");
const registerSection = document.querySelector(".register-form");

// get id to connect //
const loginTabBtn = document.querySelector("#changeBackgroundColorLogin");
const registerTabBtn = document.querySelector("#changeBackgroundColorRegister");


// let create the function //
loginTabBtn.addEventListener("click", () => {
  loginTabBtn.style.backgroundColor = "#21264D";
  registerTabBtn.style.backgroundColor = "rgba(255,255,255,0.3)";


  loginSection.style.left = "50%";
  registerSection.style.left = "-50%";

  loginSection.style.opacity = 1;
  registerSection.style.opacity = 0;

  document.querySelector(".col-1").style.borderRadius = "0 20% 23% 0";
});


registerTabBtn.addEventListener("click", () => {
  registerTabBtn.style.backgroundColor = "#21264D";
  loginTabBtn.style.backgroundColor = "rgba(255,255,255,0.3)";


  loginSection.style.left = "150%";
  registerSection.style.left = "50%";


  loginSection.style.opacity = 0;
  registerSection.style.opacity = 1;

  document.querySelector(".col-1").style.borderRadius = "0 23% 20% 0";
});











// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔹 Get elements for Firebase Auth
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginBtn = document.getElementById("SubmitLoginBtn");

const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const registerBtn = document.getElementById("SubmitRegisterBtn");

// 🔹 Login
if (loginBtn) {
  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value);
      alert("✅ Logged in successfully!");
        window.location.href = "index.html";
    } catch (error) {
      alert("❌ " + error.message);
    }
  });
}

// 🔹 Register
if (registerBtn) {
  registerBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, registerEmail.value, registerPassword.value);
      alert("🎉 Account created successfully!");
    } catch (error) {
      alert("❌ " + error.message);
    }
  });
}








