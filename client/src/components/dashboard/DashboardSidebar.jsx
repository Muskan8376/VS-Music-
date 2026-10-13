import React from 'react';
import { Home, Sparkles, LogOut, ArrowLeft } from 'lucide-react';

export const DashboardSidebar = ({
  activeTab = 'home',
  onSelectTab,
  collapsed = false,
  onSignOut,
  onReturnHome
}) => {
  return (
    <aside
      className={`bg-white border-r border-gray-100 flex flex-col justify-between transition-all duration-300 z-20 shrink-0 ${
        collapsed ? 'w-16' : 'w-56 sm:w-64'
      }`}
    >
      {/* Top Nav Items */}
      <nav className="p-3 space-y-1.5 pt-4">
        {/* Home Item (Active in screenshot with soft pink tint and red right border indicator) */}
        <button
          type="button"
          onClick={() => onSelectTab('home')}
          className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-bold text-sm transition-all border-none cursor-pointer ${
            activeTab === 'home'
              ? 'bg-[#fee2e2]/60 text-[#ef4444] border-r-4 border-[#ef4444]'
              : 'bg-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
          title="Home"
        >
          <Home
            size={18}
            className={activeTab === 'home' ? 'text-[#ef4444]' : 'text-gray-400'}
            strokeWidth={activeTab === 'home' ? 2.4 : 2}
          />
          {!collapsed && <span>Home</span>}
        </button>

        {/* Pricing Item (With sparkles/tag icon) */}
        <button
          type="button"
          onClick={() => onSelectTab('pricing')}
          className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-bold text-sm transition-all border-none cursor-pointer ${
            activeTab === 'pricing'
              ? 'bg-[#fee2e2]/60 text-[#ef4444] border-r-4 border-[#ef4444]'
              : 'bg-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
          title="Pricing"
        >
          <Sparkles
            size={18}
            className={activeTab === 'pricing' ? 'text-[#ef4444]' : 'text-gray-400'}
            strokeWidth={activeTab === 'pricing' ? 2.4 : 2}
          />
          {!collapsed && <span>Pricing</span>}
        </button>
      </nav>

      {/* Bottom Nav / Return to Website */}
      <div className="p-3 border-t border-gray-100 space-y-1">
        <button
          type="button"
          onClick={onReturnHome}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all border-none cursor-pointer bg-transparent"
          title="Exit to Landing Page"
        >
          <ArrowLeft size={16} />
          {!collapsed && <span>Back to Main Page</span>}
        </button>
        <button
          type="button"
          onClick={onSignOut}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs text-red-500 hover:text-red-700 hover:bg-red-50 transition-all border-none cursor-pointer bg-transparent"
          title="Sign Out"
        >
          <LogOut size={16} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
