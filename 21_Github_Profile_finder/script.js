const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const BASE_URL = "https://api.github.com/users/";
const profileDetails = document.querySelector(".github-profile-details");
const loader = document.querySelector(".loading-text");

function showLoading() {
  loader.classList.add("show-loader");
  profileDetails.classList.add("hide-profiledetails");
}

function hideLoading() {
  loader.classList.remove("show-loader");
  profileDetails.classList.remove("hide-profiledetails");
}

searchBtn.addEventListener("click", async () => {
  try {
    showLoading();
    const response = await fetch(`${BASE_URL}${searchInput.value}`, {
      method: "GET",
    });

    const result = await response.json();
    console.log(result);

    if (result) {
      displayProfileDetails(result);
    }

    hideLoading();
    searchInput.value = "";
  } catch (error) {
    console.log("error while fetching data", error);
  }
});

function displayProfileDetails(data) {
  profileDetails.innerHTML = `
<img src="${data.avatar_url}" />
<p>owner name: ${data.name}</p>
<p>account followers: ${data.followers}</p>
<p>account following: ${data.following}</p>
`;
}
