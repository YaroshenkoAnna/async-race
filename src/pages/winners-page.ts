import { BaseElement } from "../utils/base-element";

export class Winners extends BaseElement<"div"> {
  private title: BaseElement<"h1">;
  private pageNumber: BaseElement<"h2">;

  constructor() {
    super({ tag: "div" });
    this.title = new BaseElement<"h1">({ tag: "h1", text: `Garage (0)` });
    this.pageNumber = new BaseElement<"h2">({ tag: "h2", text: "Page #1" });
    this.render();
  }

  render() {
    const table = new BaseElement<"table">({ tag: "table" });
    const tableHeader = new BaseElement<"thead">({ tag: "thead" });
    const tableBody = new BaseElement<"tbody">({ tag: "tbody" });
    const headerRow = new BaseElement<"tr">({ tag: "tr" });
    const headerNumber = new BaseElement<"th">({ tag: "th", text: "Number" });
    const headerImage = new BaseElement<"th">({ tag: "th", text: "Car" });
    const headerName = new BaseElement<"th">({ tag: "th", text: "Name" });
    const headerWins = new BaseElement<"th">({ tag: "th", text: "Wins" });
    const headerBestTime = new BaseElement<"th">({
      tag: "th",
      text: "Best Time (seconds)",
    });
    headerRow.appendChildren(
      headerNumber,
      headerImage,
      headerName,
      headerWins,
      headerBestTime,
    );
    tableHeader.appendChildren(headerRow);
    table.appendChildren(tableHeader, tableBody);

    this.appendChildren(this.title, this.pageNumber, table);
  }
}
