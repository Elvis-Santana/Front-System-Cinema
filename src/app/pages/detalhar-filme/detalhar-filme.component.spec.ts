import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharFilmeComponent } from './detalhar-filme.component';

describe('DetalharFilmeComponent', () => {
  let component: DetalharFilmeComponent;
  let fixture: ComponentFixture<DetalharFilmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalharFilmeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalharFilmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
