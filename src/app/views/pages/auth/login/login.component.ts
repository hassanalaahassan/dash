import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NOTEFICATIONService } from 'src/app/note/service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // parentData: any;

  // ngOnInit(): void {

  // }

  // constructor(
  //   private _AuthService:AuthService,
  //   private _Router:Router,
  //   public _note:NOTEFICATIONService

  // ){}
  // loginForm:FormGroup= new FormGroup({
  //   email:new FormControl('',[Validators.email,Validators.required]) ,
  //   password:new FormControl('',[Validators.pattern('.{8,}'),Validators.required])
  // })
  // handelForm():void{

  //   if( this.loginForm.valid ){
  //     this._AuthService.login(this.loginForm.value).subscribe({
  //       next:(response)=>{
  //         localStorage.setItem('token',response.registerResponse.idToken)
  //         localStorage.setItem('refToken',response.registerResponse.refreshToken)
  //         localStorage.setItem('userEmail',response.user.email)
  //         localStorage.setItem('userName',response.user.username)
  //         this._Router.navigate(['/dashboard'])
  //       },
  //       error:(err)=>{
  //         if(err.error.errors[0].includes('No user record found for the provided')){
  //         this.parentData="Email Dosen't Exist"
  //         }
  //         else if(err.error.errors[0].includes('Error while signing in with firebase')){
  //           this.parentData="InCorrect Password"
  //         }
  //         this._note.show()
  //         setTimeout(() => {
  //           this._note.hide()
  //         }, 5000);
  //       }
  //     })

  //   }
  // }


  parentData: any; // Holds data for notification

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern('.{8,}'), Validators.required])
  });

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    public _note: NOTEFICATIONService
  ) {}

  ngOnInit(): void {
    // Initialize component
  }

  // Handle login form submission
  handleForm(): void {
    if (this.loginForm.valid) {
      this._AuthService.login(this.loginForm.value).subscribe({
        next: (response) => {
          // Store token and user data in local storage
          localStorage.setItem('token', response.registerResponse.idToken);
          localStorage.setItem('refToken', response.registerResponse.refreshToken);
          localStorage.setItem('userEmail', response.user.email);
          localStorage.setItem('userName', response.user.username);
          // Navigate to dashboard upon successful login
          this._Router.navigate(['/dashboard']);
        },
        error: (err) => {
          if (err.error.errors[0].includes('No user record found for the provided')) {
            // Notify user of invalid email
            this.parentData = "Email Doesn't Exist";
          } else if (err.error.errors[0].includes('Error while signing in with firebase')) {
            // Notify user of incorrect password
            this.parentData = "Incorrect Password";
          }
          // Show notification
          this._note.show();
          setTimeout(() => {
            // Hide notification after 5 seconds
            this._note.hide();
          }, 5000);
        }
      });
    }
  }
}
