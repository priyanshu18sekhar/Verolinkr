import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { requireAuth } from '@/lib/api/auth-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

// GET - Retrieve bank details (masked for security)
export async function GET(request: NextRequest) {
    const auth = await requireAuth(request);
    if (!auth.ok) return auth.response;

    try {
        const db = getAdminFirestore();
        const doc = await db.collection('creators').doc(auth.uid).get();

        if (!doc.exists) {
            return NextResponse.json({ error: 'Creator profile not found' }, { status: 404 });
        }

        const data = doc.data();

        // Only return masked bank details for security
        if (!data?.bankDetailsCompleted) {
            return NextResponse.json({
                bankDetailsCompleted: false,
                bankDetails: null
            });
        }

        // Mask sensitive information
        const maskedAccountNumber = data.accountNumber
            ? `****${data.accountNumber.slice(-4)}`
            : null;
        const maskedPan = data.pan
            ? `${data.pan.slice(0, 3)}****${data.pan.slice(-1)}`
            : null;

        return NextResponse.json({
            bankDetailsCompleted: true,
            bankDetails: {
                bankName: data.bankName || null,
                accountNumber: maskedAccountNumber,
                ifscCode: data.ifscCode || null,
                pan: maskedPan,
            }
        });
    } catch (error) {
        console.error('Error fetching bank details:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST - Add or update bank details
export async function POST(request: NextRequest) {
    const auth = await requireAuth(request);
    if (!auth.ok) return auth.response;

    let body: Record<string, any>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    // Validate required fields
    const { bankName, accountNumber, ifscCode, pan } = body;
    const errors: Record<string, string> = {};

    if (!bankName?.trim()) {
        errors.bankName = 'Bank name is required';
    }

    if (!accountNumber?.trim()) {
        errors.accountNumber = 'Account number is required';
    } else if (!/^\d{9,18}$/.test(accountNumber.replace(/\D/g, ''))) {
        errors.accountNumber = 'Invalid account number format';
    }

    if (!ifscCode?.trim()) {
        errors.ifscCode = 'IFSC code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode.toUpperCase())) {
        errors.ifscCode = 'Invalid IFSC code format';
    }

    if (!pan?.trim()) {
        errors.pan = 'PAN is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.toUpperCase())) {
        errors.pan = 'Invalid PAN format';
    }

    if (Object.keys(errors).length > 0) {
        return NextResponse.json({ error: 'Validation failed', errors }, { status: 400 });
    }

    try {
        const db = getAdminFirestore();
        const creatorRef = db.collection('creators').doc(auth.uid);

        // Check if creator exists
        const docSnapshot = await creatorRef.get();
        if (!docSnapshot.exists) {
            return NextResponse.json({ error: 'Creator profile not found' }, { status: 404 });
        }

        // Update bank details
        await creatorRef.update({
            bankName,
            accountNumber,
            ifscCode: ifscCode.toUpperCase(),
            pan: pan.toUpperCase(),
            bankDetailsCompleted: true,
            updatedAt: FieldValue.serverTimestamp(),
        });

        return NextResponse.json({ success: true, message: 'Bank details updated successfully' });
    } catch (error) {
        console.error('Error updating bank details:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE - Remove bank details
export async function DELETE(request: NextRequest) {
    const auth = await requireAuth(request);
    if (!auth.ok) return auth.response;

    try {
        const db = getAdminFirestore();
        const creatorRef = db.collection('creators').doc(auth.uid);

        // Check if creator exists
        const docSnapshot = await creatorRef.get();
        if (!docSnapshot.exists) {
            return NextResponse.json({ error: 'Creator profile not found' }, { status: 404 });
        }

        // Remove bank details fields
        await creatorRef.update({
            bankName: FieldValue.delete(),
            accountNumber: FieldValue.delete(),
            ifscCode: FieldValue.delete(),
            pan: FieldValue.delete(),
            bankDetailsCompleted: false,
            updatedAt: FieldValue.serverTimestamp(),
        });

        return NextResponse.json({ success: true, message: 'Bank details removed successfully' });
    } catch (error) {
        console.error('Error removing bank details:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
