import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NOTEFICATIONService {

  constructor() { }
  toggelNote:boolean=false
  show():void{
    this.toggelNote=true
  }
  hide():void{
    this.toggelNote=false
  }
}
