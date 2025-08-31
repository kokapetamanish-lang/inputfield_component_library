import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SearchInterface = ({ onSearch, onFilter, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterOptions = [
    { id: 'props', label: 'Props', icon: 'Settings' },
    { id: 'methods', label: 'Methods', icon: 'Zap' },
    { id: 'events', label: 'Events', icon: 'Radio' },
    { id: 'types', label: 'Types', icon: 'FileType' },
    { id: 'examples', label: 'Examples', icon: 'Code' },
    { id: 'required', label: 'Required Only', icon: 'AlertCircle' },
    { id: 'deprecated', label: 'Show Deprecated', icon: 'AlertTriangle' }
  ];

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm, onSearch]);

  useEffect(() => {
    onFilter(activeFilters);
  }, [activeFilters, onFilter]);

  const toggleFilter = (filterId) => {
    setActiveFilters(prev => 
      prev?.includes(filterId)
        ? prev?.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchTerm('');
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Escape') {
      setSearchTerm('');
      setIsFilterOpen(false);
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search props, methods, events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-micro"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={14} />
            </button>
          )}
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-micro
              ${isFilterOpen || activeFilters?.length > 0
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }
            `}
          >
            <Icon name="Filter" size={16} />
            <span>Filters</span>
            {activeFilters?.length > 0 && (
              <span className="bg-primary-foreground text-primary text-xs px-1.5 py-0.5 rounded-full">
                {activeFilters?.length}
              </span>
            )}
          </button>

          {(searchTerm || activeFilters?.length > 0) && (
            <button
              onClick={clearAllFilters}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-micro"
            >
              <Icon name="X" size={14} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>
      {/* Filter Options */}
      {isFilterOpen && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {filterOptions?.map((option) => (
              <button
                key={option?.id}
                onClick={() => toggleFilter(option?.id)}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-micro
                  ${activeFilters?.includes(option?.id)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                  }
                `}
              >
                <Icon name={option?.icon} size={14} />
                <span>{option?.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Active Filters Display */}
      {activeFilters?.length > 0 && !isFilterOpen && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <span className="text-xs text-muted-foreground">Active filters:</span>
            {activeFilters?.map((filterId) => {
              const filter = filterOptions?.find(f => f?.id === filterId);
              return (
                <span
                  key={filterId}
                  className="inline-flex items-center space-x-1 px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full"
                >
                  <Icon name={filter?.icon} size={12} />
                  <span>{filter?.label}</span>
                  <button
                    onClick={() => toggleFilter(filterId)}
                    className="hover:bg-primary-foreground/20 rounded-full p-0.5"
                  >
                    <Icon name="X" size={10} />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInterface;