import { Component, OnInit, inject } from '@angular/core';
import { ListService } from '../../services/listService/list.service';
import { Observable } from 'rxjs';
import { IProdutora } from '../../interfaces/Produtora.interface';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CardProdutoraComponent } from '../card/card-Produtora/cardProdutora.component';
import { MatCardModule } from '@angular/material/card';
import { IFilme } from '../../interfaces/Filme.interface';
import { CardFilmeComponent } from '../card/card-filme/card-filme.component';
import { Router, RouterModule } from '@angular/router';
import { PalavrasReservadas } from '../../../../../environment/enum/PalavrasReservadas';

@Component({
  selector: 'app-list-produtora',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    CardProdutoraComponent,
    CardFilmeComponent,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  public listP$: Observable<IProdutora[]> = new Observable<IProdutora[]>()
  public listF$: Observable<IFilme[]> = new Observable<IFilme[]>()

  protected listService = inject(ListService);
  protected router = inject(Router);
  protected PalavrasReservadas = PalavrasReservadas;
  public url: string = "";

  async ngOnInit() {
    this.listP$ = (await this.listService.GetProdutora());
    this.listF$ = (await this.listService.GetFilme());

    this.url = (this.router.url.slice(1,));
    if (!this.url) {

    }
  }


}
