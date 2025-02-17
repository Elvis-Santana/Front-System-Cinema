import { Component, inject, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ICinema } from '../../../interfaces/ICinema.interface';
import { CardFilmeComponent } from '../card-filme/card-filme.component';
import { MatButton } from '@angular/material/button';
import { CinemaSelectionComponentComponetService } from '../../../services/CinemaSelectionComponentComponetService/cinema-selection-component-componet.service';
import { RouterService } from '../../../services/routerService/router.service';
import { IFilme } from '../../../interfaces/Filme.interface';
import { ISala } from '../../../interfaces/Sala.interface';

@Component({
  selector: 'app-card-cinema',
  standalone: true,
  imports: [
    MatCardModule,
    CardFilmeComponent,
    MatButton
  ],
  templateUrl: './card-cinema.component.html',
  styleUrl: './card-cinema.component.scss'
})
export class CardCinemaComponent implements OnInit {
  protected cinemaSelectionService = inject(CinemaSelectionComponentComponetService);
  protected routerService = inject(RouterService);

  @Input() cinema!: ICinema;
  protected salas!: ISala[];
  protected viewFilmes: boolean = true


  ngOnInit(): void {
    this.salas = this.cinema.salas;

  }
  public selectViewFilmes(): void {
    this.viewFilmes = !this.viewFilmes;
  }

  protected onEventNavigation(filme: IFilme,sala:ISala) {
    this.routerService.Router().navigate(
      [`selecionar-cinema/${filme.id}`],
      { queryParams: { cinema: this.cinema.id ,sala:sala.id} });

  }

}
