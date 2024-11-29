const navigation = document.querySelector(".navigation");
navigation.addEventListener("click", showHideBurgerMenu);
const burgerButton = document.querySelector(".burger-menu");
burgerButton.addEventListener("click", showHideBurgerMenu);
const page = document.querySelector("body");

function showHideBurgerMenu(event) {
  if (!burgerButton.classList.contains("burger-menu_active")) {
    if (checkConditions()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      showMenu();
    }
  } else {
    if (checkConditions()) {
      hideMenu();
    }
  }

  function showMenu() {
    burgerButton.classList.add("burger-menu_active");
    navigation.classList.add("navigation_active");
    page.classList.add("enabled-scroll");
    window.addEventListener("resize", showHideBurgerMenu);
  }

  function hideMenu() {
    burgerButton.classList.remove("burger-menu_active");
    navigation.classList.remove("navigation_active");
    page.classList.remove("enabled-scroll");
    window.removeEventListener("resize", showHideBurgerMenu);
  }

  function checkConditions() {
    return (
      (event.type == "resize" && window.innerWidth > 768) ||
      (event.type == "click" && event.target.closest(".burger-menu")) ||
      (event.type == "click" && event.target.closest(".navigation__item"))
    );
  }
}
