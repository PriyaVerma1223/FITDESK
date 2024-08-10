const inputs = document.querySelectorAll(".input");

// const submitBtn = document.querySelector("submit-btn")

// submitBtn.addEventListener("click" , (e) => {
//   window.location.href = ('#')
// })

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});