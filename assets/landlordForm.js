const toggleMode = document.querySelector(".sidebar");

const hamburgerMode = document.getElementById("toggler");

hamburgerMode.addEventListener("click", function(){
  if (toggleMode.style.left === "-500px"){
    toggleMode.style.left = "0px";
  } else {
    toggleMode.style.left = "-500px";
  }
});

