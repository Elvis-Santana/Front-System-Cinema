import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProdutoraComponent } from './listProdutora.component';

describe('ListProdutoraComponent', () => {
  let component: ListProdutoraComponent;
  let fixture: ComponentFixture<ListProdutoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProdutoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProdutoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
