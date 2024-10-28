import { Component } from '@angular/core';
import { CriarContaUsuarioComponent } from './criar-conta-usuario/criar-conta-usuario.component';


@Component({
  selector: 'app-conta',
  standalone: true,
  imports: [
 CriarContaUsuarioComponent

  ],
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.scss'
})
export class ContaComponent {

}
