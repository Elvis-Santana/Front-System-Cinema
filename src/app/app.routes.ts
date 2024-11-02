import { Routes } from '@angular/router';
import { ListComponent } from './shared/components/list/list.component';
import { DetalharFilmeComponent } from './pages/detalhar-filme/detalhar-filme.component';
import { LoginComponent } from './pages/conta/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ContaComponent } from './pages/conta/conta.component';
import { authGuard } from './Auth/auth.guard';

export const routes: Routes = [


  {
    path: '',
    canActivate:[authGuard],
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
      {
        path: 'filme/detalhar/:id',
        component: DetalharFilmeComponent
      },

    ]

  },



  {
    path: 'criarConta',
    component:ContaComponent
  },
  {

    path: 'login',
    component: LoginComponent

  },


];
