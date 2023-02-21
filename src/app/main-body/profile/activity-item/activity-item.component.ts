import { Component, Input } from '@angular/core';
import { Activity } from 'src/app/interfaces/activity.inteface';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
})
export class ActivityItemComponent {
  @Input() activity: Activity;

  getDate() {
    return new Date(this.activity.date).toLocaleDateString('en-US');
  }
}
