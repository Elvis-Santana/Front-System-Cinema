import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { IFilme } from '../../shared/interfaces/Filme.interface';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { _PORTCINEMA, _PORTFILMES } from '../../../environments/enum/Ports';
import { RouterService } from '../../shared/services/routerService/router.service';
import { ICinema } from '../../shared/interfaces/ICinema.interface';
import { CinemaSelectionComponentComponent } from '../../shared/components/CinemaSelectionComponent/cinema-selection-component/cinema-selection-component.component';
import { CinemaSelectionComponentComponetService } from '../../shared/services/CinemaSelectionComponentComponetService/cinema-selection-component-componet.service';



@Component({
  selector: 'app-detalhar-filme',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CinemaSelectionComponentComponent
  ],
  templateUrl: './detalhar-filme.component.html',
  styleUrl: './detalhar-filme.component.scss'
})
export class DetalharFilmeComponent implements OnInit {
  private PORT_FILMES = _PORTFILMES;
  private PORT_CINEMA = _PORTCINEMA;

  protected http = inject(RouterService).getHttpClient();
  protected activatedRoute = inject(ActivatedRoute);
  protected CinemaSelectionComponentComponetService = inject(CinemaSelectionComponentComponetService);

  protected Filme !: IFilme;
  protected Cinemas !: ICinema[];

  async ngOnInit(): Promise<void> {

    try {


      const id = this.activatedRoute.snapshot.paramMap.get("id");

      await this.http.get<IFilme>(`${this.PORT_FILMES.development.JOSN}/${id}`).subscribe(e => {

        this.Filme = e as IFilme;
      })


    } catch (error) {
      console.error(error)
    }
  }
  public OnEventListCinema(id:Number){
    this.CinemaSelectionComponentComponetService.OnEventGetCinemasForMovie(id);
    this.CinemaSelectionComponentComponetService.OnShowSelectionCinemaOpen()
  }

}
