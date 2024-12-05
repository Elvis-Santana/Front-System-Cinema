import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { SessaoServiceService } from '../../shared/services/sessaoService/sessao-service.service';

@Component({
  selector: 'app-menu-config',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIcon,


  ],
  template: `
      <mat-card [@menu-config.anim]="viewMenuConfig ? 'Open':'Closed'">
        <mat-card-content>

         @if(this.viewMenuConfig){
          <button  (click)="sessaoServiceService.logout()" mat-mini-fab  >
            <mat-icon>logout</mat-icon>
          </button>
         }


        </mat-card-content>
    </mat-card>


  `,

  animations:[

    trigger('menu-config.anim',[
       state('Closed',style({height: "0px" ,display:"none"})),
       state('Open',style({height: "70px" })),
       transition('Closed <=> Open',[
        animate('.1s')
       ])
    ]),




  ],

  styleUrl: './menu-config.component.scss'
})
export class MenuConfigComponent {
  @Input() viewMenuConfig!: boolean;

    protected sessaoServiceService = inject(SessaoServiceService);
}
