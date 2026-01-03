const getAllButtons = document.querySelectorAll(".ripple-effect");

getAllButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {

// -------------------------------------------------------------- 
    // console.log(
    //   event.clientX,
    //   event.target.offsetLeft,
    //   event.clientY,
    //   event.target.offsetTop
    // );
// --------------------------------------------------------------
    // we basically need the xCordinate value and yCordinate value...

    // X coordinate value, which is your (clientX - offsetLeft)
    // Y coordinate value, which is your (clientY - offsetTop)

    let XcoordinateValue = event.clientX - event.target.offsetLeft;
    let YcoordinateValue = event.clientY - event.target.offsetTop;

    let rippleElement = document.createElement("span");
    rippleElement.style.left = `${XcoordinateValue}px`;
    rippleElement.style.top = `${YcoordinateValue}px`;
    btn.appendChild(rippleElement);

    // remove the rippleElement after clicking .

    window.setTimeout(() => {
      rippleElement.remove();
    }, 600);
  });
});
