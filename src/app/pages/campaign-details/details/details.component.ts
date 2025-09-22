import { Component, Input } from '@angular/core';
import { ProgressComponent } from '../../../shared/components/progress/progress.component';
import { Campaign } from '../../../core/interfaces/campaign';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [ProgressComponent, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  @Input() campaignDetails: Campaign | null = null;

}
