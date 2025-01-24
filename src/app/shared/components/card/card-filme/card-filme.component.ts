import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IFilme } from '../../../interfaces/Filme.interface';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { RouterService } from '../../../services/routerService/router.service';
import { CinemaSelectionComponentComponetService } from '../../../services/CinemaSelectionComponentComponetService/cinema-selection-component-componet.service';

@Component({
  selector: 'app-card-filme',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './card-filme.component.html',
  styleUrl: './card-filme.component.scss'
})
export class CardFilmeComponent {

  @Output() eventComparar: EventEmitter<IFilme> = new EventEmitter<IFilme>()
  @Input() filme!: IFilme;

  protected router = inject(RouterService);


  public onEventDetanhar = (filme: IFilme) => this.router.nav(`filme/detalhar/${filme.id}`)


  public onEventListCinema(filme: IFilme) {
    this.eventComparar.emit(filme);
  }



}
