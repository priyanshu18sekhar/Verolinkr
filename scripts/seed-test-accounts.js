// Seeds two fully-onboarded test accounts (creator + brand) with realistic data
// so both dashboards can be driven end-to-end.
const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  }),
});

// mirror src/lib/firebase/admin.ts — the app reads/writes the named database
const db = process.env.FIREBASE_DATABASE_ID
  ? getFirestore(app, process.env.FIREBASE_DATABASE_ID)
  : getFirestore(app);
const auth = admin.auth();

const CREATOR_EMAIL = 'test-creator@verolinkr.test';
const BRAND_EMAIL = 'test-brand@verolinkr.test';
const PASSWORD = 'VeroTest!2026';

async function ensureUser(email, displayName) {
  try {
    const u = await auth.getUserByEmail(email);
    await auth.updateUser(u.uid, { password: PASSWORD, displayName });
    return u.uid;
  } catch {
    const u = await auth.createUser({ email, password: PASSWORD, displayName, emailVerified: true });
    return u.uid;
  }
}

const ts = admin.firestore.Timestamp;
const now = new Date();
const daysAgo = (d) => ts.fromDate(new Date(Date.now() - d * 864e5));
const daysAhead = (d) => ts.fromDate(new Date(Date.now() + d * 864e5));

async function seedCreator(uid) {
  await db.collection('profiles').doc(uid).set({
    uid, userType: 'creator', displayName: 'Aisha Verma', photoURL: null,
    updatedAt: ts.now(),
  }, { merge: true });

  await db.collection('creators').doc(uid).set({
    uid,
    email: CREATOR_EMAIL,
    fullName: 'Aisha Verma',
    displayName: 'Aisha Verma',
    username: 'aisha.creates',
    phone: '+91 98200 12345',
    city: 'Mumbai',
    country: 'India',
    niche: 'Tech & Lifestyle',
    categories: ['Tech', 'Lifestyle', 'Finance'],
    bio: 'Tech and lifestyle creator making honest reviews for 480K people across Instagram and YouTube.',
    languages: ['English', 'Hindi'],
    onboardingCompleted: true,
    bankDetailsCompleted: true,
    bankName: 'HDFC Bank',
    accountNumber: '50100123456789',
    ifscCode: 'HDFC0001234',
    pan: 'ABCDE1234F',
    availableBalance: 42350,
    totalViews: 2840000,
    authenticityScore: 94,
    trustworthinessRating: 4.8,
    responseRate: 97,
    averageRating: 4.9,
    createdAt: daysAgo(120),
    updatedAt: ts.now(),
  }, { merge: true });

  const creator = db.collection('creators').doc(uid);

  // schema must match /api/creators/me/platforms (platformType, username, createdAt)
  const platforms = [
    { id: 'instagram', platformType: 'instagram', username: 'aisha.creates', profileUrl: 'https://instagram.com/aisha.creates', followers: 285000, engagement: 4.6, verified: true, createdAt: daysAgo(110), updatedAt: ts.now() },
    { id: 'youtube', platformType: 'youtube', username: 'Aisha Creates', profileUrl: 'https://youtube.com/@aishacreates', followers: 162000, engagement: 6.1, verified: true, createdAt: daysAgo(95), updatedAt: ts.now() },
    { id: 'facebook', platformType: 'facebook', username: 'aisha.creates', profileUrl: 'https://facebook.com/aisha.creates', followers: 34000, engagement: 2.2, verified: false, createdAt: daysAgo(60), updatedAt: ts.now() },
  ];
  for (const p of platforms) {
    await creator.collection('platforms').doc(p.id).set(p, { merge: true });
  }

  const campaigns = [
    { id: 'c1', title: 'Nimbus Audio — Wave Buds launch', brand: 'Nimbus Audio', status: 'active', earnings: 18000, cpv: 0.45, targetViews: 40000, currentViews: 26400, startedAt: daysAgo(12) },
    { id: 'c2', title: 'Fintrack — Budgeting app walkthrough', brand: 'Fintrack', status: 'active', earnings: 12500, cpv: 0.5, targetViews: 25000, currentViews: 9800, startedAt: daysAgo(5) },
    { id: 'c3', title: 'Solstice Skincare — Morning routine', brand: 'Solstice', status: 'completed', earnings: 22000, cpv: 0.4, targetViews: 55000, currentViews: 55000, startedAt: daysAgo(48), completedAt: daysAgo(9) },
    { id: 'c4', title: 'Trailhead Gear — Monsoon trek series', brand: 'Trailhead', status: 'completed', earnings: 15400, cpv: 0.35, targetViews: 44000, currentViews: 44000, startedAt: daysAgo(80), completedAt: daysAgo(41) },
    { id: 'c5', title: 'Brewline — Cold brew taste test', brand: 'Brewline', status: 'completed', earnings: 9800, cpv: 0.28, targetViews: 35000, currentViews: 35000, startedAt: daysAgo(100), completedAt: daysAgo(72) },
  ];
  for (const c of campaigns) {
    const { id, ...data } = c;
    await creator.collection('campaigns').doc(id).set(data, { merge: true });
  }

  // wipe then re-add with fixed ids so reseeding never duplicates
  const oldPayouts = await creator.collection('payouts').get();
  for (const d of oldPayouts.docs) await d.ref.delete();
  const payouts = [
    { id: 'p1', amount: 22000, status: 'processing', createdAt: daysAgo(6), creatorId: uid, creatorName: 'Aisha Verma' },
    { id: 'p2', amount: 15400, status: 'paid', createdAt: daysAgo(38), creatorId: uid, creatorName: 'Aisha Verma' },
    { id: 'p3', amount: 9800, status: 'paid', createdAt: daysAgo(70), creatorId: uid, creatorName: 'Aisha Verma' },
  ];
  for (const { id, ...p } of payouts) {
    await creator.collection('payouts').doc(id).set(p);
  }

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const amounts = [8200, 11400, 9800, 15400, 22000, 30500];
  for (let i = 0; i < 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    await creator.collection('earnings_history').doc(`${d.getFullYear()}-${d.getMonth() + 1}`).set({
      month: months[d.getMonth()],
      amount: amounts[i],
      date: ts.fromDate(d),
    }, { merge: true });
  }

  await creator.collection('analytics').doc('performance').set({
    history: [
      { day: 'Mon', views: 32000, engagement: 4.2 },
      { day: 'Tue', views: 41000, engagement: 4.8 },
      { day: 'Wed', views: 38500, engagement: 4.4 },
      { day: 'Thu', views: 52000, engagement: 5.6 },
      { day: 'Fri', views: 61000, engagement: 6.0 },
      { day: 'Sat', views: 74000, engagement: 6.4 },
      { day: 'Sun', views: 68000, engagement: 5.9 },
    ],
  }, { merge: true });

  await creator.collection('analytics').doc('demographics').set({
    ageGroups: [
      { label: '18–24', value: 38 },
      { label: '25–34', value: 41 },
      { label: '35–44', value: 14 },
      { label: '45+', value: 7 },
    ],
    topLocations: [
      { label: 'Mumbai', value: 22 },
      { label: 'Delhi', value: 18 },
      { label: 'Bengaluru', value: 15 },
      { label: 'Pune', value: 9 },
    ],
    gender: [
      { label: 'Female', value: 54 },
      { label: 'Male', value: 44 },
      { label: 'Other', value: 2 },
    ],
  }, { merge: true });

  console.log('creator seeded:', uid);
}

