import { BaseElement } from "../../utils/base-element";
import { BaseSVGElement } from "../../utils/base-svg-element";
import styles from "./footer.module.scss";

export class Footer extends BaseElement<"footer"> {
  constructor() {
    super({
      tag: "footer",
      classNames: [styles.footer],
    });
    this.render();
  }

  private render(): void {
    const logoLink = new BaseElement({
      tag: "a",
      attributes: { href: "https://rs.school/" },
    });
    const logo = new BaseSVGElement({
      href: "./rss.svg#rss",
      attributes: { width: "100", height: "36", fill: "black" },
    });
    logoLink.appendChildren(logo);

    const githubLink = new BaseElement({
      tag: "a",
      attributes: { href: "https://github.com/YaroshenkoAnna" },
    });
    const githubLogo = new BaseSVGElement({
      href: "./sprite.svg#git",
      attributes: { width: "36", height: "36", fill: "black" },
    });
    githubLink.appendChildren(githubLogo);

    const year = new BaseElement({
      tag: "p",
      text: `2025 © Anna Yaroshenko`,
    });
    this.appendChildren(logoLink, year, githubLink);
  }
}
