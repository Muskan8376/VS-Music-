import React from 'react';
import VusicLogo from '../common/VusicLogo';

export default function Footer({ onOpenAuth }) {
  return (
    <footer className="bg-[#16181d] text-gray-400 pt-16 pb-9 border-t border-white/10" role="contentinfo" aria-label="Footer">
      <div className="max-w-[1380px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <VusicLogo variant="light" size="large" />
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm m-0">
              The premier modern music distribution and royalty management platform for independent artists and record labels across India and worldwide.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm text-white tracking-wider uppercase m-0">Distribution</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              <li><a href="#distribution" className="text-sm text-gray-400 hover:text-[#ea3838] transition-colors">Digital Streaming Platforms</a></li>
              <li><a href="#distribution" className="text-sm text-gray-400 hover:text-[#ea3838] transition-colors">Caller Ringback Tunes (CRBT)</a></li>
              <li><a href="#distribution" className="text-sm text-gray-400 hover:text-[#ea3838] transition-colors">YouTube Content ID</a></li>
              <li><a href="#distribution" className="text-sm text-gray-400 hover:text-[#ea3838] transition-colors">Social Media Sync & UGC</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm text-white tracking-wider uppercase m-0">Artists & Labels</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              <li><a href="#artists" className="text-sm text-gray-400 hover:text-[#ea3838] transition-colors">Featured Artists</a></li>
              <li><a href="#features" className="text-sm text-gray-400 hover:text-[#ea3838] transition-colors">Multi-Label Management</a></li>
              <li><a href="#features" className="text-sm text-gray-400 hover:text-[#ea3838] transition-colors">Automated Playlisting</a></li>
              <li><a href="#features" className="text-sm text-gray-400 hover:text-[#ea3838] transition-colors">Takedown Protection</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm text-white tracking-wider uppercase m-0">Account</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              <li><button type="button" onClick={() => onOpenAuth('login')} className="text-sm text-gray-400 hover:text-[#ea3838] transition-colors bg-transparent border-none p-0 text-left cursor-pointer">Artist Login</button></li>
              <li><button type="button" onClick={() => onOpenAuth('register')} className="text-sm text-gray-400 hover:text-[#ea3838] transition-colors bg-transparent border-none p-0 text-left cursor-pointer">Join as Artist</button></li>
              <li><a href="#pricing" className="text-sm text-gray-400 hover:text-[#ea3838] transition-colors">Distribution Pricing</a></li>
              <li><a href="#faq" className="text-sm text-gray-400 hover:text-[#ea3838] transition-colors">Support & FAQs</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-7 text-xs text-gray-500">
          <p className="m-0">
            &copy; {new Date().getFullYear()} Vusic Records. All rights reserved. For Artists, By Artists.
          </p>
          <div className="flex items-center gap-3">
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#security" className="hover:text-white transition-colors">Royalties & Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
