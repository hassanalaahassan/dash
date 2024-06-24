import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BloodBagService {

  constructor(private _HttpClient:HttpClient) { }


  getAllBag():Observable<any>{
    return this._HttpClient.get(environment.baseApi.replace('auth','admin')+`bag/getAll`)
  }
  createBag(model:any):Observable<any>{
    return this._HttpClient.post(environment.baseApi.replace('auth','admin')+`bag/create` , model)
  }
  deleteBag(id:string):Observable<any>{
    return this._HttpClient.delete(environment.baseApi.replace('auth','admin')+`bag/delete?id=${id}`)
  }
  updateBag(id:string,model:any):Observable<any>{
    const finalModel:object={
        id:id,
        hospitalId: model.hospitalId,
        bloodType:model.bloodType,
        donorEmail:model.donorEmail,
    }
    return this._HttpClient.put(environment.baseApi.replace('auth','admin')+`bag/update`,finalModel)
  }





}
