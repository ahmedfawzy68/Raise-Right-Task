export interface Campaign {
    id: string
    name: string
    description: string
    currentAmount: number
    goal: number
    imageUrl: string
    donors: donor[]
}

export interface donor {
    name: string
    amount: number
}