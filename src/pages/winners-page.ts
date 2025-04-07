import type { GarageStore } from "../store/garage-store";
import { BaseElement } from "../utils/base-element";
import { BaseSVGElement } from "../utils/base-svg-element";
import type { Winner } from "../types/types";
import { CarService } from "../api/car-service";
import { Button } from "../components/button/button";

type SortKey = "wins" | "time" | null;
type SortOrder = "asc" | "desc" | null;

export class Winners extends BaseElement<"div"> {
  private title = new BaseElement<"h1">({ tag: "h1", text: `Winners (0)` });
  private pageNumber = new BaseElement<"h2">({ tag: "h2", text: "Page #1" });
  private tableBody = new BaseElement<"tbody">({ tag: "tbody" });
  private headerWins = new BaseElement<"th">({ tag: "th" });
  private headerBestTime = new BaseElement<"th">({ tag: "th" });

  private previousButton = new Button({
    text: "Prev",
    callback: () => {
      void this.handlePageChange(-1);
    },
  });
  private nextButton = new Button({
    text: "Next",
    callback: () => {
      void this.handlePageChange(1);
    },
  });

  private sortKey: SortKey = "time";
  private sortOrder: SortOrder = "asc";

  constructor(private store: GarageStore) {
    super({ tag: "div" });
    this.render();

    this.store.winners$.subscribe((winners) => {
      void this.renderWinners(winners);
    });

    this.store.winnersCount$.subscribe(() => {
      this.updateButtons();
    });

    void this.store.loadWinners(
      this.store.getCurrentPage("winners"),
      this.store.pageLimits.winners,
    );
  }

  private updateButtons() {
    const currentPage = this.store.getCurrentPage("winners");
    const limit = this.store.pageLimits.winners;
    const total = this.store.winnersCount$.value;

    const maxPage = Math.ceil(total / limit);

    this.previousButton.setDisabled(currentPage === 1);
    this.nextButton.setDisabled(currentPage >= maxPage);
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
    this.headerWins.addListener("click", () => void this.toggleSort("wins"));

    this.headerBestTime.node.style.cursor = "pointer";
    this.headerBestTime.addListener(
      "click",
      () => void this.toggleSort("time"),
    );

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
    this.renderControls();
  }

  private async toggleSort(key: SortKey) {
    if (this.sortKey === key) {
      this.sortOrder = this.sortOrder === "desc" ? "asc" : "desc";
    } else {
      this.sortKey = key;
      this.sortOrder = "desc";
    }

    this.updateHeaders();
    await this.renderWinners(this.store.getWinners());
  }

  private async renderWinners(winners: Winner[]) {
    this.tableBody.deleteChildren();

    const sorted = [...winners];
    if (this.sortKey && this.sortOrder) {
      const primary = this.sortKey;
      const secondary = primary === "wins" ? "time" : "wins";
      sorted.sort((a, b) => {
        const primaryDiff = a[primary] - b[primary];
        const secondaryDiff = a[secondary] - b[secondary];
        return primaryDiff === 0
          ? this.sortOrder === "asc"
            ? secondaryDiff
            : -secondaryDiff
          : this.sortOrder === "asc"
            ? primaryDiff
            : -primaryDiff;
      });
    }

    this.title.setText(`Winners (${sorted.length})`);

    let globalIndex =
      (this.store.getCurrentPage("winners") - 1) *
        this.store.pageLimits.winners +
      1;
    for (const winner of sorted) {
      const row = new BaseElement<"tr">({ tag: "tr" });
      row.appendChildren(
        new BaseElement<"td">({ tag: "td", text: (globalIndex++).toString() }),
        new BaseElement<"td">({ tag: "td", text: `${winner.id}` }),
      );

      try {
        const car = await CarService.getCar(winner.id);
        row.appendChildren(
          new BaseSVGElement({
            href: "/sprite.svg#auto",
            attributes: {
              width: "40",
              height: "40",
              fill: car?.color || "#000000",
            },
          }),
          new BaseElement<"td">({ tag: "td", text: car?.name || "Unknown" }),
          new BaseElement<"td">({ tag: "td", text: `${winner.wins}` }),
          new BaseElement<"td">({
            tag: "td",
            text: `${winner.time.toFixed(2)}`,
          }),
        );
      } catch (error) {
        console.error(`Error loading car ${winner.id}`, error);
      }

      this.tableBody.appendChildren(row);
    }
  }

  private getHeaderText(key: SortKey, label: string): string {
    if (this.sortKey === key) {
      return `${label} ${this.sortOrder === "asc" ? "↑" : "↓"}`;
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
    this.appendChildren(this.previousButton, this.nextButton);
    this.updateButtons();
  }

  private async handlePageChange(direction: number) {
    const currentPage = this.store.getCurrentPage("winners");
    const newPage = currentPage + direction;
    if (newPage >= 1) {
      await this.store[direction > 0 ? "next" : "previous"]("winners");
      this.pageNumber.setText(`Page #${newPage}`);
    }
  }
}
