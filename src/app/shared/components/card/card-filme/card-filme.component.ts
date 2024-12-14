import { Component, inject, Input } from '@angular/core';
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
    RouterOutlet
  ],
  templateUrl: './card-filme.component.html',
  styleUrl: './card-filme.component.scss'
})
export class CardFilmeComponent {
  @Input() Filme!: IFilme;

  protected router = inject(RouterService);
  protected routerService = inject(RouterService);


  public OnEventDetanhar = (filme: IFilme) => this.router.nav(`filme/detalhar/${filme.id}`)


  public OnEventListCinema(id:Number){
    this.routerService.nav(`selecionar-cinema/${id}`);
  }

}
