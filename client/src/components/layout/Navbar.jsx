import React, { useState } from 'react';
import VusicLogo from '../common/VusicLogo';
import Button from '../common/Button';
import { Menu, X } from 'lucide-react';

export default function Navbar({ onOpenAuth, currentUser, onGoToDashboard }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (targetId === 'pricing' && currentUser && onGoToDashboard) {
      onGoToDashboard();
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-[#1e2025] text-white sticky top-0 z-50 w-full border-b border-white/10 shadow-lg" role="navigation" aria-label="Main Navigation">
      <div className="max-w-[1380px] mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" aria-label="Vusic Records Home" className="inline-block">
            <VusicLogo variant="light" />
          </a>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-8">
          <a 
            href="#pricing" 
            className="text-sm font-medium text-white hover:text-[#ea3838] transition-colors"
            onClick={(e) => handleLinkClick(e, 'pricing')}
          >
            Pricing
          </a>

          {currentUser ? (
            <Button
              variant="primary"
              size="md"
              onClick={onGoToDashboard}
              className="text-sm font-semibold px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#e93e9a] via-[#b64cee] to-[#8b5cf6] hover:opacity-95 shadow-md shadow-purple-500/20"
            >
              Go to Dashboard ({currentUser.username || 'Muskan'})
            </Button>
          ) : (
            <>
              <button 
                type="button" 
                className="text-sm font-medium text-white hover:text-[#ea3838] transition-colors bg-transparent border-none cursor-pointer"
                onClick={() => onOpenAuth('login')}
              >
                Login
              </button>

              <Button 
                variant="primary" 
                size="md"
                onClick={() => onOpenAuth('register')}
                className="text-sm font-semibold px-6 py-2.5 rounded-lg bg-[#ea3838] hover:bg-[#d32828] shadow-[0_4px_12px_rgba(234,56,56,0.35)]"
              >
                Create New Account
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          type="button" 
          className="md:hidden bg-transparent border-none cursor-pointer p-2 flex items-center justify-center text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col bg-[#16181d] px-6 py-5 border-t border-white/10">
          <a 
            href="#pricing" 
            className="text-base text-white py-3.5 border-b border-white/10 hover:text-[#ea3838]"
            onClick={(e) => handleLinkClick(e, 'pricing')}
          >
            Pricing
          </a>
          <button 
            type="button" 
            className="text-base text-white py-3.5 border-b border-white/10 text-left bg-transparent border-none cursor-pointer hover:text-[#ea3838]"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAuth('login');
            }}
          >
            Login
          </button>
          <div className="pt-4">
            <Button 
              variant="primary" 
              size="md" 
              fullWidth
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('register');
              }}
            >
              Create New Account
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
