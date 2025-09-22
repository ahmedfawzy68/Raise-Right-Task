import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Donation } from '../../core/interfaces/donation';
import { NotificationService } from './notification.service';

export interface CreateDonationRequest {
    campaignId: string;
    amount: number;
    donorName: string;
    donorEmail?: string;
    anonymous?: boolean;
}

export interface CreateDonationResponse {
    success: boolean;
    donation: Donation;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class DonationService {

    constructor(
        private http: HttpClient,
        private notificationService: NotificationService
    ) { }

    createDonation(donationRequest: CreateDonationRequest): Observable<CreateDonationResponse> {
        return this.http.post<CreateDonationResponse>(
            `${environment.apiUrl}/donations`,
            donationRequest
        );
    }

    getDonationsByCampaign(campaignId: string): Observable<Donation[]> {
        return this.http.get<Donation[]>(`${environment.apiUrl}/campaigns/${campaignId}/donations`);
    }

    // Simulate donation for demo purposes (if API endpoint is not available)
    simulateDonation(donationRequest: CreateDonationRequest): Observable<CreateDonationResponse> {
        // Simulate a successful donation
        const mockDonation: Donation = {
            id: Date.now().toString(),
            amount: donationRequest.amount,
            donor: {
                name: donationRequest.donorName,
                email: donationRequest.donorEmail
            },
            campaignId: donationRequest.campaignId,
            timestamp: new Date().toISOString(),
            anonymous: donationRequest.anonymous
        };

        const response: CreateDonationResponse = {
            success: true,
            donation: mockDonation,
            message: 'Donation successful!'
        };

        // Show success notification
        this.notificationService.showSuccess(
            'Donation Successful!',
            `Thank you for your donation of $${donationRequest.amount}!`
        );

        return new Observable(observer => {
            // Simulate API delay
            setTimeout(() => {
                observer.next(response);
                observer.complete();
            }, 1000);
        });
    }
}