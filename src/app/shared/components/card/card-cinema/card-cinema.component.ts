import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ICinema } from '../../../interfaces/ICinema.interface';
import { CardFilmeComponent } from '../card-filme/card-filme.component';
import { MatButton } from '@angular/material/button';

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
export class CardCinemaComponent {

   @Input()  Cinema! :ICinema;

   protected ViewFilmes:boolean = true



   public  selectViewFilmes():void{
    this.ViewFilmes =!this.ViewFilmes;
   }

}
