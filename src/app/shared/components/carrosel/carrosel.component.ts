import { Component, ElementRef, inject, OnInit, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ListService } from '../../services/listService/list.service';

@Component({
  selector: 'app-carrosel',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './carrosel.component.html',
  styleUrl: './carrosel.component.scss'
})
export class CarroselComponent implements OnInit {

  @ViewChild('scrollbar') RefInput!: ElementRef;
  @ViewChildren('items') items!: QueryList<ElementRef>;
  protected imgCarrosel = signal<string[]>([]);
  private numberCurrent: number = 0;
  protected listService = inject(ListService);

  async ngOnInit() {

    this.listService.ObGetFilme().subscribe((data) => {

      const imgs: String[] = data.map(e => e.imgPath);
      this.imgCarrosel.set(imgs as string[]);
    })

  }


  public scrollInto(code: string) {

    if (code === "l")
      this.numberCurrent++;
    else
      this.numberCurrent -= 1;


    if (this.numberCurrent > this.items.length - 1)
      this.numberCurrent = 0
    else if (this.numberCurrent < 0) {
      this.numberCurrent = this.items.length - 1
    }

    const item = this.items.map(e => e)
    const scrollItem = item[this.numberCurrent].nativeElement as HTMLElement;
    setTimeout(() => {

      scrollItem.scrollIntoView({
        inline: "center",
        behavior: "smooth",
      });

    }, 100);


  }
}
