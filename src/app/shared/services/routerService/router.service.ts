import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  protected http = inject(HttpClient)

  constructor() { }


  public getHttpClient=()=> this.http;

 

}
