import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProdutoraComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardProdutoraComponent;
  let fixture: ComponentFixture<CardProdutoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProdutoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProdutoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
