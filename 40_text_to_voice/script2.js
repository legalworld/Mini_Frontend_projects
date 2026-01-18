
// AI Version ---> 

// DOM elements
const button = document.querySelector("button");
const textarea = document.querySelector("textarea");
const voiceSelect = document.querySelector("select");

// Speech state
const speech = new SpeechSynthesisUtterance();
let voices = [];

// Load voices
function loadVoices() {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];
  renderVoiceOptions();
}

// Populate dropdown
function renderVoiceOptions() {
  voiceSelect.innerHTML = "";
  voices.forEach((voice, index) => {
    voiceSelect.add(new Option(voice.name, index));
  });
}

// Speak text
function speakTextareaText() {
  speech.text = textarea.value;
  window.speechSynthesis.speak(speech);
}

// Events
window.speechSynthesis.onvoiceschanged = loadVoices;

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

button.addEventListener("click", speakTextareaText);

