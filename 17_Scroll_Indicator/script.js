const postListContainer = document.querySelector(".posts-container");
const progressBar = document.querySelector(".progress-bar");

function fetchListOfPosts() {
  fetch("https://dummyjson.com/posts?limit=30", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => displayPostList(result.posts));
}

function displayPostList(getPosts) {
  getPosts.forEach((postItem) => {
    const postItemWrapper = document.createElement("div");

    postItemWrapper.classList.add("post-item-wrapper");

    const postTitle = document.createElement("label");
    postTitle.textContent = postItem.title;

    const postBody = document.createElement("p");
    postBody.textContent = postItem.body;

    const postTags = document.createElement("div");
    postTags.textContent = postItem.tags.map((tagItem) => tagItem).join(",");
    postTags.classList.add("post-tags");

    postItemWrapper.appendChild(postTitle);
    postItemWrapper.appendChild(postBody);
    postItemWrapper.appendChild(postTags);
    postListContainer.appendChild(postItemWrapper);
  });
}

fetchListOfPosts();

window.onscroll = function () {
  handleScroll();
};

function handleScroll() {
  // first we will check, what is the scroll top
  // and then we need to find the height...
  // and lastly, the scroll percentage of user, we need to show it in form of progress...

  let getScrollFromTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const howMuchPercentageAlreadyScrolled = (getScrollFromTop / height) * 100;
  progressBar.style.width = `${howMuchPercentageAlreadyScrolled}%`;
}
