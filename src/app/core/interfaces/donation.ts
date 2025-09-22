export interface Donation {
    id: string;
    amount: number;
    donor: {
        name: string;
        email?: string;
    };
    campaignId: string;
    timestamp: string;
    anonymous?: boolean;
}

export interface DonationUpdate {
    donation: Donation;
    campaign: {
        id: string;
        name: string;
        currentAmount: number;
        goal: number;
    };
}

export interface GoalReachedEvent {
    campaignId: string;
    name: string;
    goal: number;
    finalAmount: number;
    timestamp: string;
}