import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NOTEFICATIONService } from './service/notification.service';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() data: any;
  constructor(public _note:NOTEFICATIONService) { }

  ngOnInit(): void {
  }
  hide():void{
    this._note.toggelNote=false
  }


}
