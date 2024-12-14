import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatListModule } from "@angular/material/list"
import { MatButtonModule, MatButton } from "@angular/material/button"

import { MatIcon } from "@angular/material/icon"
import { MatToolbarModule } from "@angular/material/toolbar"
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { CinemaSelectionComponentComponent } from './pages/CinemaSelectionComponent/cinema-selection-component/cinema-selection-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    RouterOutlet,
    RouterModule,
    CinemaSelectionComponentComponent

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Front-System-Cinema';
}
