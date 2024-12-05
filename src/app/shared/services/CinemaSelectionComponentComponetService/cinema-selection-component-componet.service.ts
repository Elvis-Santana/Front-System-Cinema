import { inject, Injectable, signal } from '@angular/core';
import { ICinema } from '../../interfaces/ICinema.interface';
import { RouterService } from '../routerService/router.service';
import { _PORTCINEMA } from '../../../../environments/enum/Ports';
import { map, single } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CinemaSelectionComponentComponetService {
  private PORT_CINEMA = _PORTCINEMA;
  protected Cinemas !: ICinema[];

  private _ShowSelectionCinema =signal<boolean>(false);



  protected http = inject(RouterService).getHttpClient();

  constructor() { }

  public async GetCinemasForMovie (id :Number){

     return  await this.http.get<ICinema[]>(this.PORT_CINEMA.development.JOSN.toString()).pipe(
      map((res:ICinema[])=>{
        const ListCinema = res as ICinema[];

        const listFilter = ListCinema.filter(x => x.filmes_Em_Cartaz.find(e => e.id == Number(id)));

        return listFilter
      })
     );
  }

  public  async OnEventGetCinemasForMovie(id :Number){

    (await (this.GetCinemasForMovie(id))).subscribe(res => {
      this.Cinemas = res;
    });

  }


  public OnShowSelectionCinemaOpen(){
    this._ShowSelectionCinema.set(true)
  }
  public OnShowSelectionCinemaClose(){
    this._ShowSelectionCinema.set(false)
  }

  public GetShowSelectionCinema=()=> this._ShowSelectionCinema()


  public GetCinemas =()=> this.Cinemas;
  public SetCinemas =(cinemas:ICinema[])=>{
    this.Cinemas=cinemas
  };


}
