import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpHandlerFn, HttpInterceptorFn, provideHttpClient, HttpRequest, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { from, switchMap } from 'rxjs';


export const TokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {


  const UrlGet: Array<string> = ["TESTE-cliente"]
  const UrlPOST: Array<string> = []

  const isUrGetlProtected: boolean = (UrlGet.some(e => req.url.includes(e)) && req.method === 'GET');
  const isUrlPostProtected: boolean = (UrlPOST.some(e => req.url.includes(e)) && req.method === 'POST');

  // const token: string = String("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ1bmlTeXN0ZW1BcGkiLCJzdWIiOiJyZW5lcm9kcmlndWVzc2FudGFuYUBnbWFpbC5jb20iLCJleHAiOjE3Mzc1OTU0MjZ9._0dSyKADmzdIianjkHOHHe8_cqIPJuE3bezuOMwLFTk");
  // console.log(token)
  // return from(token).pipe(
  //   switchMap((_) => {
  //     const clonedRequest = req.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${token}`

  //       },
  //     });
  //     return next(clonedRequest);
  //   })
  // )

  // if (isUrGetlProtected || isUrlPostProtected) {
  //   return from(token).pipe(
  //     switchMap((_) => {
  //       const clonedRequest = req.clone({
  //         setHeaders: {
  //           Authorization: `Bearer ${token}`

  //         },
  //       });
  //       return next(clonedRequest);
  //     })
  //   )
  // }

  return next(req);


}


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    // provideHttpClient(),
    provideHttpClient(
      withInterceptors([
        TokenInterceptor
      ]),
      withInterceptorsFromDi()//importar HTTP_INTERCEPIORS
    ),




  ]
};
