import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCinemaComponent } from './card-cinema.component';

describe('CardCinemaComponent', () => {
  let component: CardCinemaComponent;
  let fixture: ComponentFixture<CardCinemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCinemaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardCinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
