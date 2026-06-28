import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api/admin-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

/** List all campaigns across brands for the admin console. */
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const db = getAdminFirestore();
  const snap = await db.collection('campaigns').limit(200).get().catch(() => null);
  const campaigns = (snap?.docs ?? []).map((d) => {
    const data = d.data();
    return {
      id: d.id,
      title: data.title ?? data.name ?? 'Untitled campaign',
      brandName: data.brandName ?? data.brand ?? '—',
      status: data.status ?? 'draft',
      budget: data.budget ?? data.monthlyBudget ?? 0,
      createdAt: data.createdAt ?? null,
    };
  });
  return NextResponse.json({ campaigns, count: campaigns.length });
}
