import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CinemaSelectionComponentComponetService } from '../../../services/CinemaSelectionComponentComponetService/cinema-selection-component-componet.service';
import { ICinema } from '../../../interfaces/ICinema.interface';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-cinema-selection-component',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIcon

  ],
  templateUrl: './cinema-selection-component.component.html',
  styleUrl: './cinema-selection-component.component.scss'
})
export class CinemaSelectionComponentComponent implements OnInit {

  public CinemaSelectionComponentComponetService = inject(CinemaSelectionComponentComponetService);

  async ngOnInit() {

  }
}
