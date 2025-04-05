document.querySelectorAll("input").forEach((el) => {
  el.addEventListener("focus", () => {
    el.parentElement.parentElement.parentElement.classList.add(
      "control--focused"
    );
  });

  el.addEventListener("blur", () => {
    el.parentElement.parentElement.parentElement.classList.remove(
      "control--focused"
    );
  });
});
