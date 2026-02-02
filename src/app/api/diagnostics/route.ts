import { NextResponse } from 'next/server';
import { getAdminFirestore } from '@/lib/firebase/admin';

export async function GET() {
    try {
        const db = getAdminFirestore();
        const collections = await db.listCollections();
        const collectionIds = collections.map(col => col.id);

        return NextResponse.json({
            status: 'ok',
            message: 'Firestore connected successfully',
            projectId: process.env.FIREBASE_PROJECT_ID,
            collections: collectionIds
        });
    } catch (error: any) {
        console.error('Diagnostic Error:', error);
        return NextResponse.json({
            status: 'error',
            message: error.message,
            code: error.code,
            details: error.details,
            projectId: process.env.FIREBASE_PROJECT_ID
        }, { status: 500 });
    }
}
