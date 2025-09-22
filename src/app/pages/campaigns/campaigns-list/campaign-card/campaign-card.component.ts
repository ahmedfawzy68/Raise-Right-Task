import { Component, Input } from '@angular/core';
import { Campaign } from '../../../../core/interfaces/campaign';
import { ProgressComponent } from '../../../../shared/components/progress/progress.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-campaign-card',
  imports: [ProgressComponent, RouterModule],
  templateUrl: './campaign-card.component.html',
  styleUrl: './campaign-card.component.scss'
})
export class CampaignCardComponent {
  @Input() list!: any;

}
