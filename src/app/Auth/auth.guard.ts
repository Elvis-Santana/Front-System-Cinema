import { CanActivateFn, Router } from '@angular/router';
import { token } from '../shared/Model/tokenModel';
import { inject } from '@angular/core';
import { SessaoServiceService } from '../shared/services/sessaoService/sessao-service.service';
import { ITokenReturn } from '../shared/interfaces/ITokenReturn';
import { RouterService } from '../shared/services/routerService/router.service';

export const authGuard: CanActivateFn = async (route, state) => {

  const token: token = { token: String(localStorage.getItem("token")) }
  const sessaoServiceService = inject(SessaoServiceService);
  const routerService = inject(RouterService)


  try {
    var result = await sessaoServiceService.validToken(token);

    return result.success
  } catch (ex) {
    routerService.nav('/login')
    return (ex as ITokenReturn).success

  }



};
