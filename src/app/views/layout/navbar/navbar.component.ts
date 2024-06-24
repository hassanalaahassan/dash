import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router
  ) { }
  userName:string
  email:string

  ngOnInit(): void {
    this.getData()
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  // onLogout(e: Event) {
  //   e.preventDefault();
  //   localStorage.removeItem('isLoggedin');

  //   if (!localStorage.getItem('isLoggedin')) {
  //     this.router.navigate(['/auth/login']);
  //   }
  // }
// user name and email
  getData():void{
    this.userName = localStorage.getItem('userName')||''
    this.email = localStorage.getItem('userEmail')||''
  }
  //log out
  logOut():void{
    localStorage.clear()
    this.router.navigate(['/auth/login'])
  }
}
