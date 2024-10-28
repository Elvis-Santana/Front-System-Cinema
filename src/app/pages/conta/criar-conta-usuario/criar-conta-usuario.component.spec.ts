import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarContaUsuarioComponent } from './criar-conta-usuario.component';

describe('CriarContaUsuarioComponent', () => {
  let component: CriarContaUsuarioComponent;
  let fixture: ComponentFixture<CriarContaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarContaUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarContaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
