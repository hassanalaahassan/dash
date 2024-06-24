import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HospitalService } from './services/hospital.service';
import { Hospital } from './hospital';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as $ from 'jquery';
import { NOTEFICATIONService } from 'src/app/note/service/notification.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {

  // Variables for hospital management
  imageName: string; // Store the name of the selected image
  parentData: any; // Store data for parent component interaction
  hospitalChange: Hospital = { frontMatter: { title: '' } } as Hospital; // Store hospital data for change operations
  myHospital: Hospital[]; // Store list of hospitals
  file: any; // Store file data for hospital image upload

  // Form group for adding or updating a hospital
  createHospital: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image2: new FormControl('', [Validators.required])
  });

  // Owl carousel options for hospital display
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

  constructor(private _HospitalService: HospitalService, public _note: NOTEFICATIONService) {}

  ngOnInit(): void {
    // Fetch all hospitals when the component initializes
    this.getAllHospital();
  }

  // Add a new hospital
  newHospital(): void {
    const formData = new FormData();
    formData.append('image', this.file);

    // Check if the hospital form is valid
    if (this.createHospital.valid) {
      // Create a new hospital
      this._HospitalService.createHospital(this.createHospital.value).subscribe({
        next: (response) => {
          // Add hospital image
          this.addImage(response.id, formData);
          // Toggle add dialog
          this.toggleAdd();
        },
        error: (err) => {
          // Handle error message
          this.handleErrorMessage('Error With Hospital Data');
        }
      });
    }
  }

  // Add image for the hospital
  addImage(id: string, model: any): void {
    // Upload hospital image
    this._HospitalService.putImage(model, id).subscribe({
      next: (response) => {
        // Show success message
        this.handleSuccessMessage('Hospital Added Successfully');
        // Refresh hospital list
        this._HospitalService.assignValue();
      },
      error: (err) => {
        // Handle error message
        this.handleErrorMessage('Error While Upload Image');
      }
    });
  }

  // Get all hospitals
  getAllHospital(): void {
    // Fetch all hospitals
    this._HospitalService.allHospital.subscribe({
      next: (response) => {
        // Store fetched hospitals
        this.myHospital = response;
      }
    });
  }

  // Delete a hospital
  delHospital(): void {
    // Delete selected hospital
    this._HospitalService.deleteHospital(this.hospitalChange.id).subscribe({
      next: (response) => {
        // Show success message
        this.handleSuccessMessage('Hospital Deleted Successfully');
        // Close delete dialog
        this.closeDelete();
        // Refresh hospital list
        this._HospitalService.assignValue();
      },
      error: (err) => {
        // Handle error message
        this.handleErrorMessage('Error While Deleting. Please Try Again');
      }
    });
  }

  // Update a hospital
  updateHospital(): void {
    // Update selected hospital
    this._HospitalService.updateHospital(this.hospitalChange.id, this.createHospital.value, this.hospitalChange.frontMatter.image2).subscribe({
      next: (response) => {
        // Show success message
        this.handleSuccessMessage('Hospital Updated Successfully');
        // Close update dialog
        this.closeUpdate();
        // Refresh hospital list
        this._HospitalService.assignValue();
      },
      error: (err) => {
        // Handle error message
        this.handleErrorMessage('Error While Updating. Please Try Again');
      }
    });
  }

  // Show or hide add hospital dialog
  toggleAdd(): void {
    $('.addDialog').slideToggle(400);
  }

  // Show delete hospital dialog
  openDelete(hospital: Hospital): void {
    $('.deleteDialog').slideDown(400);
    this.hospitalChange = hospital;
  }

  // Close delete hospital dialog
  closeDelete(): void {
    $('.deleteDialog').slideUp(400);
  }

  // Show update hospital dialog
  openUpdate(hospital: Hospital): void {
    $('.updateDialog').slideDown(400);
    this.hospitalChange = hospital;
    this.createHospital.setValue({
      title: hospital.frontMatter.title,
      date: hospital.frontMatter.date,
      description: hospital.frontMatter.description,
      image2: ''
    });
  }

  // Close update hospital dialog
  closeUpdate(): void {
    $('.updateDialog').slideUp(400);
    this.createHospital.reset();
  }

  // Handle file selection
  getFile(event: any): void {
    this.file = event.target.files[0];
  }

  // Get month name from date string
  getMonthName(dateString: any): string {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    const monthName = date.toLocaleString('default', { month: 'long' });

    return `${monthName}, ${day}`;
  }

  // Helper function to show success message
  private handleSuccessMessage(message: string): void {
    this.parentData = message;
    this._note.show();
    setTimeout(() => {
      this._note.hide();
    }, 5000);
  }

  // Helper function to show error message
  private handleErrorMessage(message: string): void {
    this.parentData = message;
    this._note.show();
    setTimeout(() => {
      this._note.hide();
    }, 5000);
  }
}
