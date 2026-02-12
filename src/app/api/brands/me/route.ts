import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

export async function GET(request: NextRequest) {
    const auth = await requireAuth(request);
    if (!auth.ok) return auth.response;

    try {
        const db = getAdminFirestore();
        const doc = await db.collection('brands').doc(auth.uid).get();

        if (!doc.exists) {
            return NextResponse.json({ error: 'Brand profile not found' }, { status: 404 });
        }

        const brandData = doc.data();

        return NextResponse.json({
            brand: {
                id: doc.id,
                ...brandData
            }
        });
    } catch (error) {
        console.error('Error fetching brand profile:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
