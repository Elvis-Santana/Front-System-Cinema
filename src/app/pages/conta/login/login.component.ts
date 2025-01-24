import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { SessaoServiceService } from '../../../shared/services/sessaoService/sessao-service.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ILogin } from '../../../shared/interfaces/ILogin';
import { BehaviorSubject, interval, map, of, switchMap } from 'rxjs';
import { signalSetFn } from '@angular/core/primitives/signals';
import { CommonModule } from '@angular/common';


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
    CommonModule

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  protected sessaoServiceService = inject(SessaoServiceService);
  protected form !: FormGroup
  protected signal = signal(1)
  protected showCount = signal(true)



  protected computedExemplo = computed(() => {
    console.log('computed! ACIONADO!!!!!')
    if (this.showCount())
      return `${this.signal()} computed`;
    else
      return 'nada'
  })

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl<String>(''),
      password: new FormControl<String>(''),

    })

    // this.form.get("email")?.valueChanges
    //   .pipe(
    //     switchMap((value) => this.ToggleSwitch(value)
    //     )
    //   )
    //   .subscribe(e => console.log(e))


  }

  executar = (): void => this.signal.update(atual => atual + 1)

   executarShowCount = (): void => this.showCount.update(atual => !atual)


  // private ToggleSwitch(e: any) {
  //   return of(e).pipe(
  //     map((value) => `teste ${value}`)
  //   )
  // }

  public async OnEventLogin() {

    const data: ILogin = this.form.value;
    console.log(data)
    // await this.sessaoServiceService.login(data);
  }




}
