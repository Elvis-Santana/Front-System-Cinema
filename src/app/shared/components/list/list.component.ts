import { Component, OnInit, inject } from '@angular/core';
import { ListService } from '../../services/listService/list.service';
import { Observable } from 'rxjs';
import { IProdutora } from '../../interfaces/Produtora.interface';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  public list$: Observable<IProdutora[]> = new Observable<IProdutora[]>()

  protected listService = inject(ListService);

  async  ngOnInit() {
    this.list$ = (await this.listService.GetProdutora())
  }


}
