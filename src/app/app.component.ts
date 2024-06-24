import { Component, OnInit } from '@angular/core';
import { NOTEFICATIONService } from './note/service/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // title = 'nobleui-angular';
  constructor(public _note:NOTEFICATIONService){}
  ngOnInit(): void {}

}
