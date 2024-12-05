import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IProdutora } from '../../interfaces/Produtora.interface';
import { IFilme } from '../../interfaces/Filme.interface';
import { ICinema } from '../../interfaces/ICinema.interface';
import {  _PORTFILMES,  _PORTCINEMA,_PORTPRODUTORA } from '../../../../environments/enum/Ports';
import { RouterService } from '../routerService/router.service';





@Injectable({
  providedIn: 'root'
})
export class ListService {
  private PORT_FILMES = _PORTFILMES;
  private PORT_CINEMA = _PORTCINEMA;
  private PORT_PRODUTORA = _PORTPRODUTORA;


  protected http = inject(RouterService).getHttpClient();
  constructor() { }

  public async GetProdutora(): Promise<Observable<IProdutora[]>> {
    return this.http.get<IProdutora[]>(String(this.PORT_PRODUTORA.development.JOSN)).pipe(
      map((res: IProdutora[]) => {
        return res;
      })
    )
  }
  public async GetFilme(): Promise<Observable<IFilme[]>> {

    return this.http.get<IFilme[]>(String(this.PORT_FILMES.development.JOSN)).pipe(
      map((res: IFilme[]) => {
        return res;

      })
    )
  }

  public async CinemaFilme(): Promise<Observable<ICinema[]>> {
    return this.http.get<ICinema[]>(String(this.PORT_CINEMA.development.JOSN)).pipe(
      map((res: ICinema[]) => {
            //console.log(res);
        return res;
      })
    )
  }

}
