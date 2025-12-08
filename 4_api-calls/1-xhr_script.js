const posts = document.querySelector(".render-response");

// xhr req...
const xhr = new XMLHttpRequest();

xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");

xhr.onload = function () {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);

    displayPosts(data);

    console.log("XHR Response Arrived");
  } else {
    console.log("Error: ", xhr.status);
  }
};

xhr.send();

function displayPosts(data) {
  posts.innerHTML = ''; // Clear the container first
  
  data.forEach((item, index) => {
    setTimeout(() => {
      const postElement = document.createElement('div');
      postElement.className = 'post';
      postElement.innerHTML = `
        <h2 class="res-title">${item.title}</h2>
        <p>${item.body}</p>
      `;
      posts.appendChild(postElement);
      
      // Add a smooth fade-in effect
      setTimeout(() => {
        postElement.style.opacity = '1';
        postElement.style.transform = 'translateY(0)';
      }, 10);
    }, index * 100); 
  });
}
