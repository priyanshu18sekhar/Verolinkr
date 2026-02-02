'use client';

import { useState, useEffect } from 'react';

export default function TestEnvPage() {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    // Access vars directly so webpack/next replaces them
    setData({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Env Vars Test</h1>
      <pre className="bg-gray-100 p-4 rounded text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
