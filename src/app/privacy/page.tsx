import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-lg p-8 sm:p-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-black">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </div>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-purple max-w-none text-gray-600">
          <p className="mb-4">Last Updated: October 2023</p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to VeroLinkr. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website 
            and tell you about your privacy rights and how the law protects you.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Data We Collect</h2>
          <p className="mb-4">
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
            <li><strong>Financial Data:</strong> includes bank account details (for creators).</li>
            <li><strong>Profile Data:</strong> includes your username, password, purchases or orders made by you, your interests, preferences, feedback and survey responses.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. How We Use Your Data</h2>
          <p className="mb-4">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Data Security</h2>
          <p className="mb-4">
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
          </p>
        </div>
      </div>
    </div>
  );
}
