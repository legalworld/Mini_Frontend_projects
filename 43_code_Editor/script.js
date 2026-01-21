const htmlInput = document.querySelector(".html-editor textarea");
const cssInput = document.querySelector(".css-editor textarea");
const jsInput = document.querySelector(".javascript-editor textarea");
const save = document.querySelector("#save");
const outputContainer = document.querySelector(".output-container");
const output = document.querySelector("#output");
const screenExpand = document.querySelector("#full");
const copyButtons = document.querySelectorAll(
  ".code-editor .head-editor .right-head img",
);

save.addEventListener("click", (event) => {
  output.contentDocument.body.innerHTML = htmlInput.value;
  output.contentDocument.head.innerHTML = `<style>${cssInput.value}</style>`;
  output.contentWindow.eval(jsInput.value);
});

screenExpand.addEventListener("click", () => {
  outputContainer.classList.toggle("output-full-active");

  if (outputContainer.classList.contains("output-full-active")) {
    screenExpand.classList.add("rotate");
  } else {
    screenExpand.classList.remove("rotate");
  }
});

copyButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.id === "html") {
      navigator.clipboard.writeText(htmlInput.value);
    } else if (btn.id === "css") {
      navigator.clipboard.writeText(cssInput.value);
    } else if (btn.id === "js") {
      navigator.clipboard.writeText(jsInput.value);
    }
  });
});
