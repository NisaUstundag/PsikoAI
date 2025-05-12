// Hover Efekti
document.querySelectorAll(".hover-info").forEach(info => {
  info.style.maxHeight = "0";
  info.style.opacity = "0";
  info.style.overflow = "hidden";
  info.style.transition = "max-height 0.5s ease, opacity 0.5s ease";
});

document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("mouseenter", () => toggleHoverInfo(button, true));
  button.addEventListener("mouseleave", () => toggleHoverInfo(button, false));
});

function toggleHoverInfo(button, isVisible) {
  const hoverInfo = button.nextElementSibling; 
  if (hoverInfo) {
    hoverInfo.style.maxHeight = isVisible ? "500px" : "0";
    hoverInfo.style.opacity = isVisible ? "1" : "0";
  }
}

// Hamburger Menü Açma-Kapatma
const menuButton = document.querySelector("#menu-btn");
const navbar = document.querySelector(".header .navbar");

if (menuButton && navbar) {
  menuButton.addEventListener("click", () => {
    navbar.classList.toggle("active"); 
  });
}
