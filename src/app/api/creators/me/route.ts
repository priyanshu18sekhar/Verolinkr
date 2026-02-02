import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
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

        const creatorData = doc.data();

        // Also fetch platform count
        const platformsSnap = await db
            .collection('creators')
            .doc(auth.uid)
            .collection('platforms')
            .get();

        return NextResponse.json({
            creator: {
                ...creatorData,
                platformsLinked: platformsSnap.size
            }
        });
    } catch (error) {
        console.error('Error fetching creator profile:', error);
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

    // Fields that can be updated
    const allowedFields = [
        'displayName', 'fullName', 'bio', 'avatarUrl', 'categories',
        'audienceAgeRange', 'audienceGender', 'audienceLocations', 'followerCount',
        'contentTypes', 'languages', 'city', 'state', 'country'
    ];

    const updateData: Record<string, any> = {
        updatedAt: FieldValue.serverTimestamp(),
    };

    // Only include allowed fields
    for (const field of allowedFields) {
        if (body[field] !== undefined) {
            updateData[field] = body[field];
        }
    }

    try {
        const db = getAdminFirestore();
        const creatorRef = db.collection('creators').doc(auth.uid);

        const docSnapshot = await creatorRef.get();
        if (!docSnapshot.exists) {
            return NextResponse.json({ error: 'Creator profile not found' }, { status: 404 });
        }

        await creatorRef.update(updateData);

        // Also update profile if displayName changed
        if (updateData.displayName || updateData.avatarUrl) {
            const profileUpdate: Record<string, any> = { updatedAt: FieldValue.serverTimestamp() };
            if (updateData.displayName) profileUpdate.displayName = updateData.displayName;
            if (updateData.avatarUrl) profileUpdate.photoURL = updateData.avatarUrl;

            await db.collection('profiles').doc(auth.uid).update(profileUpdate);
        }

        return NextResponse.json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating creator profile:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

