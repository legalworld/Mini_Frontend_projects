const openModalBtn = document.querySelector(".openModal");
const modalBackground = document.querySelector(".modal-background");
const closeIcon = document.querySelector(".close-icon");
const closeBtn = document.querySelector(".close");

openModalBtn.addEventListener("click", () => {
  modalBackground.style.display = "block";
});

closeIcon.addEventListener("click", () => {
  modalBackground.style.display = "none";
});

closeBtn.addEventListener("click", () => {
  modalBackground.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modalBackground) {
    modalBackground.style.display = "none";
  }
});
