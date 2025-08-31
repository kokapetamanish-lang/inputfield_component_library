import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ onSearch, placeholder = "Search components..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className="relative">
      <div className={`
        relative flex items-center bg-background border rounded-md transition-micro
        ${isFocused ? 'border-primary ring-2 ring-primary/20' : 'border-border'}
      `}>
        <Icon 
          name="Search" 
          size={16} 
          className="absolute left-3 text-muted-foreground" 
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 text-muted-foreground hover:text-foreground transition-micro"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
      {searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50">
          <div className="p-2">
            <div className="text-xs text-muted-foreground px-2 py-1">
              Search results for "{searchTerm}"
            </div>
            <div className="space-y-1 mt-2">
              <div className="px-2 py-2 text-sm text-muted-foreground hover:bg-muted rounded cursor-pointer">
                No results found
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;