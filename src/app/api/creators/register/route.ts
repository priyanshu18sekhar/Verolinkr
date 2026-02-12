import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { requireAuth } from '@/lib/api/auth-middleware';

export async function POST(req: NextRequest) {
    const auth = await requireAuth(req);
    if (!auth.ok) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();

        // Validate required fields
        const requiredFields = [
            'fullName',
            'email',
            'mobileNumber',
            'professionalHandle',
            'shortBio',
            'primaryCity',
            'primaryState',
            'primaryCategories'
        ];

        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { success: false, error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Create creator document
        const creatorData = {
            // Identity
            fullName: body.fullName,
            email: body.email,
            phone: body.mobileNumber,
            handle: body.professionalHandle,
            bio: body.shortBio,
            profilePhoto: body.profilePhoto || '', // URL would go here in real app

            // Demographics
            city: body.primaryCity,
            state: body.primaryState,
            languages: body.languages || [],

            // Content & Niche
            categories: body.primaryCategories || [],

            // Social Media
            socialMedia: {
                instagram: body.instagramConnected || false,
                youtube: body.youtubeConnected || false,
                tiktok: body.tiktokConnected || false,
                twitter: body.twitterConnected || false,
                linkedin: body.linkedinConnected || false,
                otherLinks: body.otherPlatforms || []
            },

            // Financial
            bankDetails: {
                bankName: body.bankName || '',
                accountNumber: body.accountNumber || '',
                ifsc: body.ifscCode || ''
            },
            pan: body.pan || '',

            // Compliance
            asciCompliant: body.asciGuidelines || false,

            // Meta
            status: 'pending', // pending, approved, rejected
            profileComplete: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Save to Firestore using Auth UID
        await adminDb.collection('creators').doc(auth.uid).set(creatorData);

        return NextResponse.json({
            success: true,
            creatorId: auth.uid,
            message: 'Creator registered successfully'
        }, { status: 201 });

    } catch (error) {
        console.error('Creator registration error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to register creator' },
            { status: 500 }
        );
    }
}
