const stars = document.querySelectorAll(".star");
const output = document.querySelector(".output");

let currentRating = 0;

stars.forEach((star) => {
  star.addEventListener("click", () => {
    currentRating = star.dataset.value;
    updateStars(currentRating);
    output.textContent = `Rating: ${currentRating}`;
  });

  star.addEventListener("mouseover", () => {
    updateStars(star.dataset.value);
  });

  star.addEventListener("mouseleave", () => {
    updateStars(currentRating);
  });
});

function updateStars(rating) {
  stars.forEach((star) => {
    if (star.dataset.value <= rating) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
}
