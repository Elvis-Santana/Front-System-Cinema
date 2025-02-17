import { inject, Injectable } from '@angular/core';
import { RouterService } from '../routerService/router.service';
import { map, Observable } from 'rxjs';
import { ISessao } from '../../interfaces/Sessao.interface';
import { sessaosIds } from '../../interfaces/Sala.interface';
import { IAssento } from '../../interfaces/Assento.interface';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  protected http = inject(RouterService).getHttpClient()
  constructor() { }


  public  GetSessaoById  = (id: Number) =>  this.http.get<ISessao>
    (`https://localhost:5000/api/Sessao/${id}`)
    .pipe(map((res: ISessao) => res));




}
