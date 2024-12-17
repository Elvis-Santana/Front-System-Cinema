import { inject, Injectable, signal } from '@angular/core';
import { ICinema } from '../../interfaces/ICinema.interface';
import { RouterService } from '../routerService/router.service';
import { _PORTCINEMA } from '../../../../environments/enum/Ports';
import { BehaviorSubject, filter, from, map, Observable, of, single, Subject, timeout } from 'rxjs';
import { AssentoService } from '../Assento-service/assento.service';
import { IAssento } from '../../interfaces/Assento.interface';
import { ISessao } from '../../interfaces/Sessao.interface';
import { ISala } from '../../interfaces/Sala.interface';

@Injectable({
  providedIn: 'root'
})
export class CinemaSelectionComponentComponetService {
  private PORT_CINEMA = _PORTCINEMA;
  private url = this.PORT_CINEMA.development.JOSN.toString()
  protected routerService = inject(RouterService);

  protected http = inject(RouterService).getHttpClient();
  private Cinemasfilter$ = new BehaviorSubject<ICinema[]>([]);
  private Assentos$ = new BehaviorSubject<IAssento[]>([]);
  private Salas$ = new BehaviorSubject<ISala[]>([]);
  private Sessaos$ = new BehaviorSubject<ISessao[]>([]);

  constructor() { }

  public GetCinemasForMovie(id: Number) {
    this.http.get<ICinema[]>(this.url).pipe(
      filter(response =>
        response.some(c => c.filmes_Em_Cartaz.some(f => f.id == Number(id))
        )
      )
    )
      .subscribe((ArrayCinemaFilter) => this.Cinemasfilter$.next(ArrayCinemaFilter))
  }

  public GetAssentoAndSessao(id: Number) {
    this.http.get<ISessao>(`http://localhost:3000/Sessao/${id}`)
      .pipe(
        map((res: ISessao) => res.assentos)
      )
      .subscribe(assentos => this.Assentos$.next(assentos));
  }


  public ObGetAssentos = () => this.Assentos$.asObservable();
  public ObCinemaFilter = () => this.Cinemasfilter$.asObservable();
  public ObGetSalas = () => this.Salas$.asObservable();
  public ObGetSessaos = () => this.Sessaos$.asObservable();



  public resertObservabloCinemas = () => this.Cinemasfilter$.next([]);
  public resertObservabloAssentos = () => this.Assentos$.next([]);
  public resertObservabloSalas = () => this.Salas$.next([]);
  public resertObservabloSessos = () => this.Sessaos$.next([]);


  public SetObservabloSalas = (sala: ISala[]) => this.Salas$.next(sala);
  public SetObservabloSessao = (sessao: ISessao[]) => this.Sessaos$.next(sessao);
  public SetObservablAssentos = (assentos: IAssento[]) => this.Assentos$.next(assentos);



}







