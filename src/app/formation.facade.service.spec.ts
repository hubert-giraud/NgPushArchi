import { TestBed } from "@angular/core/testing";

import { FormationFacade } from "./formation.facade.service";

describe("Formation.FacadeService", () => {
  let service: FormationFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormationFacade);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
