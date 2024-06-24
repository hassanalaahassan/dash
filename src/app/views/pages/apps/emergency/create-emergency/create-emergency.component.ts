import { Component, OnInit   } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmergencyService } from './service/emergency.service';
import { NOTEFICATIONService } from 'src/app/note/service/notification.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-create-emergency',
  templateUrl: './create-emergency.component.html',
  styleUrls: ['./create-emergency.component.scss']
})
export class CreateEmergencyComponent {

  imageName: string; // Variable to store the name of the selected image
  parentData: any; // Variable to store data for parent component interaction
  file:any
  emergForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    level: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    summary: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    site: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required])
  }); // Form group for emergency form

  constructor(private _EmergencyService: EmergencyService, public _note: NOTEFICATIONService,private _DatePipe:DatePipe) {}

  // Handle form submission for adding emergency
  handleForm(): void {
    if (this.emergForm.valid) {
      const formData = new FormData();
      formData.append('image', this.file);
      this.emergForm.get('date')?.setValue(this._DatePipe.transform(this.emergForm.get('date')?.value, 'yyyy-MM-dd\'T\'HH:mm:ssXXX') || ''); // Format date or return empty string if invalid

      this._EmergencyService.createEmergency(this.emergForm.value).subscribe({
        next: (response) => {
          formData.append('id',response.id);

          // Show success message
          this.addImage(formData)

          // Reset form fields
          this.emergForm.reset({
            title: '',
            level: '',
            date: '',
            summary: '',
            category: '',
            site: '',
            location: ''
          });
        },
        error: () => {
          // Show error message
          this.parentData = 'Error with Data. Please Try Again Later';
          this._note.show();

          // Hide error message after 5 seconds
          setTimeout(() => {
            this._note.hide();
          }, 5000);
        }
      });
    }
  }

  addImage(model: any): void {
    // Call the InsightService to upload the image
    this._EmergencyService.putImage(model).subscribe({
      next: (response) => {
        // refresh the insights
        this._EmergencyService.getEmergency();
        this.parentData = 'Emergency Added Successfully';
        this._note.show();
        this.imageName=''

        // Hide success message after 5 seconds
        setTimeout(() => {
          this._note.hide();
        }, 5000);

      }
    });
  }
  // Get the name of the selected image
  getImageName(event: any): void {
    this.imageName = event.target.files[0].name;
    this.file = event.target.files[0]; // Store the selected image file

  }
}
