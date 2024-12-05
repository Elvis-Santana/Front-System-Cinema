import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaSelectionComponentComponent } from './cinema-selection-component.component';

describe('CinemaSelectionComponentComponent', () => {
  let component: CinemaSelectionComponentComponent;
  let fixture: ComponentFixture<CinemaSelectionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinemaSelectionComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CinemaSelectionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
