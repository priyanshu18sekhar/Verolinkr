import { NextRequest } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';
import { Gig } from '@/types/gig';

export async function GET(request: NextRequest) {
    const auth = await requireAuth(request);
    if (!auth.ok) return auth.response;

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const db = getAdminFirestore();
    let query;

    if (type === 'marketplace') {
        // Marketplace: Fetch all active gigs
        query = db.collection('gigs')
            .where('status', '==', 'active')
            .orderBy('createdAt', 'desc')
            .limit(50);
    } else {
        // My Gigs
        query = db.collection('gigs')
            .where('creatorId', '==', auth.uid)
            .orderBy('createdAt', 'desc');
    }

    try {
        const snapshot = await query.get();
        const gigs = snapshot.docs.map(doc => {
            const data = doc.data();
            // Convert Timestamps to ISO strings or simplified objects if needed for serialization,
            // but for now we'll pass them through or let the client handle non-serializable checks
            // Ideally we convert to primitives here.

            return {
                id: doc.id,
                ...data,
                // Ensure critical fields exist
                packages: data.packages || {},
                creator: data.creator || 'Verified Creator', // Fallback
                rating: data.rating || 0,
                orders: data.orders || 0,
            } as Gig;
        });

        return Response.json({ gigs });
    } catch (error) {
        console.error('Error fetching gigs:', error);
        return Response.json({ error: 'Failed to fetch gigs' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const auth = await requireAuth(request);
    if (!auth.ok) return auth.response;

    let body: Partial<Gig>;
    try {
        body = await request.json();
    } catch {
        return Response.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const allowed: (keyof Gig)[] = [
        'title', 'category', 'description',
        'packages', 'faqs', 'status', 'price',
        'images'
    ];

    const data: Partial<Gig> & { [key: string]: any } = {
        creatorId: auth.uid,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        status: body.status || 'active',
        rating: 0,
        reviews: 0,
        orders: 0,
        // Default business stats
        earnings: 0,
        views: 0,
        clicks: 0,
        conversionRate: 0,
        impressions: 0,
        repeatCustomers: 0,
        avgDelivery: 0
    };

    for (const key of allowed) {
        if (key in body && body[key] !== undefined) {
            data[key] = body[key];
        }
    }

    const db = getAdminFirestore();
    const ref = await db.collection('gigs').add(data);
    const doc = await ref.get();

    return Response.json({ id: doc.id, ...doc.data() }, { status: 201 });
}
