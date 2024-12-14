import { Component, ElementRef, EventEmitter, inject, NgModule, OnInit, ViewChild, viewChild, ViewRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CinemaSelectionComponentComponetService } from '../../../shared/services/CinemaSelectionComponentComponetService/cinema-selection-component-componet.service';
import { ICinema } from '../../../shared/interfaces/ICinema.interface';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterService } from '../../../shared/services/routerService/router.service';
import { ISala, sessaosIds } from '../../../shared/interfaces/Sala.interface';
import { map, Observable, of, timestamp, } from 'rxjs';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { SessaoService } from '../../../shared/services/Sessao-cinema-Service/sessao.service';
import { ISessao } from '../../../shared/interfaces/Sessao.interface';
import { IAssento } from '../../../shared/interfaces/Assento.interface';
import { CommonModule } from '@angular/common';

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

  protected cinemas$: Observable<ICinema[]> = new Observable();

  protected salas$: Observable<ISala[]> = new Observable()

  protected sessaos$: Observable<ISessao[]> = new Observable();

  protected assentos$: Observable<IAssento[]> = new Observable();

  protected form!: FormGroup;

  async ngOnInit() {

    this.form = new FormGroup(
      {
        time: new FormControl("")
      }
    );


    this.getCinemaSelection();

  }

  public getCinemaSelection() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if (!id) {
      this.cinemas$ = of([]);
      return;
    }

    this.cinemas$ = this.CinemaSelectionComponentComponetService.GetCinemasForMovie(Number(id));

  }

  public OnEventSelect(salas: MatSelectChange) {

    if (!salas.value) {
      this.salas$ = of([])
      return;
    }

    const salasConvent = salas.value as ISala[];
    this.salas$ = of(salasConvent);
  }

  public OnEventExit() {



  }

  public OnEventGetTime() {

    console.log(this.form.get("time")?.value);
  }


  public async OnEventSelectSessaos(salas: MatSelectChange) {
    if (((salas.value as ISala).sessaos).length === 0) {
      this.sessaos$ = of([]);
      console.error("sessaos não encontradas")

      return;
    }
    const salasConvent = salas.value as ISala;
    this.sessaos$ = of(salasConvent.sessaos || [])

  }

  public OnEventGetAssentos(sesssao: ISessao) {
    console.log(sesssao)

    if (!sesssao) {
      this.assentos$ = of([]);
      console.error("sesssao null")
      return;
    }
    this.assentos$ = (this.sessaoService.GetSessaoById(sesssao.id))
      .pipe(map((response) => response.assentos));
  }

}




