import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterOutlet,
    MatListModule,
    MatButtonModule,
    MatIcon,
    MatToolbarModule,
    HomeComponent,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
