const usersList = document.querySelector(".users-list");
const loader = document.querySelector(".loader");
const scrollToTopButton = document.querySelector(".scroll-to-top-button");
const scrollToBottomButton = document.querySelector(".scroll-to-bottom-button");

function showLoader() {
  loader.classList.add("show-loader");
  usersList.classList.add("hide-users-list");
}

function removeLoader() {
  loader.classList.remove("show-loader");
  usersList.classList.remove("hide-users-list");
}

async function fetchUsersList() {
  try {
    showLoader();

    const response = await fetch("https://dummyjson.com/users?limit=100", {
      method: "GET",
    });

    const result = await response.json();

    if (result && result.users) {
      return displayUsersList(result.users);
    }

    removeLoader();
  } catch (error) {
    console.log("error while fetching from api", error);
  }
}

function displayUsersList(getUsers) {
  usersList.innerHTML = getUsers
    .map(
      (userItem) => `
    <li>
        <p> ${userItem.firstName} ${userItem.lastName}</P>
    </li>
`
    )
    .join("");
}

fetchUsersList();

scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

scrollToBottomButton.addEventListener("click", () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
});
