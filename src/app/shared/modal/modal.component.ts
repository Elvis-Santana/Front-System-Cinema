import { AfterViewInit, Component, ElementRef, inject, Inject, Input, input, ViewChild, ViewRef } from '@angular/core';
import { ModalService } from '../services/Modal-service/modal.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  protected modelService = inject(ModalService);
  public classModel = input.required<"classError" | "classSuccess">()
  public conteudo = () => this.modelService.getConteudoModel();
  public open = () => this.modelService.getOpenModel()
  public classClose = () => this.modelService.getClassClose();






}
