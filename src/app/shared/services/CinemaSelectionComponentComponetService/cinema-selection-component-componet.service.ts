import { inject, Injectable, signal } from '@angular/core';
import { ICinema } from '../../interfaces/ICinema.interface';
import { RouterService } from '../routerService/router.service';
import { _PORTCINEMA } from '../../../../environments/enum/Ports';
import { map, single, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CinemaSelectionComponentComponetService {
  private PORT_CINEMA = _PORTCINEMA;
  private url = this.PORT_CINEMA.development.JOSN.toString()
  protected routerService = inject(RouterService);
  protected http = inject(RouterService).getHttpClient();

  constructor() { }

  public GetCinemasForMovie = (id: Number) => {


    return this.http.get<ICinema[]>(this.url).pipe(
      map((cinema: ICinema[]) =>
        cinema.filter(x => x.filmes_Em_Cartaz.some(e => e.id == Number(id)))

      )
    );
  }







}
