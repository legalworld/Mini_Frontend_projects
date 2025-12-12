const slider = document.querySelector(".slider");
const dotsContainer = document.querySelector(".dots-container");

async function fetchListOfImages() {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=1&limit=10"
    );

    const imagesList = await response.json();

    if (imagesList && imagesList.length > 0) {
      displayImages(imagesList);
      initSlider();  // ✅ initialize slider only after images are added
    }
  } catch (error) {
    console.log(error);
  }
}

function displayImages(getImagesList) {
  slider.innerHTML = getImagesList
    .map(
      (item) => `
      <div class="slide">
        <img src="${item.download_url}" alt="${item.id}" />
      </div>
    `
    )
    .join("");

  dotsContainer.innerHTML = getImagesList
    .map(
      (item, index) => `
      <span class="dot ${index === 0 ? "active" : ""}" data-slide="${index}"></span>
    `
    )
    .join("");
}

// --------------------------------------------------
//   SLIDER FUNCTIONALITY (fixed version)
// --------------------------------------------------

function initSlider() {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentSlide = 0;

  function activeDot(slideIndex) {
    document.querySelectorAll(".dot").forEach((dot) => {
      dot.classList.remove("active");
    });

    document
      .querySelector(`.dot[data-slide="${slideIndex}"]`)
      .classList.add("active");
  }

  function changeCurrentSlide(slideIndex) {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - slideIndex)}%)`;
    });
  }

  // Initialize first position
  changeCurrentSlide(0);

  // Next button
  nextBtn.addEventListener("click", () => {
    currentSlide++;
    if (currentSlide > slides.length - 1) currentSlide = 0;

    changeCurrentSlide(currentSlide);
    activeDot(currentSlide);
  });

  // Prev button
  prevBtn.addEventListener("click", () => {
    currentSlide--;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    changeCurrentSlide(currentSlide);
    activeDot(currentSlide);
  });

  // Dots click
  dotsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("dot")) {
      currentSlide = Number(event.target.dataset.slide);  // ✅ FIXED
      changeCurrentSlide(currentSlide);
      activeDot(currentSlide);
    }
  });
}

fetchListOfImages();
