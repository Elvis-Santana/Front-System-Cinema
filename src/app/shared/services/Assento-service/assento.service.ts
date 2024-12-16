import { inject, Injectable } from '@angular/core';
import { RouterService } from '../routerService/router.service';
import { IAssento } from '../../interfaces/Assento.interface';
import { filter, map } from 'rxjs';
import { ISessao } from '../../interfaces/Sessao.interface';

@Injectable({
  providedIn: 'root'
})
export class AssentoService {

  protected http = inject(RouterService).getHttpClient();

  constructor() { }

  public GetAssentoAndSessao = (id: Number) =>
    this.http.get<ISessao>(`http://localhost:3000/Sessao/${id}`)
      .pipe(
        map((res: ISessao) => res.assentos)
      );
}
