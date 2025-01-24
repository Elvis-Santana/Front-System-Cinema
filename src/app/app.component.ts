import { Component, inject, Inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatListModule } from "@angular/material/list"
import { MatButtonModule } from "@angular/material/button"

import { MatToolbarModule } from "@angular/material/toolbar"
import { HttpClient } from '@angular/common/http';


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

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit  {

  title = 'Front-System-Cinema';
 

  ngOnInit(): void {

  }


}
