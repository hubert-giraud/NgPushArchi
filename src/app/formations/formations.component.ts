import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FormationFacade } from "../formation.facade.service";

@Component({
  selector: "app-formations",
  templateUrl: "./formations.component.html",
  styleUrls: ["./formations.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormationsComponent {
  constructor(readonly formationFacade: FormationFacade) {}

  displayedColumns = [
    "libelle",
    "nbFormateurs",
    "nbCandidats",
    "totalParticipants"
  ];

  applyFilter(event: Event) {
    const userSearch = (event.target as HTMLInputElement).value;
    this.formationFacade.filterFormations(userSearch);
  }

  sortByColumn(headerKey) {
    this.formationFacade.sortFormations(headerKey);
  }

  handlePageChange(page) {
    this.formationFacade.updatePagination({
      pageIndex: page.pageIndex,
      pageSize: page.pageSize
    });
  }
}
