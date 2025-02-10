import { Injectable, OnInit, inject } from '@angular/core';
import { Observable, BehaviorSubject, map, Subject, takeUntil } from 'rxjs';
import { IProdutora } from '../../interfaces/Produtora.interface';
import { IFilme } from '../../interfaces/Filme.interface';
import { ICinema } from '../../interfaces/ICinema.interface';
import { _PORTFILMES, _PORTCINEMA, _PORTPRODUTORA } from '../../../../environments/enum/Ports';
import { RouterService } from '../routerService/router.service';





@Injectable({
  providedIn: 'root'
})
export class ListService {
  private PORT_FILMES = _PORTFILMES;
  private PORT_CINEMA = _PORTCINEMA;
  private PORT_PRODUTORA = _PORTPRODUTORA;

  private Produtora$ = new BehaviorSubject<IProdutora[]>([]);
  private Filme$ = new BehaviorSubject<IFilme[]>([]);
  private Cinema$ = new BehaviorSubject<ICinema[]>([]);

  private ProdutoraDestroy$ = new Subject<void>();
  private FilmeDestroy$ = new Subject<void>();
  private CinemaDestroy$ = new Subject<void>();

  protected http = inject(RouterService).getHttpClient();
  public ObGetProdutora = () => this.Produtora$.asObservable();
  public ObGetFilme = () => this.Filme$.asObservable();
  public ObGetCinema = () => this.Cinema$.asObservable();




  public GetProdutora() {
    this.http.get<IProdutora[]>(String('http://localhost:5000/api/Produtora')).pipe(
      takeUntil(this.ProdutoraDestroy$),
      map((res: IProdutora[]) => res)
    ).subscribe(e => this.Produtora$.next(e))
  }
  public GetFilme() {

    this.http.get<IFilme[]>(String('http://localhost:5000/api/Filmes')).pipe(
      takeUntil(this.FilmeDestroy$),
      map((res: IFilme[]) => {
        return res;

      })
    ).subscribe(e => this.Filme$.next(e))
  }


  public GetCinema() {
    this.http.get<ICinema[]>(String('http://localhost:5000/api/Cinema')).pipe(
      takeUntil(this.CinemaDestroy$),
      map((res: ICinema[]) => {
        return res;
      })
    ).subscribe(e => this.Cinema$.next(e))
  }


  public TESTE_TokenInterceptor() {
    this.http.get("https://localhost:7100/api/Login/TESTE-cliente", { responseType: "text" })
      .subscribe(e => console.log(e))
  }

  public OnDestroy() {

    this.ProdutoraDestroy$.next();
    this.ProdutoraDestroy$.complete();

    this.FilmeDestroy$.next();
    this.FilmeDestroy$.complete();


    this.CinemaDestroy$.next();
    this.CinemaDestroy$.complete();

  }
}
