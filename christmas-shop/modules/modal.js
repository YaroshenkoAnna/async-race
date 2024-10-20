export function modal() {
  const gallery = document.querySelector(".section__gallery");

  gallery.addEventListener("click", (event) => {
    if (event.target.closest(".card")) {
      createModal(event.target.closest(".card").getAttribute("data-number"));
    }
  });

  function createModal(number) {
    console.log(number);
  }
}
