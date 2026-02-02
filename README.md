This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment and secrets

The app uses Firebase (Auth and Firestore). **Never commit API keys or secrets to git.**

1. Copy `.env.example` to `.env.local`.
2. Fill in the values from the [Firebase Console](https://console.firebase.google.com/):
   - **Client config** (browser): use your project’s Web app config for `NEXT_PUBLIC_FIREBASE_*`.
   - **Admin SDK** (server): create a service account, then set `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` (or use `GOOGLE_APPLICATION_CREDENTIALS` with a path to the JSON file).
3. Do **not** commit `.env`, `.env.local`, `.env.production`, or any file containing real keys. They are already ignored via `.gitignore`.
4. In CI and production (e.g. Vercel), set the same variable names in the hosting provider’s environment settings.
5. Deploy Firestore security rules from the project root: use the Firebase Console (Firestore → Rules) or `firebase deploy --only firestore:rules` so that client access to Firestore is denied and all data goes through the API routes.
6. To use **Google sign-in**: in Firebase Console go to Authentication → Sign-in method, enable **Google**, and set the support email.
7. To use **passwordless email link sign-in**: in Authentication → Sign-in method, enable **Email/Password** and turn on **Email link** (or use the same provider; the app uses `sendSignInLinkToEmail` and `signInWithEmailLink`).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
