import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  allHospital:BehaviorSubject<any>=new BehaviorSubject('')

  constructor(private _HttpClient:HttpClient) {
    this.assignValue()
  }

  assignValue():void{
    this.getHospital().subscribe({
      next:(response)=>{
        this.allHospital.next(response)
      }
    })
  }


  getHospital():Observable<any>{
    return this._HttpClient.get(environment.baseApi.replace('auth','user') + 'hospital/getAll')
  }

  createHospital(model:any):Observable<any>{
    const finalModel:Object={
      frontMatter:model
    }
    return this._HttpClient.post(environment.baseApi.replace('auth','admin')+'hospital/create',finalModel)
  }
  putImage(model:any,id:string):Observable<any>{
    return  this._HttpClient.post(environment.baseApi.replace('auth','admin')+`hospital/image?id=${id}`,model)
  }
  updateHospital(id:string,model:any,img:any):Observable<any>{
    const finalModel:Object={
      frontMatter:{...model,image2:img}
    }
    return this._HttpClient.put(environment.baseApi.replace('auth','admin')+`hospital/update?id=${id}`,finalModel)
  }
  deleteHospital(id:string):Observable<any>{
    return this._HttpClient.delete(environment.baseApi.replace('auth','admin') + `hospital/delete?id=${id}`)
  }



}
