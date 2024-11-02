import { Component, inject, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatLabel,
    RouterOutlet,
    MatListModule,
    MatButtonModule,
    MatIcon,
    MatToolbarModule,
    HomeComponent,
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  protected sessaoServiceService = inject(SessaoServiceService);
  protected form !: FormGroup

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl<String>(''),
      password: new FormControl<String>(''),

    })


  }

  public async OnEventLogin() {

    const data:ILogin = this.form.value ;
    console.log(data)
    await this.sessaoServiceService.login(data);
  }


}
