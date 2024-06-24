import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsightService {


  allInsights:BehaviorSubject<any>=new BehaviorSubject('')
  constructor(private _HttpClient:HttpClient) {
    this.assignInsights()
   }



  assignInsights(){
    this.getAllInsight().subscribe({
      next:(response)=>{
        this.allInsights.next(response)
      }
    })
  }
  getAllInsight():Observable<any>{
    return this._HttpClient.get(environment.baseApi.replace('auth','user')+`insight/getAll`)
  }

  createInsight(model:any):Observable<any>{
    const myContent:any=model.content
    delete model.content
    const finalModel:any={
      frontMatter:model,
      contant:myContent

    }
    return this._HttpClient.post(environment.baseApi.replace('auth','admin')+`insight/create`,finalModel)
  }
  deleteInsight(id:string):Observable<any>{
    return this._HttpClient.delete(environment.baseApi.replace('auth','admin')+`insight/delete?id=${id}`)
  }
  putImage(model:any):Observable<any>{
    return this._HttpClient.post(environment.baseApi.replace('auth','admin')+`insight/image`,model)
  }
}

