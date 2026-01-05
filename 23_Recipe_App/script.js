const recipeListContainer = document.querySelector(".recipe-list");
const loader = document.querySelector(".loader");
const recipeDetails = document.querySelector(".recipe-details");

async function fetchListOfRecipes() {
  try {
    const response = await fetch("https://dummyjson.com/recipes", {
      method: "GET",
    });
    const result = await response.json();

    // console.log(result);

    if (result && result.recipes && result.recipes.length > 0) {
      displayRecipeList(result.recipes);
    }
  } catch (error) {
    console.log("error while fetching data from API", error);
  }
}

function displayRecipeList(getRecipeList) {
  getRecipeList.forEach((recipeItem) => {
    const { name, image, id, ingredients, cuisine, mealType, rating } =
      recipeItem;

    const recipeItemWrapper = document.createElement("div");
    recipeItemWrapper.classList.add("recipe-item");

    const fragment = document.createDocumentFragment();

    // name
    const recipeName = document.createElement("p");
    recipeName.textContent = name;
    recipeName.classList.add("recipe-name");

    // image
    const recipeImg = document.createElement("img");
    recipeImg.src = image;
    recipeImg.classList.add("recipe-image");

    // cuisine
    const recipeCuisine = document.createElement("p");
    recipeCuisine.textContent = cuisine;
    recipeCuisine.classList.add("recipe-cuisine");

    // ingredients
    const recipeIngredients = document.createElement("div");
    recipeIngredients.textContent = ingredients.map((item) => item).join(",");
    recipeIngredients.classList.add("recipe-ingredients");

    // mealType
    const recipeMealType = document.createElement("p");
    recipeMealType.textContent = mealType;
    recipeMealType.classList.add("recipe-meal-type");

    // rating
    const recipeRating = document.createElement("p");
    recipeRating.textContent = rating;
    recipeRating.classList.add("recipe-rating");

    // recipe details button
    const recipeDetailsButton = document.createElement("button");
    recipeDetailsButton.classList.add("recipe-details-button");
    recipeDetailsButton.innerText = "Recipe Details";
    recipeDetailsButton.addEventListener("click", () =>
      handleRecipeDetails(id)
    );

    fragment.append(
      recipeImg,
      recipeName,
      recipeCuisine,
      recipeIngredients,
      recipeMealType,
      recipeRating,
      recipeDetailsButton
    );
    recipeItemWrapper.appendChild(fragment);
    recipeListContainer.appendChild(recipeItemWrapper);
  });
}

fetchListOfRecipes();

async function handleRecipeDetails(getId) {
  try {
    const response = await fetch(`https://dummyjson.com/recipes/${getId}`, {
      method: "GET",
    });

    const result = await response.json();

    // console.log(result);

    if (result) {
      window.scrollTo({
        top:
          document.body.scrollHeight || document.documentElement.scrollHeight,
        behavior: "smooth",
      });

      displayRecipeDetailsData(result);
    }
  } catch (error) {
    console.log("error while fetching data from API", error);
  }
}

function displayRecipeDetailsData(getRecipeData) {
  recipeDetails.innerHTML = `
  <h1>You are now seeing the details of the following recipe</h1>
<p>${getRecipeData.name}</p>
`;
}

// appendChild take only one node at a time, and append takes more than one...
