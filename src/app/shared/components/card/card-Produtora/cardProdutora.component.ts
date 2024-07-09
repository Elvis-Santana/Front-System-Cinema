import { Component, Input } from '@angular/core';
import { IProdutora } from '../../../interfaces/Produtora.interface';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-card-Produtora',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './cardProdutora.component.html',
  styleUrl: './cardProdutora.component.scss'
})
export class CardProdutoraComponent {
  @Input() Produtora!: IProdutora;
  protected showFilmes: boolean = false;


  protected OnShowFilmes(): void {
    this.showFilmes = true;
  }
  protected OnHideFilmes(): void {
    this.showFilmes = false;
  }
}
