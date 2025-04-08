import type { GarageStore } from "../store/garage-store";
import { BaseElement } from "../utils/base-element";
import { BaseSVGElement } from "../utils/base-svg-element";
import type { Winner } from "../types/types";
import { CarService } from "../api/car-service";
import { Button } from "../components/button/button";
import styles from "./winners-page.module.scss";

type SortKey = "wins" | "time" | "id";
type SortOrder = "asc" | "desc";

export class Winners extends BaseElement<"div"> {
  private title = new BaseElement<"h1">({
    tag: "h1",
    text: `Winners (0)`,
    classNames: [styles.title],
  });
  private pageNumber = new BaseElement<"h2">({
    tag: "h2",
    text: "Page #1",
    classNames: [styles["page-number"]],
  });
  private tableBody = new BaseElement<"tbody">({ tag: "tbody" });
  private headerWins = new BaseElement<"th">({
    tag: "th",
    classNames: [styles.sortable],
  });
  private headerBestTime = new BaseElement<"th">({
    tag: "th",
    classNames: [styles.sortable],
  });
  private sortAllWinners = true;
  private sortKey: SortKey = "time";
  private sortOrder: SortOrder = "asc";

  private previousButton = new Button({
    text: "Prev",
    callback: () => void this.store.previous("winners"),
  });

  private nextButton = new Button({
    text: "Next",
    callback: () => void this.store.next("winners"),
  });

  constructor(private store: GarageStore) {
    super({ tag: "div" });
    this.render();

    this.store.winnersCount$.subscribe(() => {
      this.updateButtons();
      this.updatePageNumber();
    });

    void this.ensureValidPage();
    void this.loadCurrentWinners();

    this.store.winners$.subscribe((winners) => {
      void this.renderWinners(winners);
      void this.ensureValidPage();
    });
  }

  private async ensureValidPage() {
    const limit = this.store.pageLimits.winners;
    const total = this.store.winnersCount$.value;
    const maxPage = Math.max(1, Math.ceil(total / limit));
    const currentPage = this.store.getCurrentPage("winners");

    if (currentPage > maxPage) {
      await this.store.loadWinners(
        maxPage,
        this.store.pageLimits.winners,
        this.sortKey,
        this.sortOrder.toUpperCase() as "ASC" | "DESC",
        this.sortKey === "wins" && this.sortAllWinners,
      );
    }
  }

  private async loadCurrentWinners() {
    const page = this.store.getCurrentPage("winners");
    const limit = this.store.pageLimits.winners;
    await this.store.loadWinners(
      page,
      limit,
      this.sortKey,
      this.sortOrder.toUpperCase() as "ASC" | "DESC",
      this.sortKey === "wins" && this.sortAllWinners,
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

  private updatePageNumber() {
    const currentPage = this.store.getCurrentPage("winners");
    this.pageNumber.setText(`Page #${currentPage}`);
  }

  private render() {
    const table = new BaseElement<"table">({
      tag: "table",
      classNames: [styles.table],
    });
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

    this.store.winnersSortKey = this.sortKey;
    this.store.winnersSortOrder = this.sortOrder.toUpperCase() as
      | "ASC"
      | "DESC";
    this.store.sortAllWinners = this.sortKey === "wins" && this.sortAllWinners;

    this.updateHeaders();
    await this.loadCurrentWinners();
  }

  private async renderWinners(winners: Winner[]) {
    console.log("Winners", winners);
    this.tableBody.deleteChildren();
    this.title.setText(`Winners (${this.store.winnersCount$.value})`);

    let globalIndex =
      (this.store.getCurrentPage("winners") - 1) *
        this.store.pageLimits.winners +
      1;

    for (const winner of winners) {
      const row = new BaseElement<"tr">({ tag: "tr" });

      row.appendChildren(
        new BaseElement<"td">({ tag: "td", text: (globalIndex++).toString() }),
        new BaseElement<"td">({ tag: "td", text: `${winner.id}` }),
      );

      try {
        const car = await CarService.getCar(winner.id);
        const carTd = new BaseElement<"td">({ tag: "td" });
        const carSvg = new BaseSVGElement({
          href: "./sprite.svg#auto",
          classNames: [styles["car-svg"]],
          attributes: {
            width: "40",
            height: "40",
            fill: car?.color || "#000000",
          },
        });
        carTd.appendChildren(carSvg);

        row.appendChildren(
          carTd,
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
    this.previousButton.addClasses([styles.button]);
    this.nextButton.addClasses([styles.button]);
    this.updateButtons();
  }
}
