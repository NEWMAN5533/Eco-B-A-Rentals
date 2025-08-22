
// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// 🔹 Your Firebase Config (replace with yours)
const firebaseConfig = {
  apiKey: "AIzaSyAbl6EegtrvgIkoeNiJeC0H6s0LCHLbaHs",
  authDomain: "ecoba-e887f.firebaseapp.com",
  projectId:  "ecoba-e887f",
  storageBucket:  "ecoba-e887f.firebasestorage.app",
  messagingSenderId:  "92601323665",
  appId: "1:92601323665:web:cbf1d2da570eb90237af30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔹 Get elements
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginSubmitBtn = document.getElementById("loginBtn");

const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const registerSubmitBtn = document.getElementById("registerBtn");

// 🔹 Login
if (loginSubmitBtn) {
  loginSubmitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value);
      alert("✅ Logged in successfully!");
      // Redirect if needed: window.location.href = "dashboard.html";
    } catch (error) {
      alert("❌ " + error.message);
    }
  });
}

// 🔹 Register
if (registerSubmitBtn) {
  registerSubmitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, registerEmail.value, registerPassword.value);
      alert("🎉 Account created successfully!");
    } catch (error) {
      alert("❌ " + error.message);
    };
  });
};

//  FORM LOGICS //
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");

const loginTabBtn = document.querySelector("#login");
const registerTabBtn = document.querySelector("#register");


// functions //
loginTabBtn.addEventListener("click", ()=> {
  loginTabBtn.style.backgroundColor = "#21264d";
  registerTabBtn.style.backgroundColor = "rgba(255,255,255,0.2)"

loginForm.style.left = "50%";
registerForm.style.left = "-50%";


loginForm.style.opacity = 0;
registerForm.style.opacity = 0;

document.querySelector(".col-1").style.borderRadius = " 0 23% 20% 0";
});


registerTabBtn.addEventListener("click", ()=> {
  loginTabBtn.style.backgroundColor = "rgba(255,255,255,0.2)";
  registerTabBtn.style.backgroundColor = "#21264D";



  loginForm.style.left = "150%";
registerForm.style.left = "50%";

loginForm.style.opacity = 0;
registerForm.style.opacity = 1;


document.querySelector(".col-1").style.borderRadius =  "0 20% 23% 0";
});
