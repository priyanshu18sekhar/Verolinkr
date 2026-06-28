import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api/admin-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

/** Platform-wide stats for the admin overview. */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const db = getAdminFirestore();
  const [creators, brands, campaigns] = await Promise.all([
    db.collection('creators').get(),
    db.collection('brands').get(),
    db.collection('campaigns').get().catch(() => ({ docs: [], size: 0 } as any)),
  ]);

  let pendingCreators = 0;
  let connectedPlatforms = 0;
  creators.docs.forEach((d) => {
    const data = d.data();
    if ((data.status ?? 'pending') === 'pending') pendingCreators++;
    if (typeof data.platformsLinked === 'number') connectedPlatforms += data.platformsLinked;
  });

  let pendingKyc = 0;
  let verifiedBrands = 0;
  brands.docs.forEach((d) => {
    const data = d.data();
    if ((data.kycStatus ?? 'pending') === 'pending') pendingKyc++;
    if (data.verified) verifiedBrands++;
  });

  return NextResponse.json({
    counts: {
      creators: creators.size,
      brands: brands.size,
      campaigns: campaigns.size ?? campaigns.docs.length,
      pendingCreators,
      pendingKyc,
      verifiedBrands,
      connectedPlatforms,
    },
  });
}
