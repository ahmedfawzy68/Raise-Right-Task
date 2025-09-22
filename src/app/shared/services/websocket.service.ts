import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, EMPTY } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment';
import { catchError, tap, switchAll } from 'rxjs/operators';
import { DonationUpdate, GoalReachedEvent } from '../../core/interfaces/donation';
import { Campaign } from '../../core/interfaces/campaign';

export interface WebSocketMessage {
    type: 'campaign_update' | 'new_donation' | 'goal_reached';
    data: Campaign | DonationUpdate | GoalReachedEvent;
    timestamp: string;
}

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private socket$!: WebSocketSubject<any>;
    private messagesSubject$ = new Subject<WebSocketMessage>();
    private isConnectedSubject$ = new BehaviorSubject<boolean>(false);

    public messages$ = this.messagesSubject$.asObservable();
    public isConnected$ = this.isConnectedSubject$.asObservable();

    constructor() {
        this.connect();
    }

    private connect(): void {
        if (!this.socket$ || this.socket$.closed) {
            this.socket$ = webSocket({
                url: environment.wsUrl,
                openObserver: {
                    next: () => {
                        console.log('WebSocket connection opened');
                        this.isConnectedSubject$.next(true);
                    }
                },
                closeObserver: {
                    next: () => {
                        console.log('WebSocket connection closed');
                        this.isConnectedSubject$.next(false);
                    }
                }
            });

            this.socket$.pipe(
                catchError(error => {
                    console.error('WebSocket error:', error);
                    this.isConnectedSubject$.next(false);
                    return EMPTY;
                }),
                tap({
                    error: error => {
                        console.error('WebSocket error in stream:', error);
                        this.reconnect();
                    }
                })
            ).subscribe(
                (message: WebSocketMessage) => {
                    console.log('Received WebSocket message:', message);
                    this.messagesSubject$.next(message);
                }
            );
        }
    }

    private reconnect(): void {
        console.log('Attempting to reconnect...');
        setTimeout(() => {
            this.connect();
        }, 3000); // Reconnect after 3 seconds
    }

    public sendMessage(message: any): void {
        if (this.socket$ && !this.socket$.closed) {
            this.socket$.next(message);
        } else {
            console.warn('WebSocket is not connected. Message not sent:', message);
        }
    }

    public disconnect(): void {
        if (this.socket$) {
            this.socket$.complete();
            this.isConnectedSubject$.next(false);
        }
    }

    // Subscribe to specific campaign updates
    public subscribeToCampaign(campaignId: string): void {
        this.sendMessage({
            type: 'subscribe',
            campaignId: campaignId
        });
    }

    // Unsubscribe from campaign updates
    public unsubscribeFromCampaign(campaignId: string): void {
        this.sendMessage({
            type: 'unsubscribe',
            campaignId: campaignId
        });
    }

    // Subscribe to all campaign updates
    public subscribeToAllCampaigns(): void {
        this.sendMessage({
            type: 'subscribe_all'
        });
    }
}