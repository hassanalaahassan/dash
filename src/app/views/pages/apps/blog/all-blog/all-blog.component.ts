import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BlogService } from '../services/blog.service';
import { Blog } from '../blog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NOTEFICATIONService } from 'src/app/note/service/notification.service';


@Component({
  selector: 'app-all-blog',
  templateUrl: './all-blog.component.html',
  styleUrls: ['./all-blog.component.scss']
})
export class AllBlogComponent implements OnInit {
  // Properties
  myBlogs: Blog[] = []; // Array to store fetched blogs
  parentData: any; // Data for notifications
  blogActions: Blog = { // Represents a blog
    content: '', // Blog content
    frontMatter: { // Metadata of the blog
      title: '', // Title of the blog
      date: '', // Date of the blog
      draft: false, // Indicates if the blog is a draft
      summary: '', // Summary of the blog
      category: '', // Category of the blog
      images: '', // Images related to the blog
      author: { // Author details
        name: '', // Author's name
        position: '', // Author's position
        image: '', // Author's image
        isEmployee: true, // Indicates if the author is an employee
        isVerified: true // Indicates if the author is verified
      }
    }
  } as Blog;
  customOptions: OwlOptions = { // Options for Owl carousel
    loop: true, // Enable looping
    mouseDrag: false, // Disable mouse dragging
    touchDrag: true, // Enable touch dragging
    pullDrag: true, // Enable pull dragging
    dots: false, // Hide navigation dots
    autoplay: true, // Enable autoplay
    autoplayHoverPause: true, // Pause autoplay on hover
    margin: 15, // Margin between items
    navSpeed: 500, // Navigation speed
    navText: ['', ''], // Navigation text
    responsive: { // Responsive options
      0: { items: 1 }, // Number of items for viewport width < 400px
      400: { items: 1 }, // Number of items for viewport width >= 400px
      740: { items: 2 }, // Number of items for viewport width >= 740px
      940: { items: 4 } // Number of items for viewport width >= 940px
    },
    nav: true // Enable navigation
  };
  blogForm: FormGroup = new FormGroup({ // Form group for creating or updating a blog
    title: new FormControl('', [Validators.required]), // Title form control
    author: new FormGroup({ // Author form group
      name: new FormControl('', [Validators.required]), // Author name form control
      position: new FormControl('', [Validators.required]), // Author position form control
      isEmployee: new FormControl(true), // Author employment status form control
      isVerified: new FormControl(true) // Author verification status form control
    }),
    date: new FormControl('', [Validators.required]), // Date form control
    summary: new FormControl('', [Validators.required]), // Summary form control
    content: new FormControl('', [Validators.required]), // Content form control
    category: new FormControl('', [Validators.required]), // Category form control
    images: new FormControl('', [Validators.required]) // Images form control
  });
  imageName: any;

  constructor(
    private _BlogService: BlogService, // Service for managing blogs
    public _note: NOTEFICATIONService // Service for displaying notifications
  ) {}

  ngOnInit(): void {
    this.allBlog(); // Fetch all blogs when component initializes
  }

  // Fetch all blogs
  allBlog(): void {
    this._BlogService.allBlogs.subscribe({
      next: (response) => {
        this.myBlogs = response; // Assign fetched blogs to myBlogs array
      }
    });
  }

  // Update an existing blog
  changeBlog(): void {
    this._BlogService.upadteBlog(this.blogForm.value, this.blogActions.id, this.blogActions.frontMatter.images).subscribe({
      next: (response) => {
        this._BlogService.assignBlogs(); // Update the list of blogs
        this.showNotification('Blog Updated Successfully'); // Display success notification
        this.closeUpdate(); // Close the update dialog
      },
      error: (err) => {
        this.showNotification('Error while Update Try Again Later'); // Display error notification
      }
    });
  }

  // Delete a blog
  deleteBlog(): void {
    this._BlogService.deleteBlog(this.blogActions.id).subscribe({
      next: (response) => {
        this._BlogService.assignBlogs(); // Update the list of blogs
        this.showNotification('Blog Deleted Successfully'); // Display success notification
        this.closeDelete(); // Close the delete dialog
      },
      error: (err) => {
        this.showNotification('Error while Delete Try Again Later'); // Display error notification
      }
    });
  }

  // Get the name of the month from a date string
  getMonthName(dateString: any) {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    const monthName = date.toLocaleString('default', { month: 'long' });
    return monthName + ',' + day;
  }

  // Open the delete dialog for a blog
  openDelete(blog: Blog): void {
    $('.deleteDialog').slideDown(400);
    this.blogActions = blog;
  }

  // Close the delete dialog
  closeDelete(): void {
    $('.deleteDialog').slideUp(400);
  }

  // Open the update dialog for a blog
  openUpdate(blog: Blog): void {
    $('.updateDialog').slideDown(400);
    this.blogActions = blog;
    this.blogForm.setValue({
      title: this.blogActions.frontMatter.title,
      date: this.blogActions.frontMatter.date,
      summary: this.blogActions.frontMatter.summary,
      content: this.blogActions.content,
      category: this.blogActions.frontMatter.category,
      author: {
        name: this.blogActions.frontMatter.author.name,
        position: this.blogActions.frontMatter.author.position,
        isEmployee: true,
        isVerified: true
      },
      images: ''
    });
  }

  // Close the update dialog
  closeUpdate(): void {
    $('.updateDialog').slideUp(400);
    this.blogForm.reset('');
  }


  // Function to get the name of the selected image file
  getImageName(event: any): void {
    this.imageName = event.target.files[0].name;
  }


  // Function to display notification
  showNotification(message: string): void {
    // Set notification message
    this.parentData = message;
    // Show notification
    this._note.show();
    // Hide notification after 5 seconds
    setTimeout(() => {
      this._note.hide();
    }, 5000);
  }
}

