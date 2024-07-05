import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatListModule } from "@angular/material/list"
import { MatButtonModule, MatButton } from "@angular/material/button"

import { MatIcon } from "@angular/material/icon"
import { MatToolbarModule } from "@angular/material/toolbar"
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatListModule,
    MatButtonModule,
    MatIcon,
    MatToolbarModule,
    HomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Front-System-Cinema';
}
