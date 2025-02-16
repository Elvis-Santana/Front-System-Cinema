import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Ports } from '../../../../environments/enum/Ports';
import { IUser } from '../../interfaces/IUser.interface';
import { ILogin } from '../../interfaces/ILogin';
import { token } from '../../Model/tokenModel';
import { RouterService } from '../routerService/router.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SessaoServiceService {
  protected http = inject(HttpClient);
  protected router = inject(RouterService);

  protected $obErrorLogin = new Subject<HttpErrorResponse>();

  constructor() { }


  public async criarConta(data: IUser) {
    this.http.post<IUser>(Ports.Api_CSharp_UsuarioClinet, data).subscribe((e) => {
      console.log(e);
    })
  }

  public login(lofin: ILogin) {
    this.http
      .post(
        `http://localhost:5000/api/Login?token=${lofin.password}`, lofin.password)
      .subscribe((e) => {
        const token = e as token;
        this.setToken(token.token);
      }, (err: HttpErrorResponse) => {
        this.$obErrorLogin.next(err);

      })
  }


  public obErrorLogin = () => this.$obErrorLogin.asObservable();
  public setToken(token: String) {
    localStorage.setItem("token", String(token));

    console.log(localStorage.getItem("token"));
    this.router.nav('');
  }

  public logout() {
    localStorage.removeItem("token");
    this.router.nav('/login');

  };








}
