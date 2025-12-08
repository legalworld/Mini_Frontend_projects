const posts = document.querySelector(".render-response");

async function getData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    // console.log("Async/Await Response:", data);
    displayPosts(data);
    console.log("Async/Await Response Arrived");
  } catch (error) {
    console.log("Error:", error);
  }
}

getData();

function displayPosts(data) {
  posts.innerHTML = ""; // Clear the container first

  data.forEach((item, index) => {
    setTimeout(() => {
      const postElement = document.createElement("div");
      postElement.className = "post";
      postElement.innerHTML = `
        <h2 class="res-title">${item.title}</h2>
        <p>${item.body}</p>
      `;
      posts.appendChild(postElement);

      // Add a smooth fade-in effect
      setTimeout(() => {
        postElement.style.opacity = "1";
        postElement.style.transform = "translateY(0)";
      }, 10);
    }, index * 100);
  });
}
