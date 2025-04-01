import type { GarageStore } from "../store/garage-store";
import { BaseElement } from "../utils/base-element";
import { BaseSVGElement } from "../utils/base-svg-element";
import type { Winner } from "../types/types";
import { CarService } from "../api/car-service";

export class Winners extends BaseElement<"div"> {
  private title: BaseElement<"h1">;
  private pageNumber: BaseElement<"h2">;
  private tableBody: BaseElement<"tbody">;
  private store: GarageStore;

  constructor(store: GarageStore) {
    super({ tag: "div" });
    this.title = new BaseElement<"h1">({ tag: "h1", text: `Garage (0)` });
    this.pageNumber = new BaseElement<"h2">({ tag: "h2", text: "Page #1" });
    this.tableBody = new BaseElement<"tbody">({ tag: "tbody" });
    this.store = store;
    void this.render();
    this.store.winners$.subscribe(
      (winners) => void this.renderWinners(winners),
    );
    void this.store.loadWinners();
  }

  private render() {
    const table = new BaseElement<"table">({ tag: "table" });
    const tableHeader = new BaseElement<"thead">({ tag: "thead" });

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
    table.appendChildren(tableHeader, this.tableBody);
    this.appendChildren(this.title, this.pageNumber, table);
  }

  private async renderWinners(winners: Winner[]) {
    console.log("Rendering winners...");

    this.tableBody.deleteChildren();

    for (const winner of winners) {
      const row = new BaseElement<"tr">({ tag: "tr" });

      const numberCell = new BaseElement<"td">({
        tag: "td",
        text: `${winner.id}`,
      });

      try {
        const car = await CarService.getCar(winner.id);

        const nameCell = new BaseElement<"td">({
          tag: "td",
          text: car ? car.name : "Unknown",
        });

        const imageCell = new BaseSVGElement({
          href: "/sprite.svg#auto",
          attributes: {
            width: "40",
            height: "40",
            fill: car ? car.color : "#000000",
          },
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
          numberCell,
          imageCell,
          nameCell,
          winsCell,
          bestTimeCell,
        );
      } catch (error) {
        console.error(
          `Failed to fetch car details for winner ${winner.id}:`,
          error,
        );
      }

      this.tableBody.appendChildren(row);
    }
  }
}
