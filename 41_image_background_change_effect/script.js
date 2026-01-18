const imgBox = document.querySelector(".img-box");
const imgWrap = document.querySelector(".img-wrap");
const originalImg = document.querySelector("#originalimg");
const line = document.querySelector("#line");

originalImg.style.width = imgBox.offsetWidth + "px";

const leftSpace = imgBox.offsetLeft;

imgBox.onmousemove = function (event) {
  const boxWidth = event.pageX - leftSpace + "px";
  imgWrap.style.width = boxWidth;
  line.style.left = boxWidth;
};
