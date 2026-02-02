import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

export async function GET(request: NextRequest) {
    const auth = await requireAuth(request);
    if (!auth.ok) return auth.response;

    try {
        const db = getAdminFirestore();
        const doc = await db.collection('creators').doc(auth.uid).get();

        if (!doc.exists) {
            return NextResponse.json({ error: 'Creator profile not found' }, { status: 404 });
        }

        return NextResponse.json({ creator: doc.data() });
    } catch (error) {
        console.error('Error fetching creator profile:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
