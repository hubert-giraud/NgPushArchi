import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest } from "rxjs";
import {
  scan,
  map,
  distinctUntilChanged,
  switchMap,
  skip,
  tap,
  take
} from "rxjs/operators";
import {
  FormationHttpService,
  MappedFormations
} from "./formation-http.service";

interface State {
  formations: MappedFormations[];
  totalFormations: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  sortedColumn: {
    colKey: string;
    ascendant: boolean;
  };
  recherche: string;
  isLoading: boolean;
}

let _state: State = {
  formations: [],
  totalFormations: 0,
  pagination: {
    pageIndex: 0,
    pageSize: 5
  },
  sortedColumn: {
    colKey: "libelle",
    ascendant: true
  },
  recherche: "",
  isLoading: true
};

@Injectable()
export class FormationFacade {
  private readonly store = new BehaviorSubject<State>(_state);
  readonly state$ = this.store.asObservable();

  isLoading$ = this.state$.pipe(
    map(state => state.isLoading),
    distinctUntilChanged()
  );

  pagination$ = this.state$.pipe(
    map(state => state.pagination),
    distinctUntilChanged()
  );

  sortedColumn$ = this.state$.pipe(
    map(state => state.sortedColumn),
    distinctUntilChanged()
  );

  recherche$ = this.state$.pipe(
    map(state => state.recherche),
    distinctUntilChanged()
  );

  mappedFormation$ = this.state$.pipe(
    map(state => state.formations),
    distinctUntilChanged()
  );

  totalFormations$ = this.state$.pipe(
    map(state => state.totalFormations),
    distinctUntilChanged()
  );

  vm$ = combineLatest(
    this.recherche$,
    this.pagination$,
    this.sortedColumn$,
    this.isLoading$,
    this.mappedFormation$,
    this.totalFormations$
  ).pipe(
    map(
      ([
        recherche,
        pagination,
        sortedColumn,
        isLoading,
        formations,
        total
      ]) => ({
        recherche,
        pagination,
        sortedColumn,
        isLoading,
        formations,
        total
      })
    )
  );

  constructor(private readonly formationsService: FormationHttpService) {
    combineLatest(this.recherche$, this.pagination$, this.sortedColumn$)
      .pipe(
        switchMap(([recherche, pagination, sortedColumn]) => {
          return this.formationsService.getFormations({
            recherche,
            pagination,
            sortedColumn
          });
        })
      )
      .subscribe(res => {
        this.updateState({
          isLoading: false,
          formations: res.formations,
          totalFormations: res.totalItems
        });
      });
  }

  filterFormations(search: string): void {
    this.updateState({ recherche: search, isLoading: true });
  }

  updatePagination(pagination): void {
    this.updateState({ pagination, isLoading: true });
  }

  sortFormations(newColKey): void {
    const { colKey, ascendant } = this.getState().sortedColumn;
    const newAsc = newColKey === colKey ? !ascendant : false;

    this.updateState({
      sortedColumn: { colKey: newColKey, ascendant: newAsc },
      pagination: {
        pageIndex: 0,
        pageSize: this.getState().pagination.pageSize
      },
      isLoading: true
    });
  }

  updateState(newPartialState: Partial<State>): void {
    _state = { ..._state, ...newPartialState };
    this.store.next(_state);
  }

  private getState(): State {
    return _state;
  }
}
