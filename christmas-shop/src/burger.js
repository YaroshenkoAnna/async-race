const navigation = document.querySelector(".navigation");
navigation.addEventListener("click", showHideBurgerMenu);
const burgerButton = document.querySelector(".burger-menu");
burgerButton.addEventListener("click", showHideBurgerMenu);

function showHideBurgerMenu(event) {
  if (
    event.target.closest(".burger-menu") ||
    (event.target.closest(".navigation__item") &&
      burgerButton.classList.contains("burger-menu_active"))
  ) {
    burgerButton.classList.toggle("burger-menu_active");
    navigation.classList.toggle("navigation_active");

    const page = document.querySelector("body");
    page.classList.toggle("enabled-scroll");
  }
}
