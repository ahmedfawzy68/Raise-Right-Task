import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WebSocketService, WebSocketMessage } from './websocket.service';
import { filter } from 'rxjs/operators';

export interface Notification {
    id: string;
    type: 'success' | 'info' | 'warning' | 'error';
    title: string;
    message: string;
    timestamp: Date;
    autoHide?: boolean;
    duration?: number;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notificationsSubject = new BehaviorSubject<Notification[]>([]);
    public notifications$ = this.notificationsSubject.asObservable();

    constructor(private webSocketService: WebSocketService) {
        this.initializeWebSocketNotifications();
    }

    private initializeWebSocketNotifications(): void {
        this.webSocketService.messages$.pipe(
            filter((message: WebSocketMessage) =>
                message.type === 'new_donation' || message.type === 'goal_reached'
            )
        ).subscribe((message: WebSocketMessage) => {
            this.handleWebSocketNotification(message);
        });
    }

    private handleWebSocketNotification(message: WebSocketMessage): void {
        switch (message.type) {
            case 'new_donation':
                this.showDonationNotification(message.data);
                break;
            case 'goal_reached':
                this.showGoalReachedNotification(message.data);
                break;
        }
    }

    private showDonationNotification(donationData: any): void {
        const notification: Notification = {
            id: this.generateId(),
            type: 'success',
            title: 'New Donation!',
            message: `${donationData.donor?.name || 'Anonymous'} just donated $${donationData.amount} to ${donationData.campaign?.name}`,
            timestamp: new Date(),
            autoHide: true,
            duration: 5000
        };

        this.addNotification(notification);
    }

    private showGoalReachedNotification(campaignData: any): void {
        const notification: Notification = {
            id: this.generateId(),
            type: 'success',
            title: 'Goal Reached! 🎉',
            message: `The campaign "${campaignData.name}" has reached its funding goal of $${campaignData.goal}!`,
            timestamp: new Date(),
            autoHide: true,
            duration: 7000
        };

        this.addNotification(notification);
    }

    public addNotification(notification: Notification): void {
        const currentNotifications = this.notificationsSubject.value;
        this.notificationsSubject.next([notification, ...currentNotifications]);

        // Auto-hide notification if specified
        if (notification.autoHide) {
            setTimeout(() => {
                this.removeNotification(notification.id);
            }, notification.duration || 3000);
        }
    }

    public removeNotification(id: string): void {
        const currentNotifications = this.notificationsSubject.value;
        const filteredNotifications = currentNotifications.filter(notification => notification.id !== id);
        this.notificationsSubject.next(filteredNotifications);
    }

    public clearAllNotifications(): void {
        this.notificationsSubject.next([]);
    }

    // Manual notification methods
    public showSuccess(title: string, message: string, autoHide = true): void {
        const notification: Notification = {
            id: this.generateId(),
            type: 'success',
            title,
            message,
            timestamp: new Date(),
            autoHide,
            duration: 3000
        };
        this.addNotification(notification);
    }

    public showError(title: string, message: string, autoHide = false): void {
        const notification: Notification = {
            id: this.generateId(),
            type: 'error',
            title,
            message,
            timestamp: new Date(),
            autoHide,
            duration: 5000
        };
        this.addNotification(notification);
    }

    public showInfo(title: string, message: string, autoHide = true): void {
        const notification: Notification = {
            id: this.generateId(),
            type: 'info',
            title,
            message,
            timestamp: new Date(),
            autoHide,
            duration: 3000
        };
        this.addNotification(notification);
    }

    private generateId(): string {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    }
}