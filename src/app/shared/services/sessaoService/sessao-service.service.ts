import { HttpClient, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Ports } from '../../../../environments/enum/Ports';
import { IUser } from '../../interfaces/IUser.interface';
import { ILogin } from '../../interfaces/ILogin';
import { token } from '../../Model/tokenModel';
import { Token } from '@angular/compiler';
import { ITokenReturn } from '../../interfaces/ITokenReturn';
import { TokenReturn } from '../../Model/tokenResultModel';





@Injectable({
  providedIn: 'root'
})
export class SessaoServiceService {
  protected http = inject(HttpClient);

  constructor() { }


  public async criarConta(data: IUser) {

    this.http.post<IUser>(Ports.Api_CSharp_UsuarioClinet, data).subscribe((e) => {
      console.log(e);
    })
  }

  public async login(lofin: ILogin) {
    this.http
    .post(`${Ports.Api_CSharp_PortsLogin}${lofin.password}`, null)
    .subscribe((e) => {

      const token = e as token;

      console.log(token);
      this.setToken(token.token);
    })
  }

  public setToken(token: String) {
    localStorage.setItem("token", String(token));

    console.log(localStorage.getItem("token"));
  }

  public async validToken(token: token) {

   return new  Promise<ITokenReturn>((result,reject)=>{
      this.http.get(`${Ports.Api_CSharp_PortsLogin}${token.token}`)
      .subscribe((e) => {
        return  result(new TokenReturn(true));
      }, (error: HttpErrorResponse) => {

        console.log(error)

        if(error.error!=null){
          return  reject(new TokenReturn(false));

        }
        return  reject(new TokenReturn(false));

      })
   })
  }

}
