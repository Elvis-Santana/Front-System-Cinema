import { CanActivateFn, Router } from '@angular/router';
import { token } from '../shared/Model/tokenModel';
import { inject, signal } from '@angular/core';
import { SessaoServiceService } from '../shared/services/sessaoService/sessao-service.service';
import { ITokenReturn } from '../shared/interfaces/ITokenReturn';
import { RouterService } from '../shared/services/routerService/router.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, of, retry } from 'rxjs';
import { TokenReturn } from '../shared/Model/tokenResultModel';

export const authGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const Route = inject(Router);
  const token: token = { token: String(localStorage.getItem("token")) }

  if (!token)
    return false;
  

  const next = http.get(`http://localhost:5000/api/Login?token=${token.token}`).pipe(
    map((x) => {
      if (x != null && (x as TokenReturn).success)
        return true;

      return Route.parseUrl("/login")

    })
    , catchError(err => {
      console.error(err)
      return of(Route.parseUrl("/login"))
    })
  );

  return next;

}
