// DOM Elements
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const mealsContainer = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const errorContainer = document.getElementById("error-container");
const mealDetails = document.getElementById("meal-details");
const mealDetailsContent = document.querySelector(".meal-details-content");
const backBtn = document.getElementById("back-btn");

// URLS
const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";
const SEARCH_URL = `${BASE_URL}search.php?s=`;
const LOOKUP_URL = `${BASE_URL}lookup.php?i=`;

// #############################################################################################

// search button click event...
searchBtn.addEventListener("click", searchMeals);

//input field Enter press event...
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") searchMeals();
});

// ################################################################################################

// ***************************************************************************************************

// ###############################################################################################

// card container click event...
mealsContainer.addEventListener("click", handleMealClick);

// back Button click event...
backBtn.addEventListener("click", () => mealDetails.classList.add("hidden"));

// #################################################################################################

// getting data from API...
async function searchMeals() {
  const searchTerm = searchInput.value.trim();

  // handling the edge case...
  if (!searchTerm) {
    errorContainer.textContent = "Please Enter a search term";
    errorContainer.classList.remove("hidden");
    return;
  }

  try {
    resultHeading.textContent = `searching for "${searchTerm}"...`;
    mealsContainer.innerHTML = "";
    errorContainer.classList.add("hidden");

    // fetch meals from api...
    const response = await fetch(`${SEARCH_URL}${searchTerm}`, {
      method: "GET",
    });
    const data = await response.json();

    //-------------------------------------------------------------
    // debug code...
    // console.log("data is here", data);
    // -------------------------------------------------------

    if (data.meals === null) {
      // in if case no meals found...

      resultHeading.textContent = ``;
      mealsContainer.innerHTML = "";
      errorContainer.textContent = `No recipes found for "${searchTerm}". try another search term!`;
      errorContainer.classList.remove("hidden");
    } else {
      // meals found update the UI
      resultHeading.textContent = `search results for "${searchTerm}":`;

      //display the meals...
      displayMeals(data.meals);

      searchInput.value = "";
    }
  } catch (error) {
    errorContainer.textContent =
      "Something went wrong. please try again later.";
    errorContainer.classList.remove("hidden");
  }
}

// rendering data on DOM...
function displayMeals(meals) {
  // Reset container initially ...
  mealsContainer.innerHTML = "";

  // loop through meals and create a card for each meal
  meals.forEach((meal) => {
    mealsContainer.innerHTML += `
      <div class="meal" data-meal-id="${meal.idMeal}">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="meal-info">
          <h3 class="meal-title">${meal.strMeal}</h3>
          ${
            meal.strCategory
              ? `<div class="meal-category">${meal.strCategory}</div>`
              : ""
          }
        </div>
      </div>
    `;
  });
}

// details about specific card...
async function handleMealClick(event) {
  const mealEl = event.target.closest(".meal");
  if (!mealEl) return;
  const mealId = mealEl.getAttribute("data-meal-id");

  try {
    const response = await fetch(`${LOOKUP_URL}${mealId}`, {
      method: "GET",
    });

    const data = await response.json();

    // --------------------------------------
    // debug code
    // console.log(data);
    // -------------------------------

    if (data.meals && data.meals[0]) {
      const meal = data.meals[0];

      const ingredients = [];

      for (let i = 1; i <= 20; i++) {
        if (
          meal[`strIngredient${i}`] &&
          meal[`strIngredient${i}`].trim() !== ""
        ) {
          ingredients.push({
            ingredient: meal[`strIngredient${i}`],
            measure: meal[`strMeasure${i}`],
          });
        }
      }

      // Display meal details on UI / DOM ...
      mealDetailsContent.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${
        meal.strMeal
      }" class="meal-details-img">
        <h2 class="meal-details-title">${meal.strMeal}</h2>
        <div class="meal-details-category">
          <span>${meal.strCategory || "Uncategorized"}</span>
        </div>
        <div class="meal-details-instructions">
          <h3>Instructions</h3>
          <p>${meal.strInstructions}</p>
        </div>
        <div class="meal-details-ingredients">
          <h3>Ingredients</h3>
          <ul class="ingredients-list">
            ${ingredients
              .map(
                (item) => `
              <li><i class="fas fa-check-circle"></i> ${item.measure} ${item.ingredient}</li>
            `
              )
              .join("")}
          </ul>
        </div>
        ${
          meal.strYoutube
            ? `
          <a href="${meal.strYoutube}" target="_blank" class="youtube-link">
            <i class="fab fa-youtube"></i> Watch Video
          </a>
        `
            : ""
        }
      `;

      mealDetails.classList.remove("hidden");
      mealDetails.scrollIntoView({ behavior: "smooth" });
    }
  } catch (error) {
    errorContainer.textContent =
      "Could not load recipe details. please try again later...";
    errorContainer.classList.remove("hidden");
  }
}
