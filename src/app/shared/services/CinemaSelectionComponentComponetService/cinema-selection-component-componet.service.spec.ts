import { TestBed } from '@angular/core/testing';

import { CinemaSelectionComponentComponetService } from './cinema-selection-component-componet.service';

describe('CinemaSelectionComponentComponetService', () => {
  let service: CinemaSelectionComponentComponetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CinemaSelectionComponentComponetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