async function seedBrand(uid, creatorUid) {
  await db.collection('profiles').doc(uid).set({
    uid, userType: 'brand', displayName: 'Nimbus Audio', photoURL: null,
    updatedAt: ts.now(),
  }, { merge: true });

  await db.collection('brands').doc(uid).set({
    uid,
    companyName: 'Nimbus Audio',
    legalName: 'Nimbus Audio Pvt Ltd',
    businessEmail: BRAND_EMAIL,
    website: 'https://nimbusaudio.example',
    industry: 'Consumer Electronics',
    city: 'Bengaluru',
    country: 'India',
    description: 'Audio hardware brand for creators and commuters. We pay for verified views, not vanity metrics.',
    kycStatus: 'verified',
    verified: true,
    active: true,
    onboardingCompleted: true,
    totalSpend: 184000,
    activeBudget: 60000,
    createdAt: daysAgo(140),
    updatedAt: ts.now(),
  }, { merge: true });

  const campaigns = [
    { title: 'Wave Buds launch — CPV', description: 'Honest first-impression reels for the Wave Buds ANC earbuds. 30–60s, hook in first 3 seconds.', budget: 60000, status: 'active', startDate: daysAgo(14), endDate: daysAhead(16), views: 128400, creatorsJoined: 6, cpv: 0.45 },
    { title: 'Studio One teaser drops', description: 'Short teaser cuts for the Studio One over-ears. Moody, product-forward.', budget: 45000, status: 'active', startDate: daysAgo(4), endDate: daysAhead(26), views: 22100, creatorsJoined: 2, cpv: 0.5 },
    { title: 'Monsoon sale push', description: 'Story-first promo for the monsoon sale. Swipe-up to store.', budget: 30000, status: 'completed', startDate: daysAgo(70), endDate: daysAgo(40), views: 96000, creatorsJoined: 8, cpv: 0.3 },
    { title: 'Diwali gifting guide', description: 'Gifting-angle integration in Diwali hauls.', budget: 0, status: 'draft', views: 0, creatorsJoined: 0 },
  ];
  for (const c of campaigns) {
    // deterministic ids so reseeding doesn't duplicate
    const idSlug = c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
    await db.collection('campaigns').doc(`seed-${idSlug}`).set({
      ...c,
      ownerId: uid,
      brandName: 'Nimbus Audio',
      createdAt: c.startDate || ts.now(),
      updatedAt: ts.now(),
    }, { merge: true });
  }

  // Marketplace gigs from the seeded creator — schema matches src/types/gig.ts
  const gigs = [
    {
      title: 'Dedicated Instagram reel review',
      category: 'Instagram',
      description: '45–60s dedicated reel with honest review and CTA.',
      status: 'active', creatorId: creatorUid, creator: 'Aisha Verma',
      rating: 4.9, reviews: 18, orders: 21, price: 8000, images: [], faqs: [],
      packages: {
        basic: { name: 'Basic', price: 8000, delivery: 5, revisions: 1, features: ['1 reel', '1 revision'] },
        standard: { name: 'Standard', price: 14000, delivery: 4, revisions: 2, features: ['1 reel', 'story set', '2 revisions'] },
        premium: { name: 'Premium', price: 24000, delivery: 3, revisions: 3, features: ['1 reel', 'story set', 'YouTube short', 'usage rights'] },
      },
    },
    {
      title: 'YouTube integration (60–90s)',
      category: 'YouTube',
      description: 'Natural in-video integration on a 100K+ subscriber channel.',
      status: 'active', creatorId: creatorUid, creator: 'Aisha Verma',
      rating: 4.8, reviews: 7, orders: 9, price: 18000, images: [], faqs: [],
      packages: {
        basic: { name: 'Basic', price: 18000, delivery: 10, revisions: 1, features: ['60s integration'] },
        standard: { name: 'Standard', price: 26000, delivery: 7, revisions: 2, features: ['90s integration', 'pinned comment'] },
        premium: { name: 'Premium', price: 40000, delivery: 7, revisions: 3, features: ['dedicated segment', 'community post', 'usage rights'] },
      },
    },
  ];
  for (const g of gigs) {
    const idSlug = g.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
    await db.collection('gigs').doc(`seed-${idSlug}`).set({
      ...g,
      createdAt: daysAgo(20),
      updatedAt: ts.now(),
    }, { merge: true });
  }

  console.log('brand seeded:', uid);
}

(async () => {
  const creatorUid = await ensureUser(CREATOR_EMAIL, 'Aisha Verma');
  const brandUid = await ensureUser(BRAND_EMAIL, 'Nimbus Audio');
  await seedCreator(creatorUid);
  await seedBrand(brandUid, creatorUid);
  console.log('DONE');
  console.log('creator login:', CREATOR_EMAIL, PASSWORD);
  console.log('brand login:  ', BRAND_EMAIL, PASSWORD);
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
