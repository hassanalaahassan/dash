import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointementService {

  constructor(private _HttpClient:HttpClient) { }


  getAppointments():Observable<any>{
    return this._HttpClient.get(environment.baseApi.replace('auth','admin') + `appointments/getAll`)
  }
  updateAppointments(model:any,staticData:object):Observable<any>{
    const finalModel={
      ...model,
      ...staticData
    }
    return this._HttpClient.put(environment.baseApi.replace('auth','admin') + `appointments/update`,finalModel)
  }
  deleteAppointments(id:string):Observable<any>{
    return this._HttpClient.delete(environment.baseApi.replace('auth','admin') + `appointments/delete?id=${id}`)
  }

}
