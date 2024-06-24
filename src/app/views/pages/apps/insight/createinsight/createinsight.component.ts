import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InsightService } from '../services/insight.service';
import { NOTEFICATIONService } from 'src/app/note/service/notification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-createinsight',
  templateUrl: './createinsight.component.html',
  styleUrls: ['./createinsight.component.scss']
})
export class CreateinsightComponent {
  imageName: string; // Store the name of the selected image
  file: File; // Store the selected image file
  parentData: any; // Data for parent component interaction

  insightForm: FormGroup = new FormGroup({ // Form group for adding new insight
    title: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    summary: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    images: new FormControl('', [Validators.required])
  });

  constructor(
    private _InsightService: InsightService,
    public _note: NOTEFICATIONService,
    private _DatePipe:DatePipe
  ) {}

  // Handle form submission
  handleForm(): void {
    // Create a FormData object and append the selected image file
    const formData = new FormData();
    formData.append('image', this.file);
    this.insightForm.get('date')?.setValue(this._DatePipe.transform(this.insightForm.get('date')?.value, 'yyyy-MM-dd\'T\'HH:mm:ssXXX') || ''); // Format date or return empty string if invalid


    // Check if the form is valid
    if (this.insightForm.valid) {
      // Call the InsightService to create a new insight
      this._InsightService.createInsight(this.insightForm.value).subscribe({
        next: (response) => {
          // Add the image to the created insight
          this.addImage(formData, response.id);
          // Reset the form after successful submission
          this.insightForm.reset('');
          
          this.imageName=''
        }
      });
    }
  }

  // Add image to an insight
  addImage(model: any, id: string): void {
    // Call the InsightService to upload the image
    this._InsightService.putImage(model, id).subscribe({
      next: (response) => {
        // refresh the insights
        this._InsightService.assignInsights();
      }
    });
  }

  // Get the name of the selected image file
  getImageName(event: any): void {
    this.imageName = event.target.files[0].name;
    this.file = event.target.files[0]; // Store the selected image file
  }
}
