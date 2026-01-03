const progress = document.querySelector(".progress");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const iconsWrapper = document.querySelectorAll(".icon-wrapper");

let currentSelectedStep = 1;

nextBtn.addEventListener("click", () => {
  if (currentSelectedStep < iconsWrapper.length) {
    currentSelectedStep++; // increment current step
  }

  // update UI based on current step
  handleUpdateStep();
});

prevBtn.addEventListener("click", () => {
  if (currentSelectedStep > 1) {
    currentSelectedStep--; // decrement current step
  }

  // calling helper method
  handleUpdateStep();
});

// handle update step for UI (helper method)
function handleUpdateStep() {
  iconsWrapper.forEach((item, index) => {
    if (index < currentSelectedStep) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  progress.style.width =
    ((currentSelectedStep - 1) / (iconsWrapper.length - 1)) * 100 + "%"; // progress bar UI width calculation

  if (currentSelectedStep === 1) {
    prevBtn.disabled = true;
  } else if (currentSelectedStep === iconsWrapper.length) {
    nextBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }
}
