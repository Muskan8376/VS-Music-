import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, LogOut, ExternalLink, Shield, User } from 'lucide-react';

export const DashboardHeader = ({
  user,
  sidebarCollapsed,
  onToggleSidebar,
  onSignOut,
  onReturnHome
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayName = user?.username || user?.email?.split('@')[0] || 'Muskan';

  return (
    <header className="h-16 bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      {/* Left: Brand Logo & Sidebar Toggle */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Vusic Studio Brand */}
        <div 
          onClick={onReturnHome}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ff3366] to-[#ff0033] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M12 22L2 4h20L12 22z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight leading-none text-[#1e2025]">
              Vusic<span className="font-light text-gray-500">Studio</span>
            </span>
            <span className="text-[7px] sm:text-[8px] font-bold tracking-widest text-gray-400 uppercase">
              DIGITAL DISTRIBUTION OPERATING SYSTEM
            </span>
          </div>
        </div>

        {/* Sidebar Collapse Toggle Button (Matches red circular << button in screenshot) */}
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="w-7 h-7 rounded-full bg-[#f43f5e] hover:bg-[#e11d48] text-white flex items-center justify-center transition-all cursor-pointer shadow-xs border-none ml-1 sm:ml-2"
        >
          {sidebarCollapsed ? <ChevronRight size={15} strokeWidth={2.5} /> : <ChevronLeft size={15} strokeWidth={2.5} />}
        </button>
      </div>

      {/* Right: User Profile Avatar with Dropdown */}
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 via-gray-500 to-gray-400 p-0.5 flex items-center justify-center hover:ring-2 hover:ring-[#8b5cf6]/40 transition-all cursor-pointer border-none shadow-xs"
          aria-label="User menu"
        >
          <div className="w-full h-full rounded-full bg-[#272a30] flex items-center justify-center text-white font-extrabold text-sm">
            {displayName.charAt(0).toUpperCase()}
          </div>
        </button>

        {/* User Menu Dropdown */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider m-0">Signed in as</p>
              <p className="text-sm font-extrabold text-[#1e2025] truncate m-0 mt-0.5">{displayName}</p>
              <p className="text-xs text-gray-500 truncate m-0">{user?.email || 'artist@vusic.com'}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#06b6d4]/10 text-[#0891b2] text-xs font-bold">
                <Shield size={12} />
                <span>Credits: {user?.credits || 0}</span>
              </div>
            </div>

            <div className="py-1">
              <button
                type="button"
                onClick={() => { setMenuOpen(false); onReturnHome(); }}
                className="w-full px-4 py-2 text-left text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 flex items-center gap-2 cursor-pointer border-none bg-transparent"
              >
                <ExternalLink size={14} />
                <span>Landing Page</span>
              </button>
              <button
                type="button"
                onClick={() => { setMenuOpen(false); onSignOut(); }}
                className="w-full px-4 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer border-none bg-transparent"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
