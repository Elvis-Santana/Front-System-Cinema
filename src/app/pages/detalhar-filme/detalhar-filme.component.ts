import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { IFilme } from '../../shared/interfaces/Filme.interface';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Ports } from '../../../../environment/enum/Ports';
import { RouterService } from '../../shared/services/routerService/router.service';

@Component({
  selector: 'app-detalhar-filme',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './detalhar-filme.component.html',
  styleUrl: './detalhar-filme.component.scss'
})
export class DetalharFilmeComponent implements OnInit {
  protected http = inject(RouterService).getHttpClient();
  protected activatedRoute = inject(ActivatedRoute);
  protected Filme !: IFilme;



  async ngOnInit(): Promise<void> {

    try {

      const id = this.activatedRoute.snapshot.paramMap.get("id");

      await this.http.get<IFilme>(`${Ports.Api_CSharp_PortsFilmes}/${id}`).subscribe(e => {

        this.Filme = e as IFilme;
      })

    } catch (error) {
      console.error(error)
    }
  }


}
