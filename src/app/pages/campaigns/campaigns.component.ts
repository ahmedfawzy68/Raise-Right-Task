import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { CampaignsListComponent } from './campaigns-list/campaigns-list.component';
import { NewCampaignsComponent } from '../../shared/components/new-campaigns/new-campaigns.component';

@Component({
  selector: 'app-campaigns',
  imports: [HeroSectionComponent, CampaignsListComponent, NewCampaignsComponent],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss'
})
export class CampaignsComponent {

}
