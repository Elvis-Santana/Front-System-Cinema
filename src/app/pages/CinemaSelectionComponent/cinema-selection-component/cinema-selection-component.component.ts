import { Component, EventEmitter, inject, OnDestroy, OnInit, Output, signal, ViewChild, viewChild, ViewRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CinemaSelectionComponentComponetService } from '../../../shared/services/CinemaSelectionComponentComponetService/cinema-selection-component-componet.service';
import { ICinema } from '../../../shared/interfaces/ICinema.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ISala } from '../../../shared/interfaces/Sala.interface';
import { filter, fromEvent, map, Observable, of, raceWith, single, Subject, } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessaoService } from '../../../shared/services/Sessao-cinema-Service/sessao.service';
import { ISessao } from '../../../shared/interfaces/Sessao.interface';
import { IAssento, IAssentoOcupadoEmSessao } from '../../../shared/interfaces/Assento.interface';
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
  protected salas$ = this.cinemaSelectionService.obGetSalas()
  protected sessaos$ = this.cinemaSelectionService.obGetSessaos()
  protected assentos$ = this.cinemaSelectionService.obGetAssentos();

  protected form: FormGroup = new FormGroup({

    date: new FormControl<Date | null>(null),
    selectSala: new FormControl<ISala | null>(null),
    selectCinema: new FormControl<ICinema | null>(null)

  });




  async ngOnInit() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get("id"))

    this.activatedRoute.queryParamMap.subscribe((x: any) => {
      this.cinemaSelectionService.setCinemaId(x.params["cinema"])
      this.cinemaSelectionService.setSalaId(x.params["sala"] ?? null)
      console.log("sala " + this.cinemaSelectionService.getSalaId())
      this.cinemaSelectionService.setFilmeId(Number(id))

      if (this.cinemaSelectionService.getCinemaId() != null)
        this.cinemaSelectionService.setIsUserFromPageCinema(true);

      this.cinemaSelectionService.getCinemasForMovie();
    })
  }



  public onEventSelectCinemaInSalas(cinema: MatSelectChange) {
    const cinemaConvent = (cinema.value as ICinema);

    this.form.get("selectSala")?.reset();
    this.cinemaSelectionService.resertObservabloSalas();
    this.cinemaSelectionService.resertObservabloSessos();
    this.cinemaSelectionService.resertObservabloAssentos();

    const salasFilterFromCinama = cinemaConvent.salas.filter(x =>
      this.cinemaSelectionService.getSalaId()
        ? x.id == this.cinemaSelectionService.getSalaId()
        : x.id_filme == this.cinemaSelectionService.getFilmeId()
    );
    this.cinemaSelectionService.setObservabloSalas(salasFilterFromCinama);
  }



  public async onEventSelectSalaInSessaos(salas: MatSelectChange) {

    const salaConvent = (salas.value as ISala);
    this.cinemaSelectionService.resertObservabloSessos();
    this.cinemaSelectionService.resertObservabloAssentos();
    if (salaConvent.sessaos.length === 0) {
      console.error("sessaos não encontradas")
      return;
    }
    this.cinemaSelectionService.setObservabloSessao(salaConvent.sessaos);

  }

  public onEventGetAssentosInSessao(sesssao: ISessao) {

    if (!sesssao) {
      this.cinemaSelectionService.resertObservabloAssentos();
      console.error("sessao null");
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




