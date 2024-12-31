import { inject, Injectable, signal } from '@angular/core';
import { ICinema } from '../../interfaces/ICinema.interface';
import { RouterService } from '../routerService/router.service';
import { _PORTCINEMA } from '../../../../environments/enum/Ports';
import { BehaviorSubject, filter, from, map, Observable, of, single, Subject, takeUntil, timeout } from 'rxjs';
import { IAssento, IAssentoOcupado } from '../../interfaces/Assento.interface';
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

  private CinemasfilterOnDestroy$ = new Subject<void>();
  private AssentosOnDestroy$ = new Subject<void>();
  private SalasOnDestroy$ = new Subject<void>();
  private SessaosDestroy$ = new Subject<void>();


  public GetCinemasForMovie(id: Number) {
    this.http.get<ICinema[]>(this.url).pipe(
      takeUntil(this.CinemasfilterOnDestroy$),
      filter(response =>
        response.some(c => c.filmes_Em_Cartaz.some(f => f.id == Number(id))
        )
      )
    )
      .subscribe((ArrayCinemaFilter) => this.Cinemasfilter$.next(ArrayCinemaFilter))
  }

  public GetAssentoAndSessao(Sessao: ISessao, Sala: ISala): void {
    this.http.get<IAssento[]>(`http://192.168.0.107:3000/Assento`)
      .pipe(
        takeUntil(this.AssentosOnDestroy$),
        filter(res => res.some((X) =>
          X.sala_id == Sala.id &&
          X.AssentoOcupado.some(E => E.sessao_id == Sessao.id))),
        map((res: IAssento[]) =>
          res.map((A) => {

            const filter = A.AssentoOcupado.filter(x => x.sessao_id == Sessao.id)
            A.AssentoOcupado = filter;
            return A;
          })
        )
      )
      .subscribe(assentos => {
        this.Assentos$.next(assentos)
      })
  }


  public ObGetAssentos = () => this.Assentos$.asObservable();
  public ObCinemaFilter = () => this.Cinemasfilter$.asObservable();
  public ObGetSalas = () => this.Salas$.asObservable();
  public ObGetSessaos = () => this.Sessaos$.asObservable();



  public resertObservabloCinemas = () => this.Cinemasfilter$.next([]);
  public resertObservabloAssentos = () => this.Assentos$.next([]);
  public resertObservabloSalas = () => this.Salas$.next([]);
  public resertObservabloSessos = () => this.Sessaos$.next([]);


  public SetObservabloSalas = (sala: ISala[]) => {
    this.Salas$.next(sala);
    this.Salas$.pipe(takeUntil(this.SalasOnDestroy$)).subscribe();
  };
  public SetObservabloSessao = (sessao: ISessao[]) => {
    this.Sessaos$.next(sessao)
    this.Sessaos$.pipe(takeUntil(this.SessaosDestroy$)).subscribe();
  };


  public OnDestroy() {
    this.CinemasfilterOnDestroy$.next();
    this.CinemasfilterOnDestroy$.complete();

    this.SalasOnDestroy$.next();
    this.SalasOnDestroy$.complete();

    this.SessaosDestroy$.next();
    this.SessaosDestroy$.complete();

    this.AssentosOnDestroy$.next();
    this.AssentosOnDestroy$.complete();


    this.resertObservabloAssentos();
    this.resertObservabloCinemas();
    this.resertObservabloSalas();
    this.resertObservabloSessos();

  }



}





