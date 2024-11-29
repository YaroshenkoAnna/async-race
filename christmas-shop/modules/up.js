export function up() {
  const buttonUp = document.querySelector(".section__up-button");
  buttonUp.addEventListener("click", scrollUp);

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 300) {
      buttonUp.classList.add("section__up-button_active");
    } else {
      buttonUp.classList.remove("section__up-button_active");
    }
  });

  function scrollUp() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
