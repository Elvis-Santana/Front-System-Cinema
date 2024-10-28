import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup } from '@angular/forms';
import { IUser } from '../../../shared/interfaces/IUser.interface';
import {ReactiveFormsModule} from '@angular/forms';
import { RouterService } from '../../../shared/services/routerService/router.service';
import { Ports } from '../../../../../environment/enum/Ports';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-criar-conta-usuario',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatLabel,
    ReactiveFormsModule

  ],
  templateUrl: './criar-conta-usuario.component.html',
  styleUrl: './criar-conta-usuario.component.scss'
})
export class CriarContaUsuarioComponent implements OnInit{

  protected http = inject(HttpClient);

  protected form !:FormGroup

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl<String>(''),
      email: new FormControl<String>(''),
      password: new FormControl<String>(''),
      role: new FormControl<String>('')

    })
  }

  public emitir(){
      const data = (this.form.value as IUser);

       this.http.post<IUser>(Ports.Api_CSharp_UsuarioClinet,data).subscribe((e)=>{
        console.log(e);
       })
  }

}
