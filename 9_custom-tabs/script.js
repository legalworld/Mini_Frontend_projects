const tabContainer = document.querySelector(".container");
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".content");

tabContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".tab-button");
  if (!button) return;

  const currentId = button.dataset.id;

  tabButtons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");

  tabContents.forEach((content) => content.classList.remove("active"));
  document.getElementById(currentId).classList.add("active");
});
