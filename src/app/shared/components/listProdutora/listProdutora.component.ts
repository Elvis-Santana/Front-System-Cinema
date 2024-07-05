import { Component, OnInit, inject } from '@angular/core';
import { ListService } from '../../services/listService/list.service';
import { Observable } from 'rxjs';
import { IProdutora } from '../../interfaces/Produtora.interface';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CardProdutoraComponent } from '../cardProdutora/cardProdutora.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-list-produtora',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    CardProdutoraComponent,
    MatCardModule
  ],
  templateUrl: './listProdutora.component.html',
  styleUrl: './listProdutora.component.scss'
})
export class ListProdutoraComponent implements OnInit {

  public list$: Observable<IProdutora[]> = new Observable<IProdutora[]>()

  protected listService = inject(ListService);

  async ngOnInit() {
    this.list$ = (await this.listService.GetProdutora())
  }


}
