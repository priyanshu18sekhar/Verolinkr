import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

// Platform type definition
interface Platform {
    id: string;
    platformType: string;
    username: string;
    profileUrl?: string;
    followers?: number;
    engagement?: number;
    verified?: boolean;
    createdAt?: FirebaseFirestore.Timestamp;
    updatedAt?: FirebaseFirestore.Timestamp;
}

// GET - List all linked platforms
export async function GET(request: NextRequest) {
    const auth = await requireAuth(request);
    if (!auth.ok) return auth.response;

    try {
        const db = getAdminFirestore();
        const platformsSnap = await db
            .collection('creators')
            .doc(auth.uid)
            .collection('platforms')
            .orderBy('createdAt', 'desc')
            .get();

        const platforms: Platform[] = [];
        platformsSnap.forEach((doc) => {
            platforms.push({
                id: doc.id,
                ...doc.data(),
            } as Platform);
        });

        return NextResponse.json({ platforms, count: platforms.length });
    } catch (error) {
        console.error('Error fetching platforms:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST - Add a new platform
export async function POST(request: NextRequest) {
    const auth = await requireAuth(request);
    if (!auth.ok) return auth.response;

    let body: Record<string, any>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { platformType, username, profileUrl, followers, engagement } = body;

    // Validate required fields
    if (!platformType?.trim()) {
        return NextResponse.json({ error: 'Platform type is required' }, { status: 400 });
    }
    if (!username?.trim()) {
        return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    // Valid platform types
    const validPlatforms = ['instagram', 'youtube', 'tiktok', 'twitter', 'facebook', 'linkedin', 'snapchat', 'pinterest'];
    if (!validPlatforms.includes(platformType.toLowerCase())) {
        return NextResponse.json({ error: 'Invalid platform type' }, { status: 400 });
    }

    try {
        const db = getAdminFirestore();
        const platformsRef = db.collection('creators').doc(auth.uid).collection('platforms');

        // Check if platform already exists
        const existingSnap = await platformsRef
            .where('platformType', '==', platformType.toLowerCase())
            .get();

        if (!existingSnap.empty) {
            return NextResponse.json({
                error: `${platformType} account already linked. Use PATCH to update.`
            }, { status: 409 });
        }

        // Add new platform
        const newPlatform = {
            platformType: platformType.toLowerCase(),
            username,
            profileUrl: profileUrl || null,
            followers: followers || 0,
            engagement: engagement || 0,
            verified: false,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        };

        const docRef = await platformsRef.add(newPlatform);

        return NextResponse.json({
            success: true,
            platformId: docRef.id,
            message: `${platformType} account linked successfully`
        });
    } catch (error) {
        console.error('Error adding platform:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// PATCH - Update a platform
export async function PATCH(request: NextRequest) {
    const auth = await requireAuth(request);
    if (!auth.ok) return auth.response;

    let body: Record<string, any>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { platformId, username, profileUrl, followers, engagement } = body;

    if (!platformId) {
        return NextResponse.json({ error: 'Platform ID is required' }, { status: 400 });
    }

    try {
        const db = getAdminFirestore();
        const platformRef = db
            .collection('creators')
            .doc(auth.uid)
            .collection('platforms')
            .doc(platformId);

        const docSnapshot = await platformRef.get();
        if (!docSnapshot.exists) {
            return NextResponse.json({ error: 'Platform not found' }, { status: 404 });
        }

        // Build update object
        const updateData: Record<string, any> = {
            updatedAt: FieldValue.serverTimestamp(),
        };
        if (username !== undefined) updateData.username = username;
        if (profileUrl !== undefined) updateData.profileUrl = profileUrl;
        if (followers !== undefined) updateData.followers = followers;
        if (engagement !== undefined) updateData.engagement = engagement;

        await platformRef.update(updateData);

        return NextResponse.json({ success: true, message: 'Platform updated successfully' });
    } catch (error) {
        console.error('Error updating platform:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE - Remove a platform
export async function DELETE(request: NextRequest) {
    const auth = await requireAuth(request);
    if (!auth.ok) return auth.response;

    const { searchParams } = new URL(request.url);
    const platformId = searchParams.get('platformId');

    if (!platformId) {
        return NextResponse.json({ error: 'Platform ID is required' }, { status: 400 });
    }

    try {
        const db = getAdminFirestore();
        const platformRef = db
            .collection('creators')
            .doc(auth.uid)
            .collection('platforms')
            .doc(platformId);

        const docSnapshot = await platformRef.get();
        if (!docSnapshot.exists) {
            return NextResponse.json({ error: 'Platform not found' }, { status: 404 });
        }

        await platformRef.delete();

        return NextResponse.json({ success: true, message: 'Platform removed successfully' });
    } catch (error) {
        console.error('Error removing platform:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
