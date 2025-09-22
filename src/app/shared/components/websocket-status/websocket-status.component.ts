import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../../services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-websocket-status',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './websocket-status.component.html',
    styleUrls: ['./websocket-status.component.scss']

})
export class WebSocketStatusComponent implements OnInit, OnDestroy {
    isConnected = false;
    statusText = 'Connecting...';
    private subscription = new Subscription();

    constructor(private webSocketService: WebSocketService) { }

    ngOnInit(): void {
        const connectionSubscription = this.webSocketService.isConnected$.subscribe(
            connected => {
                this.isConnected = connected;
                this.statusText = connected ? 'Live Updates Active' : 'Connection Lost';
            }
        );
        this.subscription.add(connectionSubscription);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}