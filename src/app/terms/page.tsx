import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-lg p-8 sm:p-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-black">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </div>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-purple max-w-none text-gray-600">
          <p className="mb-4">Last Updated: October 2023</p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using VeroLinkr, you accept and agree to be bound by the terms and provision of this agreement. 
            In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable 
            to such services.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
          <p className="mb-4">
            VeroLinkr provides a platform connecting brands (Advertisers) with content creators (Influencers) for marketing campaigns.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. User Conduct</h2>
          <p className="mb-4">
            All interactions on the platform must comply with applicable laws. You agree not to transmit any unlawful, harassing, 
            libelous, abusive, threatening, harmful, vulgar, obscene, or otherwise objectionable material of any kind or nature.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Intellectual Property</h2>
          <p className="mb-4">
            The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters 
            related to the Site are protected under applicable copyrights, trademarks and other proprietary (including but not 
            limited to intellectual property) rights.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, 
            including without limitation if you breach the Terms.
          </p>
        </div>
      </div>
    </div>
  );
}
