import { Component, OnInit, OnDestroy } from '@angular/core';
import { CampaignCardComponent } from './campaign-card/campaign-card.component';
import { Campaign } from '../../../core/interfaces/campaign';
import { CampaignsService } from '../../../shared/services/campaigns.service';
import { CustomSkeletonComponent } from '../../../shared/components/custom-skeleton/custom-skeleton.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-campaigns-list',
  imports: [CampaignCardComponent, CustomSkeletonComponent],
  templateUrl: './campaigns-list.component.html',
  styleUrl: './campaigns-list.component.scss'
})
export class CampaignsListComponent implements OnInit, OnDestroy {
  campaignsList!: Campaign[];
  isLoading = true;
  private subscription = new Subscription();

  constructor(private _campaigns: CampaignsService) { }

  ngOnInit(): void {
    this.getAllCampaignsWithRealTimeUpdates();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAllCampaignsWithRealTimeUpdates() {
    this.isLoading = true;

    // Subscribe to campaigns with real-time updates
    const campaignsSubscription = this._campaigns.getCampaignsWithRealTimeUpdates().subscribe({
      next: (campaigns) => {
        this.campaignsList = campaigns;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching campaigns:', err);
        this.isLoading = false;
        // Fallback to regular API call
        this.getAllCampaigns();
      }
    });

    this.subscription.add(campaignsSubscription);
  }

  // Fallback method for regular API call
  getAllCampaigns() {
    const fallbackSubscription = this._campaigns.getAllCampaigns().subscribe({
      next: (res) => {
        this.campaignsList = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching campaigns (fallback):', err);
        this.isLoading = false;
      }
    });

    this.subscription.add(fallbackSubscription);
  }

  // Method to manually refresh campaigns
  refreshCampaigns() {
    this._campaigns.refreshCampaigns();
  }
}
