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
import { filter, fromEvent, map, Observable, of, Subject, } from 'rxjs';
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

  protected CinemaSelectionService = inject(CinemaSelectionComponentComponetService);
  protected activatedRoute = inject(ActivatedRoute);
  protected sessaoService = inject(SessaoService);
  protected assentoService = inject(AssentoService);

  protected cinemas$: Observable<ICinema[]> = this.CinemaSelectionService.ObCinemaFilter();
  protected salas$: Observable<ISala[]> = this.CinemaSelectionService.ObGetSalas()
  protected sessaos$: Observable<ISessao[]> = this.CinemaSelectionService.ObGetSessaos()
  protected assentos$: Observable<IAssento[]> = this.CinemaSelectionService.ObGetAssentos();

  protected form: FormGroup = new FormGroup({

    time: new FormControl<string | null>(""),
    selectSala: new FormControl<ISala | null>(null),
    selectCinema: new FormControl<ICinema | null>(null)

  });



  async ngOnInit() {
    this.GetCinemasSelection();

  }

  public GetCinemasSelection() {

    const id: Number = Number(this.activatedRoute.snapshot.paramMap.get("id")) ?? null;
    if (!id || id === null) {
      this.CinemaSelectionService.resertObservabloCinemas();
      return;
    }

    this.CinemaSelectionService.GetCinemasForMovie(Number(id));

  }

  public OnEventSelectCinemaInSalas(cinema: MatSelectChange) {
    const cinemaConvent = (cinema.value as ICinema);

    this.CinemaSelectionService.resertObservabloSalas();
    this.CinemaSelectionService.resertObservabloSessos();
    this.CinemaSelectionService.resertObservabloAssentos();

    this.form.get("selectSala")?.reset();

    this.CinemaSelectionService.SetObservabloSalas(cinemaConvent.Salas);
  }



  public async OnEventSelectSalaInSessaos(salas: MatSelectChange) {
    const salaConvent = (salas.value as ISala);


    if (salaConvent.sessaos.length === 0) {
      this.CinemaSelectionService.resertObservabloSessos();
      console.error("sessaos não encontradas")
      return;
    }
    this.CinemaSelectionService.SetObservabloSessao(salaConvent.sessaos);


  }

  public OnEventGetAssentosInSessao(sesssao: ISessao) {


    if (!sesssao) {
      console.error("sessao null"); //new
      this.CinemaSelectionService.resertObservabloAssentos(); //new
      return;

    }

    this.CinemaSelectionService.GetAssentoAndSessao(sesssao.id);

  }


  public OnEventExit() {



  }

  public OnEventGetTime() {

    console.log(this.form.get("time")?.value);
  }

}




