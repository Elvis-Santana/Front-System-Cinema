import { TestBed } from '@angular/core/testing';
import { SessaoServiceService } from './sessao-service.service';


describe('SessaoServiceService', () => {
  let service: SessaoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessaoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
