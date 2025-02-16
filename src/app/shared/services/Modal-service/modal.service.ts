import { computed, Injectable, OnInit, signal } from '@angular/core';
import { single, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  protected dialogClose = signal<'' | 'dialogClose'>('');
  protected conteudo = signal<string>('DEFAULT');
  protected open = signal<boolean>(false);


  public setConteudoModel = (msg: string) => this.conteudo.update(s => s = msg);
  public setOpenModel = (bool: boolean) => this.open.set(bool);
  public setClassClose = (value: '' | 'dialogClose') => this.dialogClose.set(value);

  public getOpenModel = () => this.open();
  public getConteudoModel = () => this.conteudo();
  public getClassClose = () => this.dialogClose();


  public onEventOpenModel() {
    this.setOpenModel(true);
    const timeImplementAnimation = 3000;
    const timeDurationAnimation = timeImplementAnimation + 1000;

    timer(timeImplementAnimation)
      .subscribe(_ => this.setClassClose('dialogClose'))

    timer(timeDurationAnimation)
      .subscribe(_ => {
        this.setOpenModel(false);

        this.setClassClose('');
      })
  }

}
