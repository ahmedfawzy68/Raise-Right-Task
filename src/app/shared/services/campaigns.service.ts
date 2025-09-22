import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, BehaviorSubject, filter } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Campaign } from '../../core/interfaces/campaign';
import { DonationUpdate, GoalReachedEvent } from '../../core/interfaces/donation';
import { Apollo, gql } from 'apollo-angular';
import { WebSocketService, WebSocketMessage } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {
  private campaignsSubject = new BehaviorSubject<Campaign[]>([]);
  public campaigns$ = this.campaignsSubject.asObservable();

  private currentCampaignSubject = new BehaviorSubject<Campaign | null>(null);
  public currentCampaign$ = this.currentCampaignSubject.asObservable();

  constructor(
    private http: HttpClient,
    private apollo: Apollo,
    private webSocketService: WebSocketService
  ) {
    this.initializeWebSocketListeners();
  }

  private initializeWebSocketListeners(): void {
    // Subscribe to all campaigns for real-time updates
    this.webSocketService.subscribeToAllCampaigns();

    // Listen for WebSocket messages
    this.webSocketService.messages$.pipe(
      filter((message: WebSocketMessage) =>
        message.type === 'campaign_update' ||
        message.type === 'new_donation' ||
        message.type === 'goal_reached'
      )
    ).subscribe((message: WebSocketMessage) => {
      this.handleRealTimeUpdate(message);
    });
  }

  private handleRealTimeUpdate(message: WebSocketMessage): void {
    const { type, data } = message;

    switch (type) {
      case 'campaign_update':
        this.updateCampaignInList(data as Campaign);
        break;
      case 'new_donation':
        this.handleNewDonation(data as DonationUpdate);
        break;
      case 'goal_reached':
        this.handleGoalReached(data as GoalReachedEvent);
        break;
    }
  }

  private updateCampaignInList(updatedCampaign: Campaign): void {
    const currentCampaigns = this.campaignsSubject.value;
    const index = currentCampaigns.findIndex(campaign => campaign.id === updatedCampaign.id);

    if (index !== -1) {
      currentCampaigns[index] = { ...currentCampaigns[index], ...updatedCampaign };
      this.campaignsSubject.next([...currentCampaigns]);
    }

    // Update current campaign if it's the same one
    const currentCampaign = this.currentCampaignSubject.value;
    if (currentCampaign && currentCampaign.id === updatedCampaign.id) {
      this.currentCampaignSubject.next({ ...currentCampaign, ...updatedCampaign });
    }
  }

  private handleNewDonation(donationData: any): void {
    console.log('New donation received:', donationData);
    // You can emit notifications here
    this.updateCampaignInList(donationData.campaign);
  }

  private handleGoalReached(campaignData: any): void {
    console.log('Goal reached for campaign:', campaignData);
    // You can emit notifications here
    this.updateCampaignInList(campaignData);
  }

  getAllCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(`${environment.apiUrl}/campaigns`).pipe(
      map((campaigns: Campaign[]) => {
        this.campaignsSubject.next(campaigns);
        return campaigns;
      })
    );
  }

  getCampaignById(id: string): Observable<Campaign> {
    const GET_CAMPAIGN_BY_ID = gql`
      query getCampaignDetails($id: ID!) {
        campaign(id: $id) {
          id
          name
          goal
          currentAmount
          description
          imageUrl
          donors{
            name
            amount
          }
        }
      }
    `;

    return this.apollo.query<{ campaign: Campaign }>({
      query: GET_CAMPAIGN_BY_ID,
      variables: { id }
    }).pipe(
      map(result => {
        const campaign = result.data.campaign;
        this.currentCampaignSubject.next(campaign);

        // Subscribe to this specific campaign for real-time updates
        this.webSocketService.subscribeToCampaign(id);

        return campaign;
      })
    );
  }

  // Method to manually refresh campaigns
  refreshCampaigns(): void {
    this.getAllCampaigns().subscribe();
  }

  // Get campaigns with real-time updates
  getCampaignsWithRealTimeUpdates(): Observable<Campaign[]> {
    // First get initial data
    this.getAllCampaigns().subscribe();
    // Then return the observable that will update with WebSocket data
    return this.campaigns$;
  }

  // Get current campaign with real-time updates
  getCurrentCampaignWithRealTimeUpdates(): Observable<Campaign | null> {
    return this.currentCampaign$;
  }
}
