import { inject, Injectable, signal } from '@angular/core';
import { ICinema } from '../../interfaces/ICinema.interface';
import { RouterService } from '../routerService/router.service';
import { _PORTCINEMA } from '../../../../environments/enum/Ports';
import { BehaviorSubject, filter, map, Subject, takeUntil, } from 'rxjs';
import { IAssento } from '../../interfaces/Assento.interface';
import { ISessao } from '../../interfaces/Sessao.interface';
import { ISala } from '../../interfaces/Sala.interface';
import { ITb_filme_has_tb_sala } from '../../interfaces/Tb_filme_has_tb_sala';

@Injectable({
  providedIn: 'root'
})
export class CinemaSelectionComponentComponetService {

  private PORT_CINEMA = _PORTCINEMA;
  private url = this.PORT_CINEMA.development.JOSN.toString()
  protected routerService = inject(RouterService);

  protected http = inject(RouterService).getHttpClient();
  private cinema$ = new BehaviorSubject<ICinema[] | null>(null);
  private assentos$ = new BehaviorSubject<IAssento[]>([]);
  private salas$ = new BehaviorSubject<ISala[]>([]);
  private sessaos$ = new BehaviorSubject<ISessao[]>([]);
  private filme_has_tb_sala$ = new BehaviorSubject<ITb_filme_has_tb_sala[]>([]);

  public obGetAssentos = () => this.assentos$.asObservable();
  public obCinemaFilter = () => this.cinema$.asObservable();
  public obGetSalas = () => this.salas$.asObservable();
  public obGetSessaos = () => this.sessaos$.asObservable();
  public obGetFilme_has_tb_sala = () => this.filme_has_tb_sala$.asObservable();


  private filme_has_tb_salaOnDestroy$ = new Subject<void>();
  private cinemasfilterOnDestroy$ = new Subject<void>();
  private assentosOnDestroy$ = new Subject<void>();
  private salasOnDestroy$ = new Subject<void>();
  private sessaosDestroy$ = new Subject<void>();

  private idFilme = signal<number | null>(null);
  private isUserFromPageCinema = signal<boolean>(false);


  public getCinemasForMovie(id: number) {
    this.setFilmeId(id)
    this.http.get<ICinema[]>(this.url).pipe(
      takeUntil(this.cinemasfilterOnDestroy$),
      map(res =>
        res.filter(e => e.Salas.some(x => x.id_filme == this.getFilmeId()))
      )
    ).subscribe((ArrayCinemaFilter) => {
      this.cinema$.next(ArrayCinemaFilter)
    })
  }

  public getAssentoAndSessao(Sessao: ISessao, Sala: ISala): void {
    this.http.get<IAssento[]>(`http://192.168.0.107:3000/Assento`)
      .pipe(
        takeUntil(this.assentosOnDestroy$),
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
        console.log(assentos)
        this.assentos$.next(assentos)
      })
  }



  public getFilmeId = () => this.idFilme();
  public setFilmeId = (id: number) => this.idFilme.set(id);


  public getIsUserFromPageCinema = () => this.isUserFromPageCinema();
  public setIsUserFromPageCinema = (FromPageCinema: boolean) => this.isUserFromPageCinema.set(FromPageCinema);


  public resertObservabloCinemas = () => this.cinema$.next(null);
  public resertObservabloAssentos = () => this.assentos$.next([]);
  public resertObservabloSalas = () => this.salas$.next([]);
  public resertObservabloSessos = () => this.sessaos$.next([]);

  public setCinemaFormCardCinema(cinemas: ICinema[], id: number) {


    this.setFilmeId(id);
    this.setObservabloCinema(cinemas)
    this.isUserFromPageCinema.set(true);
  }

  public setObservabloCinema = (cinemas: ICinema[]) => {
    this.cinema$.next(cinemas);
    this.cinema$.pipe(takeUntil(this.cinemasfilterOnDestroy$)).subscribe();
  }
  public setObservabloSalas = (sala: ISala[]) => {
    this.salas$.next(sala);
    this.salas$.pipe(takeUntil(this.salasOnDestroy$)).subscribe();
  };
  public setObservabloSessao = (sessao: ISessao[]) => {
    this.sessaos$.next(sessao)
    this.sessaos$.pipe(takeUntil(this.sessaosDestroy$)).subscribe();
  };


  public OnDestroy() {
    this.filme_has_tb_salaOnDestroy$.next()
    this.filme_has_tb_salaOnDestroy$.complete()

    this.cinemasfilterOnDestroy$.next();
    this.cinemasfilterOnDestroy$.complete();

    this.salasOnDestroy$.next();
    this.salasOnDestroy$.complete();

    this.sessaosDestroy$.next();
    this.sessaosDestroy$.complete();

    this.assentosOnDestroy$.next();
    this.assentosOnDestroy$.complete();


    this.resertObservabloAssentos();
    this.resertObservabloCinemas();
    this.resertObservabloSalas();
    this.resertObservabloSessos();
    this.isUserFromPageCinema.set(false);

  }



}





