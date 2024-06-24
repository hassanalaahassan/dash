import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  allUsers:BehaviorSubject<any>=new BehaviorSubject('')

  constructor(private _httpClinet:HttpClient) {
    this.assignUsers()
  }

  assignUsers():void{
    this.getAllUsers().subscribe({
      next:(response)=>{
        this.allUsers.next(response)
      }
    })
  }

  getAllUsers():Observable<any>{
    return this._httpClinet.get(environment.baseApi.replace('auth','admin') + `getAllUsers` )
  }
  newAdmin(email:string):Observable<any>{
    let model={
      email,
      authorities:['Admin']
    }
    return this._httpClinet.post('http://localhost:8081/admin/authorities/add',model)
  }
}
