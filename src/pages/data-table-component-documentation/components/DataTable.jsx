import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const DataTable = ({ 
  data = [], 
  columns = [], 
  loading = false, 
  selectable = false, 
  onRowSelect 
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Sort data based on current sort configuration
  const sortedData = useMemo(() => {
    if (!sortConfig?.key) return data;
    
    return [...data]?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];
      
      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (columnKey) => {
    const column = columns?.find(col => col?.key === columnKey);
    if (!column?.sortable) return;

    let direction = 'asc';
    if (sortConfig?.key === columnKey && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key: columnKey, direction });
  };

  const handleRowSelect = (row, isSelected) => {
    let newSelectedRows;
    
    if (isSelected) {
      newSelectedRows = [...selectedRows, row];
    } else {
      newSelectedRows = selectedRows?.filter(selectedRow => 
        selectedRow !== row
      );
    }
    
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  const handleSelectAll = (isSelected) => {
    let newSelectedRows = isSelected ? [...sortedData] : [];
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  const isRowSelected = (row) => selectedRows?.includes(row);
  const isAllSelected = sortedData?.length > 0 && selectedRows?.length === sortedData?.length;
  const isIndeterminate = selectedRows?.length > 0 && selectedRows?.length < sortedData?.length;

  // Loading state
  if (loading) {
    return (
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                {selectable && (
                  <th className="w-12 px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <div className="w-4 h-4 bg-muted-foreground/20 rounded animate-shimmer"></div>
                  </th>
                )}
                {columns?.map((column) => (
                  <th key={column?.key} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <div className="h-4 bg-muted-foreground/20 rounded animate-shimmer w-20"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {[...Array(5)]?.map((_, index) => (
                <tr key={index}>
                  {selectable && (
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="w-4 h-4 bg-muted-foreground/20 rounded animate-shimmer"></div>
                    </td>
                  )}
                  {columns?.map((column) => (
                    <td key={column?.key} className="px-4 py-4 whitespace-nowrap">
                      <div className="h-4 bg-muted-foreground/20 rounded animate-shimmer"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Empty state
  if (!sortedData?.length) {
    return (
      <div className="border border-border rounded-lg">
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <Icon name="Table" size={48} className="text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No data available</h3>
          <p className="text-muted-foreground text-center max-w-sm">
            There is no data to display in this table. Add some data to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden" role="table" aria-label="Data table">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr role="row">
              {selectable && (
                <th className="w-12 px-4 py-3 text-left" role="columnheader">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = isIndeterminate;
                    }}
                    onChange={(e) => handleSelectAll(e?.target?.checked)}
                    className="w-4 h-4 text-primary focus:ring-primary border-border rounded"
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns?.map((column) => (
                <th
                  key={column?.key}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider",
                    column?.sortable && "cursor-pointer hover:bg-muted/80 transition-micro"
                  )}
                  onClick={() => handleSort(column?.key)}
                  role="columnheader"
                  aria-sort={
                    sortConfig?.key === column?.key
                      ? sortConfig?.direction === 'asc' ?'ascending' :'descending' :'none'
                  }
                >
                  <div className="flex items-center space-x-1">
                    <span>{column?.title}</span>
                    {column?.sortable && (
                      <div className="flex flex-col">
                        <Icon
                          name="ChevronUp"
                          size={12}
                          className={cn(
                            "transition-micro",
                            sortConfig?.key === column?.key && sortConfig?.direction === 'asc' ?'text-primary' :'text-muted-foreground/50'
                          )}
                        />
                        <Icon
                          name="ChevronDown"
                          size={12}
                          className={cn(
                            "transition-micro -mt-1",
                            sortConfig?.key === column?.key && sortConfig?.direction === 'desc' ?'text-primary' :'text-muted-foreground/50'
                          )}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border" role="rowgroup">
            {sortedData?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  "hover:bg-muted/50 transition-micro",
                  isRowSelected(row) && "bg-primary/5"
                )}
                role="row"
              >
                {selectable && (
                  <td className="px-4 py-4 whitespace-nowrap" role="gridcell">
                    <input
                      type="checkbox"
                      checked={isRowSelected(row)}
                      onChange={(e) => handleRowSelect(row, e?.target?.checked)}
                      className="w-4 h-4 text-primary focus:ring-primary border-border rounded"
                      aria-label={`Select row ${rowIndex + 1}`}
                    />
                  </td>
                )}
                {columns?.map((column) => (
                  <td
                    key={column?.key}
                    className="px-4 py-4 whitespace-nowrap text-sm text-foreground"
                    role="gridcell"
                  >
                    {row?.[column?.dataIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;