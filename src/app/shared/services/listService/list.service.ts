import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IProdutora } from '../../interfaces/Produtora.interface';
import { IFilme } from '../../interfaces/Filme.interface';
import { ICinema } from '../../interfaces/ICinema.interface';
import { Ports } from '../../../../../environment/enum/Ports';
import { RouterService } from '../routerService/router.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  protected http = inject(RouterService).getHttpClient();
  constructor() { }

  public async GetProdutora(): Promise<Observable<IProdutora[]>> {
    return this.http.get<IProdutora[]>("http://localhost:3000/Produtora").pipe(
      map((res: IProdutora[]) => {
        console.log(res)
        return res;
      })
    )
  }
  public async GetFilme(): Promise<Observable<IFilme[]>> {
    return this.http.get<IFilme[]>(Ports.Api_CSharp_PortsFilmes).pipe(
      map((res: IFilme[]) => {
        console.log(res)
        return res;
      })
    )
  }

  public async CinemaFilme(): Promise<Observable<ICinema[]>> {
    return this.http.get<ICinema[]>("http://localhost:3000/Cinema").pipe(
      map((res: ICinema[]) => {
        console.log(res)
        return res;
      })
    )
  }

}
