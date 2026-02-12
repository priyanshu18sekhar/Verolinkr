import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function GET(req: NextRequest) {
    try {
        // Get brand ID from query params or auth session
        const { searchParams } = new URL(req.url);
        const brandId = searchParams.get('id');

        if (!brandId) {
            return NextResponse.json(
                { success: false, error: 'Brand ID is required' },
                { status: 400 }
            );
        }

        // Fetch brand data from Firestore
        const brandDoc = await adminDb.collection('brands').doc(brandId).get();

        if (!brandDoc.exists) {
            return NextResponse.json(
                { success: false, error: 'Brand not found' },
                { status: 404 }
            );
        }

        const brandData = { id: brandDoc.id, ...brandDoc.data() };

        return NextResponse.json({
            success: true,
            data: brandData
        });

    } catch (error) {
        console.error('Get brand profile error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch brand profile' },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { brandId, ...updateData } = body;

        if (!brandId) {
            return NextResponse.json(
                { success: false, error: 'Brand ID is required' },
                { status: 400 }
            );
        }

        // Update timestamp
        updateData.updatedAt = new Date().toISOString();

        // Update brand document
        await adminDb.collection('brands').doc(brandId).update(updateData);

        // Fetch updated data
        const updatedDoc = await adminDb.collection('brands').doc(brandId).get();
        const updatedData = { id: updatedDoc.id, ...updatedDoc.data() };

        return NextResponse.json({
            success: true,
            message: 'Brand profile updated successfully',
            data: updatedData
        });

    } catch (error) {
        console.error('Update brand profile error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update brand profile' },
            { status: 500 }
        );
    }
}
