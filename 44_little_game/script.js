const character = document.getElementById("character");
const block = document.getElementById("block");

function jump() {
  if (character.classList !== "animate") {
    character.classList.add("animate");
  }
  setTimeout(function () {
    character.classList.remove("animate");
  }, 500);
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jump();
  }
});

let checkDead = setInterval(function () {
  let characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top"),
  );

  let blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left"),
  );

  if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) {
    block.style.animation = "none";
    block.style.display = "none";
    alert("u lose.");
  }
},10);
