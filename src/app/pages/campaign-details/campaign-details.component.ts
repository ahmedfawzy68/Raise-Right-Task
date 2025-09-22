import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { NewDonationsComponent } from './new-donations/new-donations.component';
import { DonateNowComponent } from './donate-now/donate-now.component';
import { PartnersComponent } from './partners/partners.component';
import { NewCampaignsComponent } from '../../shared/components/new-campaigns/new-campaigns.component';
import { CampaignsService } from '../../shared/services/campaigns.service';
import { WebSocketService } from '../../shared/services/websocket.service';
import { Observable, Subscription } from 'rxjs';
import { Campaign } from '../../core/interfaces/campaign';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campaign-details',
  imports: [RouterModule, DetailsComponent, NewDonationsComponent, DonateNowComponent, PartnersComponent, NewCampaignsComponent, CommonModule],
  templateUrl: './campaign-details.component.html',
  styleUrl: './campaign-details.component.scss'
})
export class CampaignDetailsComponent implements OnInit, OnDestroy {
  campaignDetails: Campaign | null = null;
  private subscription = new Subscription();
  private campaignId!: string;

  constructor(
    private _campaign: CampaignsService,
    private route: ActivatedRoute,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    this.campaignId = this.route.snapshot.paramMap.get('id') || '';
    if (this.campaignId) {
      this.loadCampaignWithRealTimeUpdates();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // Unsubscribe from campaign-specific updates
    if (this.campaignId) {
      this.webSocketService.unsubscribeFromCampaign(this.campaignId);
    }
  }

  private loadCampaignWithRealTimeUpdates(): void {
    // Get initial campaign data via GraphQL
    const initialDataSubscription = this._campaign.getCampaignById(this.campaignId).subscribe({
      next: (campaign) => {
        this.campaignDetails = campaign;
        console.log('Initial campaign data loaded:', campaign);
      },
      error: (err) => {
        console.error('Error loading campaign details:', err);
      }
    });

    // Subscribe to real-time updates for this campaign
    const realTimeSubscription = this._campaign.getCurrentCampaignWithRealTimeUpdates().subscribe({
      next: (updatedCampaign) => {
        if (updatedCampaign && updatedCampaign.id === this.campaignId) {
          this.campaignDetails = updatedCampaign;
          console.log('Campaign updated via WebSocket:', updatedCampaign);
        }
      },
      error: (err) => {
        console.error('Error in real-time updates:', err);
      }
    });

    this.subscription.add(initialDataSubscription);
    this.subscription.add(realTimeSubscription);
  }
}

