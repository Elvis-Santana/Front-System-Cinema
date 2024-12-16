import { Component, inject, OnInit, ViewChild, viewChild, ViewRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CinemaSelectionComponentComponetService } from '../../../shared/services/CinemaSelectionComponentComponetService/cinema-selection-component-componet.service';
import { ICinema } from '../../../shared/interfaces/ICinema.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { ISala } from '../../../shared/interfaces/Sala.interface';
import { fromEvent, map, Observable, of, } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessaoService } from '../../../shared/services/Sessao-cinema-Service/sessao.service';
import { ISessao } from '../../../shared/interfaces/Sessao.interface';
import { IAssento } from '../../../shared/interfaces/Assento.interface';
import { CommonModule } from '@angular/common';
import { AssentoService } from '../../../shared/services/Assento-service/assento.service';

@Component({
  selector: 'app-cinema-selection-component',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIcon,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule

  ],
  templateUrl: './cinema-selection-component.component.html',
  styleUrl: './cinema-selection-component.component.scss'
})
export class CinemaSelectionComponentComponent implements OnInit {

  public CinemaSelectionComponentComponetService = inject(CinemaSelectionComponentComponetService);
  protected activatedRoute = inject(ActivatedRoute);
  protected sessaoService = inject(SessaoService);
  protected assentoService = inject(AssentoService);

  protected cinemas$: Observable<ICinema[]> = new Observable();
  protected salas$: Observable<ISala[]> = new Observable()
  protected sessaos$: Observable<ISessao[]> = new Observable();
  protected assentos$: Observable<IAssento[]> = new Observable();

  protected form: FormGroup = new FormGroup(
    {
      time: new FormControl<string | null>("")
    }
  );

  async ngOnInit() {

    this.getCinemaSelection();

  }

  public getCinemaSelection() {
    const id: Number = Number(this.activatedRoute.snapshot.paramMap.get("id")) ?? null;
    if (!id || id === null) {
      this.cinemas$ = of([]);
      return;
    }


    this.cinemas$ = this.CinemaSelectionComponentComponetService.GetCinemasForMovie(Number(id));

  }

  public OnEventSelect(salas: MatSelectChange) {
    const salasConvent = salas.value as ISala[];

    if (!salasConvent) {
      this.salas$ = of([])
      return;
    }

    this.salas$ = of(salasConvent);
  }

  public OnEventExit() {



  }

  public OnEventGetTime() {

    console.log(this.form.get("time")?.value);
  }


  public async OnEventSelectSessaos(salas: MatSelectChange) {
    const salasConvent = salas.value as ISala;


       if (salasConvent.sessaos.length === 0) {
      this.sessaos$ = of([]);
      this.assentos$ = of([]);
      console.error("sessaos não encontradas")
      return;
    }
    this.sessaos$ = of(salasConvent.sessaos || [])

  }

  public OnEventGetAssentos(sesssao: ISessao) {
    console.log(sesssao)

    if (!sesssao) {
      this.assentos$ = of([]);
      console.error("sesssao null")
      return;
    }
    this.assentos$ = (this.assentoService.GetAssentoAndSessao(sesssao.id))

  }

}




