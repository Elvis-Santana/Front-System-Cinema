import { CanActivateFn } from '@angular/router';
import { token } from '../shared/Model/tokenModel';
import { inject } from '@angular/core';
import { SessaoServiceService } from '../shared/services/sessaoService/sessao-service.service';
import { ITokenReturn } from '../shared/interfaces/ITokenReturn';
import { RouterService } from '../shared/services/routerService/router.service';
export const authGuard: CanActivateFn = async (route, state) => {

  const token: token = { token: String(localStorage.getItem("token")) }
  const sessaoServiceService = inject(SessaoServiceService);
  const routerService = inject(RouterService);

  var result: ITokenReturn = await sessaoServiceService.validToken(token);


  if(!result.success)
    routerService.nav("/login");

  return result.success;
};
