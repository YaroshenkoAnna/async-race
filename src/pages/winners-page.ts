import type { GarageStore } from "../store/garage-store";
import { BaseElement } from "../utils/base-element";
import { BaseSVGElement } from "../utils/base-svg-element";
import type { Winner } from "../types/types";
import { CarService } from "../api/car-service";

type SortKey = "wins" | "time" | null;
type SortOrder = "asc" | "desc" | null;

export class Winners extends BaseElement<"div"> {
  private title: BaseElement<"h1">;
  private pageNumber: BaseElement<"h2">;
  private tableBody: BaseElement<"tbody">;
  private store: GarageStore;
  private winners: Winner[] = [];
  private headerWins: BaseElement<"th">;
  private headerBestTime: BaseElement<"th">;

  private sortKey: SortKey;
  private sortOrder: SortOrder;

  constructor(store: GarageStore) {
    super({ tag: "div" });
    this.title = new BaseElement<"h1">({ tag: "h1", text: `Winners (0)` });
    this.pageNumber = new BaseElement<"h2">({ tag: "h2", text: "Page #1" });
    this.tableBody = new BaseElement<"tbody">({ tag: "tbody" });
    this.store = store;
    this.headerWins = new BaseElement<"th">({ tag: "th" });
    this.headerBestTime = new BaseElement<"th">({ tag: "th" });

    void this.render();
    this.store.winners$.subscribe((winners) => {
      this.winners = winners;
      void this.renderWinners();
    });

    void this.store.loadWinners(this.store.currentPage, 10);
    this.sortKey = "time";
    this.sortOrder = "asc";
    this.updateHeaders();
    this.renderControls();
  }

  private render() {
    const table = new BaseElement<"table">({ tag: "table" });
    const tableHeader = new BaseElement<"thead">({ tag: "thead" });
    const headerRow = new BaseElement<"tr">({ tag: "tr" });

    const headerIndex = new BaseElement<"th">({ tag: "th", text: "№" });
    const headerNumber = new BaseElement<"th">({ tag: "th", text: "ID" });
    const headerImage = new BaseElement<"th">({ tag: "th", text: "Car" });
    const headerName = new BaseElement<"th">({ tag: "th", text: "Name" });

    this.headerWins.node.style.cursor = "pointer";
    this.headerWins.addListener("click", () => {
      void (async () => await this.toggleSort("wins"))();
    });

    this.headerBestTime.node.style.cursor = "pointer";
    this.headerBestTime.addListener("click", () => {
      void (async () => await this.toggleSort("time"))();
    });

    headerRow.appendChildren(
      headerIndex,
      headerNumber,
      headerImage,
      headerName,
      this.headerWins,
      this.headerBestTime,
    );

    tableHeader.appendChildren(headerRow);
    table.appendChildren(tableHeader, this.tableBody);
    this.appendChildren(this.title, this.pageNumber, table);

    this.updateHeaders();
  }

  private async toggleSort(key: SortKey) {
    if (this.sortKey === key) {
      this.sortOrder = this.sortOrder === "desc" ? "asc" : "desc";
    } else {
      this.sortKey = key;
      this.sortOrder = "desc";
    }

    this.updateHeaders();
    await this.renderWinners();
  }

  private async renderWinners() {
    this.tableBody.deleteChildren();

    const sorted = [...this.winners];

    if (this.sortKey && this.sortOrder) {
      sorted.sort((a, b) => {
        const primary = this.sortKey!;
        const secondary = primary === "wins" ? "time" : "wins";

        const primaryDiff = a[primary] - b[primary];
        const secondaryDiff = a[secondary] - b[secondary];

        if (primaryDiff === 0) {
          return this.sortOrder === "asc" ? secondaryDiff : -secondaryDiff;
        } else {
          return this.sortOrder === "asc" ? primaryDiff : -primaryDiff;
        }
      });
    }

    this.title.setText(`Winners (${sorted.length})`);

    for (const [index, winner] of sorted.entries()) {
      const row = new BaseElement<"tr">({ tag: "tr" });

      const indexCell = new BaseElement<"td">({
        tag: "td",
        text: (index + 1).toString(),
      });

      const numberCell = new BaseElement<"td">({
        tag: "td",
        text: `${winner.id}`,
      });

      try {
        const car = await CarService.getCar(winner.id);

        const imageCell = new BaseSVGElement({
          href: "/sprite.svg#auto",
          attributes: {
            width: "40",
            height: "40",
            fill: car?.color || "#000000",
          },
        });

        const nameCell = new BaseElement<"td">({
          tag: "td",
          text: car?.name || "Unknown",
        });

        const winsCell = new BaseElement<"td">({
          tag: "td",
          text: `${winner.wins}`,
        });

        const bestTimeCell = new BaseElement<"td">({
          tag: "td",
          text: `${winner.time.toFixed(2)}`,
        });

        row.appendChildren(
          indexCell,
          numberCell,
          imageCell,
          nameCell,
          winsCell,
          bestTimeCell,
        );
      } catch (error) {
        console.error(`Error loading car ${winner.id}`, error);
        row.appendChildren(indexCell, numberCell);
      }

      this.tableBody.appendChildren(row);
    }
  }

  private getHeaderText(key: SortKey, label: string): string {
    if (this.sortKey === key) {
      if (this.sortOrder === "asc") return `${label} ↑`;
      if (this.sortOrder === "desc") return `${label} ↓`;
    }
    return label;
  }

  private updateHeaders() {
    this.headerWins.setText(this.getHeaderText("wins", "Wins"));
    this.headerBestTime.setText(
      this.getHeaderText("time", "Best Time (seconds)"),
    );
  }

  private renderControls() {
    const previousButton = new BaseElement<"button">({
      tag: "button",
      text: "Prev",
    });
    const nextButton = new BaseElement<"button">({
      tag: "button",
      text: "Next",
    });

    previousButton.addListener("click", () => {
      void this.handlePreviousPage();
    });
    nextButton.addListener("click", () => {
      void this.handleNextPage();
    });

    this.appendChildren(previousButton, nextButton);
  }

  private async handleNextPage() {
    const nextPage = this.store.currentPage + 1;
    await this.store.loadWinners(nextPage, 10);
    this.pageNumber.setText(`Page #${nextPage}`);
  }

  private async handlePreviousPage() {
    const previousPage = Math.max(1, this.store.currentPage - 1);
    await this.store.loadWinners(previousPage, 10);
    this.pageNumber.setText(`Page #${previousPage}`);
  }
}
