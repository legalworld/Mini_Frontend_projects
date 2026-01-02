const categories = ["All", "Men", "Women", "Kids"];
const content = [
  {
    id: "Men",
    label: "Men Shirt 1",
  },
  {
    id: "Men",
    label: "Men Shirt 2",
  },
  {
    id: "Men",
    label: "Men Shirt 3",
  },
  {
    id: "Men",
    label: "Men Shirt 4",
  },
  {
    id: "Men",
    label: "Men Shirt 5",
  },
  {
    id: "Women",
    label: "Women Shirt 1",
  },
  {
    id: "Women",
    label: "Women Shirt 2",
  },
  {
    id: "Women",
    label: "Women Shirt 3",
  },
  {
    id: "Women",
    label: "Women Shirt 4",
  },
  {
    id: "Women",
    label: "Women Shirt 5",
  },
  {
    id: "Kids",
    label: "Kids Shirt 3",
  },
  {
    id: "Kids",
    label: "Kids Shirt 4",
  },
  {
    id: "Kids",
    label: "Kids Shirt 5",
  },
  {
    id: "Kids",
    label: "Kids Shirt 10",
  },
  {
    id: "Kids",
    label: "Kids Shirt 20",
  },
];

const filterButtons = document.querySelector(".filter-buttons-wrapper");
const contentWrapper = document.querySelector(".content-wrapper");

function createCategory() {
  categories.forEach((category) => {
    const buttonEle = document.createElement("button");
    buttonEle.innerText = category;
    buttonEle.classList.add("filter-button");
    buttonEle.setAttribute("data-filter", category);

    filterButtons.appendChild(buttonEle);
  });
}

function createContent() {
  content.forEach((contentItem) => {
    const singleContentItem = document.createElement("div");

    singleContentItem.classList.add("card", contentItem.id);
    singleContentItem.textContent = contentItem.label;
    contentWrapper.appendChild(singleContentItem);
  });
}

createCategory();
createContent();

const allFilterButtons = document.querySelectorAll(".filter-button");
const allContentCards = document.querySelectorAll(".card");

function filterCardsByCategory(extractCurrentCategory, allContentCards) {
  allContentCards.forEach((item) => {
    const isShowAllCards = extractCurrentCategory.toLowerCase() === "all";
    const isItemFiltered = !item.classList.contains(extractCurrentCategory);

    if (!isShowAllCards && isItemFiltered) {
      item.classList.add("hide");
    } else {
      item.classList.remove("hide");
    }
  });
}

allFilterButtons.forEach((singleFilterButtonItem) => {
  singleFilterButtonItem.addEventListener("click", () => {
    const extractCurrentCategory = singleFilterButtonItem.dataset.filter;

    // helper method...
    filterCardsByCategory(extractCurrentCategory, allContentCards);
  });
});
