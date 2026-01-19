import { countries } from "./countries.js";

/* =====================
   DOM ELEMENTS
===================== */
const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("#transfer");
const fromText = document.querySelector("#fromText");
const toText = document.querySelector("#toText");
const icons = document.querySelectorAll("img");

/* =====================
   STATE VARIABLES
===================== */
let translateFrom;
let translateTo;

/* =====================
   INITIALIZE SELECT OPTIONS
===================== */
selectTag.forEach((tag, index) => {
  for (const countryCode in countries) {
    let selected = "";

    if (index === 0 && countryCode === "en-GB") {
      selected = "selected";
    } else if (index === 1 && countryCode === "bn-IN") {
      selected = "selected";
    }

    const option = `
      <option value="${countryCode}" ${selected}>
        ${countries[countryCode]}
      </option>
    `;

    tag.insertAdjacentHTML("beforeend", option);
  }
});

/* =====================
   EVENT LISTENERS
===================== */
translateBtn.addEventListener("click", () => {
  const text = fromText.value.trim();
  if (!text) return;

  translateFrom = selectTag[0].value;
  translateTo = selectTag[1].value;

  const encodedText = encodeURIComponent(text);

  const apiUrl = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${translateFrom}|${translateTo}`;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      toText.value = data.responseData.translatedText;
    })
    .catch((err) => {
      console.error("Translation error:", err);
    });
});

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("copy")) {
      if (target.id === "from") {
        navigator.clipboard.writeText(fromText.value.trim());
      } else {
        navigator.clipboard.writeText(toText.value.trim());
      }
    } else {
      let utterance;

      if (target.id === "from") {
        utterance = new SpeechSynthesisUtterance(fromText.value.trim());
        utterance.lang = selectTag[0].value;
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value.trim());
        utterance.lang = selectTag[1].value;
      }

      speechSynthesis.speak(utterance);
    }
  });
});
