import { Component, computed, effect, inject, Injector, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { SessaoServiceService } from '../../../shared/services/sessaoService/sessao-service.service';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILogin } from '../../../shared/interfaces/ILogin';
import { BehaviorSubject, filter, fromEvent, interval, map, Observable, of, single, switchMap, timeout, timer } from 'rxjs';
import { signalSetFn } from '@angular/core/primitives/signals';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { ModalService } from '../../../shared/services/Modal-service/modal.service';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { IResponseError } from '../../../shared/interfaces/ResponseError.interface';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatLabel,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    ModalComponent

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit ,OnDestroy{

  protected sessaoServiceService = inject(SessaoServiceService);
  protected open: boolean = false;
  protected $errorLogin = this.sessaoServiceService.obErrorLogin();
  protected modelService = inject(ModalService);

  protected clickBtnLogin!: boolean;
  protected form : FormGroup  = new FormGroup({
    email: new FormControl<String>(''),
    password: new FormControl<String>('', Validators.required),

  })


  constructor(private injector: Injector) {}
  ngOnInit(): void {
    this.$errorLogin.pipe(filter(e => e?.error))
    .subscribe(x => {
      const error = x?.error as IResponseError;
      this.modelService.setConteudoModel(error.messagen);
      this.modelService.onEventOpenModel();
      this.clickBtnLogin = false;

    });

  }


  public OnEventLogin() {
    const data: ILogin = this.form.value;
    if (this.form.valid) {
      console.log(data);
      this.sessaoServiceService.login(data);
      this.clickBtnLogin = true;
    }

  }




  ngOnDestroy(): void {
    this.clickBtnLogin = false;
  }
}
