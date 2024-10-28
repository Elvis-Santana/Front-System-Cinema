import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IFilme } from '../../../interfaces/Filme.interface';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

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

   protected router =inject(Router);

  public route(filme:IFilme):void{
    this.router.navigate([`filme/detalhar/${filme.id}`])

  }

}
