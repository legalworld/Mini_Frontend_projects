const Button = document.querySelector("button");
const Textarea = document.querySelector("textarea");
const voiceSelect = document.querySelector("select");

let speech = new SpeechSynthesisUtterance();
let voices = [];

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices(); // this getVoices() method will provide all the available voices on the Device...
  speech.voice = voices[0];

  // display each voice on the drop down menu...
  voices.forEach((voice, index) => {
    voiceSelect.options[index] = new Option(voice.name, index);
  });
};

function getValueFromTextArea() {
  const input = Textarea.value;
  speech.text = input;
  window.speechSynthesis.speak(speech);
}

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

Button.addEventListener("click", getValueFromTextArea);
