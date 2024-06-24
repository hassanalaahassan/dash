import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/interfaces/user';
import * as $ from 'jquery';
import { NOTEFICATIONService } from 'src/app/note/service/notification.service';
import { AppointementService } from './service/appointement.service';
import { Appointment } from '../appointment/appointment';
import { HospitalService } from '../hospital/services/hospital.service';
import { Hospital } from '../hospital/hospital';
import { EmergencyService } from '../emergency/create-emergency/service/emergency.service';
import { Emergency } from '../emergency/All-emergency/emergency';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  parentData: any; // Data for notifications
  myAppointments:Appointment[]
  appointmentActions:Appointment={
  id: '',
  userId: '',
  email: '',
  hospitalId: '',
  emergencyId: '',
  appointmentDate: '',
  appointmentType: '',
  contactNumber: '',
  createdDate: '',
  updatedDate: '',
  }
  myHospital:Hospital[]=[]
  myEmergency:Emergency[]=[]
  appointmentForm:FormGroup=new FormGroup({
    hospitalId: new FormControl(''),
    emergencyId: new FormControl(''),
    appointmentDate: new FormControl(''),
    appointmentType: new FormControl(''),
    contactNumber: new FormControl(''),

  })

  constructor(private _AppointementService:AppointementService,
    private _HospitalService:HospitalService,
    private _EmergencyService:EmergencyService,
    public _note: NOTEFICATIONService
  ) { }

  ngOnInit(): void {
    this.getAllAppointment()
    this.allHospital()
    this.allEemergency()
  }

  getAllAppointment():void{
    this._AppointementService.getAppointments().subscribe({
      next:(response)=>{
        this.myAppointments = response
      }
    })
  }


  updateAppointment():void{
    const staticData:object={
      email:this.appointmentActions.email,
      id:this.appointmentActions.id,
      userId:this.appointmentActions.userId,
    }
    this._AppointementService.updateAppointments(this.appointmentForm.value,staticData).subscribe({
      next:(response)=>{
        this.showNotification(response.message)
        this.getAllAppointment()
        this.closeUpdate()
      },
      error:(err)=>{
        this.showNotification('Error While Process Your Request')
      }
    })
  }
  deleteAppointment():void{
    this._AppointementService.deleteAppointments(this.appointmentActions.id).subscribe({
      next:(response)=>{
        this.showNotification(response.message)
        this.getAllAppointment()
        this.closeDelete()
      }
    })
  }
    // Show update blood bag dialog
    openUpdate(appointment:Appointment): void {
      $('.updateDialog').slideDown(400);
      this.appointmentActions=appointment
      this.appointmentForm.setValue({
        hospitalId: this.appointmentActions.hospitalId,
        emergencyId: this.appointmentActions.emergencyId,
        appointmentDate: this.appointmentActions.appointmentDate ,
        appointmentType: this.appointmentActions.appointmentType,
        contactNumber: this.appointmentActions.contactNumber,
      })
    }

    // Close update blood bag dialog
    closeUpdate(): void {
      $('.updateDialog').slideUp(400);
      this.appointmentForm.reset('')
    }

    // Show delete blood bag dialog
    openDelete(appointment:Appointment): void {
      $('.deleteDialog').slideDown(400);
      this.appointmentActions=appointment
    }

    // Close delete blood bag dialog
    closeDelete(): void {
      $('.deleteDialog').slideUp(400);
    }

     // Fetch all hospitals
     allHospital(): void {
      this._HospitalService.allHospital.subscribe({
        next: (response) => {
          this.myHospital = response;
        }
      });
    }
    // Fetch all emergency

     allEemergency(): void {
      this._EmergencyService.getEmergency().subscribe({
        next: (response) => {
          this.myEmergency = response;
        }
      });
    }

    // Find hospital title by ID
    findHospitalTitle(id: string): any {
      if (this.myHospital.find(hospital => hospital.id == id) == undefined) {
        return id;
      } else {
        return this.myHospital.find(hospital => hospital.id == id)?.frontMatter.title;
      }
    }
    findEmergencyTitle(id: string): any {
      if (this.myEmergency.find(emergency => emergency.id == id) == undefined) {
        return id;
      } else {
        return this.myEmergency.find(emergency => emergency.id == id)?.frontMatter.title;
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
