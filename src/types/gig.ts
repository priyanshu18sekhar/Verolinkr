export interface GigPackage {
    name: string;
    price: number;
    delivery: number; // in days
    revisions: number;
    features: string[];
}

export interface GigPackages {
    basic: GigPackage;
    standard: GigPackage;
    premium: GigPackage;
    [key: string]: GigPackage;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface Gig {
    id: string;
    creatorId: string;
    creator: string; // Should be fetched/joined, but for now we might store it or fetch it
    creatorImage?: string;
    title: string;
    category: string;
    description: string;
    packages: GigPackages;
    faqs: FAQ[];
    price: number; // Lowest price (usually basic package)

    // Metadata
    status: 'active' | 'paused' | 'draft';
    createdAt: any; // Firestore Timestamp
    updatedAt: any; // Firestore Timestamp

    // Stats
    rating: number;
    reviews: number;
    width?: number; // For images if needed
    height?: number;

    // Business Stats
    orders: number;
    totalOrders?: number; // Alias for orders if used interchangeably
    inQueue?: number;
    earnings?: number;
    views?: number;
    clicks?: number;
    conversionRate?: number;
    impressions?: number;
    repeatCustomers?: number;
    avgDelivery?: number;
    lastOrder?: any; // Firestore Timestamp

    // Visuals
    images: string[];
    featured?: boolean;
    bestseller?: boolean;
    verified?: boolean;
    level?: string;
    responseTime?: string;
    completionRate?: number;
}

export interface GigAPIResponse {
    gigs: Gig[];
}
