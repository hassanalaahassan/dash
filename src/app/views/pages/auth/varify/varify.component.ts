import { Component } from '@angular/core';

@Component({
  selector: 'app-varify',
  templateUrl: './varify.component.html',
  styleUrls: ['./varify.component.scss']
})
export class VarifyComponent {

  constructor(){}
  goToGmail():void{
    window.open('https://mail.google.com', '_blank', 'width=700,height=700')
  }

}
