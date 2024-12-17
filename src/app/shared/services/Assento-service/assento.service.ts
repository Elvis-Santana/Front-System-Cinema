import { inject, Injectable } from '@angular/core';
import { RouterService } from '../routerService/router.service';
import { IAssento } from '../../interfaces/Assento.interface';
import { filter, map, Subject } from 'rxjs';
import { ISessao } from '../../interfaces/Sessao.interface';

@Injectable({
  providedIn: 'root'
})
export class AssentoService {

  protected http = inject(RouterService).getHttpClient();
  private Assentos$: Subject<IAssento[]> = new Subject()
  constructor() { }



}
