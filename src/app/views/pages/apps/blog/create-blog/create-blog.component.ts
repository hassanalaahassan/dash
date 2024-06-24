import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { NOTEFICATIONService } from 'src/app/note/service/notification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {
  // constructor( private _BlogService:BlogService,
  //   public _note:NOTEFICATIONService
  // ) { }
  // parentData:any
  // imageName:string
  // file:File
  // blogForm:FormGroup = new FormGroup({
  //   title:new FormControl('',[Validators.required]),
  //   author: new FormGroup({
  //     name:  new FormControl('',[Validators.required]),
  //     position: new FormControl('',[Validators.required]),
  //     isEmployee: new FormControl(true),
  //     isVerified: new FormControl(true)
  //   }),
  //   date:new FormControl('',[Validators.required]),
  //   summary:new FormControl('',[Validators.required]),
  //   content:new FormControl('',[Validators.required]),
  //   category:new FormControl('',[Validators.required]),
  //   images:new FormControl('',[Validators.required])
  // })

  // ngOnInit(): void {
  // }


  // handelForm():void{
  //   const nestedForm = this.blogForm.get('author') as FormGroup
  //   const formData = new FormData();
  //   formData.append('image', this.file);

  //   if(this.blogForm.valid && nestedForm.valid){
  //     this._BlogService.createBlog(this.blogForm.value).subscribe({
  //       next:(response)=>{
  //         this.addImage(formData,response.id)
  //       }
  //       ,
  //     error:(err)=>{
  //       this.parentData='Error With Data Try Again'
  //       this._note.show()
  //       setTimeout(() => {
  //         this._note.hide()
  //       }, 5000);
  //     }
  //     })

  //   }

  // }


  // addImage(model:any,id:string):void{
  //   this._BlogService.putImage(model,id).subscribe({
  //     next:(response)=>{
  //       this.parentData='Blog Created Successfully'
  //       this._note.show()
  //       this.blogForm.reset('')
  //       setTimeout(() => {
  //         this._note.hide()
  //       }, 5000);
  //       this._BlogService.assignBlogs()
  //     },
  //     error:(err)=>{
  //       this.parentData='Error With Image Try Another'
  //       this._note.show()
  //       setTimeout(() => {
  //         this._note.hide()
  //       }, 5000);
  //     }
  //   })
  // }


  // getImageName(event:any):void{
  //   this.imageName=event.target.files[0].name
  //   this.file=event.target.files[0]
  // }
  // Properties for handling form data and notifications
  parentData: string;
  imageName: string;
  file: File;
  blogForm: FormGroup;

  constructor(
    private _blogService: BlogService, // Injecting BlogService
    public _note: NOTEFICATIONService, // Injecting NOTEFICATIONService
    private _DatePipe:DatePipe
  ) {
    // Initialize the form group and its controls
    this.blogForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormGroup({
        name: new FormControl('', [Validators.required]),
        position: new FormControl('', [Validators.required]),
        isEmployee: new FormControl(true),
        isVerified: new FormControl(true)
      }),
      date: new FormControl('', [Validators.required]),
      summary: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      images: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {}

  // Function to handle form submission
  handleForm(): void {
    // Extract nested form group for author
    const nestedForm = this.blogForm.get('author') as FormGroup;
    this.blogForm.get('date')?.setValue(this._DatePipe.transform(this.blogForm.get('date')?.value, 'yyyy-MM-dd\'T\'HH:mm:ssXXX') || ''); // Format date or return empty string if invalid

    // Check if the form and nested form are valid
    if (this.blogForm.valid && nestedForm.valid) {
      const formData = new FormData(); // Create FormData object
      formData.append('image', this.file); // Append image file to form data

      // Call the service to create a blog
      this._blogService.createBlog(this.blogForm.value).subscribe({
        next: (response) => {
          // If blog creation is successful, add image
          this.addImage(formData, response.id);
        },
        error: (err) => {
          // If there's an error, show error message
          this.handleErrorMessage('Error With Data Try Again');
        }
      });
    }
  }

  // Function to add image to the created blog
  addImage(model: any, id: string): void {
    this._blogService.putImage(model, id).subscribe({
      next: (response) => {
        // If image upload is successful, show success message
        this.handleSuccessMessage('Blog Created Successfully');
        // Reset the form after successful submission
        this.blogForm.reset('');
        // Call a function to update assigned blogs
        this._blogService.assignBlogs();
      },
      error: (err) => {
        // If there's an error with image upload, show error message
        this.handleErrorMessage('Error With Image Try Another');
      }
    });
  }

  // Function to handle success message display
  handleSuccessMessage(message: string): void {
    this.parentData = message;
    this._note.show(); // Show notification
    // Hide notification after 5 seconds
    setTimeout(() => {
      this._note.hide();
    }, 5000);
  }

  // Function to handle error message display
  handleErrorMessage(message: string): void {
    this.parentData = message;
    this._note.show(); // Show notification
    // Hide notification after 5 seconds
    setTimeout(() => {
      this._note.hide();
    }, 5000);
  }

  // Function to get the name of the selected image file
  getImageName(event: any): void {
    this.imageName = event.target.files[0].name;
    this.file = event.target.files[0];
  }

}
