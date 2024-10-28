import { Routes } from '@angular/router';
import { ListComponent } from './shared/components/list/list.component';
import { DetalharFilmeComponent } from './pages/detalhar-filme/detalhar-filme.component';
import { LoginComponent } from './pages/conta/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ContaComponent } from './pages/conta/conta.component';

export const routes: Routes = [


  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'filme',
        component: ListComponent,
      },
      {

        path: 'produtora',
        component: ListComponent

      },
      {

        path: 'cinema',
        component: ListComponent

      },
    ]

  },


  {
    path: 'filme/detalhar/:id',
    component: DetalharFilmeComponent
  },


  {

    path: 'login',
    component: ContaComponent

  },


];
