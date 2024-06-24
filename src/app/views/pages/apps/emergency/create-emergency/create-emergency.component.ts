import { Component, OnInit   } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmergencyService } from './service/emergency.service';
import { NOTEFICATIONService } from 'src/app/note/service/notification.service';



@Component({
  selector: 'app-create-emergency',
  templateUrl: './create-emergency.component.html',
  styleUrls: ['./create-emergency.component.scss']
})
export class CreateEmergencyComponent {

  imageName: string; // Variable to store the name of the selected image
  parentData: any; // Variable to store data for parent component interaction
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

  constructor(private _EmergencyService: EmergencyService, public _note: NOTEFICATIONService) {}

  // Handle form submission for adding emergency
  handleForm(): void {
    if (this.emergForm.valid) {
      this._EmergencyService.createEmergency(this.emergForm.value).subscribe({
        next: () => {
          // Show success message
          this.parentData = 'Emergency Added Successfully';
          this._note.show();
          this.imageName=''

          // Hide success message after 5 seconds
          setTimeout(() => {
            this._note.hide();
          }, 5000);

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

  // Get the name of the selected image
  getImageName(event: any): void {
    this.imageName = event.target.files[0].name;
  }
}
