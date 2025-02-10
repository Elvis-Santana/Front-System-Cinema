import { inject, Injectable, signal } from '@angular/core';
import { ICinema } from '../../interfaces/ICinema.interface';
import { RouterService } from '../routerService/router.service';
import { _PORTCINEMA } from '../../../../environments/enum/Ports';
import { BehaviorSubject, filter, map, Subject, takeUntil, } from 'rxjs';
import { IAssento, IAssentoOcupadoEmSessao } from '../../interfaces/Assento.interface';
import { ISessao } from '../../interfaces/Sessao.interface';
import { ISala } from '../../interfaces/Sala.interface';
import { ITb_filme_has_tb_sala } from '../../interfaces/Tb_filme_has_tb_sala';

@Injectable({
  providedIn: 'root'
})
export class CinemaSelectionComponentComponetService {

  private PORT_CINEMA = _PORTCINEMA;
  private urlBaseCinema = "http://localhost:5000/api/Cinema";
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
  private idSala = signal<number | null>(null);
  protected idcinema = signal<string | null>(null)
  private isUserFromPageCinema = signal<boolean>(false);


  public getCinemasForMovie() {

    const url = this.getCinemaId() ? `${this.urlBaseCinema}/${this.getCinemaId()}` : this.urlBaseCinema;


    this.http.get<ICinema[]>(url).pipe(
      takeUntil(this.cinemasfilterOnDestroy$),
      map(res => {

        if (Array.isArray(res))
          return res.filter(e => e.salas.some(x => x.id_filme == this.getFilmeId()))

        return res;

      }

      )
    ).subscribe((ArrayCinemaFilter) => {

      if (!Array.isArray(ArrayCinemaFilter)) {
        this.cinema$.next([ArrayCinemaFilter])
        return;
      }

      this.cinema$.next(ArrayCinemaFilter);
    })
  }




  public getAssentoAndSessao(sessao: ISessao, Sala: ISala): void {
    this.http.get<IAssento[]>(`http://localhost:5000/api/Assento`)
      .pipe(
        takeUntil(this.assentosOnDestroy$),
        map((res: IAssento[]) =>

          res.map(a => {
            const filter = a.assentoOcupadoEmSessao.filter(x => x.id_sessao == sessao.id)
            a.assentoOcupadoEmSessao = filter;
            return a;

          })

        )
      )
      .subscribe(assentos => {
        this.assentos$.next(assentos)
      })
  }



  public getFilmeId = () => this.idFilme();
  public setFilmeId = (id: number | null) => this.idFilme.set(id);


  public getSalaId = () => this.idSala();
  public setSalaId = (id: number | null) => this.idSala.set(id);

  public getCinemaId = () => this.idcinema();
  public setCinemaId = (id: string | null) => this.idcinema.set(id);

  public getIsUserFromPageCinema = () => this.isUserFromPageCinema();
  public setIsUserFromPageCinema = (FromPageCinema: boolean) => this.isUserFromPageCinema.set(FromPageCinema);


  public resertObservabloCinemas = () => this.cinema$.next(null);
  public resertObservabloAssentos = () => this.assentos$.next([]);
  public resertObservabloSalas = () => this.salas$.next([]);
  public resertObservabloSessos = () => this.sessaos$.next([]);



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
    this.setCinemaId(null);
    this.setFilmeId(null);
    this.setSalaId(null);

  }



}





