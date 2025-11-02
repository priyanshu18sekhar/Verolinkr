"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container, Typography } from '../components/design-system';

interface FooterProps {
  staggerContainer?: any;
}

const Footer = ({ staggerContainer }: FooterProps) => {
  const socialLinks = [
    { name: 'Twitter', url: '#' },
    { name: 'LinkedIn', url: '#' },
    { name: 'Instagram', url: '#' },
    { name: 'YouTube', url: '#' },
  ];

  const footerLinks = [
    { name: 'About', url: '#' },
    { name: 'Features', url: '#' },
    { name: 'Pricing', url: '#' },
    { name: 'Contact', url: '/contact' },
    { name: 'Privacy', url: '#' },
    { name: 'Terms', url: '#' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 py-24">
      <Container>
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Typography variant="h4" className="mb-6 font-black">
              VeroLinkr
            </Typography>
            <p className="text-lg text-gray-600 mb-8">
              Authentic Partnerships, Verified Results
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-gray-600 hover:text-black transition-colors duration-200"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <Typography variant="h6" className="mb-6 font-black">
              Company
            </Typography>
            <div className="space-y-4">
              {footerLinks.slice(0, 4).map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  className="block text-gray-600 hover:text-black transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <Typography variant="h6" className="mb-6 font-black">
              Legal
            </Typography>
            <div className="space-y-4">
              {footerLinks.slice(4).map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  className="block text-gray-600 hover:text-black transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-12 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © 2025 VeroLinkr. All rights reserved.
          </p>
          <p className="text-sm text-gray-600">
            Made with passion for authentic marketing
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
