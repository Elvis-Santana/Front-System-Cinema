import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { CinemaSelectionComponentComponent } from '../../shared/components/CinemaSelectionComponent/cinema-selection-component/cinema-selection-component.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    RouterOutlet,
    RouterModule,
    HeaderComponent,
    CinemaSelectionComponentComponent
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
