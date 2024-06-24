import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NOTEFICATIONService } from 'src/app/note/service/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // parentData: any;
  // constructor(private _Router:Router,
  //   private _AuthService:AuthService,
  //   public _note:NOTEFICATIONService
  // ){}
  // ngOnInit(): void {
  // }
  // formValue:any

  // registerForm:FormGroup= new FormGroup({
  //   email:new FormControl('',[Validators.email,Validators.required]) ,
  //   gender:new FormControl('',[Validators.required]) ,
  //   bloodType:new FormControl('',[Validators.required]) ,
  //   password:new FormControl('',[Validators.pattern('.{8,}'),Validators.required]) ,
  //   username:new FormControl('',[Validators.pattern('([a-zA-Z]){3,}'),Validators.required]) ,
  //   firstName:new FormControl('',[Validators.pattern('([a-zA-Z]){2,}'),Validators.required]) ,
  //   lastName:new FormControl('',[Validators.pattern('([a-zA-Z]){2,}'),Validators.required]) ,
  //   phone:new FormControl('',[Validators.pattern('01(0|2|5|1)[0-9]{8}'),Validators.required]) ,
  // })

  // handelForm():void{
  //   if( this.registerForm.valid ){
  //     this.formValue=this.registerForm.value
  //     this._AuthService.register(this.registerForm.value).subscribe({
  //       next:(response)=>{
  //         localStorage.setItem('token',response.registerResponse.idToken)
  //         this.sendMoreData()
  //         this._Router.navigate(['/auth/varify'])
  //       },
  //       error:(err)=>{
  //         this.parentData=err.error.errors[0]
  //         this._note.show()
  //         setTimeout(() => {
  //           this._note.hide()
  //         }, 7000);
  //       }
  //     })

  //   }
  // }
  // sendMoreData():void{
  //   this._AuthService.updateUser(this.registerForm.value).subscribe({
  //     next:(response)=>{
  //       console.log(response);
  //     }
  //   })
  // }
  parentData: any; // Holds data for notification
  formValue: any; // Holds form values

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    gender: new FormControl('', [Validators.required]),
    bloodType: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.pattern('.{8,}'), Validators.required]),
    username: new FormControl('', [Validators.pattern('([a-zA-Z]){3,}'), Validators.required]),
    firstName: new FormControl('', [Validators.pattern('([a-zA-Z]){2,}'), Validators.required]),
    lastName: new FormControl('', [Validators.pattern('([a-zA-Z]){2,}'), Validators.required]),
    phone: new FormControl('', [Validators.pattern('01(0|2|5|1)[0-9]{8}'), Validators.required]),
  });

  constructor(
    private _Router: Router,
    private _AuthService: AuthService,
    public _note: NOTEFICATIONService
  ) {}

  ngOnInit(): void {
    // Initialize component
  }

  // Handle form submission
  handleForm(): void {
    if (this.registerForm.valid) {
      this.formValue = this.registerForm.value;
      this._AuthService.register(this.registerForm.value).subscribe({
        next: (response) => {
          // Store token in local storage
          localStorage.setItem('token', response.registerResponse.idToken);
          // Send additional user data
          this.sendMoreData();
          // Navigate to verification page
          this._Router.navigate(['/auth/varify']);
        },
        error: (err) => {
          // Notify user of registration error
          this.parentData = err.error.errors[0];
          this._note.show();
          setTimeout(() => {
            // Hide notification after 4 seconds
            this._note.hide();
          }, 4000);
        }
      });
    }
  }

  // Send additional user data
  sendMoreData(): void {
    this._AuthService.updateUser(this.registerForm.value).subscribe({
      next: (response) => {
      }
    });
  }
}
