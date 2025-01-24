import { Component, EventEmitter, inject, OnDestroy, OnInit, Output, ViewChild, viewChild, ViewRef } from '@angular/core';
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
import { IAssento, IAssentoOcupado } from '../../../shared/interfaces/Assento.interface';
import { CommonModule } from '@angular/common';
import { AssentoService } from '../../../shared/services/Assento-service/assento.service';
import { IFilme } from '../../../shared/interfaces/Filme.interface';

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
    CommonModule,


  ],
  templateUrl: './cinema-selection-component.component.html',
  styleUrl: './cinema-selection-component.component.scss'
})
export class CinemaSelectionComponentComponent implements OnInit, OnDestroy {

  protected cinemaSelectionService = inject(CinemaSelectionComponentComponetService);

  protected activatedRoute = inject(ActivatedRoute);

  protected cinemas$: Observable<ICinema[] | null> = this.cinemaSelectionService.obCinemaFilter();
  protected salas$=this.cinemaSelectionService.obGetSalas()
  protected sessaos$= this.cinemaSelectionService.obGetSessaos()
  protected assentos$= this.cinemaSelectionService.obGetAssentos();

  protected form: FormGroup = new FormGroup({

    date: new FormControl<Date | null>(null),
    selectSala: new FormControl<ISala | null>(null),
    selectCinema: new FormControl<ICinema | null>(null)

  });




  async ngOnInit() {
    if (!this.cinemaSelectionService.getIsUserFromPageCinema())
      this.getCinemasSelection();
  }

  public getCinemasSelection() {
    const id: Number = Number(this.activatedRoute.snapshot.paramMap.get("id")) ?? null;
    this.cinemaSelectionService.getCinemasForMovie(Number(id));
  }


  public onEventSelectCinemaInSalas(cinema: MatSelectChange) {
    const cinemaConvent = (cinema.value as ICinema);

    this.form.get("selectSala")?.reset();
    this.cinemaSelectionService.resertObservabloSalas();
    this.cinemaSelectionService.resertObservabloSessos();
    this.cinemaSelectionService.resertObservabloAssentos();

    const salasFilterFromCinama = cinemaConvent.Salas.filter(x => x.id_filme == this.cinemaSelectionService.getFilmeId())
    this.cinemaSelectionService.setObservabloSalas(salasFilterFromCinama);
  }



  public async onEventSelectSalaInSessaos(salas: MatSelectChange) {
    const salaConvent = (salas.value as ISala);
    if (salaConvent.sessaos.length === 0) {
      this.cinemaSelectionService.resertObservabloSessos();
      console.error("sessaos não encontradas")
      return;
    }
    this.cinemaSelectionService.resertObservabloAssentos();
    this.cinemaSelectionService.resertObservabloSessos();
    this.cinemaSelectionService.setObservabloSessao(salaConvent.sessaos);

  }

  public onEventGetAssentosInSessao(sesssao: ISessao) {

    if (!sesssao) {
      console.error("sessao null");
      this.cinemaSelectionService.resertObservabloAssentos();
      return;
    }
    this.cinemaSelectionService.getAssentoAndSessao(
      sesssao,
      this.form.get("selectSala")?.value as ISala
    );

  }


  public onEventExit() {

  }

  public onEventGetTime() {

    console.log(this.form.get("time")?.value);
  }

  ngOnDestroy(): void {
    this.cinemaSelectionService.OnDestroy();
  }

}




