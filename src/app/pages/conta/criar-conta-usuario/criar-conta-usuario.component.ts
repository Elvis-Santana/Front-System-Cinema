import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup } from '@angular/forms';
import { IUser } from '../../../shared/interfaces/IUser.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterService } from '../../../shared/services/routerService/router.service';
import { Ports } from '../../../../environments/enum/Ports';
import { HttpClient } from '@angular/common/http';
import { SessaoServiceService } from '../../../shared/services/sessaoService/sessao-service.service';

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
export class CriarContaUsuarioComponent implements OnInit {
  protected sessaoServiceService = inject(SessaoServiceService);


  protected form !: FormGroup

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl<String>(''),
      email: new FormControl<String>(''),
      password: new FormControl<String>(''),
      role: new FormControl<String>('')

    })
  }

  public async emitir() {
    const data = (this.form.value as IUser);
  //  await this.sessaoServiceService.criarConta(data);
  }

}
