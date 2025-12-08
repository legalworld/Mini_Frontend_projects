const posts = document.querySelector(".render-response");

const fetchReq = fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "GET",
});

fetchReq
  .then((res) => res.json())
  .then((data) => {
    displayPosts(data);
    console.log("Response arrived");
  })
  .catch((error) => {
    console.log("Fetch Error:", error);
  });

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
