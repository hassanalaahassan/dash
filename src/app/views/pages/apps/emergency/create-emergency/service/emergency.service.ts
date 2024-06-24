import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

  constructor(private _HttpClient:HttpClient) { }

  createEmergency(model:any):Observable<any>{
    const myContent:string=model.content
    delete model.content
    let emerg:object = {
      frontMatter:model,
      content:myContent
    }
    return this._HttpClient.post(environment.baseApi.replace('auth','admin')+`emergency/create`,emerg)
  }
  getEmergency():Observable<any>{
    return this._HttpClient.get(environment.baseApi.replace('auth/','')+`emergency/getAll`)
  }
  deleteEmergency(id:string):Observable<any>{
    return this._HttpClient.delete(environment.baseApi.replace('auth','admin')+`emergency/delete?id=${id}`)
  }
  updateEmergency(model:any,emerId:string):Observable<any>{
    let emerg:object = {
      id:emerId,
      frontMatter:model,
      content:''
    }
    return this._HttpClient.put(environment.baseApi.replace('auth','admin')+`emergency/update`,emerg)
  }
  putImage(model:any):Observable<any>{
    return this._HttpClient.post(environment.baseApi.replace('auth','admin')+`emergency/image`,model)
  }
}
