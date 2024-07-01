import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IProdutora } from '../../interfaces/Produtora.interface';

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

}
