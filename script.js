// Getting elements from DOM
const hamburgerBtn = document.querySelector(".logoAndTitle__hamburgerBtn");
const closeMenuBtn = document.querySelector(".hamburgerMenu__closeBtn");
const hamburgerMenu = document.querySelector(".hamburgerMenu");
const hamburgerMenuCont = document.querySelector(".hamburgerMenu__menuCont");

// Adding event listeners
hamburgerBtn.addEventListener("click", () => {
  setTimeout(() => {
    hamburgerMenuCont.classList.add("hamburgerMenu__menuCont--open");
  }, 130);
  hamburgerMenu.classList.add("hamburgerMenu--active");
  document.body.classList.add("body--openMenu")
});

closeMenuBtn.addEventListener("click", () => {
  hamburgerMenuCont.classList.remove("hamburgerMenu__menuCont--open");
  hamburgerMenu.classList.remove("hamburgerMenu--active");
  document.body.classList.remove("body--openMenu")
});