const quoteWrapper = document.querySelector(".quote-wrapper");
const refreshBtn = document.querySelector(".refresh-button");
const loaderText = document.querySelector(".loader");

function showLoader() {
  loaderText.classList.add("show");
  quoteWrapper.classList.add("hide");
}

function removeLoader() {
  loaderText.classList.remove("show");
  quoteWrapper.classList.remove("hide");
}

async function fetchRandomQuote() {
  showLoader();

  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    const result = await response.json();
    displayQuote(result);
  } catch (error) {
    console.log(error);
  } finally {
    removeLoader();
  }
}

function displayQuote(getQuote) {
  console.log(getQuote);
  quoteWrapper.innerHTML = `
  <div class="quote-item">
  <p>${getQuote.author}</p>
  <p>${getQuote.quote}</p>
  </div>
  `;
}

fetchRandomQuote();

refreshBtn.addEventListener("click", () => {
  fetchRandomQuote();
});
