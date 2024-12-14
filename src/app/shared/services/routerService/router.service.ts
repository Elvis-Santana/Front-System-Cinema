import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  protected http = inject(HttpClient)
  protected router = inject(Router)

  constructor() {


   }


  public getHttpClient=()=> this.http;

  public nav=(url:String)=> this.router.navigate([url]);

  public Router=()=> this.router;




}
