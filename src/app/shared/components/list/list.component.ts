import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, inject, signal } from '@angular/core';
import { ListService } from '../../services/listService/list.service';
import { IProdutora } from '../../interfaces/Produtora.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IFilme } from '../../interfaces/Filme.interface';
import { CardFilmeComponent } from '../card/card-filme/card-filme.component';
import { Router, RouterModule } from '@angular/router';
import { PalavrasReservadas } from '../../../../environments/enum/PalavrasReservadas';
import { MatIconModule } from '@angular/material/icon';
import { ICinema } from '../../interfaces/ICinema.interface';
import { CardCinemaComponent } from '../card/card-cinema/card-cinema.component';
import { CardProdutoraComponent } from '../card/card-Produtora/cardProdutora.component';
import { CarroselComponent } from '../carrosel/carrosel.component';
import { CinemaSelectionComponentComponent } from '../../../pages/CinemaSelectionComponent/cinema-selection-component/cinema-selection-component.component';



@Component({
  selector: 'app-list-produtora',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    CardProdutoraComponent,
    CardFilmeComponent,
    CardCinemaComponent,
    MatCardModule,
    RouterModule,
    MatIconModule,
    CarroselComponent,
    MatCardModule,

  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit ,OnDestroy {



  @ViewChild('scrollbar') RefInput!: ElementRef;
  @ViewChildren('items') items!: QueryList<ElementRef>;

  protected element!: ElementRef[];
  protected listService = inject(ListService);

  protected Produtoras$ = this.listService.ObGetProdutora();
  protected Filmes$ = this.listService.ObGetFilme();
  protected Cinemas$ = this.listService.ObGetCinema();


  protected router = inject(Router);
  protected PalavrasReservadas = PalavrasReservadas;
  protected url: string = "";
  public httpClient = inject(HttpClient)

  async ngOnInit() {

    this.listService.GetProdutora()
    this.listService.GetFilme()
    this.listService.GetCinema()

    this.url = (this.router.url.slice(1,));
  }

  ngOnDestroy(): void {
    this.listService.OnDestroy()
  }
}



