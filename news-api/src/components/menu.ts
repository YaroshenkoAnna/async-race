export function initMenuToggle(buttonSelector: string, menuSelector: string): void {
  const menuButton = document.querySelector(buttonSelector);
  const menu = document.querySelector(menuSelector);

  if (!menuButton || !menu) return;

  menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('opened');
    menu.classList.toggle('menu__opened');
  });
}