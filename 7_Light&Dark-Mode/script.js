const changeThemeBtn = document.querySelector(".change-theme-btn");
const body = document.querySelector("body");
const mainHeading = document.querySelector(".main-heading");

changeThemeBtn.addEventListener("click", () => {
  if (body.classList.contains("light")) {
    body.setAttribute("data-theme", "Dark");
    body.classList.remove("light");
    body.classList.add("Dark");
    mainHeading.classList.add("Dark");
    mainHeading.classList.remove("light");
    changeThemeBtn.classList.remove("light");
    changeThemeBtn.classList.add("Dark");
  } else {
    body.setAttribute("data-theme", "");
    body.classList.remove("Dark");
    body.classList.add("light");
    mainHeading.classList.add("light");
    mainHeading.classList.remove("Dark");
    changeThemeBtn.classList.add("light");
    changeThemeBtn.classList.remove("Dark");
  }
});
