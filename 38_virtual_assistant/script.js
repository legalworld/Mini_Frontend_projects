// this project only works on chrome browser...

let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "en-US";
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  const hours = new Date().getHours();

  if (hours < 12) {
    speak("Good morning sir");
  } else if (hours < 16) {
    speak("Good afternoon sir");
  } else if (hours < 20) {
    speak("Good evening sir");
  } else {
    speak("Good night sir");
  }
}

// window.addEventListener("load", () => {
//   wishMe();
// });

let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!speechRecognition) {
  console.error("Speech Recognition not supported");
}

let recognition = new speechRecognition();

recognition.onstart = () => {
  console.log("🎙️ Recognition started");
};

recognition.onresult = (event) => {
  // --------------------------------
  // debug code
  //   console.log(event);
  // ----------------------------

  let currentIndex = event.resultIndex;

  let transcript = event.results[currentIndex][0].transcript;
  content.textContent = transcript;

  //   console.log("You said:", transcript);
  //   speak(transcript);

  takeCommand(transcript.toLowerCase());
  btn.innerHTML = ` <img src="./assets/mic.svg" alt="mic" /><span id="content"
        >Click here for Conversation</span
      >`;
};

recognition.onerror = (event) => {
  console.error("Recognition error:", event.error);
};

recognition.onend = () => {
  console.log("Recognition ended");
  btn.style.display = "block";
  voice.style.display = "none";
};

btn.addEventListener("click", () => {
  console.log("Button clicked");
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});

function takeCommand(message) {
  if (message.includes("hello Sophia") || message.includes("hey Sophia")) {
    speak("hello sir, what can i help you ?");
  } else if (message.includes("who are you")) {
    speak(
      "i'm sophia, a virtual assistant made by software Engineer Gourab Dutta"
    );
  } else if (message.includes("sophia open youtube")) {
    speak("opening youtube sir");
    window.open("https://www.youtube.com", "_blank");
  } else if (message.includes("sophia open calculator")) {
    speak("opening calculator sir");
    window.open("calculator://");
  } else if (message.includes("sophia what is time")) {
    let time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speak(time);
  } else if (message.includes("sophia what is date")) {
    let date = new Date().toLocaleString(undefined, {
      day: "numeric",
      month: "short",
    });
    speak(date);
  } else {
    speak(`here what i found about ${message.replace("sophia", "")}`);
    window.open(
      `https://www.google.com/search?q=${message.replace("sophia", "")}`,
      "_blank"
    );
  }
}
