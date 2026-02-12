import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const brandId = searchParams.get('id');

        if (!brandId) {
            return NextResponse.json(
                { success: false, error: 'Brand ID is required' },
                { status: 400 }
            );
        }

        const brandDoc = await adminDb.collection('brands').doc(brandId).get();

        if (!brandDoc.exists) {
            return NextResponse.json(
                { success: false, error: 'Brand not found' },
                { status: 404 }
            );
        }

        const brandData = brandDoc.data();

        return NextResponse.json({
            success: true,
            settings: {
                notifications: brandData?.notifications || {},
                privacy: brandData?.privacy || {}
            }
        });

    } catch (error) {
        console.error('Get brand settings error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch settings' },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { brandId, notifications, privacy } = body;

        if (!brandId) {
            return NextResponse.json(
                { success: false, error: 'Brand ID is required' },
                { status: 400 }
            );
        }

        const updateData: any = { updatedAt: new Date().toISOString() };

        if (notifications) {
            updateData.notifications = notifications;
        }

        if (privacy) {
            updateData.privacy = privacy;
        }

        await adminDb.collection('brands').doc(brandId).update(updateData);

        return NextResponse.json({
            success: true,
            message: 'Settings updated successfully'
        });

    } catch (error) {
        console.error('Update brand settings error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update settings' },
            { status: 500 }
        );
    }
}
