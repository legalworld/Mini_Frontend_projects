const imageWrapper = document.querySelector(".images-wrapper");
const loadMoreImagesBtn = document.querySelector(".load-more-images");
let count = 1;

function fetchRandomImages() {
  for (let i = count; i < count + 5; i++) {
    const img = document.createElement("img");
    img.src = `https://picsum.photos/300?random=${i}`;
    imageWrapper.appendChild(img);
  }
  count += 5;
}

fetchRandomImages();

loadMoreImagesBtn.addEventListener("click", fetchRandomImages);
