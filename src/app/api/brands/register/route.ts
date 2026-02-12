import { NextRequest, NextResponse } from 'next/server';
import { getAdminFirestore } from '@/lib/firebase/admin';
import { requireAuth } from '@/lib/api/auth-middleware';

export async function POST(req: NextRequest) {
    const auth = await requireAuth(req);
    if (!auth.ok) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        console.log('[BrandRegister] Processing request at', new Date().toISOString());
        const body = await req.json();

        // Validate required fields
        const requiredFields = [
            'companyName',
            'businessEmail',
            'mobileNumber',
            // 'businessType', // Made optional to reduce friction
            // 'industry',
            // 'companySize',
            // 'website',
            'brandTagline',
            'aboutUs',
            'primaryCity',
            'primaryState',
            // 'marketingObjectives',
            // 'monthlyBudget',
            // 'preferredCategories',
            'businessPan'
        ];

        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { success: false, error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Create brand document
        const brandData = {
            // Basic Information
            companyName: body.companyName,
            legalName: body.companyName, // Can be updated later
            businessEmail: body.businessEmail,
            phone: body.mobileNumber,
            website: body.website || null,

            // Profile
            logo: body.logo || '',
            tagline: body.brandTagline,
            about: body.aboutUs,
            industry: body.industry || null,
            businessType: body.businessType || null,
            companySize: body.companySize || null,
            founded: new Date().getFullYear().toString(),

            // Location
            city: body.primaryCity,
            state: body.primaryState,
            address: body.address || '',

            // Social Media
            instagram: body.instagram || '',
            youtube: body.youtube || '',
            twitter: body.twitter || '',
            linkedin: body.linkedin || '',

            // Marketing
            targetAudience: body.targetAudience || [],
            marketingObjectives: body.marketingObjectives || null,
            monthlyBudget: body.monthlyBudget || null,
            preferredCategories: body.preferredCategories || [],
            brandColors: body.brandColors || '',
            brandGuidelines: body.brandGuidelines || '',

            // KYC
            gstin: body.gstin || '',
            pan: body.businessPan,
            cin: body.cin || '',
            kycStatus: 'pending',
            kycDocuments: [],
            kycSubmittedAt: null,

            // Authorized Signatory
            authorizedSignatory: {
                name: body.authorizedSignatoryName || '',
                email: body.authorizedSignatoryEmail || '',
                phone: body.authorizedSignatoryPhone || '',
                designation: body.authorizedSignatoryDesignation || ''
            },

            // Payment/Bank Details
            bankDetails: {
                accountHolder: body.bankAccountHolder || '',
                accountNumber: body.bankAccountNumber || '',
                ifsc: body.bankIfscCode || '',
                bankName: body.bankName || '',
                upiId: body.bankUpiId || ''
            },

            // Settings
            notifications: {
                email: true,
                sms: false,
                push: true,
                campaignUpdates: true,
                creatorMessages: true,
                paymentAlerts: true,
                reportReady: true
            },
            privacy: {
                profileVisibility: 'public',
                showStats: true,
                showCampaigns: true
            },

            // Meta
            profileComplete: body.profileComplete !== false, // Default true unless explicitly skipped
            active: true,
            verified: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Save to Firestore using Auth UID
        const db = getAdminFirestore();
        await db.collection('brands').doc(auth.uid).set(brandData);

        return NextResponse.json({
            success: true,
            brandId: auth.uid,
            message: 'Brand registered successfully'
        }, { status: 201 });

    } catch (error) {
        console.error('Brand registration error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to register brand' },
            { status: 500 }
        );
    }
}
