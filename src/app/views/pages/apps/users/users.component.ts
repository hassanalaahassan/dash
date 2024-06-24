import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/interfaces/user';
import { AdminService } from 'src/app/services/admin.service';
import * as $ from 'jquery';
import { NOTEFICATIONService } from 'src/app/note/service/notification.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // parentData:any
  // constructor(  private _AdminService:AdminService,
  //   public _note:NOTEFICATIONService
  // ) {}
  // myUsers:User[]
  // userWillAdmin:any=''
  // ngOnInit(): void {
  //   this.getAllUsers()
  // }

  // getAllUsers():void{
  //   this._AdminService.allUsers.subscribe({
  //     next:(response)=>{
  //       this.myUsers=this.mappingUser(response)
  //     }
  //   })

  // }
  // mappingUser(arr:User[]):User[]{

  //   //  let userBlood = arr.map((user)=>{
  //   //   if(!user.bloodType || user.bloodType == "Blood Type"){
  //   //     return {
  //   //       ...user ,
  //   //        bloodType: 'o+'
  //   //     }
  //   //   }
  //   //   else{return user}
  //   //  })
  //   //  let userLocation = userBlood.map((user)=>{
  //   //   if(!user.city || user.city == "Location"){
  //   //     return {
  //   //       ...user ,
  //   //        city: 'alexandria'
  //   //     }
  //   //   }
  //   //   else{return user}
  //   //  })

  //   //  let userCountry = userLocation.map((user)=>{
  //   //   if(!user.country || user.country == "Location"){
  //   //     return {
  //   //       ...user ,
  //   //        country: 'egypt'
  //   //     }
  //   //   }
  //   //   else{return user}
  //   //  })

  //   //  let newUesrs = userCountry.map((user)=>{
  //   //   if(!user.gender || user.gender == "Gender"){
  //   //     return {
  //   //       ...user ,
  //   //        gender: 'male'
  //   //     }
  //   //   }
  //   //   else{return user}
  //   //  })

  //   //  return newUesrs
  //   const defaultUser = {
  //     bloodType: 'o+',
  //     city: 'alexandria',
  //     country: 'egypt',
  //     gender: 'male'
  // };

  // return arr.map(user => ({
  //     ...defaultUser,
  //     ...user,
  //     bloodType: user.bloodType && user.bloodType !== "Blood Type" ? user.bloodType : defaultUser.bloodType,
  //     city: user.city && user.city !== "Location" ? user.city : defaultUser.city,
  //     country: user.country && user.country !== "Location" ? user.country : defaultUser.country,
  //     gender: user.gender && user.gender !== "Gender" ? user.gender : defaultUser.gender
  // }));
  // }

  // openDialog(user:User):void{
  //   $('#container').slideDown(400)
  //   this.userWillAdmin = user
  // }
  // closeDialog():void{
  //   $('#container').slideUp(400)
  // }
  // newAdmin():void{
  //   if(this.userWillAdmin.authorities[1]!='Admin'){
  //     this._AdminService.newAdmin(this.userWillAdmin.email).subscribe({
  //       next:(response)=>{
  //         this.closeDialog()
  //         this.parentData='The user has Successfully become an Administrator'
  //         this._note.show()
  //         this._AdminService.assignUsers()
  //         setTimeout(() => {
  //           this._note.toggelNote=false
  //         }, 5000);
  //       },
  //       error:(err)=>{
  //         this.closeDialog()
  //         this.parentData='Failed Processing Make Sure You Are Connected to the Internet'
  //         this._note.show()
  //         setTimeout(() => {
  //           this._note.toggelNote=false
  //         }, 5000);
  //       }
  //     })
  //   }
  //   else
  //   {

  //     this.closeDialog()
  //     this.parentData='This User Is Already Administrator'
  //     this._note.show()
  //     setTimeout(() => {
  //       this._note.toggelNote=false
  //     }, 5000);
  //   }
  // }
  parentData: any; // Data for notifications
  myUsers: User[]; // Holds fetched users
  userWillAdmin: any = ''; // User to be assigned admin role

  constructor(
    private _AdminService: AdminService,
    public _note: NOTEFICATIONService
  ) { }

  ngOnInit(): void {
    this.getAllUsers(); // Fetch all users
  }

  // Fetch all users
  getAllUsers(): void {
    this._AdminService.allUsers.subscribe({
      next: (response) => {
        // Map fetched users and update their properties if necessary
        this.myUsers = this.mappingUser(response);
      }
    });
  }

  // Map users and update properties if necessary
  mappingUser(arr: User[]): User[] {
    const defaultUser = {
      bloodType: 'o+',
      city: 'alexandria',
      country: 'egypt',
      gender: 'male'
    };

    return arr.map(user => ({
      ...defaultUser,
      ...user,
      bloodType: user.bloodType && user.bloodType !== "Blood Type" ? user.bloodType : defaultUser.bloodType,
      city: user.city && user.city !== "Location" ? user.city : defaultUser.city,
      country: user.country && user.country !== "Location" ? user.country : defaultUser.country,
      gender: user.gender && user.gender !== "Gender" ? user.gender : defaultUser.gender
    }));
  }

  // Open dialog to assign admin role to a user
  openDialog(user: User): void {
    $('#container').slideDown(400);
    this.userWillAdmin = user;
  }

  // Close dialog
  closeDialog(): void {
    $('#container').slideUp(400);
  }

  // Assign admin role to selected user
  newAdmin(): void {
    if (this.userWillAdmin.authorities[1] !== 'Admin') {
      this._AdminService.newAdmin(this.userWillAdmin.email).subscribe({
        next: (response) => {
          this.closeDialog();
          this.showNotification('The user has Successfully become an Administrator');
          this._AdminService.assignUsers();
        },
        error: (err) => {
          this.closeDialog();
          this.showNotification('Failed Processing Make Sure You Are Connected to the Internet');
        }
      });
    } else {
      this.closeDialog();
      this.showNotification('This User Is Already Administrator');
    }
  }

  // Show notification
  showNotification(message: string): void {
    this.parentData = message;
    this._note.show();
    setTimeout(() => {
      this._note.toggelNote = false;
    }, 5000);
  }

}
