import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PropTable = ({ props, title, searchable = true, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredProps = props?.filter(prop =>
    prop?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    prop?.type?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    prop?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const sortedProps = [...filteredProps]?.sort((a, b) => {
    const aValue = a?.[sortBy];
    const bValue = b?.[sortBy];
    const comparison = aValue?.localeCompare(bValue);
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getTypeColor = (type) => {
    if (type?.includes('string')) return 'text-green-600 dark:text-green-400';
    if (type?.includes('number')) return 'text-blue-600 dark:text-blue-400';
    if (type?.includes('boolean')) return 'text-purple-600 dark:text-purple-400';
    if (type?.includes('function')) return 'text-orange-600 dark:text-orange-400';
    if (type?.includes('object')) return 'text-red-600 dark:text-red-400';
    return 'text-muted-foreground';
  };

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
      )}
      {searchable && (
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search props..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              {['name', 'type', 'default', 'description']?.map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/80 transition-micro"
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column}</span>
                    <Icon 
                      name={sortBy === column ? (sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                      size={12} 
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedProps?.map((prop, index) => (
              <tr key={prop?.name} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <code className="text-sm font-mono bg-muted px-2 py-1 rounded text-foreground">
                      {prop?.name}
                    </code>
                    {prop?.required && (
                      <span className="text-xs bg-error text-error-foreground px-1.5 py-0.5 rounded">
                        required
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <code className={`text-sm font-mono ${getTypeColor(prop?.type)}`}>
                    {prop?.type}
                  </code>
                </td>
                <td className="px-6 py-4">
                  {prop?.default ? (
                    <code className="text-sm font-mono bg-muted px-2 py-1 rounded text-muted-foreground">
                      {prop?.default}
                    </code>
                  ) : (
                    <span className="text-muted-foreground text-sm">-</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground max-w-md">
                  {prop?.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sortedProps?.length === 0 && (
        <div className="px-6 py-12 text-center">
          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No props found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default PropTable;