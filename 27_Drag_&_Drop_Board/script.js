const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");

// ############################################################################################

// events for cards
for (const card of cards) {
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);

}

function dragStart(event) {
  // this below line of code allows the drop location to know which element is being moved when you release it
  event.dataTransfer.setData("text/plain", this.id);
}

function dragEnd(event) {
  console.log("Drag ended");
}

// #########################################################################################

// events for lists
for (const list of lists) {
  list.addEventListener("dragover", dragOver);
  list.addEventListener("dragenter", dragEnter);
  list.addEventListener("dragleave", dragLeave);
  list.addEventListener("drop", dragDrop);
}

function dragOver(event) {
  // this preventDefault line is important because by default, browsers don't allow you to drop elements onto other elements.
  event.preventDefault();
}

function dragEnter(event) {
  // here same reason for preventDefault
  event.preventDefault();
  this.classList.add("over");
}

function dragLeave(event) {
  this.classList.remove("over");
}

function dragDrop(event) {
  const id = event.dataTransfer.getData("text/plain");
  const card = document.getElementById(id);
  this.appendChild(card);
  this.classList.remove("over");
}
