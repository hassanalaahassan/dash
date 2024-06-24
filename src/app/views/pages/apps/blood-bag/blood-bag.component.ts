import { Component, OnInit } from '@angular/core';
import { BloodBag } from './bloodBag';
import { BloodBagService } from './service/blood-bag.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from'jquery';
import { Hospital } from '../hospital/hospital';
import { HospitalService } from '../hospital/services/hospital.service';
import { NOTEFICATIONService } from 'src/app/note/service/notification.service';
@Component({
  selector: 'app-blood-bag',
  templateUrl: './blood-bag.component.html',
  styleUrls: ['./blood-bag.component.scss']
})
export class BloodBagComponent implements OnInit {
    // Variables for blood bag management
    delBag: any = ''; // Store blood bag to be deleted or updated
    bags: BloodBag[]; // Store list of blood bags
    myHospital: Hospital[] = []; // Store list of hospitals
    parentData: any; // Store data for parent component interaction

    // Form group for adding or updating a blood bag
    bagForm: FormGroup = new FormGroup({
      hospitalId: new FormControl('', [Validators.required]),
      bloodType: new FormControl('', [Validators.required]),
      donorEmail: new FormControl('', [Validators.required])
    });

    constructor(
      private _BloodBagService: BloodBagService,
      private _HospitalService: HospitalService,
      public _note: NOTEFICATIONService
    ) {}

    ngOnInit(): void {
      // Fetch all blood bags and hospitals when the component initializes
      this.getAllBags();
      this.allHospital();
    }

    // Show or hide add blood bag dialog
    addDialog(): void {
      $('.addDialog').slideToggle(400);
    }

    // Show update blood bag dialog
    openUpdate(bag: BloodBag): void {
      $('.updateDialog').slideDown(400);
      this.delBag = bag;
      this.bagForm.setValue({
        hospitalId: bag.hospitalId,
        bloodType: bag.bloodType,
        donorEmail: bag.donorEmail
      });
    }

    // Close update blood bag dialog
    closeUpdate(): void {
      $('.updateDialog').slideUp(400);
      this.bagForm.setValue({
        hospitalId: '',
        bloodType: '',
        donorEmail: ''
      });
    }

    // Show delete blood bag dialog
    openDelete(bag: BloodBag): void {
      $('.deleteDialog').slideDown(400);
      this.delBag = bag;
    }

    // Close delete blood bag dialog
    closeDelete(): void {
      $('.deleteDialog').slideUp(400);
    }

    // Fetch all blood bags
    getAllBags(): void {
      this._BloodBagService.getAllBag().subscribe({
        next: (response) => {
          this.bags = response;
        }
      });
    }

    // Add a new blood bag
    newBag(): void {
      this._BloodBagService.createBag(this.bagForm.value).subscribe({
        next: (response) => {
          this.handleSuccessMessage('Your Blood Bag Added Successfully');
          this.getAllBags();
          this.addDialog();
        },
        error: (err) => {
          this.handleErrorMessage('Error With Data Or Internet. Please Try Again');
        }
      });
    }

    // Delete a blood bag
    deleteBag(): void {
      this._BloodBagService.deleteBag(this.delBag.id).subscribe({
        next: (response) => {
          this.handleSuccessMessage('Blood Bag Deleted Successfully');
          this.getAllBags();
          this.closeDelete();
        },
        error: (err) => {
          this.handleErrorMessage('Error While Deleting. Please Try Again');
        }
      });
    }

    // Update a blood bag
    editBag(): void {
      this._BloodBagService.updateBag(this.delBag.id, this.bagForm.value).subscribe({
        next: (response) => {
          this.handleSuccessMessage('Your Blood Bag Updated Successfully');
          this.closeUpdate();
          this.getAllBags();
        },
        error: (err) => {
          this.handleErrorMessage('Error While Update. Please Try Again');
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
      if (this.myHospital.find(hospital => hospital.id == id) == undefined) {
        return id;
      } else {
        return this.myHospital.find(hospital => hospital.id == id)?.frontMatter.title;
      }
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
