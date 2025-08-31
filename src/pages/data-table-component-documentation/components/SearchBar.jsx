import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch?.(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch?.('');
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon name="Search" size={16} className="text-muted-foreground" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e?.target?.value)}
        placeholder="Search data table components..."
        className="
          w-full pl-10 pr-10 py-2 text-sm
          bg-input border border-border rounded-md
          focus:ring-2 focus:ring-primary focus:border-transparent
          text-foreground placeholder-muted-foreground
          transition-micro
        "
      />
      {searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-foreground transition-micro"
        >
          <Icon name="X" size={16} className="text-muted-foreground" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;