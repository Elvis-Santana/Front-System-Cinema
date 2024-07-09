import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IProdutora } from '../../interfaces/Produtora.interface';
import { IFilme } from '../../interfaces/Filme.interface';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  protected http = inject(HttpClient)
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
    return this.http.get<IFilme[]>("http://localhost:3000/Filme").pipe(
      map((res: IFilme[]) => {
        console.log(res)
        return res;
      })
    )
  }

}
