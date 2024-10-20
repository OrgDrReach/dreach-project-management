import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white relative">
      <div className="geometric-pattern"></div>
      <div className="wave-top">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Image src="/favicon.ico" alt="Dr. Reach Insights Logo" width={32} height={32} className="mr-2" />
              <span className="text-xl font-bold">Dr. Reach Insights</span>
            </div>
            <p className="text-gray-300">Revolutionizing project management with AI-powered insights and comprehensive organizational tools.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/features" className="hover:text-indigo-400 transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-indigo-400 transition-colors">Pricing</Link></li>
              <li><Link href="/about" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="hover:text-indigo-400 transition-colors">Blog</Link></li>
              <li><Link href="/documentation" className="hover:text-indigo-400 transition-colors">Documentation</Link></li>
              <li><Link href="/support" className="hover:text-indigo-400 transition-colors">Support</Link></li>
              <li><Link href="/api" className="hover:text-indigo-400 transition-colors">API</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={24} /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; {currentYear} Dr. Reach Insights. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .wave-top {
          position: absolute;
          top: -1px;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
          transform: rotate(180deg);
        }

        .wave-top svg {
          position: relative;
          display: block;
          width: calc(100% + 1.3px);
          height: 70px;
        }

        .wave-top .shape-fill {
          fill: rgba(99, 102, 241, 0.2);
        }

        .geometric-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(30deg, #121212 12%, transparent 12.5%, transparent 87%, #121212 87.5%, #121212),
            linear-gradient(150deg, #121212 12%, transparent 12.5%, transparent 87%, #121212 87.5%, #121212),
            linear-gradient(30deg, #121212 12%, transparent 12.5%, transparent 87%, #121212 87.5%, #121212),
            linear-gradient(150deg, #121212 12%, transparent 12.5%, transparent 87%, #121212 87.5%, #121212),
            linear-gradient(60deg, #12121277 25%, transparent 25.5%, transparent 75%, #12121277 75%, #12121277),
            linear-gradient(60deg, #12121277 25%, transparent 25.5%, transparent 75%, #12121277 75%, #12121277);
          background-size: 80px 140px;
          background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;
          opacity: 0.1;
        }

        footer {
          padding-top: 70px;
        }
      `}</style>
    </footer>
  );
};
