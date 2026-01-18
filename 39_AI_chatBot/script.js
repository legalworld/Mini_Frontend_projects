let prompt_text = document.querySelector("#prompt");
let send = document.querySelector("#submit");
let chatContainer = document.querySelector(".chat-container");
let image = document.querySelector("#image");
let imageGif = document.querySelector("#image img");
let fileSelect = document.querySelector("#image input");

const api_key = "Enter_Your_api_key_here";
const api_url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

// ✅ FIX 1: HARD REQUEST LOCK (mandatory)
// Global variable...
let isRequestInProgress = false;

let user = {
  message: null,
  file: {
    mime_type: null,
    data: null,
  },
};

async function generateResponse(aiChatBox) {
  if (isRequestInProgress) return;
  isRequestInProgress = true;

  let text = aiChatBox.querySelector(".ai-chat-area");

  let requestOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": api_key,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: user.message },
            ...(user.file.data
              ? [
                  {
                    inline_data: {
                      mime_type: user.file.mime_type,
                      data: user.file.data,
                    },
                  },
                ]
              : []),
          ],
        },
      ],
      generationConfig: {
        thinkingConfig: { thinkingLevel: "low" },
      },
    }),
  };

  try {
    let response = await fetch(api_url, requestOption);
    // ✅ FIX 4 — Handle 429 Too Many Requests
    if (response.status === 429) {
      text.innerHTML = "Rate limit hit. Please wait a few seconds.";

      // disable input + button
      prompt_text.disabled = true;
      send.disabled = true;

      // re-enable after cooldown
      setTimeout(() => {
        prompt_text.disabled = false;
        send.disabled = false;
      }, 15000);

      return;
    }

    let data = await response.json();
    let apiResponse = data.candidates[0].content.parts[0].text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .trim();

    // --------------------------------------
    // debug code
    //   console.log(apiResponse);
    // -----------------------------------------

    text.innerHTML = apiResponse;

    fileSelect.value = "";

    aiChatBox.appendChild(text);
  } catch (error) {
    alert("some API req/res error happens", error);
  } finally {
    chatContainer.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: "smooth",
    });
    isRequestInProgress = false;
    imageGif.src = `./assets/image.svg`;
    imageGif.classList.remove("choose");
    // FIX 3: reset image after send
    user.file = {};
  }
}

function createChatBox(html, classes) {
  let div = document.createElement("div");
  div.innerHTML = html;
  div.classList.add(classes);

  return div;
}

function handleChatResponse(userMessage) {
  user.message = userMessage;

  let html = `    <img src="./assets/user.png" alt="user" id="userImage" width="8%" />

        <div class="user-chat-area">
        
        ${user.message}
${user.file.data ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />` : ""}
        </div>`;

  prompt_text.value = "";
  let userChatBox = createChatBox(html, "user-chat-box");
  chatContainer.appendChild(userChatBox);

  chatContainer.scrollTo({
    top: chatContainer.scrollHeight,
    behavior: "smooth",
  });

  setTimeout(() => {
    let html = `   <img src="./assets/ai.png" alt="AI" id="aiImage" width="10%" />

          <div class="ai-chat-area">

          <img src="./assets/loading.gif " alt="" class="load" width="50px">
          </div>
          `;

    let aiChatBox = createChatBox(html, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);
    generateResponse(aiChatBox);
  }, 600);
}

//events
send.addEventListener("click", () => {
  if (!isRequestInProgress && prompt_text.value.trim()) {
    handleChatResponse(prompt_text.value);
  }
});

prompt_text.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && prompt_text.value.trim()) {
    // --------------------------------------------
    // debug code
    // this two code will give same output...

    // console.log(event.target.value);
    // console.log(prompt_text.value);
    // ----------------------------------------------

    // ✅ FIX 2: PREVENT DOUBLE ENTER + CLICK
    event.preventDefault();
    if (!isRequestInProgress) {
      handleChatResponse(prompt_text.value);
    }
  }
});

image.addEventListener("click", () => {
  fileSelect.click();
});

fileSelect.addEventListener("change", () => {
  const file = fileSelect.files[0];
  if (!file) return;

  let reader = new FileReader();
  reader.onload = (event) => {
    // ---------------------------------------
    // debug code
    console.log(event);
    // -------------------------------------------------

    let base64string = event.target.result.split(",")[1];
    user.file = {
      mime_type: file.type,
      data: base64string,
    };
    imageGif.src = `data:${user.file.mime_type};base64,${user.file.data}`;
    imageGif.classList.add("choose");
  };

  reader.readAsDataURL(file);
});
