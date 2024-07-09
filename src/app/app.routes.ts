import { Routes } from '@angular/router';
import { ListComponent } from './shared/components/list/list.component';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'filme',
    component: ListComponent
  },
  {

    path: 'produtora',
    component: ListComponent

  },
  {

    path: 'cinema',
    component: ListComponent

  }
];
