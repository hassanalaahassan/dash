import { Component, OnInit } from '@angular/core';
import { TicketService } from './services/ticket.service';
import { Ticket } from './ticket';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { Hospital } from '../hospital/hospital';
import { HospitalService } from '../hospital/services/hospital.service';
import { NOTEFICATIONService } from 'src/app/note/service/notification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class ticketComponent implements OnInit {

  parentData: any; // Data for notifications
  tickets: Ticket[]; // Holds fetched tickets
  myHospital: Hospital[]; // Holds fetched hospitals
  ticketWillDelete: any = ''; // Ticket to be deleted
  myObject: { [key: string]: any } = {};
  // Form for creating or updating a ticket
  createTicket: FormGroup = new FormGroup({
    ownerEmail: new FormControl('', [Validators.email, Validators.required]),
    hospitalID: new FormControl('', [Validators.required]),
    donationDate: new FormControl('', [Validators.required]),
    transferDate: new FormControl('', [Validators.required]),
    expiryDate: new FormControl('', [Validators.required]),
  });

  constructor(
    private _TicketService: TicketService,
    private _HospitalService: HospitalService,
    public _note: NOTEFICATIONService,
    private _DatePipe:DatePipe
  ) { }

  ngOnInit(): void {
    // Fetch initial data
    this.allTickets();
    this.allHospital();
  }

  // Fetch all tickets
  allTickets(): void {
    this._TicketService.allTickets.subscribe({
      next: (response) => {
        this.tickets = response;
      }
    });
  }

  // Update a ticket
  updateTicket(): void {
    Object.entries(this.createTicket.controls).forEach(([key,value]:any)=>{

      if(key.includes('Date')){

        this.createTicket.get(key)?.setValue(this.formatDate(value.value))

      }
    })
    if (this.createTicket.valid) {
      this._TicketService.updateTicket(this.createTicket.value, this.ticketWillDelete.id).subscribe({
        next: (response) => {
          this.closeUpdate();
          this.showNotification('Ticket Updated Successfully');
          this._TicketService.assignValue();
        },
        error: (err) => {
          this.showNotification('Failed Processing');
        }
      });
    }
  }

  // Create a new ticket
  newTicket(): void {

    Object.entries(this.createTicket.controls).forEach(([key,value]:any)=>{

      if(key.includes('Date')){

        this.createTicket.get(key)?.setValue(this.formatDate(value.value))

      }
    })

    if (this.createTicket.valid) {
      this._TicketService.createTicket(this.createTicket.value).subscribe({
        next: (response) => {
          this.createTicket.reset('');
          this.closeAdd();
          this.showNotification('Ticket Generated Successfully');
          this._TicketService.assignValue();
        },
        error: (err) => {
          this.parentData = err.error.errors[0];
          this.showNotification(this.parentData);
        }
      });
    }
  }

  // Delete a ticket
  delTicket(): void {
    this._TicketService.deleteTicket(this.ticketWillDelete.id).subscribe({
      next: (response) => {
        this.closeDelete();
        this.showNotification('Ticket Deleted Successfully');
        this._TicketService.assignValue();
      },
      error: (err) => {
        this.showNotification('Failed Processing');
      }
    });
  }

  // Fetch all hospitals
  allHospital(): void {
    this._HospitalService.allHospital.subscribe({
      next: (response) => {
        this.myHospital = response;
      }
    });
  }

  // Find hospital title by ID
  findHospitalTitle(id: string): any {
    const hospital = this.myHospital.find(hospital => hospital.id === id);
    return hospital ? hospital.frontMatter.title : id;
  }

  // Open update dialog for a ticket
  openUpdate(ticket: Ticket): void {
    this.createTicket.setValue({
      ownerEmail: ticket.ownerEmail,
      hospitalID: ticket.hospitalID,
      donationDate: ticket.donationDate,
      expiryDate: ticket.expiryDate,
      transferDate: ticket.transferDate,
    });
    $('.updateDialog').slideDown(400);
    this.ticketWillDelete = ticket;
  }

  // Close update dialog
  closeUpdate(): void {
    this.createTicket.reset('');
    $('.updateDialog').slideUp(400);
  }

  // Open delete dialog for a ticket
  openDelete(ticket: Ticket): void {
    this.ticketWillDelete = ticket;
    $('.deleteDialog').slideDown(400);
  }

  // Close delete dialog
  closeDelete(): void {
    $('.deleteDialog').slideUp(400);
  }

  // Open add dialog
  openAdd(): void {
    $('.addDialog').slideDown(400);
  }

  // Close add dialog
  closeAdd(): void {
    $('.addDialog').slideUp(400);
  }

  // Show notification
  showNotification(message: string): void {
    this.parentData = message;
    this._note.show();
    setTimeout(() => {
      this._note.hide();
    }, 5000);
  }

  formatDate(date: string): string {
    // Assuming date is in the format "yyyy-mm-dd"
    return this._DatePipe.transform(date, 'yyyy-MM-dd\'T\'HH:mm:ssXXX') || ''; // Format date or return empty string if invalid
  }


}
