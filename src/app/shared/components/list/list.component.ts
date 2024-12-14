import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, inject, signal } from '@angular/core';
import { ListService } from '../../services/listService/list.service';
import { IProdutora } from '../../interfaces/Produtora.interface';
import { HttpClientModule } from '@angular/common/http';
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
export class ListComponent implements OnInit {


  @ViewChild('scrollbar') RefInput!: ElementRef;
  @ViewChildren('items') items!: QueryList<ElementRef>;

  protected element!: ElementRef[];
  protected produtorasSignal = signal<IProdutora[]>([]);
  protected filmesSignal = signal<IFilme[]>([]);
  protected cinemasSignal = signal<ICinema[]>([]);


  protected listService = inject(ListService);
  protected router = inject(Router);
  protected PalavrasReservadas = PalavrasReservadas;
  protected url: string = "";

  async ngOnInit() {

    await this.loadFilmes();
    await this.loadProdutoras();
    await this.loadCinema();

    this.url = (this.router.url.slice(1,));
    if (!this.url) {

    }



  }

  async loadCinema(){
      (await this.listService.CinemaFilme())
      .subscribe((data)=>{
        this.cinemasSignal.set(data)
      })
  }

  async loadProdutoras() {
    (await this.listService.GetProdutora()).subscribe((data) => {
      this.produtorasSignal.set(data)

    })

  }

  async loadFilmes() {
    (await this.listService.GetFilme()).subscribe((data) => {
      this.filmesSignal.set(data)

      const imgs: String[] = data.map(e => e.imgPath);
    })

  }


}



