import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api/auth-middleware';
import { isAdminEmail } from '@/lib/api/admin-middleware';
import { getAdminFirestore } from '@/lib/firebase/admin';

/** Tells the client whether the current user may access the admin console. */
export async function GET(request: NextRequest) {
  const auth = await requireAuth(request);
  if (!auth.ok) return NextResponse.json({ isAdmin: false }, { status: 200 });

  let isAdmin = isAdminEmail(auth.email);
  if (!isAdmin) {
    try {
      const db = getAdminFirestore();
      const snap = await db.collection('profiles').doc(auth.uid).get();
      isAdmin = snap.exists && snap.data()?.role === 'admin';
    } catch {
      isAdmin = false;
    }
  }
  return NextResponse.json({ isAdmin, email: auth.email ?? null });
}
