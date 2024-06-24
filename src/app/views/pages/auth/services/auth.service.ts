import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient:HttpClient) { }

  register(model:any):Observable<any>{
    return this._HttpClient.post(environment.baseApi + `signup` ,model)
  }
  login(model:any):Observable<any>{
    return this._HttpClient.post(environment.baseApi + `signin` , model)
  }
  refreshToken():Observable<any>{
    let model:object={

        grant_type:"refresh_token",
        refresh_token:localStorage.getItem('refToken')
    }
    return this._HttpClient.post(environment.baseApi + 'refreshToken' ,model )
  }
  updateUser(model:any):Observable<any>{
    const myModel={
      firstname:model.firstName,
      lastname:model.lastName,
      ...model
    }
    return this._HttpClient.post(environment.baseApi.replace('auth','user')+`update`,myModel)

  }

}

