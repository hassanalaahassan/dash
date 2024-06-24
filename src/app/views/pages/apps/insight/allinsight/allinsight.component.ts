import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { InsightService } from '../services/insight.service';
import { Insight } from './insight';
import { NOTEFICATIONService } from 'src/app/note/service/notification.service';

@Component({
  selector: 'app-allinsight',
  templateUrl: './allinsight.component.html',
  styleUrls: ['./allinsight.component.scss']
})
export class AllinsightComponent implements OnInit {

changeInsight():void{

}
myInsights: Insight[] = [];
parentData: string;

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


// Initialize form group
  insightForm = new FormGroup({
  title: new FormControl('', [Validators.required]),
  date: new FormControl('', [Validators.required]),
  summary: new FormControl('', [Validators.required]),
  content: new FormControl('', [Validators.required]),
  category: new FormControl('', [Validators.required]),
  images: new FormControl('', [Validators.required])
});

// Initialize insightActions
  insightActions = {
  content: '',
  frontMatter: {
    title: '',
    date: '',
    images: '',
    summary: '',
    category: ''
  }
} as Insight;

constructor(
  private _InsightService: InsightService,
  public _note: NOTEFICATIONService
) {

}

ngOnInit(): void {
  // Fetch all insights on component initialization
  this.allInsight();
}

// Fetch all insights
allInsight(): void {
  this._InsightService.allInsights.subscribe({
    next: (response) => {
      this.myInsights = response;
    }
  });
}

// Open delete dialog for a specific insight
openDelete(insight: Insight): void {
  $('.deleteDialog').slideDown(400);
  this.insightActions = insight;
}

// Close delete dialog
closeDelete(): void {
  $('.deleteDialog').slideUp(400);
}

// Open update dialog for a specific insight
openUpdate(insight: Insight): void {
  $('.updateDialog').slideDown(400);
  this.insightActions = insight;
  // Populate form with insight data
  this.insightForm.setValue({
    title: this.insightActions.frontMatter.title,
    date: this.insightActions.frontMatter.date,
    summary: this.insightActions.frontMatter.summary,
    content: this.insightActions.content,
    category: this.insightActions.frontMatter.category,
    images: ''
  });
}

// Close update dialog
closeUpdate(): void {
  $('.updateDialog').slideUp(400);
  // Reset form
  this.insightForm.reset();
}

// Delete a specific insight
deleteInsight(): void {
  this._InsightService.deleteInsight(this.insightActions.id).subscribe({
    next: (response) => {
      // Refresh insights and show success notification
      this._InsightService.assignInsights();
      this.parentData = 'Insight Deleted Successfully';
      this.showNotification();
      this.closeDelete();
    },
    error: (err) => {
      // Show error notification
      this.parentData = 'Error while Deleting. Try Again Later';
      this.showNotification();
    }
  });
}

// Show notification
showNotification(): void {
  this._note.show();
  setTimeout(() => this._note.hide(), 5000);
}

// Get month name from date string
getMonthName(dateString: any): string {
  const [year, month, day] = dateString.split('-');
  const date = new Date(year, month - 1, day);
  const monthName = date.toLocaleString('default', { month: 'long' });
  return monthName + ',' + day;
}

}
