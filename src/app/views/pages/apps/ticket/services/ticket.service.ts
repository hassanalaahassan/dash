import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  allTickets:BehaviorSubject<any>=new BehaviorSubject('')

  constructor(private _HttpClient:HttpClient) {
    this.assignValue()
  }

  assignValue():void{
    this.getTickets().subscribe({
      next:(response)=>{
        this.allTickets.next(response)
      }
    })
  }


  getTickets():Observable<any>{
    return this._HttpClient.get(environment.baseApi.replace('auth','admin') + 'tickets/getAll')
  }

  createTicket(model:any):Observable<any>{
    return this._HttpClient.post(environment.baseApi.replace('auth','admin')+'tickets/create',model)
  }
  updateTicket(model:any,ticketId:string):Observable<any>{
    const finalModel={
      ...model,
      id:ticketId
    }
    return this._HttpClient.put(environment.baseApi.replace('auth','admin')+'tickets/update',finalModel)
  }
  deleteTicket(id:string):Observable<any>{
    return this._HttpClient.delete(environment.baseApi.replace('auth','admin') + `tickets/delete?id=${id}`)
  }



}
