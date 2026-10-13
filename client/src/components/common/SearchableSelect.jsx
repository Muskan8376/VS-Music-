import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';

export default function SearchableSelect({
  value,
  onChange,
  options = [],
  placeholder = 'Select',
  disabled = false,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (opt) => {
    onChange(opt);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
    setSearchQuery('');
  };

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full text-xs sm:text-sm px-3 py-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer select-none truncate ${
          disabled
            ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
            : isOpen
            ? 'border-[#a855f7] ring-2 ring-[#a855f7]/20 bg-white'
            : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
      >
        <span className={`truncate mr-1 ${value ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
          {value || placeholder}
        </span>

        <div className="flex items-center gap-1 shrink-0">
          {value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="p-0.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 bg-transparent border-none cursor-pointer"
              title="Clear selection"
            >
              <X size={12} />
            </button>
          )}
          <ChevronDown
            size={13}
            className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#a855f7]' : ''}`}
          />
        </div>
      </div>

      {/* Floating Dropdown with Search */}
      {isOpen && !disabled && (
        <div className="absolute left-0 top-full mt-1.5 w-full min-w-[140px] max-w-[220px] bg-white rounded-2xl shadow-xl border border-gray-100 z-50 p-2 animate-in fade-in zoom-in-95 duration-150">
          {/* Search Input */}
          <div className="relative mb-2">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${placeholder.toLowerCase()}...`}
              className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#a855f7] bg-gray-50/50 text-gray-800 placeholder-gray-400"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Filtered Options List */}
          <div className="max-h-40 overflow-y-auto flex flex-col gap-0.5 pr-0.5">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={`text-xs px-2.5 py-2 rounded-xl cursor-pointer transition-colors flex items-center justify-between ${
                    value === opt
                      ? 'bg-[#a855f7]/10 text-[#a855f7] font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="truncate">{opt}</span>
                  {value === opt && <span className="text-[10px] text-[#a855f7]">✓</span>}
                </div>
              ))
            ) : (
              <div className="text-center py-3 text-xs text-gray-400">
                No matching results
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
