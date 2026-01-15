// DOM Elements
let input = document.querySelector(".search-box input");
let btn = document.querySelector(".btn button");
let images = document.querySelector(".images");
let load = document.querySelector("#load");

const accessKey = "-6fvgMqWPVL-_k8OXRYi3ngKGFO48Ink-If3LRSzlf0";
let page = 1;
let keyword = "";

// events...
btn.addEventListener("click", () => {
  page = 1;
  getResponse();
});
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && input.value.trim()) {
    page = 1;
    getResponse();
  }
});

load.addEventListener("click", () => {
  page++;
  getResponse();
});

async function getResponse() {
  keyword = input.value;
  let url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  try {
    let response = await fetch(url, {
      method: "GET",
    });

    let data = await response.json();

    let results = data.results;

    if (results) {
      load.style.display = "block";
    }

    // ------------------------------------------
    //   debug code
    console.log(results);
    // --------------------------------------------

    // new search → clear old images
    if (page === 1) {
      images.innerHTML = "";
    }

    displayResults(results);
  } catch (error) {
    alert("api req issue");
  }
}

function displayResults(results) {
  results.map((result) => {
    let li = document.createElement("li");
    li.classList.add("image");

    let html = `
    
             <img src="${result.urls.small}" alt="img" class="photo"/>

          <div class="details">
            <div class="user">
              <img src="camera.svg" alt="img" />
              <span>${result.user.name}</span>
            </div>

            <div class="download" onClick=download('${result.urls.small}')>
              <img src="download.svg" alt="img" />
            </div>
          </div>
    
    `;
    li.innerHTML = html;
    images.appendChild(li);
  });
}

function download(imgUrl) {
  // ---------------------------
  // debug code...
  // console.log(imgUrl);
  // -------------------------------------

  fetch(imgUrl)
    .then((res) => res.blob())
    .then((file) => {
      let a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = new Date().getTime();
      a.click();
    })
    .catch(() => alert("failed download"));
}
