import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
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

export async function PATCH(request: NextRequest) {
    const auth = await requireAuth(request);
    if (!auth.ok) return auth.response;

    let body: Record<string, any>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const allowedFields = [
        'companyName', 'legalName', 'businessEmail', 'website', 'industry',
        'description', 'city', 'state', 'country', 'phone', 'logo',
        'companySize', 'founded', 'address', 'notifications', 'privacy',
    ];

    const updateData: Record<string, any> = {
        updatedAt: FieldValue.serverTimestamp(),
    };
    for (const field of allowedFields) {
        if (body[field] !== undefined) updateData[field] = body[field];
    }

    try {
        const db = getAdminFirestore();
        const brandRef = db.collection('brands').doc(auth.uid);
        const snap = await brandRef.get();
        if (!snap.exists) {
            return NextResponse.json({ error: 'Brand profile not found' }, { status: 404 });
        }
        await brandRef.update(updateData);

        if (updateData.companyName || updateData.logo) {
            const profileUpdate: Record<string, any> = { updatedAt: FieldValue.serverTimestamp() };
            if (updateData.companyName) profileUpdate.displayName = updateData.companyName;
            if (updateData.logo) profileUpdate.photoURL = updateData.logo;
            await db.collection('profiles').doc(auth.uid).set(profileUpdate, { merge: true });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating brand profile:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
