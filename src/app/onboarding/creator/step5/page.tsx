'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { StepLayout } from '../../../../components/onboarding';
import { LinkIcon } from '@heroicons/react/24/outline';
import ConnectPlatforms from '@/components/connect/ConnectPlatforms';

export default function CreatorOnboardingStep5() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [connectedCount, setConnectedCount] = useState(0);
  const justConnected = searchParams.get('connected');
  const mode = searchParams.get('mode');

  // Reflect a successful connection in onboarding data so later steps know.
  useEffect(() => {
    if (connectedCount > 0) {
      const existing = JSON.parse(localStorage.getItem('onboardingData') || '{}');
      localStorage.setItem(
        'onboardingData',
        JSON.stringify({
          ...existing,
          creator: { ...existing.creator, platformsLinked: connectedCount },
        })
      );
    }
  }, [connectedCount]);

  const handleNext = () => router.push('/onboarding/creator/step6');
  const handleBack = () => router.push('/onboarding/creator/step4');

  const icon = (
    <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-[#08080c]">
      <LinkIcon className="h-10 w-10 text-white" />
    </div>
  );

  return (
    <StepLayout
      currentStep={5}
      totalSteps={7}
      stepTitle="Connect Your Platforms"
      title="Connect once, earn everywhere"
      subtitle="Link Instagram, YouTube and Facebook so we can verify your real reach. Brands discover you by verified audience — not a number you typed in."
      icon={icon}
      onNext={handleNext}
      onBack={handleBack}
      onSkip={connectedCount > 0 ? undefined : () => router.push('/onboarding/creator/step6')}
      skipLabel="Skip for now"
      nextLabel="Continue"
    >
      <div className="space-y-6">
        {justConnected && (
          <div className="vl-tag" style={{ background: 'var(--vl-mint-soft)', color: 'var(--vl-mint-ink)' }}>
            {justConnected} connected{mode === 'demo' ? ' (demo)' : ''} ✓
          </div>
        )}

        <ConnectPlatforms
          returnTo="/onboarding/creator/step5"
          onChange={setConnectedCount}
        />

        <p className="text-sm text-[var(--vl-muted)]">
          You can connect more accounts anytime from your dashboard. We never post
          on your behalf — connection is read-only to verify your reach.
        </p>
      </div>
    </StepLayout>
  );
}
