import { Component, OnInit   } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmergencyService } from '../create-emergency/service/emergency.service';
import { Emergency } from './emergency';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NOTEFICATIONService } from 'src/app/note/service/notification.service';




@Component({
  selector: 'app-all-emergency',
  templateUrl: './all-emergency.component.html',
  styleUrls: ['./all-emergency.component.scss']
})
export class AllEmergencyComponent implements OnInit {

  myEmergency: Emergency[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    margin: 15,
    navSpeed: 500,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      740: { items: 2 },
      940: { items: 4 }
    },
    nav: true
  };
  parentData: any;
  emergForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    level: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    summary: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    site: new FormControl('', [Validators.required])
  });
  emergencyActions:Emergency={
    frontMatter:{
      title: '',
      category: '',
      date: '',
      draft: false,
      images: '',
      level: '',
      location: '',
      period: '',
      salary: '',
      site: '',
      summary: ''
    }
  } as Emergency;

  constructor(private _EmergencyService: EmergencyService, public _note: NOTEFICATIONService) {}

  // Initialize component and fetch all emergency data
  ngOnInit(): void {
    this.getAllEmergency();
  }

  // Toggle the add dialog
  toggleAdd(): void {
    $('.addDialog').slideToggle(400);
  }

  // Open the delete dialog for a specific emergency
  openDelete(emergency: Emergency): void {
    $('.deleteDialog').slideDown(400);
    this.emergencyActions = emergency;
  }

  // Close the delete dialog
  closeDelete(): void {
    $('.deleteDialog').slideUp(400);
  }

  // Open the update dialog for a specific emergency
  openUpdate(emergency: Emergency): void {
    $('.updateDialog').slideDown(400);
    this.emergencyActions=emergency
    this.emergForm.setValue({
      title: emergency.frontMatter.title,
      level: emergency.frontMatter.level,
      date: emergency.frontMatter.date,
      summary: emergency.frontMatter.summary,
      category: emergency.frontMatter.category,
      location: emergency.frontMatter.location,
      site: emergency.frontMatter.site
    });
  }

  // Close the update dialog and reset form
  closeUpdate(): void {
    $('.updateDialog').slideUp(400);
    this.emergForm.reset();
  }

  // Fetch all emergency data
  getAllEmergency(): void {
    this._EmergencyService.getEmergency().subscribe({
      next: (response) => {
        this.myEmergency = response;
      }
    });
  }

  // Update emergency data
  updateEmergency(): void {
    if (this.emergForm.valid) {
      this._EmergencyService.updateEmergency(this.emergForm.value,this.emergencyActions.id).subscribe({
        next: (response) => {
          this.showNotification('Emergency Updated Successfully')
          this.getAllEmergency(); // Refresh emergency data after update
          this.closeUpdate()
        },
        error:(err)=>{
          this.showNotification('Error While Updating Emergency Please Try Again')
          this.closeUpdate()
        }
      });
    }
  }
  // Delete emergency data
  deleteEmergency(): void {
      this._EmergencyService.deleteEmergency(this.emergencyActions.id).subscribe({
        next: (response) => {
          this.showNotification('Emergency Deleted Successfully')
          this.getAllEmergency(); // Refresh emergency data after delete
          this.closeDelete()
        },
        error:(err)=>{
          this.showNotification('Error While Deleted Emergency Please Try Again')
          this.closeDelete()
        }
      });
  }

  // Get the month name from a given date string
  getMonthName(dateString: any): string {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    const monthName = date.toLocaleString('default', { month: 'long' });

    return `${monthName}, ${day}`;
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
